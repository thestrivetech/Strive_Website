# Node.js Optimization & Performance Patterns

## Overview
Advanced Node.js patterns for performance optimization, async operations, error handling, and scalability for Session 2 implementation.

## 1. Async/Await Best Practices

### Proper Error Handling
```javascript
// ✅ Correct async error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage in routes
app.get('/api/chat/messages', asyncHandler(async (req, res) => {
  const messages = await storage.getMessages(req.params.roomId);
  res.json({ success: true, data: messages });
}));

// ✅ Proper error handling in services
class ChatService {
  async sendMessage(messageData) {
    try {
      // Validate room access
      const hasAccess = await this.validateRoomAccess(
        messageData.userId, 
        messageData.roomId
      );
      
      if (!hasAccess) {
        throw new Error('Access denied to room');
      }

      // Send message within transaction
      const message = await db.transaction(async (tx) => {
        const newMessage = await tx.insert(chatMessages)
          .values(messageData)
          .returning();

        await tx.update(chatRooms)
          .set({ updatedAt: new Date() })
          .where(eq(chatRooms.id, messageData.roomId));

        return newMessage[0];
      });

      return message;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error; // Re-throw for controller to handle
    }
  }

  async validateRoomAccess(userId, roomId) {
    try {
      const membership = await db.select()
        .from(roomMembers)
        .where(and(
          eq(roomMembers.userId, userId),
          eq(roomMembers.roomId, roomId)
        ))
        .limit(1);

      return membership.length > 0;
    } catch (error) {
      console.error('Error validating room access:', error);
      return false; // Fail closed for security
    }
  }
}
```

### Concurrent Operations
```javascript
// ✅ Parallel processing for independent operations
async function loadUserDashboardData(userId) {
  try {
    const [userProfile, chatRooms, recentMessages, notifications] = await Promise.all([
      storage.getUserProfile(userId),
      storage.getUserRooms(userId),
      storage.getRecentMessages(userId, 10),
      storage.getUserNotifications(userId, 20)
    ]);

    return {
      profile: userProfile,
      rooms: chatRooms,
      recent: recentMessages,
      notifications
    };
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    throw error;
  }
}

// ✅ Sequential processing for dependent operations
async function processContactSubmission(formData) {
  try {
    // Step 1: Validate and create submission
    const submission = await storage.createContactSubmission(formData);
    
    // Step 2: Create demo request if needed (depends on submission)
    let demoRequest = null;
    if (formData.requestDemo) {
      demoRequest = await storage.createDemoRequest({
        contactId: submission.id,
        ...formData.demoData
      });
    }
    
    // Step 3: Send notifications (depends on previous steps)
    await notificationService.sendNewSubmissionNotifications({
      submission,
      demoRequest
    });
    
    return { submission, demoRequest };
  } catch (error) {
    console.error('Error processing contact submission:', error);
    throw error;
  }
}
```

### Batch Processing
```javascript
// ✅ Efficient batch operations
class MessageProcessor {
  constructor() {
    this.messageBatch = [];
    this.batchSize = 50;
    this.processingInterval = 1000; // 1 second
    this.startBatchProcessor();
  }

  async queueMessage(message) {
    this.messageBatch.push(message);
    
    if (this.messageBatch.length >= this.batchSize) {
      await this.processBatch();
    }
  }

  async processBatch() {
    if (this.messageBatch.length === 0) return;
    
    const batch = this.messageBatch.splice(0, this.batchSize);
    
    try {
      await db.transaction(async (tx) => {
        // Batch insert messages
        const messages = await tx.insert(chatMessages)
          .values(batch)
          .returning();

        // Update room timestamps
        const roomIds = [...new Set(batch.map(m => m.roomId))];
        await tx.update(chatRooms)
          .set({ updatedAt: new Date() })
          .where(sql`${chatRooms.id} = ANY(${roomIds})`);

        // Broadcast messages via WebSocket
        messages.forEach(message => {
          io.to(message.roomId).emit('new-message', message);
        });
      });
    } catch (error) {
      console.error('Batch processing error:', error);
      // Re-queue failed messages for retry
      this.messageBatch.unshift(...batch);
    }
  }

  startBatchProcessor() {
    setInterval(async () => {
      await this.processBatch();
    }, this.processingInterval);
  }
}

const messageProcessor = new MessageProcessor();
```

## 2. Memory Management & Performance

