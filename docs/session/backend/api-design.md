# API Design Patterns & Validation Guide

## Overview
Comprehensive API design patterns, validation strategies, and response formatting standards using Express Validator for Session 2 implementation.

## 1. RESTful API Design Patterns

### Resource-Based URL Structure
```javascript
// Chat API endpoints
GET    /api/chat/rooms                    // List chat rooms
POST   /api/chat/rooms                    // Create chat room
GET    /api/chat/rooms/:roomId            // Get specific room
PUT    /api/chat/rooms/:roomId            // Update room
DELETE /api/chat/rooms/:roomId            // Delete room

GET    /api/chat/rooms/:roomId/messages   // Get room messages
POST   /api/chat/rooms/:roomId/messages   // Send message
PUT    /api/chat/messages/:messageId      // Edit message
DELETE /api/chat/messages/:messageId      // Delete message

POST   /api/chat/rooms/:roomId/join       // Join room
POST   /api/chat/rooms/:roomId/leave      // Leave room
GET    /api/chat/rooms/:roomId/members    // Get room members

// Form submission endpoints
POST   /api/forms/contact                 // Submit contact form
POST   /api/forms/demo-request            // Submit demo request
GET    /api/forms/submissions             // Get submissions (admin)
PUT    /api/forms/submissions/:id         // Update submission status

// User management
GET    /api/users/profile                 // Get current user profile
PUT    /api/users/profile                 // Update profile
GET    /api/users/:userId                 // Get user by ID
```

### HTTP Status Code Standards
```javascript
// Success responses
200 OK          // Successful GET, PUT, PATCH
201 Created     // Successful POST
204 No Content  // Successful DELETE, or PUT without response body

// Client error responses  
400 Bad Request     // Invalid request data
401 Unauthorized    // Authentication required
403 Forbidden       // Insufficient permissions
404 Not Found       // Resource doesn't exist
409 Conflict        // Resource already exists
422 Unprocessable   // Validation errors
429 Too Many Requests // Rate limit exceeded

// Server error responses
500 Internal Server Error // General server error
503 Service Unavailable   // Temporary server issue
```

## 2. Express Validator Patterns

### Basic Validation Setup
```javascript
const { body, param, query, validationResult } = require('express-validator');

// Validation middleware factory
const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg,
          value: err.value
        }))
      });
    }

    next();
  };
};
```

### Chat Message Validation
```javascript
// Chat room creation validation
const createRoomValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Room name must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('isPrivate')
    .optional()
    .isBoolean()
    .withMessage('isPrivate must be a boolean'),
  body('maxMembers')
    .optional()
    .isInt({ min: 2, max: 1000 })
    .withMessage('Maximum members must be between 2 and 1000')
];

// Message sending validation
const sendMessageValidation = [
  param('roomId')
    .isUUID()
    .withMessage('Invalid room ID format'),
  body('content')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message must be between 1 and 2000 characters'),
  body('parentId')
    .optional()
    .isUUID()
    .withMessage('Invalid parent message ID format'),
  body('messageType')
    .optional()
    .isIn(['text', 'image', 'file', 'system'])
    .withMessage('Invalid message type')
];

// Usage in routes
app.post('/api/chat/rooms', 
  validate(createRoomValidation),
  chatController.createRoom
);

app.post('/api/chat/rooms/:roomId/messages',
  validate(sendMessageValidation),
  chatController.sendMessage
);
```

### Form Validation Patterns
```javascript
// Contact form validation
const contactFormValidation = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-Z\s-']+$/)
    .withMessage('First name must contain only letters, spaces, hyphens, and apostrophes'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-Z\s-']+$/)
    .withMessage('Last name must contain only letters, spaces, hyphens, and apostrophes'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('company')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  body('phone')
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Please provide a valid phone number'),
  body('companySize')
    .optional()
    .isIn(['1-10', '11-50', '51-200', '201-500', '500+'])
    .withMessage('Invalid company size option'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  body('privacyConsent')
    .isBoolean()
    .equals('true')
    .withMessage('Privacy consent is required')
];

// Demo request validation
const demoRequestValidation = [
  ...contactFormValidation, // Extend contact form validation
  body('preferredDate')
    .optional()
    .isISO8601()
    .custom((value) => {
      const date = new Date(value);
      const now = new Date();
      if (date <= now) {
        throw new Error('Preferred date must be in the future');
      }
      return true;
    }),
  body('preferredTime')
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Time must be in HH:MM format'),
  body('productInterest')
    .optional()
    .isArray()
    .withMessage('Product interest must be an array'),
  body('productInterest.*')
    .isIn(['analytics', 'automation', 'integration', 'custom'])
    .withMessage('Invalid product interest option'),
  body('budget')
    .optional()
    .isIn(['<10k', '10k-50k', '50k-100k', '100k+'])
    .withMessage('Invalid budget range')
];
```

