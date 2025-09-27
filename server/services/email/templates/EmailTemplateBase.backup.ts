/**
 * Email Template Base Class System
 *
 * Provides a clean, maintainable foundation for all email templates
 * using the email-safe component library for maximum compatibility
 */

import {
  EMAIL_COLORS,
  EMAIL_FONTS,
  createEmailWrapper,
  createEmailHeader,
  createEmailFooter,
  createHeroSection,
  createContentSection,
  createButton,
  createInfoCard,
  createTwoColumnLayout,
  createReferenceId,
  createTimelineStep,
  createTeamMemberCard,
  createSpacer
} from '../components/EmailSafeComponents.js';

import {
  EmailTemplateData,
  TemplateRenderOptions,
  TemplateResult,
  ContactFormData,
  NewsletterData,
  ServiceRequestData
} from '../types/index.js';

/**
 * Base class for all email templates
 */
export abstract class EmailTemplateBase {
  protected templateName: string;

  constructor(templateName: string) {
    this.templateName = templateName;
  }

  /**
   * Get the site URL from environment variable or default
   */
  protected getSiteUrl(): string {
    return process.env.SITE_URL || 'http://localhost:3000';
  }

  /**
   * Abstract method that subclasses must implement
   */
  abstract renderContent(data: EmailTemplateData, options: TemplateRenderOptions): string;

  /**
   * Abstract method for generating subject lines
   */
  abstract generateSubject(data: EmailTemplateData): string;

  /**
   * Main render method that wraps content with email structure
   */
  async render(data: EmailTemplateData, options: TemplateRenderOptions = {}): Promise<TemplateResult> {
    console.log(`🎨 Starting template render: ${this.templateName}`);
    console.log(`📊 Template data received:`, JSON.stringify(data, null, 2));
    console.log(`⚙️ Template options:`, JSON.stringify(options, null, 2));

    try {
      console.log(`📝 Step 1: Generating subject for ${this.templateName}...`);
      const subject = this.generateSubject(data);
      console.log(`✅ Subject generated: "${subject}"`);

      console.log(`🎯 Step 2: Rendering content for ${this.templateName}...`);
      const content = this.renderContent(data, options);
      console.log(`✅ Content rendered successfully (${content.length} characters)`);

      console.log(`🏗️ Step 3: Creating email wrapper...`);
      const emailHTML = createEmailWrapper(`
        ${createEmailHeader()}
        ${content}
        ${createEmailFooter()}
      `);
      console.log(`✅ Email HTML created successfully (${emailHTML.length} characters)`);

      console.log(`🎉 Template ${this.templateName} rendered successfully!`);
      return {
        subject,
        html: emailHTML,
        text: this.generateTextVersion(data),
        success: true
      };
    } catch (error) {
      console.error(`❌ CRITICAL ERROR rendering ${this.templateName} template:`);
      console.error(`🔍 Error details:`, {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace',
        data: JSON.stringify(data, null, 2),
        options: JSON.stringify(options, null, 2)
      });

      // Return detailed error info to help debug
      return {
        subject: 'Strive Tech - Update',
        html: this.generateErrorTemplate(),
        text: 'Thank you for contacting Strive Tech. We will get back to you soon.',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Generates a simple text version of the email
   */
  protected generateTextVersion(data: EmailTemplateData): string {
    return `
Thank you for contacting Strive Tech!

We have received your message and will get back to you within one business day.

Best regards,
The Strive Tech Team

---
Strive Tech
AI Solutions & Business Transformation
contact@strivetech.ai
strivetech.ai
    `.trim();
  }

  /**
   * Generates an error fallback template
   */
  protected generateErrorTemplate(): string {
    return createEmailWrapper(`
      ${createEmailHeader()}
      ${createHeroSection(
        'Thank You!',
        'We have received your message and will get back to you soon.',
        '✉️'
      )}
      ${createContentSection(`
        <p style="color: ${EMAIL_COLORS.darkGray}; font-size: 16px; line-height: 24px; text-align: center;">
          Our team will review your inquiry and respond within one business day.
        </p>
      `)}
      ${createEmailFooter()}
    `);
  }

  /**
   * Utility method to generate reference IDs
   */
  protected generateReferenceId(prefix: string): string {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).slice(-3).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }

  /**
   * Utility method to format dates
   */
  protected formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Utility method to format time
   */
  protected formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}