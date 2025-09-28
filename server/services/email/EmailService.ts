/**
 * Refactored Email Service with Modular Architecture
 * 
 * This is the main EmailService class that orchestrates all email functionality
 * using the modular components: config, templates, styles, and components.
 * 
 * Maintains 100% backward compatibility with the original EmailService API.
 */

import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

// Import our modular components
import { EmailConfig, initializeEmailConfig, validateEmailEnvironment } from './config/EmailConfig.js';
import { TemplateEngine } from './templates/TemplateEngine.js';
import { EmailStyles, defaultEmailStyles } from './styles/EmailStyles.js';
import { EmailComponents } from './components/index.js';

// Import types
import type {
  EmailOptions,
  ContactFormData,
  NewsletterData,
  MeetingRequestData,
  ServiceRequestData,
  EmailTemplateType,
  EmailTemplateData,
  EmailThemeOptions,
} from './types/index.js';

/**
 * Main EmailService class with modular architecture
 * 
 * @example
 * ```typescript
 * const emailService = new EmailService();
 * await emailService.sendContactFormNotification(formData);
 * ```
 */
export class EmailService {
  private transporter: Transporter | null = null;
  private templateEngine: TemplateEngine;
  private emailConfig: EmailConfig;
  private styleEngine: EmailStyles;

  /**
   * Initialize the EmailService with all modular components
   */
  constructor() {
    console.log('🔧 Initializing modular EmailService...');
    
    // Initialize configuration
    this.emailConfig = EmailConfig.getInstance();
    
    // Initialize template engine
    this.templateEngine = new TemplateEngine();
    
    // Initialize style engine with default theme
    this.styleEngine = defaultEmailStyles;
    
    // Initialize transporter
    this.initializeTransporter();
    
    console.log('✅ EmailService initialized successfully');
  }

  /**
   * Initialize email transporter using configuration module
   * @private
   */
  private initializeTransporter(): void {
    const config = initializeEmailConfig();
    
    if (!config) {
      console.warn('⚠️ Email service not configured - missing environment variables');
      this.transporter = null;
      return;
    }

    try {
      this.transporter = nodemailer.createTransport(config);
      console.log('✅ Email transporter created successfully');

      // Test the connection immediately
      this.verifyConnection().catch(error => {
        console.error('❌ Email connection verification failed during initialization:', error);
      });
    } catch (error) {
      console.error('❌ Failed to create email transporter:', error);
      this.transporter = null;
    }
  }

