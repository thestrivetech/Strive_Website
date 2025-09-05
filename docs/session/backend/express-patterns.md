# Express.js Patterns for Chat API Implementation

## Overview
Comprehensive Express.js patterns for implementing chat functionality, form validation, and API route organization for Session 2 tasks.

## 1. Express.js Middleware Patterns

### Global Middleware Setup
```javascript
const express = require('express');
const app = express();

// Trust proxy for deployment (Replit environment)
app.set('trust proxy', 1);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (path.startsWith('/api')) {
      console.log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    }
  });
  
  next();
});
```

### Route-Specific Middleware
```javascript
// Authentication middleware
const authenticateUser = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }
};

// Apply middleware to specific routes
app.get('/api/chat/messages', authenticateUser, (req, res) => {
  // Protected chat endpoint
});

// Multiple middleware for complex routes
app.post('/api/chat/send', 
  authenticateUser, 
  validateMessage, 
  rateLimitMiddleware,
  async (req, res) => {
    // Send message endpoint
  }
);
```

### Error Handling Middleware
```javascript
// Global error handler (must be last middleware)
app.use((err, req, res, next) => {
  console.error('Error caught:', err.message);
  
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({ 
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});
```

## 2. Chat API Route Patterns

### Basic Chat Endpoints
```javascript
// Get chat messages
app.get('/api/chat/messages', authenticateUser, async (req, res) => {
  try {
    const { roomId, limit = 50, offset = 0 } = req.query;
    
    const messages = await db.select()
      .from(chatMessages)
      .where(eq(chatMessages.roomId, roomId))
      .orderBy(desc(chatMessages.createdAt))
      .limit(parseInt(limit))
      .offset(parseInt(offset));
    
    res.json({
      success: true,
      data: messages,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: messages.length === parseInt(limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Send chat message
app.post('/api/chat/messages', 
  authenticateUser,
  [
    body('content').trim().isLength({ min: 1, max: 1000 }),
    body('roomId').isUUID()
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { content, roomId } = req.body;
      const userId = req.session.user.id;

      const message = await db.insert(chatMessages).values({
        content,
        roomId,
        userId,
        createdAt: new Date()
      }).returning();

      // Emit to Socket.IO for real-time updates
      req.app.get('io').to(roomId).emit('new-message', message[0]);

      res.status(201).json({
        success: true,
        data: message[0]
      });
    } catch (error) {
      next(error);
    }
  }
);
```

### Chat Room Management
```javascript
// Create chat room
app.post('/api/chat/rooms', authenticateUser, async (req, res, next) => {
  try {
    const { name, description, isPrivate = false } = req.body;
    const ownerId = req.session.user.id;

    const room = await db.insert(chatRooms).values({
      name,
      description,
      isPrivate,
      ownerId,
      createdAt: new Date()
    }).returning();

    res.status(201).json({
      success: true,
      data: room[0]
    });
  } catch (error) {
    next(error);
  }
});

// Join chat room
app.post('/api/chat/rooms/:roomId/join', authenticateUser, async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const userId = req.session.user.id;

    // Check if room exists
    const room = await db.select()
      .from(chatRooms)
      .where(eq(chatRooms.id, roomId))
      .limit(1);

    if (!room.length) {
      return res.status(404).json({
        success: false,
        message: 'Chat room not found'
      });
    }

    // Add user to room
    await db.insert(roomMembers).values({
      roomId,
      userId,
      joinedAt: new Date()
    }).onConflictDoNothing();

    res.json({
      success: true,
      message: 'Successfully joined room'
    });
  } catch (error) {
    next(error);
  }
});
```

## 3. Socket.IO Integration with Express

### Server Setup
```javascript
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Make io accessible in routes
app.set('io', io);

// Socket.IO middleware for authentication
io.use((socket, next) => {
  const sessionId = socket.handshake.auth.sessionId;
  if (sessionId) {
    // Validate session
    next();
  } else {
    next(new Error('Authentication required'));
  }
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', {
      userId: socket.userId,
      socketId: socket.id
    });
  });

  // Handle typing indicators
  socket.on('typing', (data) => {
    socket.to(data.roomId).emit('user-typing', {
      userId: socket.userId,
      isTyping: true
    });
  });

  socket.on('stop-typing', (data) => {
    socket.to(data.roomId).emit('user-typing', {
      userId: socket.userId,
      isTyping: false
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

httpServer.listen(3000);
```

### Real-time Message Broadcasting
```javascript
// In your chat message route
app.post('/api/chat/messages', async (req, res, next) => {
  try {
    // ... validation and database insertion

    // Broadcast to room members
    const io = req.app.get('io');
    io.to(roomId).emit('message', {
      id: message.id,
      content: message.content,
      userId: message.userId,
      username: req.session.user.username,
      createdAt: message.createdAt,
      roomId: roomId
    });

    res.json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
});
```

## 4. Advanced Middleware Patterns

