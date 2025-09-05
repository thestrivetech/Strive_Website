# Authentication & Session Management Guide

## Overview
Comprehensive authentication patterns using Express Session, Passport, and security best practices for Session 2 requirements.

## 1. Express Session Configuration

### Basic Session Setup
```javascript
const session = require('express-session');
const ConnectPgSimple = require('connect-pg-simple')(session);

// Session configuration for PostgreSQL storage
const sessionConfig = {
  store: new ConnectPgSimple({
    // Use existing database connection
    conString: process.env.DATABASE_URL,
    tableName: 'user_sessions',
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  name: 'strive.sid', // Custom session name
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax' // CSRF protection
  },
  rolling: true // Reset expiration on activity
};

// Apply session middleware
app.use(session(sessionConfig));
```

### Production-Ready Session Configuration
```javascript
// Enhanced configuration for production
const createSessionConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    store: new ConnectPgSimple({
      conString: process.env.DATABASE_URL,
      tableName: 'user_sessions',
      createTableIfMissing: true,
      // Clean up expired sessions
      ttl: 24 * 60 * 60, // 24 hours in seconds
      schemaName: 'public',
      // Prune expired sessions every hour
      pruneSessionInterval: 60 * 60
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'strive.sid',
    cookie: {
      secure: isProduction,
      httpOnly: true,
      maxAge: isProduction ? 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
      sameSite: isProduction ? 'strict' : 'lax',
      domain: isProduction ? process.env.COOKIE_DOMAIN : undefined
    },
    rolling: true,
    proxy: isProduction // Trust proxy in production
  };
};

app.use(session(createSessionConfig()));
```

## 2. User Authentication Implementation

### Login Route with Session Management
```javascript
const bcrypt = require('bcrypt');
const { validationResult, body } = require('express-validator');

// Login endpoint
app.post('/api/auth/login',
  [
    body('username').trim().isLength({ min: 3 }),
    body('password').isLength({ min: 6 })
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

      const { username, password } = req.body;

      // Find user by username
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Check if user is active
      if (user.status === 'suspended') {
        return res.status(403).json({
          success: false,
          message: 'Account suspended. Please contact support.'
        });
      }

      // Regenerate session to prevent session fixation
      req.session.regenerate((err) => {
        if (err) {
          console.error('Session regeneration error:', err);
          return next(err);
        }

        // Store user info in session
        req.session.user = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role || 'user'
        };

        // Update last login timestamp
        storage.updateUserLastLogin(user.id);

        // Save session before responding
        req.session.save((err) => {
          if (err) {
            console.error('Session save error:', err);
            return next(err);
          }

          res.json({
            success: true,
            message: 'Login successful',
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role || 'user',
              lastLoginAt: new Date().toISOString()
            }
          });
        });
      });

    } catch (error) {
      next(error);
    }
  }
);
```

### Logout Implementation
```javascript
app.post('/api/auth/logout', (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: 'Not logged in'
    });
  }

  // Clear user data from session
  req.session.user = null;

  // Save session before regenerating
  req.session.save((err) => {
    if (err) {
      console.error('Session save error during logout:', err);
      return next(err);
    }

    // Regenerate session to prevent session fixation
    req.session.regenerate((err) => {
      if (err) {
        console.error('Session regeneration error during logout:', err);
        return next(err);
      }

      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    });
  });
});
```

### Registration with Validation
```javascript
app.post('/api/auth/register',
  [
    body('username')
      .trim()
      .isLength({ min: 3, max: 20 })
      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('Username can only contain letters, numbers, hyphens, and underscores'),
    body('email')
      .isEmail()
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('Password must contain at least 8 characters with uppercase, lowercase, number, and special character'),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match');
        }
        return true;
      })
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

      const { username, email, password } = req.body;

      // Check if username exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Username already exists'
        });
      }

      // Check if email exists
      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: 'Email already registered'
        });
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const user = await storage.createUser({
        username,
        email,
        password: hashedPassword,
        emailVerified: 'false',
        role: 'user',
        status: 'active',
        createdAt: new Date()
      });

      // Generate email verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      await storage.setEmailVerificationToken(user.id, verificationToken);

      // TODO: Send verification email
      console.log(`Verification token for ${email}: ${verificationToken}`);

      res.status(201).json({
        success: true,
        message: 'Account created successfully. Please check your email for verification.',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          emailVerified: user.emailVerified
        }
      });

    } catch (error) {
      next(error);
    }
  }
);
```

## 3. Authentication Middleware

### Basic Authentication Middleware
```javascript
// Middleware to check if user is authenticated
function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
      code: 'UNAUTHORIZED'
    });
  }
  next();
}

// Middleware to check specific roles
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const userRole = req.session.user.role || 'user';
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
        required: roles,
        current: userRole
      });
    }

    next();
  };
}

// Optional authentication (user may or may not be logged in)
function optionalAuth(req, res, next) {
  if (req.session && req.session.user) {
    req.user = req.session.user;
  }
  next();
}
```

### Advanced Authentication Middleware
```javascript
// Enhanced auth middleware with user loading
async function loadAuthenticatedUser(req, res, next) {
  try {
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Load fresh user data from database
    const user = await storage.getUserById(req.session.user.id);
    if (!user) {
      // User was deleted, clear session
      req.session.destroy(() => {
        res.status(401).json({
          success: false,
          message: 'User no longer exists'
        });
      });
      return;
    }

    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Account suspended'
      });
    }

    // Add user to request context
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

// Rate limiting for authentication attempts
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply to auth routes
app.use('/api/auth/login', authRateLimit);
app.use('/api/auth/register', authRateLimit);
```