  /**
   * Send email with retry logic and comprehensive logging
   * 
   * @param options - Email options including recipients, subject, and content
   * @param retries - Number of retry attempts (default: 3)
   * @returns Promise resolving to true if sent successfully, false otherwise
   */
  public async sendEmail(options: EmailOptions, retries: number = 3): Promise<boolean> {
    console.log(`📤 Attempting to send email to: ${options.to.join(', ')} | Subject: "${options.subject}"`);

    if (!this.transporter) {
      console.error('❌ Email not sent - email service not configured or transporter is null');
      return false;
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@strivetech.ai',
      to: options.to.join(', '),
      subject: options.subject,
      text: options.text || this.stripHtml(options.html),
      html: options.html,
    };

    console.log(`📧 Mail options: From=${mailOptions.from} | To=${mailOptions.to}`);

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`🔄 Email send attempt ${attempt}/${retries}...`);
        const info = await this.transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to: ${options.to.join(', ')} (attempt ${attempt})`);
        console.log(`📄 Message info:`, {
          messageId: info.messageId,
          response: info.response,
          accepted: info.accepted,
          rejected: info.rejected
        });
        return true;
      } catch (error) {
        console.error(`❌ Email sending failed on attempt ${attempt}:`, error);

        this.logEmailError(error);

        if (attempt === retries) {
          console.error(`💥 Failed to send email after ${retries} attempts to: ${options.to.join(', ')}`);
          return false;
        }

        // Exponential backoff: wait 1s, then 2s, then 4s
        const waitTime = Math.pow(2, attempt - 1) * 1000;
        console.log(`⏳ Retrying email send in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }

    return false;
  }

  /**
   * Verify email service connection
   * 
   * @returns Promise resolving to true if connection is successful
   */
  public async verifyConnection(): Promise<boolean> {
    if (!this.transporter) {
      console.error('❌ Cannot verify connection - transporter not initialized');
      return false;
    }

    try {
      console.log('🔍 Verifying email service connection...');
      await this.transporter.verify();
      console.log('✅ Email service connection verified successfully');
      return true;
    } catch (error) {
      console.error('❌ Email service connection verification failed:', error);
      this.logEmailError(error);
      return false;
    }
  }

  /**
   * Send contact form notification to internal team
   * 
   * @param formData - Contact form submission data
   * @returns Promise resolving to true if sent successfully
   */
  public async sendContactFormNotification(formData: ContactFormData): Promise<boolean> {
    try {
      console.log('📧 Generating contact form notification email...');
      
      const result = await this.templateEngine.renderTemplate(
        'contact-form-notification',
        formData
      );

      const recipients = [
        'garrettholland@strivetech.ai',
        'jeffmeyer@strivetech.ai',
        'grantramey@strivetech.ai',
        'contact@strivetech.ai'
      ];

      return await this.sendEmail({
        to: recipients,
        subject: result.subject,
        html: result.html,
        text: result.text,
      });
    } catch (error) {
      console.error('❌ Failed to send contact form notification:', error);
      return false;
    }
  }

  /**
   * Send contact form confirmation to user
   * 
   * @param formData - Contact form submission data  
   * @returns Promise resolving to true if sent successfully
   */
  public async sendContactFormConfirmation(formData: ContactFormData): Promise<boolean> {
    try {
      console.log('📧 Generating contact form confirmation email...');
      
      const result = await this.templateEngine.renderTemplate(
        'contact-form-confirmation',
        formData
      );

      return await this.sendEmail({
        to: [formData.email],
        subject: result.subject,
        html: result.html,
        text: result.text,
      });
    } catch (error) {
      console.error('❌ Failed to send contact form confirmation:', error);
      return false;
    }
  }

  /**
   * Send newsletter confirmation email
   * 
   * @param email - Subscriber email address
   * @param firstName - Optional subscriber first name
   * @param interests - Optional subscriber interests
   * @returns Promise resolving to true if sent successfully
   */
  public async sendNewsletterConfirmation(
    email: string, 
    firstName?: string, 
    interests?: string[]
  ): Promise<boolean> {
    try {
      console.log('📧 Generating newsletter confirmation email...');
      
      const newsletterData: NewsletterData = {
        email,
        firstName,
        interests,
      };
      
      const result = await this.templateEngine.renderTemplate(
        'newsletter-confirmation',
        newsletterData
      );

      return await this.sendEmail({
        to: [email],
        subject: result.subject,
        html: result.html,
        text: result.text,
      });
    } catch (error) {
      console.error('❌ Failed to send newsletter confirmation:', error);
      return false;
    }
  }

  /**
   * Send meeting request notification (placeholder for future implementation)
   * 
   * @param requestData - Meeting request data
   * @returns Promise resolving to true if sent successfully
   */
  public async sendMeetingRequestNotification(requestData: MeetingRequestData): Promise<boolean> {
    try {
      console.log('📧 Generating meeting request notification email...');
      
      const result = await this.templateEngine.renderTemplate(
        'meeting-request-notification',
        requestData
      );

      const recipients = [
        'garrettholland@strivetech.ai',
        'jeffmeyer@strivetech.ai',
        'grantramey@strivetech.ai',
        'contact@strivetech.ai'
      ];

      return await this.sendEmail({
        to: recipients,
        subject: result.subject,
        html: result.html,
        text: result.text,
      });
    } catch (error) {
      console.error('❌ Failed to send meeting request notification:', error);
      return false;
    }
  }

  /**
   * Send meeting request confirmation to user
   * 
   * @param requestData - Meeting request data
   * @returns Promise resolving to true if sent successfully
   */
  public async sendMeetingRequestConfirmation(requestData: MeetingRequestData): Promise<boolean> {
    try {
      console.log('📧 Generating meeting request confirmation email...');
      
      const result = await this.templateEngine.renderTemplate(
        'meeting-request-confirmation',
        requestData
      );

      return await this.sendEmail({
        to: [requestData.email],
        subject: result.subject,
        html: result.html,
        text: result.text,
      });
    } catch (error) {
      console.error('❌ Failed to send meeting request confirmation:', error);
      return false;
    }
  }

  /**
   * Send service request confirmation (placeholder for future implementation)
   * 
   * @param requestData - Service request data
   * @returns Promise resolving to true if sent successfully
   */
  public async sendRequestConfirmation(requestData: ServiceRequestData): Promise<boolean> {
    try {
      console.log('📧 Generating service request confirmation email...');
      
      const result = await this.templateEngine.renderTemplate(
        'service-request-confirmation',
        requestData
      );

      return await this.sendEmail({
        to: [requestData.email],
        subject: result.subject,
        html: result.html,
        text: result.text,
      });
    } catch (error) {
      console.error('❌ Failed to send service request confirmation:', error);
      return false;
    }
  }

  /**
   * Send service request notification (placeholder for future implementation)
   * 
   * @param requestData - Service request data
   * @returns Promise resolving to true if sent successfully
   */
  public async sendRequestNotification(requestData: ServiceRequestData): Promise<boolean> {
    try {
      console.log('📧 Generating service request notification email...');
      
      const result = await this.templateEngine.renderTemplate(
        'service-request-notification',
        requestData
      );

      const recipients = [
        'garrettholland@strivetech.ai',
        'jeffmeyer@strivetech.ai',
        'grantramey@strivetech.ai',
        'contact@strivetech.ai'
      ];

      return await this.sendEmail({
        to: recipients,
        subject: result.subject,
        html: result.html,
        text: result.text,
      });
    } catch (error) {
      console.error('❌ Failed to send service request notification:', error);
      return false;
    }
  }

  /**
   * Get email service configuration status
   * 
   * @returns Configuration status and details
   */
  public getServiceStatus(): {
    configured: boolean;
    transporterReady: boolean;
    templatesAvailable: string[];
    configValidation: any;
  } {
    const validation = validateEmailEnvironment();
    
    return {
      configured: this.emailConfig.isConfigured(),
      transporterReady: this.transporter !== null,
      templatesAvailable: this.templateEngine.getAvailableTemplates(),
      configValidation: validation,
    };
  }

  /**
   * Get template engine instance for advanced usage
   * 
   * @returns Template engine instance
   */
  public getTemplateEngine(): TemplateEngine {
    return this.templateEngine;
  }

  /**
   * Get style engine instance for customization
   * 
   * @returns Style engine instance
   */
  public getStyleEngine(): EmailStyles {
    return this.styleEngine;
  }

  /**
   * Update email theme for future templates
   * 
   * @param theme - New theme options
   */
  public updateTheme(theme: Partial<EmailThemeOptions>): void {
    this.styleEngine.updateTheme(theme);
  }

  /**
   * Clear template cache
   */
  public clearTemplateCache(): void {
    this.templateEngine.clearCache();
  }

  // Private utility methods

  /**
   * Strip HTML tags from text for plain text version
   * @private
   */
  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
  }

  /**
   * Log detailed email error information
   * @private
   */
  private logEmailError(error: unknown): void {
    if (error instanceof Error) {
      console.error(`   Error name: ${error.name}`);
      console.error(`   Error message: ${error.message}`);
      if ('code' in error) console.error(`   Error code: ${(error as any).code}`);
      if ('command' in error) console.error(`   SMTP command: ${(error as any).command}`);
    }
  }
}

// Create and export a default instance for backward compatibility
export const emailService = new EmailService();

// Export the class as default
export default EmailService;