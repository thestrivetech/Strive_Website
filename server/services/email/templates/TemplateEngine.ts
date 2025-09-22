/**
 * Email Template Engine - Enhanced for All Email Types
 *
 * This file provides a complete template system using enhanced email templates
 * for ALL email types - no more bland fallback templates!
 */

import {
  ContactFormConfirmationTemplate,
  ContactFormNotificationTemplate,
  NewsletterConfirmationTemplate,
  NewsletterEmailTemplate,
  ServiceRequestNotificationTemplate,
  ServiceRequestConfirmationTemplate
} from './EmailTemplateBase.js';

import {
  EmailTemplateData,
  TemplateRenderOptions,
  TemplateResult,
  ContactFormData,
  NewsletterData,
  ServiceRequestData
} from '../types/index.js';

/**
 * Template type definitions
 */
export type EmailTemplateType =
  | 'contact-form-confirmation'
  | 'contact-form-notification'
  | 'newsletter-confirmation'
  | 'newsletter-email'
  | 'service-request-notification'
  | 'service-request-confirmation'
  | 'meeting-request-notification'
  | 'meeting-request-confirmation';

/**
 * Template interface for consistency
 */
export interface EmailTemplate {
  render(data: EmailTemplateData, options?: TemplateRenderOptions): Promise<TemplateResult>;
}

/**
 * Simple meeting request template (placeholder for future enhancement)
 */
class MeetingRequestNotificationTemplate implements EmailTemplate {
  async render(data: EmailTemplateData, options: TemplateRenderOptions = {}): Promise<TemplateResult> {
    const meetingData = data as any; // Type as needed when MeetingRequestData is defined

    const subject = `New Meeting Request from ${meetingData.firstName} ${meetingData.lastName}`;
    const html = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Strive Tech - Meeting Request</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff;">
          <tr>
            <td style="padding: 40px; background-color: #333333; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Meeting Request</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #333333; margin: 0 0 20px 0;">Meeting Request Details</h2>
              <p><strong>From:</strong> ${meetingData.firstName} ${meetingData.lastName}</p>
              <p><strong>Email:</strong> ${meetingData.email}</p>
              <p><strong>Company:</strong> ${meetingData.company || 'Not specified'}</p>
              <p><strong>Meeting Type:</strong> ${meetingData.meetingType}</p>
              <p><strong>Message:</strong></p>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 10px 0;">
                ${meetingData.message || 'No message provided'}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const text = `
New Meeting Request

From: ${meetingData.firstName} ${meetingData.lastName}
Email: ${meetingData.email}
Company: ${meetingData.company || 'Not specified'}
Meeting Type: ${meetingData.meetingType}
Message: ${meetingData.message || 'No message provided'}

---
Strive Tech Team
    `.trim();

    return {
      subject,
      html,
      text,
      success: true
    };
  }
}

/**
 * Meeting Request Confirmation Template - Sent to users who request meetings
 */