### Connection Pooling
```javascript
// ✅ Database connection pooling with Drizzle
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum pool size
  min: 2,  // Minimum pool size
  idle: 10000, // Close idle connections after 10 seconds
  connectionTimeoutMillis: 2000, // Timeout for new connections
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  maxUses: 7500 // Close connection after 7500 queries
});

const db = drizzle(pool);

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Closing database pool...');
  await pool.end();
  process.exit(0);
});
```

### Memory Optimization
```javascript
// ✅ Stream processing for large datasets
const fs = require('fs');
const { pipeline } = require('stream');
const { Transform } = require('stream');

class MessageExporter {
  async exportMessages(roomId, outputPath) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT m.id, m.content, m.created_at, u.username 
        FROM chat_messages m 
        JOIN users u ON m.user_id = u.id 
        WHERE m.room_id = $1 
        ORDER BY m.created_at
      `;

      const queryStream = pool.query(new QueryStream(query, [roomId]));
      const writeStream = fs.createWriteStream(outputPath);
      
      const transformStream = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
          const formatted = JSON.stringify({
            id: chunk.id,
            content: chunk.content,
            createdAt: chunk.created_at,
            username: chunk.username
          }) + '\n';
          
          callback(null, formatted);
        }
      });

      pipeline(queryStream, transformStream, writeStream, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(outputPath);
        }
      });
    });
  }
}

// ✅ Memory-efficient pagination
async function getPaginatedMessages(roomId, page = 1, limit = 50) {
  const offset = (page - 1) * limit;
  
  // Use cursor-based pagination for better performance
  const messages = await db
    .select({
      id: chatMessages.id,
      content: chatMessages.content,
      createdAt: chatMessages.createdAt,
      userId: chatMessages.userId
    })
    .from(chatMessages)
    .where(eq(chatMessages.roomId, roomId))
    .orderBy(desc(chatMessages.createdAt))
    .limit(limit)
    .offset(offset);

  return messages;
}
```

### Caching Strategies
```javascript
const NodeCache = require('node-cache');
const Redis = require('redis');

// ✅ Multi-level caching
class CacheManager {
  constructor() {
    // Level 1: In-memory cache (fast, small capacity)
    this.memoryCache = new NodeCache({
      stdTTL: 300, // 5 minutes
      checkperiod: 60, // Check for expired keys every minute
      maxKeys: 1000
    });

    // Level 2: Redis cache (medium speed, larger capacity)
    this.redisClient = Redis.createClient(process.env.REDIS_URL);
    this.redisClient.connect();
  }

  async get(key) {
    // Try memory cache first
    const memoryValue = this.memoryCache.get(key);
    if (memoryValue !== undefined) {
      return memoryValue;
    }

    // Try Redis cache
    try {
      const redisValue = await this.redisClient.get(key);
      if (redisValue) {
        const parsed = JSON.parse(redisValue);
        // Store in memory cache for next time
        this.memoryCache.set(key, parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Redis cache error:', error);
    }

    return null;
  }

  async set(key, value, ttl = 300) {
    // Store in both caches
    this.memoryCache.set(key, value, ttl);
    
    try {
      await this.redisClient.setEx(key, ttl, JSON.stringify(value));
    } catch (error) {
      console.error('Redis cache set error:', error);
    }
  }

  async invalidate(pattern) {
    // Clear from memory cache
    this.memoryCache.flushAll();
    
    // Clear from Redis
    try {
      const keys = await this.redisClient.keys(pattern);
      if (keys.length > 0) {
        await this.redisClient.del(keys);
      }
    } catch (error) {
      console.error('Redis cache invalidation error:', error);
    }
  }
}

const cache = new CacheManager();

// Usage in services
class RoomService {
  async getRoomMembers(roomId) {
    const cacheKey = `room:${roomId}:members`;
    
    // Try cache first
    let members = await cache.get(cacheKey);
    if (members) {
      return members;
    }

    // Fetch from database
    members = await db
      .select({
        id: users.id,
        username: users.username,
        role: roomMembers.role,
        joinedAt: roomMembers.joinedAt
      })
      .from(roomMembers)
      .innerJoin(users, eq(roomMembers.userId, users.id))
      .where(eq(roomMembers.roomId, roomId));

    // Cache for 10 minutes
    await cache.set(cacheKey, members, 600);
    return members;
  }

  async addMemberToRoom(roomId, userId) {
    // Add member to database
    await db.insert(roomMembers).values({
      roomId,
      userId,
      joinedAt: new Date()
    });

    // Invalidate cache
    await cache.invalidate(`room:${roomId}:*`);
  }
}
```

## 3. Event-Driven Architecture

### Event Emitter Patterns
```javascript
const EventEmitter = require('events');

// ✅ Custom event emitter for business logic
class ChatEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.setupListeners();
  }

