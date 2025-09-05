# Security Checklist and Best Practices

## Overview
Comprehensive security guidelines for the Strive Tech website, covering frontend security, backend protection, environment security, and deployment best practices.

## Frontend Security

### Content Security Policy (CSP)
```typescript
// server/security/csp.ts
import helmet from 'helmet'

export const cspConfig = helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'",
      "'unsafe-inline'", // Only for development
      "https://cdn.jsdelivr.net",
      process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : null,
    ].filter(Boolean),
    styleSrc: [
      "'self'",
      "'unsafe-inline'", // Required for CSS-in-JS
      "https://fonts.googleapis.com",
    ],
    fontSrc: [
      "'self'",
      "https://fonts.gstatic.com",
      "data:",
    ],
    imgSrc: [
      "'self'",
      "data:",
      "https:",
      "blob:",
    ],
    connectSrc: [
      "'self'",
      process.env.NODE_ENV === 'development' ? 'ws://localhost:*' : null,
      process.env.NODE_ENV === 'development' ? 'http://localhost:*' : null,
    ].filter(Boolean),
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"],
    upgradeInsecureRequests: process.env.NODE_ENV === 'production',
  },
})

// Additional security headers
export const securityHeaders = {
  contentSecurityPolicy: cspConfig,
  crossOriginEmbedderPolicy: false, // Disable if using third-party embeds
  crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: false,
  referrerPolicy: { policy: 'no-referrer-when-downgrade' },
  xssFilter: true,
}
```

### Input Sanitization and Validation
```typescript
// client/src/lib/security/sanitization.ts
import DOMPurify from 'dompurify'

// HTML sanitization
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'title'],
    ALLOW_DATA_ATTR: false,
  })
}

// URL validation
export function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

// Input validation schemas
import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  email: z.string()
    .email('Invalid email address')
    .max(254, 'Email too long'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  
  company: z.string()
    .max(100, 'Company name too long')
    .optional(),
})

// Secure form component
export function SecureForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate input
    try {
      const validData = contactFormSchema.parse(formData)
      
      // Sanitize before sending
      const sanitizedData = {
        name: sanitizeHtml(validData.name),
        email: validData.email.toLowerCase(),
        message: sanitizeHtml(validData.message),
      }
      
      await submitForm(sanitizedData)
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Form fields with validation */}
    </form>
  )
}
```

### XSS Prevention
```typescript
// client/src/lib/security/xss-prevention.ts

// Safe innerHTML replacement
export function safeSetInnerHTML(element: HTMLElement, content: string): void {
  // Use textContent instead of innerHTML when possible
  element.textContent = content
}

// Safe dynamic content rendering
export function SafeHtml({ content }: { content: string }) {
  const sanitizedContent = useMemo(
    () => DOMPurify.sanitize(content),
    [content]
  )
  
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  )
}

// URL parameter sanitization
export function sanitizeUrlParams(params: URLSearchParams): Record<string, string> {
  const sanitized: Record<string, string> = {}
  
  params.forEach((value, key) => {
    // Sanitize key and value
    const cleanKey = key.replace(/[^a-zA-Z0-9_-]/g, '')
    const cleanValue = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] })
    
    if (cleanKey && cleanValue) {
      sanitized[cleanKey] = cleanValue
    }
  })
  
  return sanitized
}
```

## Backend Security

### Express Security Configuration
```typescript
// server/security/middleware.ts
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import cors from 'cors'

// Rate limiting
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP',
    retryAfter: '15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// API-specific rate limiting
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  skip: (req) => req.ip === '127.0.0.1', // Skip localhost in development
})

// Contact form rate limiting (stricter)
export const contactRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Maximum 5 contact form submissions per hour
  message: {
    error: 'Too many contact form submissions',
    retryAfter: '1 hour',
  },
})

// CORS configuration
export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://your-replit-domain.replit.dev',
      process.env.FRONTEND_URL,
    ].filter(Boolean)
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}

// Security middleware setup
export function setupSecurity(app: express.Application): void {
  // Helmet for security headers
  app.use(helmet(securityHeaders))
  
  // CORS
  app.use(cors(corsOptions))
  
  // Rate limiting
  app.use('/api/', apiRateLimiter)
  app.use('/api/contact', contactRateLimiter)
  app.use(rateLimiter)
  
  // Request size limiting
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true, limit: '10mb' }))
  
  // Remove X-Powered-By header
  app.disable('x-powered-by')
  
  // Prevent HTTP Parameter Pollution
  app.use((req, res, next) => {
    // Convert single values to arrays if needed
    for (const key in req.query) {
      if (Array.isArray(req.query[key]) && (req.query[key] as string[]).length > 5) {
        return res.status(400).json({ error: 'Too many values for parameter: ' + key })
      }
    }
    next()
  })
}
```