### Advanced Validation Patterns
```javascript
// Custom validators
const customValidators = {
  // Validate username availability
  isUsernameAvailable: async (value) => {
    const user = await storage.getUserByUsername(value);
    if (user) {
      throw new Error('Username is already taken');
    }
    return true;
  },

  // Validate email availability
  isEmailAvailable: async (value) => {
    const user = await storage.getUserByEmail(value);
    if (user) {
      throw new Error('Email is already registered');
    }
    return true;
  },

  // Validate room access
  hasRoomAccess: async (roomId, { req }) => {
    if (!req.user) {
      throw new Error('Authentication required');
    }
    
    const hasAccess = await storage.userHasRoomAccess(req.user.id, roomId);
    if (!hasAccess) {
      throw new Error('Access denied to this room');
    }
    return true;
  },

  // Validate file upload
  isValidFileType: (value, { req }) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (req.file && !allowedTypes.includes(req.file.mimetype)) {
      throw new Error('Invalid file type');
    }
    return true;
  }
};

// Usage with custom validators
const userRegistrationValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .matches(/^[a-zA-Z0-9_-]+$/)
    .custom(customValidators.isUsernameAvailable),
  body('email')
    .isEmail()
    .normalizeEmail()
    .custom(customValidators.isEmailAvailable),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least 8 characters with uppercase, lowercase, number, and special character')
];
```

### Schema-Based Validation
```javascript
const { checkSchema } = require('express-validator');

// Comprehensive schema validation
const messageSchema = checkSchema({
  content: {
    in: ['body'],
    trim: true,
    isLength: {
      options: { min: 1, max: 2000 },
      errorMessage: 'Message must be between 1 and 2000 characters'
    },
    custom: {
      options: (value) => {
        // Check for spam patterns
        const spamPatterns = [/(.)\1{10,}/, /https?:\/\/bit\.ly/i];
        if (spamPatterns.some(pattern => pattern.test(value))) {
          throw new Error('Message contains prohibited content');
        }
        return true;
      }
    }
  },
  roomId: {
    in: ['params'],
    isUUID: {
      errorMessage: 'Invalid room ID format'
    },
    custom: {
      options: customValidators.hasRoomAccess
    }
  },
  messageType: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isIn: {
      options: [['text', 'image', 'file', 'system']],
      errorMessage: 'Invalid message type'
    }
  },
  parentId: {
    in: ['body'],
    optional: { options: { nullable: true } },
    isUUID: {
      errorMessage: 'Invalid parent message ID format'
    }
  }
});

app.post('/api/chat/rooms/:roomId/messages',
  checkSchema(messageSchema),
  validate([]), // Empty array since checkSchema handles validation
  chatController.sendMessage
);
```

## 3. Response Formatting Standards

### Consistent Response Structure
```javascript
// Response utility functions
const ApiResponse = {
  success: (data, message = 'Success', meta = null) => ({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
    ...(meta && { meta })
  }),

  error: (message, errors = null, statusCode = 400) => ({
    success: false,
    message,
    ...(errors && { errors }),
    timestamp: new Date().toISOString(),
    statusCode
  }),

  paginated: (data, pagination) => ({
    success: true,
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages: Math.ceil(pagination.total / pagination.limit),
      hasNext: pagination.page < Math.ceil(pagination.total / pagination.limit),
      hasPrev: pagination.page > 1
    },
    timestamp: new Date().toISOString()
  }),

  validation: (errors) => ({
    success: false,
    message: 'Validation failed',
    errors: errors.array().map(err => ({
      field: err.path || err.param,
      message: err.msg,
      value: err.value,
      location: err.location
    })),
    timestamp: new Date().toISOString()
  })
};

// Usage in controllers
const chatController = {
  async getMessages(req, res, next) {
    try {
      const { roomId } = req.params;
      const { page = 1, limit = 50 } = req.query;
      
      const offset = (page - 1) * limit;
      const messages = await storage.getMessages(roomId, limit, offset);
      const total = await storage.getMessageCount(roomId);
      
      res.json(ApiResponse.paginated(messages, {
        page: parseInt(page),
        limit: parseInt(limit),
        total
      }));
    } catch (error) {
      next(error);
    }
  },

  async sendMessage(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json(ApiResponse.validation(errors));
      }

      const message = await storage.createMessage({
        ...req.body,
        userId: req.user.id,
        roomId: req.params.roomId
      });

      res.status(201).json(
        ApiResponse.success(message, 'Message sent successfully')
      );
    } catch (error) {
      next(error);
    }
  }
};
```

