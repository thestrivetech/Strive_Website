/**
 * Email service type definitions and interfaces
 * Contains all types used across the email service modules
 */

// Core email interfaces
export interface EmailOptions {
  to: string[];
  subject: string;
  html: string;
  text?: string;
}

// Contact form data interface
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  companySize?: string | null;
  jobTitle?: string | null;
  phone?: string | null;
  message: string;
  userAgent?: string;
  location?: string;
  privacyConsent?: string;
  // Additional fields for analytics and tracking
  ipAddress?: string;
  source?: string;
  utm?: string;
  createdAt?: Date;
}

// Newsletter subscription data interface
export interface NewsletterData {
  email: string;
  firstName?: string;
  lastName?: string;
  interests?: string[];
  source?: string;
}

// Meeting request data interface
export interface MeetingRequestData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  companySize?: string;
  phone?: string;
  meetingType: string;
  preferredDate?: string;
  preferredTime?: string;
  timezone?: string;
  message?: string;
  urgency?: 'low' | 'medium' | 'high';
  budget?: string;
  timeframe?: string;
  currentChallenges?: string[];
  goals?: string[];
}

// Service request data interface
export interface ServiceRequestData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  companySize?: string | null;
  phone?: string | null;
  serviceType?: string;
  projectDescription?: string;
  budget?: string;
  timeline?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  requirements?: string[];
  additionalNotes?: string;
  attachments?: string[];
  preferredContact?: 'email' | 'phone' | 'video-call';
  // Add fields from the actual schema
  fullName?: string;
  requestTypes?: string;
  jobTitle?: string | null;
  currentSoftware?: string | null;
  businessObjectives?: string | null;
  desiredOutcomes?: string | null;
  preferredDate?: string | null;
  // Additional fields needed by templates - matching database schema types
  industry?: string | null;
  projectTimeline?: string | null;
  budgetRange?: string | null;
  currentChallenges?: string | null;
  demoFocusAreas?: string | null;
  additionalRequirements?: string | null;
}

// Email template types
export type EmailTemplateType = 
  | 'contact-form-notification'
  | 'contact-form-confirmation'
  | 'newsletter-confirmation'
  | 'meeting-request-notification'
  | 'service-request-confirmation'
  | 'service-request-notification';

// Template data union type
export type EmailTemplateData = 
  | ContactFormData
  | NewsletterData
  | MeetingRequestData
  | ServiceRequestData;

// Template render options
export interface TemplateRenderOptions {
  cacheEnabled?: boolean;
  generatePreview?: boolean;
  includeAnalytics?: boolean;
  theme?: EmailThemeOptions;
  customStyles?: Record<string, string>;
}

// Template render result
export interface TemplateResult {
  subject: string;
  html: string;
  text: string;
  success: boolean;
  error?: string;
  metadata?: Record<string, any>;
}

// Email priority levels
export type EmailPriority = 'low' | 'normal' | 'high' | 'urgent';

// Email status types
export type EmailStatus = 'pending' | 'sent' | 'delivered' | 'failed' | 'bounced';

// Email theme and styling options
export interface EmailThemeOptions {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  borderRadius?: string;
  fontFamily?: string;
}

// Component types for email templates
export interface ProgressBarOptions {
  percentage: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
}

export interface DataCardOptions {
  title: string;
  data: Record<string, string> | string;
  priority?: 'urgent' | 'high' | 'medium' | 'low';
  icon?: string;
  description?: string;
  link?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export interface MetricCardOptions {
  label: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period?: string;
  };
  icon?: string;
  color?: string;
}

export interface QuickActionButtonOptions {
  text: string;
  url: string;
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  icon?: string;
}

export interface PriorityBadgeOptions {
  priority: 'low' | 'medium' | 'high' | 'urgent';
  customText?: string;
}

export interface TeamMemberCardOptions {
  name: string;
  role: string;
  email?: string;
  phone?: string;
  avatar?: string;
  department?: string;
}

export interface ServiceTypeIndicatorOptions {
  serviceType: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface TimelineStepOptions {
  step: number;
  title: string;
  description: string;
  isCompleted?: boolean;
  estimatedTime?: string;
  date?: string;
}

export interface FeatureHighlightOptions {
  title: string;
  description: string;
  icon?: string;
  benefits?: string[];
  link?: {
    text: string;
    url: string;
  };
}

// Lead analysis interface
export interface LeadAnalysis {
  score: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  factors: LeadScoringFactor[];
  recommendations: string[];
  reasoning: string[];
}

export interface LeadScoringFactor {
  factor: string;
  score: number;
  weight: number;
  description: string;
}

// Template configuration interface
export interface TemplateConfig {
  name: string;
  type: EmailTemplateType;
  description?: string;
  requiredFields: string[];
  optionalFields?: string[];
  defaultSubject: string;
  supportedLanguages?: string[];
  cacheEnabled?: boolean;
  cacheExpiration?: number;
}

// Email sending options
export interface EmailSendOptions {
  template: EmailTemplateType;
  data: EmailTemplateData;
  options?: {
    priority?: EmailPriority;
    scheduledFor?: Date;
    retryAttempts?: number;
    trackOpening?: boolean;
    trackClicks?: boolean;
    customHeaders?: Record<string, string>;
  };
}

// Email validation result
export interface EmailValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Template cache entry
export interface TemplateCacheEntry {
  key: string;
  template: string;
  createdAt: Date;
  expiresAt: Date;
  accessCount: number;
  lastAccessed: Date;
}

// Email analytics data
export interface EmailAnalytics {
  templateType: EmailTemplateType;
  sentAt: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  recipient: string;
  status: EmailStatus;
  metadata?: Record<string, any>;
}

// Error types
export class EmailServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'EmailServiceError';
  }
}

