# Backend Documentation - Session 2

## Overview
This comprehensive backend documentation provides all the patterns, examples, and best practices needed to implement chat functionality, form validation, and API development for Session 2 tasks. All documentation has been gathered from authoritative sources and organized for immediate use by execution agents.

## Documentation Structure

### 📁 [Express Patterns](./express-patterns.md)
**Complete Express.js implementation patterns for Session 2**

**Key Topics Covered:**
- Global and route-specific middleware setup
- Chat API endpoint patterns with Socket.IO integration
- Error handling middleware and 404 handlers
- Real-time WebSocket authentication and room management
- Advanced middleware patterns (context, rate limiting, async handlers)
- Modular route organization and controller patterns
- WebSocket message broadcasting and event handling

**Essential Code Examples:**
- Authenticated chat message endpoints
- Room creation and management
- Socket.IO server setup with Express integration
- Middleware chains for validation and authentication
- Response formatting and error handling

### 📁 [Database Guide](./database-guide.md) 
**PostgreSQL and Drizzle ORM patterns for chat and form data**

**Key Topics Covered:**
- Complete chat schema design (rooms, messages, members, reactions)
- Enhanced form submission schemas with demo requests
- Advanced query patterns with joins and pagination
- Transaction patterns for atomic operations
- Performance optimization with indexing
- Data validation and sanitization at database level
- Migration patterns and SQL examples

**Essential Code Examples:**
- Chat message storage with user relationships
- Room membership management
- Form submission with notification transactions
- Batch operations and streaming queries
- Message search with full-text indexing

### 📁 [Authentication Guide](./authentication.md)
**Session management, security, and user authentication**

**Key Topics Covered:**
- Express session configuration with PostgreSQL storage
- User login/logout with session regeneration
- Registration with password validation and email verification
- Authentication middleware for different permission levels
- WebSocket authentication with session integration
- Password reset flows and security best practices
- CSRF protection and security headers

**Essential Code Examples:**
- Session-based authentication with bcrypt
- Role-based access control middleware
- Socket.IO authentication integration
- Rate limiting for auth endpoints
- Secure session configuration for production

### 📁 [API Design Guide](./api-design.md)
**RESTful APIs, validation, and response formatting**

**Key Topics Covered:**
- RESTful endpoint design patterns
- Express Validator implementation with custom validators
- Schema-based validation for complex forms
- Consistent response formatting standards
- Input sanitization and XSS protection
- Rate limiting and CORS configuration
- API documentation with OpenAPI/Swagger

**Essential Code Examples:**
- Chat API validation chains
- Contact form validation with custom rules
- Response utility functions for consistency
- Error handling with proper HTTP status codes
- Sanitization patterns for user input

### 📁 [Node.js Optimization](./node-optimization.md)
**Performance patterns and scalability best practices**

**Key Topics Covered:**
- Async/await best practices with proper error handling
- Memory management and connection pooling
- Multi-level caching strategies (in-memory + Redis)
- Event-driven architecture with EventEmitter
- Background job processing with queues
- Structured logging and monitoring
- Performance testing and database optimization

**Essential Code Examples:**
- Concurrent operation patterns
- Batch processing for high-volume operations
- Cache management with invalidation strategies
- Health check endpoints with metrics
- Load testing setup and optimization techniques

## Quick Reference

### 🚀 Essential Imports for Session 2
```javascript
// Core Express setup
const express = require('express');
const session = require('express-session');
const { body, param, query, validationResult } = require('express-validator');

// Database and ORM
const { drizzle } = require('drizzle-orm/node-postgres');
const { eq, and, or, desc, sql } = require('drizzle-orm');

// Authentication and security
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// WebSocket integration
const { Server } = require('socket.io');
const { createServer } = require('http');
```

### 🗄️ Database Schema Extensions Needed
```typescript
// Add to shared/schema.ts for chat functionality
export const chatRooms = pgTable("chat_rooms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  isPrivate: boolean("is_private").notNull().default(false),
  ownerId: varchar("owner_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  content: text("content").notNull(),
  roomId: varchar("room_id").notNull().references(() => chatRooms.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const roomMembers = pgTable("room_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  roomId: varchar("room_id").notNull().references(() => chatRooms.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});
```

### 🔧 Essential Middleware Stack
```javascript
// Security and session setup
app.set('trust proxy', 1);
app.use(helmet());
app.use(session(sessionConfig));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rate limiting
app.use('/api/auth', authRateLimit);
app.use('/api/chat/messages', chatRateLimit);

// CORS
app.use(cors(corsOptions));

// Global error handler (must be last)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ success: false, message });
});
```

### 📝 API Response Pattern
```javascript
// Consistent response format
const ApiResponse = {
  success: (data, message = 'Success') => ({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  }),
  error: (message, errors = null) => ({
    success: false,
    message,
    ...(errors && { errors }),
    timestamp: new Date().toISOString()
  })
};

// Usage in controllers
res.json(ApiResponse.success(data, 'Operation completed successfully'));
res.status(400).json(ApiResponse.error('Validation failed', validationErrors));
```

## Implementation Priority

### Phase 1: Foundation (High Priority)
1. **Express setup** with security middleware and session configuration
2. **Database schema** extensions for chat functionality  
3. **Authentication middleware** for protecting chat endpoints
4. **Basic validation** patterns for forms and chat messages

### Phase 2: Core Features (Medium Priority)
1. **Chat API endpoints** with WebSocket integration
2. **Form submission** handling with enhanced validation
3. **Real-time messaging** with Socket.IO
4. **Error handling** and response formatting

### Phase 3: Optimization (Lower Priority)
1. **Performance optimization** with caching and connection pooling
2. **Advanced monitoring** and health checks
3. **Background job processing** for emails and notifications
4. **Load testing** and performance tuning

## Integration Points

### Existing Codebase Integration
- **Extend `server/routes.ts`** with new chat and enhanced form endpoints
- **Update `shared/schema.ts`** with chat table definitions
- **Enhance `server/auth.ts`** with WebSocket authentication
- **Add to `server/storage.ts`** chat-specific database operations

### Frontend Integration Points
- **WebSocket client setup** for real-time chat updates
- **Form validation** matching backend validation rules
- **Authentication state** management with session handling
- **API client** functions for chat and form operations

## Security Considerations

### Session Security
- PostgreSQL session storage for persistence
- Session regeneration on login/logout
- Secure cookie configuration for production
- CSRF protection for state-changing operations

### Input Validation
- Server-side validation with Express Validator
- Input sanitization to prevent XSS attacks
- Rate limiting to prevent abuse
- File upload validation and restrictions

### WebSocket Security
- Session-based authentication for Socket.IO connections
- Room access validation before joining
- Message content filtering and rate limiting
- Connection state management and cleanup

This documentation provides everything needed for execution agents to implement robust backend functionality without requiring additional Context7 lookups or documentation research.