### Request Context Middleware
```javascript
// Add request context data
app.use((req, res, next) => {
  req.context = {
    requestId: generateRequestId(),
    startTime: Date.now(),
    user: null
  };
  next();
});

// User context middleware
app.use(async (req, res, next) => {
  if (req.session?.user?.id) {
    try {
      const user = await db.select()
        .from(users)
        .where(eq(users.id, req.session.user.id))
        .limit(1);
      
      req.context.user = user[0] || null;
    } catch (error) {
      console.error('Error loading user context:', error);
    }
  }
  next();
});
```

### Rate Limiting Middleware
```javascript
const rateLimit = require('express-rate-limit');

// Create rate limiter for chat messages
const chatRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // limit each user to 30 messages per minute
  message: {
    success: false,
    message: 'Too many messages sent. Please wait before sending another message.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.session?.user?.id || req.ip;
  }
});

// Apply to chat endpoints
app.use('/api/chat/messages', chatRateLimit);
```

### Async Route Handler Wrapper
```javascript
// Utility to handle async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
app.get('/api/chat/messages', asyncHandler(async (req, res) => {
  const messages = await db.select().from(chatMessages);
  res.json({ success: true, data: messages });
}));
```

## 5. Route Organization Patterns

### Modular Route Structure
```javascript
// routes/chat.js
const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const { authenticateUser } = require('../middleware/auth');
const { chatController } = require('../controllers/chat');

const router = express.Router();

// All chat routes require authentication
router.use(authenticateUser);

// Message routes
router.get('/messages', 
  [
    query('roomId').isUUID(),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('offset').optional().isInt({ min: 0 })
  ],
  chatController.getMessages
);

router.post('/messages',
  [
    body('content').trim().isLength({ min: 1, max: 1000 }),
    body('roomId').isUUID()
  ],
  chatController.sendMessage
);

// Room routes
router.get('/rooms', chatController.getRooms);
router.post('/rooms', chatController.createRoom);
router.post('/rooms/:roomId/join', 
  param('roomId').isUUID(),
  chatController.joinRoom
);

module.exports = router;

// In main app.js
app.use('/api/chat', require('./routes/chat'));
```

### Controller Pattern
```javascript
// controllers/chat.js
const { validationResult } = require('express-validator');
const { chatService } = require('../services/chat');

const chatController = {
  async getMessages(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { roomId, limit = 50, offset = 0 } = req.query;
      const userId = req.context.user.id;

      const messages = await chatService.getMessages({
        roomId,
        userId,
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({
        success: true,
        data: messages
      });
    } catch (error) {
      next(error);
    }
  },

  async sendMessage(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { content, roomId } = req.body;
      const userId = req.context.user.id;

      const message = await chatService.sendMessage({
        content,
        roomId,
        userId
      });

      // Emit real-time event
      req.app.get('io').to(roomId).emit('new-message', message);

      res.status(201).json({
        success: true,
        data: message
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = { chatController };
```

## 6. Response Formatting Standards

### Consistent API Response Format
```javascript
// Success response helper
const successResponse = (data, message = 'Success', meta = null) => ({
  success: true,
  message,
  data,
  ...(meta && { meta })
});

// Error response helper
const errorResponse = (message, errors = null, statusCode = 400) => ({
  success: false,
  message,
  ...(errors && { errors }),
  timestamp: new Date().toISOString()
});

// Usage in routes
app.get('/api/chat/messages', async (req, res, next) => {
  try {
    const messages = await chatService.getMessages(req.query);
    res.json(successResponse(messages, 'Messages retrieved successfully'));
  } catch (error) {
    res.status(500).json(errorResponse('Failed to retrieve messages'));
  }
});
```

## 7. WebSocket Message Patterns

### Structured Message Types
```javascript
// Message type constants
const MESSAGE_TYPES = {
  CHAT_MESSAGE: 'chat:message',
  USER_JOINED: 'chat:user_joined',
  USER_LEFT: 'chat:user_left',
  TYPING_START: 'chat:typing_start',
  TYPING_STOP: 'chat:typing_stop',
  ROOM_CREATED: 'chat:room_created',
  ERROR: 'error'
};

// Message structure
const createMessage = (type, payload, userId = null) => ({
  type,
  payload,
  userId,
  timestamp: new Date().toISOString(),
  id: generateMessageId()
});

// Socket event handlers
io.on('connection', (socket) => {
  socket.on(MESSAGE_TYPES.CHAT_MESSAGE, async (data) => {
    try {
      // Validate and save message
      const message = await chatService.saveMessage(data);
      
      // Broadcast to room
      socket.to(data.roomId).emit(MESSAGE_TYPES.CHAT_MESSAGE, 
        createMessage(MESSAGE_TYPES.CHAT_MESSAGE, message, socket.userId)
      );
    } catch (error) {
      socket.emit(MESSAGE_TYPES.ERROR, 
        createMessage(MESSAGE_TYPES.ERROR, { message: error.message })
      );
    }
  });
});
```

This comprehensive guide provides the essential Express.js patterns needed for implementing chat functionality, form handling, and API organization for Session 2 tasks.