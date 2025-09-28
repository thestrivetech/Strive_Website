/**
 * Email service configuration module
 * Handles SMTP configuration and environment variable validation
 */

export interface EmailConfigOptions {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface EmailValidationResult {
  isValid: boolean;
  missingVariables: string[];
  warnings: string[];
}

/**
 * Email configuration class responsible for managing SMTP settings
 * and validating environment variables
 */
export class EmailConfig {
  private static instance: EmailConfig;
  private config: EmailConfigOptions | null = null;

  /**
   * Get singleton instance of EmailConfig
   */
  public static getInstance(): EmailConfig {
    if (!EmailConfig.instance) {
      EmailConfig.instance = new EmailConfig();
    }
    return EmailConfig.instance;
  }

  /**
   * Initialize and validate email configuration from environment variables
   * @returns EmailConfigOptions if valid, null if invalid
   */
  public initializeConfig(): EmailConfigOptions | null {
    console.log('🔧 Initializing email service...');

    const validation = this.validateEnvironment();
    
    if (!validation.isValid) {
      console.warn('⚠️ Email service not configured. Missing required environment variables:', validation.missingVariables.join(', '));
      this.logEnvironmentStatus();
      return null;
    }

    this.config = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    };

    this.logConfigurationStatus();
    
    if (validation.warnings.length > 0) {
      console.warn('⚠️ Configuration warnings:', validation.warnings.join(', '));
    }

    return this.config;
  }

  /**
   * Get current email configuration
   * @returns Current configuration or null if not initialized
   */
  public getConfig(): EmailConfigOptions | null {
    return this.config;
  }

  /**
   * Validate all required environment variables
   * @returns Validation result with missing variables and warnings
   */
  public validateEnvironment(): EmailValidationResult {
    const missingVariables: string[] = [];
    const warnings: string[] = [];

    // Check required variables
    if (!process.env.SMTP_USER) {
      missingVariables.push('SMTP_USER');
    }

    if (!process.env.SMTP_PASS) {
      missingVariables.push('SMTP_PASS');
    }

    // Check optional variables and provide warnings
    if (!process.env.SMTP_HOST) {
      warnings.push('SMTP_HOST not set, using default: smtp.gmail.com');
    }

    if (!process.env.SMTP_PORT) {
      warnings.push('SMTP_PORT not set, using default: 587');
    }

    if (!process.env.SMTP_SECURE) {
      warnings.push('SMTP_SECURE not set, using default: false');
    }

    // Validate port number if provided
    if (process.env.SMTP_PORT) {
      const port = parseInt(process.env.SMTP_PORT);
      if (isNaN(port) || port <= 0 || port > 65535) {
        missingVariables.push('SMTP_PORT (invalid port number)');
      }
    }

    return {
      isValid: missingVariables.length === 0,
      missingVariables,
      warnings,
    };
  }

  /**
   * Check if email service is properly configured
   * @returns True if configured and ready to use
   */
  public isConfigured(): boolean {
    return this.config !== null;
  }

  /**
   * Reset configuration (useful for testing)
   */
  public resetConfig(): void {
    this.config = null;
  }

  /**
   * Log current configuration status (without exposing sensitive data)
   */
  private logConfigurationStatus(): void {
    if (!this.config) return;

    console.log(`📧 Email config: ${this.config.host}:${this.config.port} | User: ${this.config.auth.user} | Secure: ${this.config.secure}`);
    console.log(`🔑 Auth configured: User=${!!this.config.auth.user} | Pass=${!!this.config.auth.pass} (${this.config.auth.pass.length} chars)`);
  }

  /**
   * Log environment variable status for debugging
   */
  private logEnvironmentStatus(): void {
    console.log(`   SMTP_USER present: ${!!process.env.SMTP_USER}`);
    console.log(`   SMTP_PASS present: ${!!process.env.SMTP_PASS}`);
    console.log(`   SMTP_HOST present: ${!!process.env.SMTP_HOST}`);
    console.log(`   SMTP_PORT present: ${!!process.env.SMTP_PORT}`);
    console.log(`   SMTP_SECURE present: ${!!process.env.SMTP_SECURE}`);
  }
}

/**
 * Convenience function to get email configuration
 * @returns Email configuration or null if not available
 */
export function getEmailConfig(): EmailConfigOptions | null {
  return EmailConfig.getInstance().getConfig();
}

/**
 * Convenience function to initialize email configuration
 * @returns Email configuration or null if validation fails
 */
export function initializeEmailConfig(): EmailConfigOptions | null {
  return EmailConfig.getInstance().initializeConfig();
}

/**
 * Convenience function to validate environment variables
 * @returns Validation result
 */
export function validateEmailEnvironment(): EmailValidationResult {
  return EmailConfig.getInstance().validateEnvironment();
}