import winston from 'winston';

// Create logger configuration based on environment
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// Define log levels and colors
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

// Add colors to winston
winston.addColors(logColors);

// Create custom format for development
const developmentFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    if (stack) {
      return `[${timestamp}] ${level}: ${message}\n${stack}`;
    }
    return `[${timestamp}] ${level}: ${message}`;
  })
);

// Create custom format for production
const productionFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Create transports array
const transports: winston.transport[] = [];

if (isDevelopment) {
  // In development, log to console with colors
  transports.push(
    new winston.transports.Console({
      level: 'debug',
      format: developmentFormat,
    })
  );
} else {
  // In production, log to console without colors (for Docker/cloud logging)
  transports.push(
    new winston.transports.Console({
      level: 'info',
      format: productionFormat,
    })
  );
  
  // Add file logging for production if desired
  if (process.env.ENABLE_FILE_LOGGING === 'true') {
    transports.push(
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: productionFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
      new winston.transports.File({
        filename: 'logs/combined.log',
        level: 'info',
        format: productionFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      })
    );
  }
}

// Create the logger instance
export const logger = winston.createLogger({
  levels: logLevels,
  level: isProduction ? 'info' : 'debug',
  format: isProduction ? productionFormat : developmentFormat,
  transports,
  // Don't exit on handled exceptions
  exitOnError: false,
});

// Create convenience methods for different log levels
export const log = {
  error: (message: string, meta?: any) => {
    if (meta) {
      logger.error(message, { meta });
    } else {
      logger.error(message);
    }
  },
  
  warn: (message: string, meta?: any) => {
    if (meta) {
      logger.warn(message, { meta });
    } else {
      logger.warn(message);
    }
  },
  
  info: (message: string, meta?: any) => {
    if (meta) {
      logger.info(message, { meta });
    } else {
      logger.info(message);
    }
  },
  
  debug: (message: string, meta?: any) => {
    if (meta) {
      logger.debug(message, { meta });
    } else {
      logger.debug(message);
    }
  },

  // Special methods for common use cases
  apiRequest: (method: string, url: string, meta?: any) => {
    logger.info(`API ${method} ${url}`, { meta, type: 'api_request' });
  },

  apiResponse: (method: string, url: string, statusCode: number, responseTime?: number) => {
    const level = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    logger[level](`API ${method} ${url} - ${statusCode}`, { 
      statusCode, 
      responseTime: responseTime ? `${responseTime}ms` : undefined,
      type: 'api_response' 
    });
  },

  database: (operation: string, meta?: any) => {
    logger.info(`Database: ${operation}`, { meta, type: 'database' });
  },

  email: (operation: string, success: boolean, meta?: any) => {
    const level = success ? 'info' : 'warn';
    logger[level](`Email: ${operation}`, { success, meta, type: 'email' });
  },

  auth: (operation: string, username?: string, meta?: any) => {
    logger.info(`Auth: ${operation}`, { username, meta, type: 'auth' });
  }
};

// Export the winston logger instance for advanced use
export { logger as winston };

// Handle uncaught exceptions and unhandled rejections in production
if (isProduction) {
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', { promise, reason });
  });
}