## 4. Session Security Patterns

### Session Validation
```javascript
// Middleware to validate session integrity
function validateSession(req, res, next) {
  if (!req.session) {
    return next();
  }

  // Check if session has expired
  if (req.session.cookie.expires && new Date() > new Date(req.session.cookie.expires)) {
    req.session.destroy(() => {
      res.status(401).json({
        success: false,
        message: 'Session expired'
      });
    });
    return;
  }

  // Validate session data structure
  if (req.session.user) {
    const requiredFields = ['id', 'username', 'email'];
    const hasAllFields = requiredFields.every(field => 
      req.session.user[field] !== undefined
    );

    if (!hasAllFields) {
      req.session.destroy(() => {
        res.status(401).json({
          success: false,
          message: 'Invalid session data'
        });
      });
      return;
    }
  }

  next();
}
```

### CSRF Protection
```javascript
const csrf = require('csurf');

// CSRF protection configuration
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

// Apply CSRF protection to state-changing routes
app.use('/api', csrfProtection);

// Endpoint to get CSRF token
app.get('/api/auth/csrf-token', (req, res) => {
  res.json({
    success: true,
    csrfToken: req.csrfToken()
  });
});
```

### Security Headers
```javascript
const helmet = require('helmet');

// Apply security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "wss:", "ws:"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// Additional security middleware
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  next();
});
```

## 5. WebSocket Authentication

### Socket.IO Session Integration
```javascript
const { Server } = require('socket.io');
const sessionMiddleware = session(sessionConfig);

// Apply session middleware to Socket.IO
io.engine.use(sessionMiddleware);

// Socket authentication middleware
io.use((socket, next) => {
  const session = socket.request.session;
  
  if (!session || !session.user) {
    return next(new Error('Authentication required'));
  }
  
  // Attach user info to socket
  socket.userId = session.user.id;
  socket.username = session.user.username;
  
  next();
});

// Handle authenticated socket connections
io.on('connection', (socket) => {
  console.log(`User ${socket.username} connected`);
  
  // Join user-specific room
  socket.join(`user:${socket.userId}`);
  
  // Handle room joining with authentication
  socket.on('join-room', async (roomId) => {
    try {
      // Verify user has access to room
      const hasAccess = await storage.userHasRoomAccess(socket.userId, roomId);
      if (!hasAccess) {
        socket.emit('error', 'Access denied to room');
        return;
      }
      
      socket.join(roomId);
      socket.emit('joined-room', { roomId });
      
      // Notify other room members
      socket.to(roomId).emit('user-joined', {
        userId: socket.userId,
        username: socket.username
      });
    } catch (error) {
      socket.emit('error', 'Failed to join room');
    }
  });
});
```

## 6. Password Management

### Password Reset Flow
```javascript
const crypto = require('crypto');
const { body } = require('express-validator');

// Request password reset
app.post('/api/auth/forgot-password',
  [
    body('email').isEmail().normalizeEmail()
  ],
  async (req, res, next) => {
    try {
      const { email } = req.body;
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        // Don't reveal if email exists
        return res.json({
          success: true,
          message: 'If the email exists, a reset link has been sent.'
        });
      }
      
      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetExpires = new Date(Date.now() + 3600000); // 1 hour
      
      await storage.setPasswordResetToken(user.id, resetToken, resetExpires);
      
      // TODO: Send email with reset link
      console.log(`Reset token for ${email}: ${resetToken}`);
      
      res.json({
        success: true,
        message: 'If the email exists, a reset link has been sent.'
      });
      
    } catch (error) {
      next(error);
    }
  }
);

// Reset password with token
app.post('/api/auth/reset-password',
  [
    body('token').isLength({ min: 32, max: 32 }),
    body('password')
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
  ],
  async (req, res, next) => {
    try {
      const { token, password } = req.body;
      
      const user = await storage.getUserByResetToken(token);
      if (!user || user.resetTokenExpires < new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or expired reset token'
        });
      }
      
      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Update password and clear reset token
      await storage.updateUserPassword(user.id, hashedPassword);
      await storage.clearPasswordResetToken(user.id);
      
      // Invalidate all existing sessions for this user
      await storage.clearUserSessions(user.id);
      
      res.json({
        success: true,
        message: 'Password reset successfully'
      });
      
    } catch (error) {
      next(error);
    }
  }
);
```

## 7. Session Storage Schema

### PostgreSQL Session Table
```sql
-- Session storage table for connect-pg-simple
CREATE TABLE user_sessions (
  sid VARCHAR PRIMARY KEY,
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
);

-- Index for cleanup operations
CREATE INDEX user_sessions_expire_idx ON user_sessions(expire);

-- Enhanced user table with auth fields
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_reset_token VARCHAR(64);
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_reset_expires TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verification_token VARCHAR(64);
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';

-- Create indexes
CREATE INDEX IF NOT EXISTS users_reset_token_idx ON users(password_reset_token) WHERE password_reset_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS users_verification_token_idx ON users(email_verification_token) WHERE email_verification_token IS NOT NULL;
```

This comprehensive authentication guide provides secure, production-ready patterns for user authentication, session management, and security in the Strive Tech application.