  setupListeners() {
    this.on('message:sent', this.handleMessageSent.bind(this));
    this.on('user:joined', this.handleUserJoined.bind(this));
    this.on('room:created', this.handleRoomCreated.bind(this));
    this.on('error', this.handleError.bind(this));
  }

  async handleMessageSent(data) {
    const { message, roomId, userId } = data;
    
    try {
      // Update room activity
      await this.updateRoomActivity(roomId);
      
      // Send push notifications
      await this.sendPushNotifications(roomId, message, userId);
      
      // Update user statistics
      await this.updateUserStats(userId);
      
      // Emit to WebSocket clients
      this.emit('websocket:broadcast', {
        room: roomId,
        event: 'new-message',
        data: message
      });
    } catch (error) {
      this.emit('error', error);
    }
  }

  async handleUserJoined(data) {
    const { roomId, userId, username } = data;
    
    try {
      // Log activity
      await this.logUserActivity(userId, 'joined_room', { roomId });
      
      // Welcome message
      await this.sendSystemMessage(roomId, `${username} joined the room`);
      
      // Update room member count
      await this.updateRoomMemberCount(roomId);
    } catch (error) {
      this.emit('error', error);
    }
  }

  async handleError(error) {
    console.error('Chat system error:', error);
    
    // Log to monitoring system
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
      // e.g., Sentry, LogRocket, etc.
    }
  }
}

const chatEvents = new ChatEventEmitter();

// Usage in services
class ChatService {
  async sendMessage(messageData) {
    try {
      const message = await db.insert(chatMessages)
        .values(messageData)
        .returning();

      // Emit event instead of handling side effects directly
      chatEvents.emit('message:sent', {
        message: message[0],
        roomId: messageData.roomId,
        userId: messageData.userId
      });

      return message[0];
    } catch (error) {
      chatEvents.emit('error', error);
      throw error;
    }
  }
}
```

### Queue Processing
```javascript
const Bull = require('bull');

// ✅ Job queue for background processing
class JobProcessor {
  constructor() {
    this.emailQueue = new Bull('email processing', process.env.REDIS_URL);
    this.notificationQueue = new Bull('notifications', process.env.REDIS_URL);
    this.analyticsQueue = new Bull('analytics', process.env.REDIS_URL);

    this.setupProcessors();
  }

  setupProcessors() {
    // Email processing
    this.emailQueue.process('contact-form', 5, this.processContactEmail.bind(this));
    this.emailQueue.process('demo-request', 3, this.processDemoEmail.bind(this));

    // Notification processing
    this.notificationQueue.process('push-notification', 10, this.processPushNotification.bind(this));
    
    // Analytics processing
    this.analyticsQueue.process('user-activity', 20, this.processUserActivity.bind(this));
  }

  async processContactEmail(job) {
    const { submission } = job.data;
    
    try {
      // Send confirmation email to user
      await emailService.sendContactConfirmation(submission.email, submission);
      
      // Send notification to admin
      await emailService.sendNewContactNotification(submission);
      
      return { success: true, submissionId: submission.id };
    } catch (error) {
      console.error('Email processing error:', error);
      throw error; // Job will be retried
    }
  }

  async processPushNotification(job) {
    const { userId, title, body, data } = job.data;
    
    try {
      const userDevices = await storage.getUserDevices(userId);
      
      for (const device of userDevices) {
        await pushService.sendNotification(device.token, {
          title,
          body,
          data
        });
      }
      
      return { success: true, devicesSent: userDevices.length };
    } catch (error) {
      console.error('Push notification error:', error);
      throw error;
    }
  }

  // Queue management methods
  async queueContactFormProcessing(submission) {
    await this.emailQueue.add('contact-form', { submission }, {
      attempts: 3,
      backoff: 'exponential',
      delay: 5000 // 5 second delay
    });
  }

  async queuePushNotification(userId, notification) {
    await this.notificationQueue.add('push-notification', {
      userId,
      ...notification
    }, {
      attempts: 2,
      backoff: 'fixed',
      delay: 1000
    });
  }
}

