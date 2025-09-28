/**
 * Email Service Module - Barrel Export
 * 
 * This is the main entry point for the modular email service.
 * It exports all components, types, and utilities for easy importing.
 * 
 * @example
 * ```typescript
 * // Import the main service (backward compatibility)
 * import { emailService } from './services/email';
 * 
 * // Import specific components for advanced usage
 * import { EmailService, TemplateEngine, EmailComponents } from './services/email';
 * 
 * // Import types
 * import type { ContactFormData, EmailOptions } from './services/email';
 * ```
 */

// ===== Main Service Exports =====
export { EmailService, emailService } from './EmailService.js';

// ===== Configuration Exports =====
export {
  EmailConfig,
  getEmailConfig,
  initializeEmailConfig,
  validateEmailEnvironment,
} from './config/EmailConfig.js';

// ===== Template Engine Exports =====
export {
  TemplateEngine,

} from './templates/TemplateEngine.js';

// ===== Styling Exports =====
export {
  EmailStyles,
  defaultEmailStyles,
  EmailStyleUtils,
  RESET_STYLES,
  TYPOGRAPHY_STYLES,
  COLOR_STYLES,
  BUTTON_STYLES,
  CARD_STYLES,
  SPACING_STYLES,
  INTERACTIVE_STYLES,
  PRIORITY_STYLES,
  AVATAR_STYLES,
  DARK_MODE_STYLES,
  MOBILE_STYLES,
  ANIMATION_STYLES,
  OUTLOOK_STYLES,
  ICON_STYLES,
} from './styles/EmailStyles.js';

// ===== Component Exports =====
export {
  EmailComponents,
  createProgressBar,
  createDataCard,
  createMetricCard,
  createQuickActionButton,
  createPriorityBadge,
  createTeamMemberCard,
createTimelineStep,
  createFeatureHighlight,
  wrapEmailContent,
  createDivider,
  createSpacer,
  createTwoColumnLayout,
} from './components/index.js';

// ===== Type Exports =====
export type {
  // Core types
  EmailOptions,
  EmailTemplateType,
  EmailTemplateData,
  EmailPriority,
  EmailStatus,
  
  // Form data types
  ContactFormData,
  NewsletterData,
  MeetingRequestData,
  ServiceRequestData,
  
  // Analysis types
  LeadAnalysis,
  LeadScoringFactor,
  
  // Template types
  ProgressBarOptions,
  DataCardOptions,
  MetricCardOptions,
  QuickActionButtonOptions,
  PriorityBadgeOptions,
  TeamMemberCardOptions,
TimelineStepOptions,
  FeatureHighlightOptions,
  
  // Configuration types
  EmailValidationResult,
  EmailThemeOptions,
  
  // Template engine types
  TemplateConfig,
  TemplateCacheEntry,
  EmailSendOptions,
  EmailAnalytics,
  
  // Error types
  EmailServiceError,
  TemplateNotFoundError,
  InvalidEmailDataError,
  EmailConfigurationError,
} from './types/index.js';

// ===== Constants Exports =====
export {
  EMAIL_PRIORITIES,
  EMAIL_STATUSES,
  TEMPLATE_TYPES,
} from './types/index.js';

// ===== Type Guards Exports =====
export {
  isContactFormData,
  isNewsletterData,
  isMeetingRequestData,
  isServiceRequestData,
} from './types/index.js';

// Import the service instance for utility functions
import { emailService } from './EmailService.js';
import type { ContactFormData, EmailOptions } from './types/index.js';

// ===== Utility Functions =====

/**
 * Quick utility to send a contact form notification with backward compatibility
 * @param formData - Contact form data
 * @returns Promise resolving to success status
 */
export async function sendContactFormNotification(formData: ContactFormData): Promise<boolean> {
  return emailService.sendContactFormNotification(formData);
}

/**
 * Quick utility to send a contact form confirmation with backward compatibility
 * @param formData - Contact form data
 * @returns Promise resolving to success status
 */
export async function sendContactFormConfirmation(formData: ContactFormData): Promise<boolean> {
  return emailService.sendContactFormConfirmation(formData);
}

/**
 * Quick utility to send a newsletter confirmation with backward compatibility
 * @param email - Subscriber email
 * @param firstName - Optional first name
 * @param interests - Optional interests array
 * @returns Promise resolving to success status
 */
export async function sendNewsletterConfirmation(
  email: string,
  firstName?: string,
  interests?: string[]
): Promise<boolean> {
  return emailService.sendNewsletterConfirmation(email, firstName, interests);
}

/**
 * Quick utility to verify email service connection
 * @returns Promise resolving to connection status
 */
export async function verifyEmailConnection(): Promise<boolean> {
  return emailService.verifyConnection();
}

/**
 * Quick utility to get email service status
 * @returns Service status information
 */
export function getEmailServiceStatus(): {
  configured: boolean;
  transporterReady: boolean;
  templatesAvailable: string[];
  configValidation: any;
} {
  return emailService.getServiceStatus();
}

/**
 * Quick utility to send any email with the service
 * @param options - Email options
 * @param retries - Number of retry attempts
 * @returns Promise resolving to success status
 */
export async function sendEmail(options: EmailOptions, retries?: number): Promise<boolean> {
  return emailService.sendEmail(options, retries);
}

// ===== Legacy Compatibility =====

// ===== Module Metadata =====

/**
 * Email service module metadata
 */
export const EMAIL_SERVICE_MODULE = {
  name: 'Strive Tech Email Service',
  version: '2.0.0',
  description: 'Modular email service with template engine, styling framework, and component library',
  architecture: 'modular',
  components: [
    'EmailService (core)',
    'EmailConfig (configuration)',
    'TemplateEngine (templates)',
    'EmailStyles (styling)',
    'EmailComponents (UI components)',
  ],
  features: [
    'Template factory pattern',
    'Comprehensive type safety',
    'Template caching',
    'Lead scoring',
    'Responsive email design',
    'Cross-client compatibility',
    'Dark mode support',
    'Component library',
    'Configuration validation',
    'Error handling and retry logic',
  ],
  compatibility: {
    backward: '100%',
    breaking: false,
    apiChanges: false,
  },
} as const;