### Error Response Patterns
```javascript
// Custom error classes
class ApiError extends Error {
  constructor(message, statusCode = 500, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = 'ApiError';
  }
}

class ValidationError extends ApiError {
  constructor(message, errors) {
    super(message, 422, errors);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends ApiError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = 'Authentication required') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Handle validation errors from express-validator
  if (err.type === 'validation') {
    return res.status(422).json(
      ApiResponse.validation(err.errors)
    );
  }

  // Handle custom API errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(
      ApiResponse.error(err.message, err.errors, err.statusCode)
    );
  }

  // Handle database errors
  if (err.code === '23505') { // PostgreSQL unique violation
    return res.status(409).json(
      ApiResponse.error('Resource already exists')
    );
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json(
      ApiResponse.error('Invalid token')
    );
  }

  // Default error response
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : err.message;
    
  res.status(500).json(
    ApiResponse.error(message, null, 500)
  );
});
```

## 4. Input Sanitization Patterns

### Data Sanitization
```javascript
const { body, sanitizeBody } = require('express-validator');
const DOMPurify = require('isomorphic-dompurify');
const xss = require('xss');

// Sanitization middleware
const sanitize = {
  // HTML content sanitization
  html: (field) => body(field).customSanitizer(value => {
    return DOMPurify.sanitize(value, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'br', 'p'],
      ALLOWED_ATTR: []
    });
  }),

  // Plain text sanitization
  text: (field) => body(field).customSanitizer(value => {
    return xss(value, {
      whiteList: {}, // No HTML allowed
      stripIgnoreTag: true,
      stripIgnoreTagBody: ['script']
    });
  }),

  // URL sanitization
  url: (field) => body(field).customSanitizer(value => {
    try {
      const url = new URL(value);
      // Only allow http/https protocols
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error('Invalid protocol');
      }
      return url.toString();
    } catch {
      return '';
    }
  }),

  // Phone number sanitization
  phone: (field) => body(field).customSanitizer(value => {
    // Remove all non-digit characters except +
    return value ? value.replace(/[^\d+]/g, '') : '';
  }),

  // Trim and normalize whitespace
  normalize: (field) => body(field).customSanitizer(value => {
    return value ? value.trim().replace(/\s+/g, ' ') : '';
  })
};

// Usage in validation chains
const messageValidation = [
  sanitize.text('content'),
  sanitize.normalize('content'),
  body('content')
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message must be between 1 and 2000 characters')
];
```

## 5. Rate Limiting & Security

### API Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');

// Create Redis client for rate limiting
const redisClient = redis.createClient(process.env.REDIS_URL);

// Different rate limits for different endpoints
const createRateLimit = (windowMs, max, message) => rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:'
  }),
  windowMs,
  max,
  message: {
    success: false,
    message,
    retryAfter: Math.ceil(windowMs / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply different limits
app.use('/api/auth', createRateLimit(15 * 60 * 1000, 5, 'Too many authentication attempts'));
app.use('/api/chat/messages', createRateLimit(60 * 1000, 30, 'Too many messages sent'));
app.use('/api/forms', createRateLimit(60 * 60 * 1000, 5, 'Too many form submissions'));
app.use('/api', createRateLimit(15 * 60 * 1000, 100, 'Too many API requests'));
```

### CORS Configuration
```javascript
const cors = require('cors');

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5000',
      process.env.CLIENT_URL
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'X-CSRF-Token'
  ],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));
```

## 6. API Documentation Patterns

### OpenAPI/Swagger Integration
```javascript
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Load OpenAPI specification
const swaggerDocument = YAML.load('./docs/api-spec.yaml');

// Serve API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Strive Tech API Documentation'
}));

// Generate API spec endpoint
app.get('/api/spec', (req, res) => {
  res.json(swaggerDocument);
});
```

### Endpoint Documentation Example
```yaml
# docs/api-spec.yaml
paths:
  /api/chat/rooms/{roomId}/messages:
    post:
      summary: Send a message to a chat room
      tags: [Chat]
      security:
        - sessionAuth: []
      parameters:
        - name: roomId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [content]
              properties:
                content:
                  type: string
                  minLength: 1
                  maxLength: 2000
                  description: The message content
                parentId:
                  type: string
                  format: uuid
                  description: ID of message being replied to
                messageType:
                  type: string
                  enum: [text, image, file, system]
                  default: text
      responses:
        201:
          description: Message sent successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ApiResponse'
        422:
          description: Validation error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ValidationError'
```

This comprehensive API design guide provides the patterns and standards needed for building robust, secure, and well-documented APIs for the chat functionality and form handling requirements.