export class TemplateNotFoundError extends EmailServiceError {
  constructor(templateType: EmailTemplateType) {
    super(`Template not found: ${templateType}`, 'TEMPLATE_NOT_FOUND', { templateType });
  }
}

export class InvalidEmailDataError extends EmailServiceError {
  constructor(message: string, validationErrors: string[]) {
    super(message, 'INVALID_EMAIL_DATA', { validationErrors });
  }
}

export class EmailConfigurationError extends EmailServiceError {
  constructor(message: string, missingConfig?: string[]) {
    super(message, 'EMAIL_CONFIGURATION_ERROR', { missingConfig });
  }
}

// Utility type for extracting specific form data
export type ExtractFormData<T extends EmailTemplateType> = 
  T extends 'contact-form-notification' | 'contact-form-confirmation' ? ContactFormData :
  T extends 'newsletter-confirmation' ? NewsletterData :
  T extends 'meeting-request-notification' ? MeetingRequestData :
  T extends 'service-request-confirmation' | 'service-request-notification' ? ServiceRequestData :
  EmailTemplateData;

// Type guards
export function isContactFormData(data: EmailTemplateData): data is ContactFormData {
  return 'message' in data && 'firstName' in data && 'lastName' in data;
}

export function isNewsletterData(data: EmailTemplateData): data is NewsletterData {
  return 'email' in data && !('message' in data) && !('serviceType' in data);
}

export function isMeetingRequestData(data: EmailTemplateData): data is MeetingRequestData {
  return 'meetingType' in data && 'firstName' in data;
}

export function isServiceRequestData(data: EmailTemplateData): data is ServiceRequestData {
  return 'requestTypes' in data || ('serviceType' in data && 'projectDescription' in data);
}

// Constants
export const EMAIL_PRIORITIES: Record<EmailPriority, { weight: number; label: string }> = {
  low: { weight: 1, label: 'Low Priority' },
  normal: { weight: 2, label: 'Normal' },
  high: { weight: 3, label: 'High Priority' },
  urgent: { weight: 4, label: 'Urgent' },
};

export const EMAIL_STATUSES: Record<EmailStatus, { label: string; color: string }> = {
  pending: { label: 'Pending', color: '#6b7280' },
  sent: { label: 'Sent', color: '#3b82f6' },
  delivered: { label: 'Delivered', color: '#10b981' },
  failed: { label: 'Failed', color: '#ef4444' },
  bounced: { label: 'Bounced', color: '#f59e0b' },
};

export const TEMPLATE_TYPES: Record<EmailTemplateType, TemplateConfig> = {
  'contact-form-notification': {
    name: 'Contact Form Notification',
    type: 'contact-form-notification',
    description: 'Internal notification for new contact form submissions',
    requiredFields: ['firstName', 'lastName', 'email', 'message'],
    optionalFields: ['company', 'companySize', 'phone', 'userAgent', 'location'],
    defaultSubject: 'New Contact Form Submission',
    cacheEnabled: false,
  },
  'contact-form-confirmation': {
    name: 'Contact Form Confirmation',
    type: 'contact-form-confirmation',
    description: 'Confirmation email sent to users after contact form submission',
    requiredFields: ['firstName', 'lastName', 'email'],
    optionalFields: ['company', 'message'],
    defaultSubject: 'Thank you for contacting Strive Tech',
    cacheEnabled: true,
    cacheExpiration: 3600000, // 1 hour
  },
  'newsletter-confirmation': {
    name: 'Newsletter Confirmation',
    type: 'newsletter-confirmation',
    description: 'Confirmation email for newsletter subscriptions',
    requiredFields: ['email'],
    optionalFields: ['firstName', 'lastName', 'interests'],
    defaultSubject: 'Welcome to Strive Tech Newsletter',
    cacheEnabled: true,
    cacheExpiration: 3600000,
  },
  'meeting-request-notification': {
    name: 'Meeting Request Notification',
    type: 'meeting-request-notification',
    description: 'Internal notification for meeting requests',
    requiredFields: ['firstName', 'lastName', 'email', 'meetingType'],
    optionalFields: ['company', 'phone', 'preferredDate', 'preferredTime', 'message'],
    defaultSubject: 'New Meeting Request',
    cacheEnabled: false,
  },
  'service-request-confirmation': {
    name: 'Service Request Confirmation',
    type: 'service-request-confirmation',
    description: 'Confirmation email for service requests with journey roadmap and detailed preview',
    requiredFields: ['firstName', 'lastName', 'email', 'company', 'requestTypes'],
    optionalFields: ['industry', 'companySize', 'projectTimeline', 'currentChallenges', 'demoFocusAreas', 'additionalRequirements'],
    defaultSubject: 'Your Service Request Journey Begins - Transformation Roadmap Inside!',
    cacheEnabled: false,
    cacheExpiration: 1800000, // 30 minutes
  },
  'service-request-notification': {
    name: 'Service Request Notification',
    type: 'service-request-notification',
    description: 'Internal notification for new service requests with priority scoring and team coordination',
    requiredFields: ['firstName', 'lastName', 'email', 'company', 'requestTypes'],
    optionalFields: ['industry', 'companySize', 'projectTimeline', 'budgetRange', 'jobTitle', 'phone', 'currentChallenges', 'demoFocusAreas', 'additionalRequirements'],
    defaultSubject: 'New Service Request',
    cacheEnabled: false,
  },
};