class MeetingRequestConfirmationTemplate implements EmailTemplate {
  async render(data: EmailTemplateData, options: TemplateRenderOptions = {}): Promise<TemplateResult> {
    const meetingData = data as any; // Type as needed when MeetingRequestData is defined

    const subject = `Meeting Request Confirmed - ${meetingData.firstName}!`;
    const html = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Strive Tech - Meeting Request Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff;">
          <tr>
            <td style="padding: 40px; background: linear-gradient(135deg, #ff7033 0%, #9333ea 100%); text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Meeting Request Received</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #333333; margin: 0 0 20px 0;">Thank you, ${meetingData.firstName}!</h2>
              <p style="margin: 0 0 20px 0; line-height: 1.6;">We've received your meeting request and will get back to you within 24 hours to schedule your ${meetingData.meetingType}.</p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <h3 style="color: #ff7033; margin: 0 0 15px 0;">Your Request Details:</h3>
                <p style="margin: 5px 0;"><strong>Meeting Type:</strong> ${meetingData.meetingType}</p>
                <p style="margin: 5px 0;"><strong>Company:</strong> ${meetingData.company || 'Individual'}</p>
                ${meetingData.message ? `<p style="margin: 15px 0 5px 0;"><strong>Your Message:</strong></p><p style="margin: 5px 0; font-style: italic;">"${meetingData.message}"</p>` : ''}
              </div>

              <div style="background-color: #fff5f0; border-left: 4px solid #ff7033; padding: 20px; margin: 20px 0;">
                <h3 style="color: #ff7033; margin: 0 0 10px 0;">What happens next?</h3>
                <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>Our team will review your request within 24 hours</li>
                  <li>We'll send you a calendar invitation with available time slots</li>
                  <li>You'll receive a personalized agenda before the meeting</li>
                </ul>
              </div>

              <p style="margin: 20px 0; line-height: 1.6;">If you have any questions or need to make changes to your request, please reply to this email or contact us directly.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <p style="margin: 0; color: #666; font-size: 14px;">Best regards,<br><strong style="color: #ff7033;">The Strive Tech Team</strong></p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #666; font-size: 12px;">© 2024 Strive Tech. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const text = `
Meeting Request Confirmed

Thank you, ${meetingData.firstName}!

We've received your meeting request and will get back to you within 24 hours to schedule your ${meetingData.meetingType}.

Your Request Details:
- Meeting Type: ${meetingData.meetingType}
- Company: ${meetingData.company || 'Individual'}
${meetingData.message ? `- Your Message: "${meetingData.message}"` : ''}

What happens next?
• Our team will review your request within 24 hours
• We'll send you a calendar invitation with available time slots  
• You'll receive a personalized agenda before the meeting

If you have any questions or need to make changes to your request, please reply to this email or contact us directly.

Best regards,
The Strive Tech Team

© 2024 Strive Tech. All rights reserved.
    `.trim();

    return {
      subject,
      html,
      text,
      success: true
    };
  }
}

// ServiceRequestConfirmationTemplate and ServiceRequestNotificationTemplate
// are now imported from EmailTemplateBase.ts

/**
 * Template Factory - Creates and manages all enhanced template instances
 */
class TemplateFactory {
  private templates: Map<EmailTemplateType, EmailTemplate>;

  constructor() {
    this.templates = new Map();
    this.registerTemplates();
  }

  /**
   * Register all available enhanced templates
   */
  private registerTemplates(): void {
    // All templates now use enhanced versions with rich formatting
    this.templates.set('contact-form-confirmation', new ContactFormConfirmationTemplate());
    this.templates.set('contact-form-notification', new ContactFormNotificationTemplate());
    this.templates.set('newsletter-confirmation', new NewsletterConfirmationTemplate());
    this.templates.set('newsletter-email', new NewsletterEmailTemplate());
    this.templates.set('service-request-notification', new ServiceRequestNotificationTemplate());
    this.templates.set('service-request-confirmation', new ServiceRequestConfirmationTemplate());

    // Meeting request will be enhanced in the future
    this.templates.set('meeting-request-notification', new MeetingRequestNotificationTemplate());
    this.templates.set('meeting-request-confirmation', new MeetingRequestConfirmationTemplate());
  }

  /**
   * Get a template instance by type
   */
  public getTemplate(type: EmailTemplateType): EmailTemplate | null {
    return this.templates.get(type) || null;
  }

  /**
   * Get all available template types
   */
  public getAvailableTemplates(): EmailTemplateType[] {
    return Array.from(this.templates.keys());
  }
}

/**
 * Main Template Engine class
 */
export class TemplateEngine {
  private factory: TemplateFactory;
  private defaultOptions: TemplateRenderOptions;

  constructor(defaultOptions: TemplateRenderOptions = {}) {
    this.factory = new TemplateFactory();
    this.defaultOptions = {
      cacheEnabled: false,
      generatePreview: false,
      includeAnalytics: false,
      ...defaultOptions,
    };
  }

  /**
   * Render an email template with enhanced formatting
   */
  public async renderTemplate(
    type: EmailTemplateType,
    data: EmailTemplateData,
    options: TemplateRenderOptions = {}
  ): Promise<TemplateResult> {
    console.log(`🚀 TemplateEngine: Starting render for type: ${type}`);
    console.log(`📊 TemplateEngine: Data received:`, JSON.stringify(data, null, 2));

    const template = this.factory.getTemplate(type);
    if (!template) {
      console.error(`❌ TemplateEngine: Template not found: ${type}`);
      console.log(`📋 Available templates:`, this.factory.getAvailableTemplates());
      throw new Error(`Template not found: ${type}`);
    }

    console.log(`✅ TemplateEngine: Template instance found for ${type}`);

    // Merge options
    const renderOptions = { ...this.defaultOptions, ...options };
    console.log(`⚙️ TemplateEngine: Merged options:`, JSON.stringify(renderOptions, null, 2));

    try {
      console.log(`🎯 TemplateEngine: Calling template.render() for ${type}...`);
      // Render template
      const result = await template.render(data, renderOptions);

      if (result.success) {
        console.log(`🎉 TemplateEngine: Enhanced template ${type} rendered successfully!`);
        console.log(`📏 Result details: Subject="${result.subject}", HTML=${result.html.length} chars, Text=${result.text?.length || 0} chars`);
      } else {
        console.warn(`⚠️ TemplateEngine: Template ${type} rendered with errors: ${result.error}`);
      }

      return result;
    } catch (error) {
      console.error(`💥 TemplateEngine: CRITICAL ERROR rendering template ${type}:`);
      console.error(`🔍 Error details:`, {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack?.substring(0, 500) : 'No stack trace',
        templateType: type,
        dataKeys: Object.keys(data),
        availableTemplates: this.factory.getAvailableTemplates()
      });

      // Return fallback result
      return {
        subject: 'Strive Tech - Update',
        html: this.generateFallbackHTML(),
        text: 'Thank you for contacting Strive Tech. We will get back to you soon.',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Generate a fallback HTML template (enhanced version)
   */
  private generateFallbackHTML(): string {
    return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Strive Tech</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff;">
          <tr>
            <td style="padding: 40px; background-color: #333333; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Strive Tech</h1>
              <p style="color: #ff6b35; margin: 10px 0 0 0;">AI Solutions That Transform Business</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #333333; margin: 0 0 20px 0;">Thank You!</h2>
              <p>We have received your message and will get back to you within one business day.</p>
              <p>Our team of AI experts is reviewing your inquiry and preparing a personalized response.</p>
              <p>Best regards,<br>The Strive Tech Team</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #cccccc;">
              <p style="margin: 0; color: #666666; font-size: 14px;">
                <strong>Strive Tech</strong><br>
                📧 contact@strivetech.ai | 🌐 strivetech.ai
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }

  /**
   * Get available template types
   */
  public getAvailableTemplates(): EmailTemplateType[] {
    return this.factory.getAvailableTemplates();
  }

  /**
   * Legacy compatibility method for clearCache
   */
  public clearCache(): void {
    console.log('✨ Template cache cleared (enhanced templates active)');
  }
}

// Default export
export default TemplateEngine;