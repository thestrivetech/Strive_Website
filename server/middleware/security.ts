import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Rate limiting configuration optimized for Replit
export const createRateLimiter = () => rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip rate limiting entirely in development, partial skip in production
  skip: (req: Request) => {
    if (process.env.NODE_ENV === 'development') {
      return true; // Skip all rate limiting in development
    }
    return req.url.startsWith('/assets/') || req.url.startsWith('/favicon');
  }
});

// Enhanced helmet configuration for Replit environment
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'", 
        "'unsafe-inline'", // Needed for Vite in development
        "'unsafe-eval'", // Needed for development
        "https://cdn.jsdelivr.net" // For CDN assets if needed
      ],
      styleSrc: [
        "'self'", 
        "'unsafe-inline'", // Needed for styled-components and Tailwind
        "https://fonts.googleapis.com"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com"
      ],
      imgSrc: [
        "'self'", 
        "data:", 
        "https:", // Allow external images for portfolio/solutions
        "blob:"
      ],
      connectSrc: [
        "'self'",
        "https://*.supabase.co", // Supabase API calls
        "wss://*.supabase.co", // Supabase realtime
        "https://api.github.com" // If needed for portfolio data
      ],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      ...(process.env.NODE_ENV === 'production' ? { upgradeInsecureRequests: [] } : {})
    },
  },
  // Additional security headers
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  frameguard: { action: 'deny' },
  xssFilter: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
});

// Input validation middleware factory
export const createValidationRules = (type: 'contact' | 'newsletter' | 'roi') => {
  switch (type) {
    case 'contact':
      return [
        body('name')
          .trim()
          .isLength({ min: 2, max: 100 })
          .withMessage('Name must be between 2 and 100 characters')
          .matches(/^[a-zA-Z\s\-'\.]+$/)
          .withMessage('Name contains invalid characters'),
        body('email')
          .isEmail()
          .normalizeEmail()
          .withMessage('Must be a valid email address')
          .isLength({ max: 255 })
          .withMessage('Email too long'),
        body('company')
          .optional()
          .trim()
          .isLength({ max: 200 })
          .withMessage('Company name too long'),
        body('message')
          .trim()
          .isLength({ min: 10, max: 2000 })
          .withMessage('Message must be between 10 and 2000 characters')
      ];
    
    case 'newsletter':
      return [
        body('email')
          .isEmail()
          .normalizeEmail()
          .withMessage('Must be a valid email address')
          .isLength({ max: 255 })
          .withMessage('Email too long')
      ];
    
    case 'roi':
      return [
        body('currentCosts')
          .isNumeric({ min: 0 })
          .withMessage('Current costs must be a positive number'),
        body('teamSize')
          .isInt({ min: 1, max: 10000 })
          .withMessage('Team size must be between 1 and 10,000'),
        body('industry')
          .isIn(['technology', 'healthcare', 'finance', 'retail', 'manufacturing', 'other'])
          .withMessage('Invalid industry selection')
      ];
    
    default:
      return [];
  }
};

// Validation error handler
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(error => ({
      field: error.type === 'field' ? error.path : 'unknown',
      message: error.msg
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors
    });
  }
  
  next();
};

// Security logging middleware
export const securityLogger = (req: Request, res: Response, next: NextFunction) => {
  // Log suspicious patterns
  const suspiciousPatterns = [
    /sql injection/i,
    /<script/i,
    /javascript:/i,
    /eval\(/i,
    /union.*select/i
  ];
  
  const userAgent = req.headers['user-agent'] || '';
  const requestBody = JSON.stringify(req.body);
  const queryString = JSON.stringify(req.query);
  
  const isSuspicious = suspiciousPatterns.some(pattern => 
    pattern.test(requestBody) || pattern.test(queryString) || pattern.test(userAgent)
  );
  
  if (isSuspicious) {
    console.warn(`[SECURITY] Suspicious request detected:`, {
      ip: req.ip,
      userAgent,
      path: req.path,
      method: req.method,
      timestamp: new Date().toISOString()
    });
  }
  
  next();
};

// Combined security middleware
export const applySecurity = [
  securityHeaders,
  createRateLimiter(),
  securityLogger
];

// Export individual pieces for testing
export {
  helmet,
  rateLimit,
  body,
  validationResult
};