### Input Validation and Sanitization
```typescript
// server/validation/schemas.ts
import { z } from 'zod'
import { Request, Response, NextFunction } from 'express'

// Contact form validation
export const contactFormSchema = z.object({
  body: z.object({
    name: z.string()
      .min(2, 'Name too short')
      .max(100, 'Name too long')
      .regex(/^[a-zA-Z\s'-]+$/, 'Invalid name format'),
    
    email: z.string()
      .email('Invalid email')
      .max(254, 'Email too long'),
    
    company: z.string()
      .max(100, 'Company name too long')
      .optional()
      .transform(val => val?.trim()),
    
    message: z.string()
      .min(10, 'Message too short')
      .max(2000, 'Message too long')
      .transform(val => val.trim()),
    
    // Honeypot field for spam prevention
    website: z.string().max(0, 'Spam detected').optional(),
  }),
})

// Validation middleware
export function validateSchema<T extends z.ZodSchema>(schema: T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        })
      }
      next(error)
    }
  }
}

// SQL Injection prevention (using Drizzle ORM)
import { db } from '@shared/db'
import { users } from '@shared/schema'
import { eq } from 'drizzle-orm'

// Safe database query example
export async function getUserByEmail(email: string) {
  // Drizzle ORM automatically prevents SQL injection
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
  
  return user[0]
}
```

### Authentication and Session Security
```typescript
// server/auth/session.ts
import session from 'express-session'
import ConnectPgSimple from 'connect-pg-simple'
import { randomBytes } from 'crypto'

const PgSession = ConnectPgSimple(session)

export const sessionConfig: session.SessionOptions = {
  store: new PgSession({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    // Table cleanup
    pruneSessionInterval: 60 * 15, // 15 minutes
  }),
  secret: process.env.SESSION_SECRET || generateSecureSecret(),
  name: 'sid', // Don't use default name
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'strict', // CSRF protection
  },
  genid: () => randomBytes(16).toString('hex'),
}

function generateSecureSecret(): string {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_SECRET must be set in production')
  }
  return randomBytes(64).toString('hex')
}

// Password hashing
import bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
```

## Environment Security

### Environment Variable Management
```bash
#!/bin/bash
# scripts/check-env-security.sh

echo "🔒 Checking environment security..."

# Check for required production environment variables
REQUIRED_VARS=(
  "NODE_ENV"
  "DATABASE_URL"
  "SESSION_SECRET"
)

missing_vars=()

for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    missing_vars+=("$var")
  fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
  echo "❌ Missing required environment variables:"
  printf ' - %s\n' "${missing_vars[@]}"
  exit 1
fi

# Check for weak session secret
if [ ${#SESSION_SECRET} -lt 32 ]; then
  echo "⚠️  SESSION_SECRET is too short (minimum 32 characters)"
fi

# Check NODE_ENV
if [ "$NODE_ENV" != "production" ] && [ "$NODE_ENV" != "development" ]; then
  echo "⚠️  NODE_ENV should be 'production' or 'development'"
fi

echo "✅ Environment security check passed"
```

### Secrets Management
```typescript
// server/config/secrets.ts
interface SecretsConfig {
  databaseUrl: string
  sessionSecret: string
  apiKeys: {
    stripe?: string
    sendgrid?: string
  }
}

export function validateSecrets(): SecretsConfig {
  const config: SecretsConfig = {
    databaseUrl: process.env.DATABASE_URL || '',
    sessionSecret: process.env.SESSION_SECRET || '',
    apiKeys: {
      stripe: process.env.STRIPE_SECRET_KEY,
      sendgrid: process.env.SENDGRID_API_KEY,
    },
  }
  
  // Validate required secrets
  if (!config.databaseUrl) {
    throw new Error('DATABASE_URL is required')
  }
  
  if (!config.sessionSecret) {
    throw new Error('SESSION_SECRET is required')
  }
  
  if (config.sessionSecret.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters')
  }
  
  return config
}

// Prevent secrets from being logged
export function sanitizeForLogging(obj: any): any {
  const sanitized = { ...obj }
  const sensitiveKeys = ['password', 'secret', 'key', 'token', 'auth']
  
  for (const [key, value] of Object.entries(sanitized)) {
    if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
      sanitized[key] = '[REDACTED]'
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeForLogging(value)
    }
  }
  
  return sanitized
}
```

## Deployment Security