const jobProcessor = new JobProcessor();
```

## 4. Error Handling & Monitoring

### Structured Logging
```javascript
const winston = require('winston');

// ✅ Structured logging configuration
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'strive-backend',
    environment: process.env.NODE_ENV
  },
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      maxsize: 10485760, // 10MB
      maxFiles: 5
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log',
      maxsize: 10485760,
      maxFiles: 10
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// ✅ Usage in application
class ChatService {
  async sendMessage(messageData) {
    const correlationId = generateCorrelationId();
    
    logger.info('Processing message send request', {
      correlationId,
      userId: messageData.userId,
      roomId: messageData.roomId,
      messageLength: messageData.content.length
    });

    try {
      const message = await this.createMessage(messageData);
      
      logger.info('Message sent successfully', {
        correlationId,
        messageId: message.id,
        processingTime: Date.now() - startTime
      });
      
      return message;
    } catch (error) {
      logger.error('Failed to send message', {
        correlationId,
        error: error.message,
        stack: error.stack,
        userId: messageData.userId,
        roomId: messageData.roomId
      });
      
      throw error;
    }
  }
}
```

### Health Checks & Monitoring
```javascript
// ✅ Health check endpoints
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version,
    checks: {}
  };

  try {
    // Database health check
    const dbStart = Date.now();
    await db.select().from(users).limit(1);
    health.checks.database = {
      status: 'healthy',
      responseTime: Date.now() - dbStart
    };
  } catch (error) {
    health.status = 'unhealthy';
    health.checks.database = {
      status: 'unhealthy',
      error: error.message
    };
  }

  try {
    // Redis health check
    const redisStart = Date.now();
    await cache.redisClient.ping();
    health.checks.redis = {
      status: 'healthy',
      responseTime: Date.now() - redisStart
    };
  } catch (error) {
    health.checks.redis = {
      status: 'unhealthy',
      error: error.message
    };
  }

  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});

// ✅ Metrics collection
const promClient = require('prom-client');

const httpDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status']
});

const httpRequests = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

// Metrics middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const labels = {
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode
    };
    
    httpDuration.observe(labels, duration);
    httpRequests.inc(labels);
  });
  
  next();
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(promClient.register.metrics());
});
```

## 5. Performance Testing & Optimization

### Load Testing Patterns
```javascript
// ✅ Performance testing with autocannon
const autocannon = require('autocannon');

async function loadTestChatAPI() {
  const instance = autocannon({
    url: 'http://localhost:5000',
    connections: 100,
    pipelining: 1,
    duration: 30,
    headers: {
      'content-type': 'application/json',
      'cookie': 'session=test-session-id'
    },
    requests: [
      {
        method: 'GET',
        path: '/api/chat/rooms'
      },
      {
        method: 'POST',
        path: '/api/chat/rooms/test-room-id/messages',
        body: JSON.stringify({
          content: 'Test message for load testing'
        })
      }
    ]
  });

  instance.on('done', (result) => {
    console.log('Load test results:', result);
    console.log('Requests per second:', result.requests.average);
    console.log('Latency average:', result.latency.average);
    console.log('Throughput:', result.throughput.average);
  });

  return instance;
}

// ✅ Database query optimization
class OptimizedChatService {
  // Use indexes and proper query structure
  async getMessagesWithUsers(roomId, limit = 50, cursor = null) {
    let query = db
      .select({
        id: chatMessages.id,
        content: chatMessages.content,
        createdAt: chatMessages.createdAt,
        user: {
          id: users.id,
          username: users.username
        }
      })
      .from(chatMessages)
      .innerJoin(users, eq(chatMessages.userId, users.id))
      .where(eq(chatMessages.roomId, roomId))
      .orderBy(desc(chatMessages.createdAt))
      .limit(limit);

    // Cursor-based pagination for better performance
    if (cursor) {
      query = query.where(
        lt(chatMessages.createdAt, new Date(cursor))
      );
    }

    return await query;
  }

  // Batch operations for efficiency
  async markMultipleMessagesAsRead(messageIds, userId) {
    if (messageIds.length === 0) return;

    // Use batch update with single query
    return await db
      .update(messageReads)
      .set({ readAt: new Date() })
      .where(
        and(
          sql`${messageReads.messageId} = ANY(${messageIds})`,
          eq(messageReads.userId, userId)
        )
      );
  }
}
```

This comprehensive Node.js optimization guide provides the patterns and practices needed for building high-performance, scalable backend services for the chat functionality and overall application architecture.