### Replit Security Configuration
```bash
# .replit security settings
[env]
NODE_ENV="production"
TRUST_PROXY="true"

# Hide sensitive files
hidden = [
  ".env",
  ".env.local", 
  ".env.production",
  "node_modules/.cache",
  "*.log",
  "*.key",
  "*.pem"
]

# Disable file editing in production
[deployment]
ignoreDotfiles = true
publicDir = "dist/public"
```

### Production Security Checklist
```typescript
// scripts/security-audit.ts
interface SecurityCheck {
  name: string
  check: () => boolean | Promise<boolean>
  critical: boolean
}

const securityChecks: SecurityCheck[] = [
  {
    name: 'Environment variables set',
    check: () => !!process.env.DATABASE_URL && !!process.env.SESSION_SECRET,
    critical: true,
  },
  {
    name: 'HTTPS in production',
    check: () => process.env.NODE_ENV !== 'production' || process.env.HTTPS === 'true',
    critical: true,
  },
  {
    name: 'Debug mode disabled',
    check: () => process.env.NODE_ENV === 'production' ? process.env.DEBUG !== 'true' : true,
    critical: true,
  },
  {
    name: 'Session secret length',
    check: () => (process.env.SESSION_SECRET?.length || 0) >= 32,
    critical: true,
  },
  {
    name: 'Rate limiting enabled',
    check: () => process.env.RATE_LIMIT_DISABLED !== 'true',
    critical: false,
  },
]

export async function runSecurityAudit(): Promise<void> {
  console.log('🔍 Running security audit...')
  
  let criticalFailures = 0
  let warnings = 0
  
  for (const check of securityChecks) {
    try {
      const passed = await check.check()
      
      if (passed) {
        console.log(`✅ ${check.name}`)
      } else {
        if (check.critical) {
          console.error(`❌ ${check.name} (CRITICAL)`)
          criticalFailures++
        } else {
          console.warn(`⚠️  ${check.name}`)
          warnings++
        }
      }
    } catch (error) {
      console.error(`💥 ${check.name} failed with error:`, error)
      if (check.critical) criticalFailures++
    }
  }
  
  console.log(`\n📊 Security audit results:`)
  console.log(`   Critical failures: ${criticalFailures}`)
  console.log(`   Warnings: ${warnings}`)
  
  if (criticalFailures > 0) {
    console.error('❌ Security audit failed - fix critical issues before deploying')
    process.exit(1)
  } else {
    console.log('✅ Security audit passed')
  }
}
```

## Error Handling and Logging

### Secure Error Handling
```typescript
// server/middleware/error-handler.ts
import { Request, Response, NextFunction } from 'express'

interface ApiError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Log error details (sanitized)
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  })
  
  // Don't leak error details in production
  const statusCode = err.statusCode || 500
  const message = process.env.NODE_ENV === 'production' 
    ? 'An error occurred'
    : err.message
  
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

// Operational errors (safe to show to users)
export class OperationalError extends Error {
  public readonly statusCode: number
  public readonly isOperational = true
  
  constructor(message: string, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
    
    Error.captureStackTrace(this, this.constructor)
  }
}
```

### Security Monitoring
```typescript
// server/monitoring/security-events.ts
interface SecurityEvent {
  type: 'rate_limit' | 'validation_error' | 'auth_failure' | 'suspicious_activity'
  ip: string
  userAgent: string
  timestamp: Date
  details: Record<string, any>
}

class SecurityMonitor {
  private events: SecurityEvent[] = []
  
  logEvent(event: Omit<SecurityEvent, 'timestamp'>): void {
    const securityEvent: SecurityEvent = {
      ...event,
      timestamp: new Date(),
    }
    
    this.events.push(securityEvent)
    
    // Alert on suspicious patterns
    this.checkForSuspiciousActivity(event.ip)
    
    // Log to external monitoring service
    this.sendToMonitoring(securityEvent)
  }
  
  private checkForSuspiciousActivity(ip: string): void {
    const recentEvents = this.events.filter(
      e => e.ip === ip && 
      e.timestamp > new Date(Date.now() - 60 * 1000) // Last minute
    )
    
    if (recentEvents.length > 10) {
      console.warn(`🚨 Suspicious activity from IP: ${ip}`)
      // Could trigger additional security measures
    }
  }
  
  private sendToMonitoring(event: SecurityEvent): void {
    // Send to monitoring service like Sentry, LogRocket, etc.
    if (process.env.MONITORING_ENDPOINT) {
      fetch(process.env.MONITORING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      }).catch(console.error)
    }
  }
}

export const securityMonitor = new SecurityMonitor()
```

This comprehensive security checklist covers all aspects of application security, from frontend protection to backend hardening and deployment security practices.