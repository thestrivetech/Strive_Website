/**
 * Newsletter Email Templates
 *
 * Contains specialized templates for newsletter-related emails:
 * - NewsletterConfirmationTemplate: For new subscribers
 * - NewsletterEmailTemplate: For actual newsletter content
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
  NewsletterData
} from '../types/index.js';

import { EmailTemplateBase } from './EmailTemplateBase.js';

/**
 * Newsletter Confirmation Template
 */
export class NewsletterConfirmationTemplate extends EmailTemplateBase {
  constructor() {
    super('newsletter-confirmation');
  }

  generateSubject(data: EmailTemplateData): string {
    const newsletterData = data as NewsletterData;
    return `Welcome to Strive Tech Newsletter - Your AI Journey Begins! 🚀`;
  }

  renderContent(data: EmailTemplateData, options: TemplateRenderOptions): string {
    const newsletterData = data as NewsletterData;
    const subscriberId = this.generateReferenceId('SUB');

    return `
      ${createHeroSection(
        'Welcome to the Future of AI!',
        `You're now part of our exclusive AI innovation community. Get ready for weekly insights that will transform how you think about technology and business.`,
        '🎯'
      )}

      ${createSpacer(10)}

      ${createContentSection(`
        <div style="text-align: center;">
          ${createReferenceId(subscriberId)}
        </div>
      `)}

      ${createContentSection(`
        ${createInfoCard(
          '🎯 Subscription Intelligence',
          `
            <strong>Profile Match:</strong> 85%<br>
            <strong>Content Focus:</strong> ${newsletterData.interests?.join(', ') || 'General AI & Business'}<br>
            <strong>Delivery Schedule:</strong> Weekly on Wednesdays<br>
            <strong>Source:</strong> ${newsletterData.source || 'Website signup'}
          `
        )}
      `)}

      ${createContentSection(`
        <h3 style="color: ${EMAIL_COLORS.darkBlue}; font-size: 18px; font-weight: bold; margin: 30px 0 20px 0;">
          📚 What You'll Receive
        </h3>

        ${createTimelineStep(1, 'Weekly AI Insights', 'Latest trends, breakthrough technologies, and industry analysis.', 'current')}
        ${createTimelineStep(2, 'Case Studies', 'Real-world implementations and success stories from our clients.', 'pending')}
        ${createTimelineStep(3, 'Expert Interviews', 'Conversations with AI leaders and industry pioneers.', 'pending')}
        ${createTimelineStep(4, 'Exclusive Resources', 'Tools, guides, and early access to new solutions.', 'pending')}
      `)}

      ${createContentSection(`
        <div style="text-align: center; margin: 30px 0;">
          ${createButton(
            'Explore Our Resources',
            `${this.getSiteUrl()}/resources`,
            EMAIL_COLORS.secondary
          )}
        </div>
      `)}

      ${createSpacer(20)}
    `;
  }
}

/**
 * Newsletter Email Template - Standalone Design
 * This template does NOT use the standard header/footer
 */
export class NewsletterEmailTemplate extends EmailTemplateBase {
  constructor() {
    super('newsletter-email');
  }

  generateSubject(data: EmailTemplateData): string {
    const newsletterData = data as NewsletterData;
    return `🚀 NEW STRIVELETTER - Innovation at the Core`;
  }

  // Override the base render method to NOT include header/footer
  async render(data: EmailTemplateData, options: TemplateRenderOptions = {}): Promise<TemplateResult> {
    try {
      const subject = this.generateSubject(data);
      const content = this.renderContent(data, options);

      // Create newsletter with enhanced header and footer
      const emailHTML = createEmailWrapper(`
        ${createEmailHeader('NEWSLETTER')}
        ${content}
        ${createEmailFooter(true)}
      `);

      return {
        subject,
        html: emailHTML,
        text: this.generateNewsletterTextVersion(data),
        success: true
      };
    } catch (error) {
      console.error(`Error rendering ${this.templateName} template:`, error);
      return {
        subject: 'Strive Tech Newsletter',
        html: this.generateErrorTemplate(),
        text: 'Thank you for subscribing to Strive Tech Newsletter.',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  renderContent(data: EmailTemplateData, options: TemplateRenderOptions): string {
    const newsletterData = data as NewsletterData;

    return `
      <!-- View in Browser Link -->
      ${createContentSection(`
        <div style="text-align: center; padding: 10px 0; border-bottom: 1px solid ${EMAIL_COLORS.lightGray};">
          <a href="{{browser_url}}" style="color: ${EMAIL_COLORS.darkGray}; text-decoration: none; font-size: 11px;">
            📧 View this email in your browser
          </a>
        </div>
      `)}

      ${createSpacer(20)}

      ${createHeroSection(
        '🚀 STRIVELETTER',
        'Innovation at the Core - Your monthly dose of AI insights and industry breakthroughs',
        '📰'
      )}

      ${createContentSection(`
        <div style="background: linear-gradient(135deg, rgba(255,112,51,0.05) 0%, rgba(147,51,234,0.05) 100%); padding: 30px; border-radius: 8px; border-left: 4px solid ${EMAIL_COLORS.primary}; margin: 20px 0;">
          <h2 style="color: ${EMAIL_COLORS.darkBlue}; font-size: 24px; font-weight: 700; margin: 0 0 15px 0;">
            ${newsletterData.title || 'This Month in AI Innovation'}
          </h2>
          <div style="color: ${EMAIL_COLORS.darkGray}; font-size: 15px; line-height: 24px; margin-bottom: 20px;">
            ${newsletterData.content || 'Welcome to the latest insights from Strive Tech. Discover how AI innovation is shaping the future of industry and transforming businesses worldwide.'}
          </div>
          ${newsletterData.readingTime ? `
            <div style="color: ${EMAIL_COLORS.mediumGray}; font-size: 12px; font-style: italic;">
              ⏱️ ${newsletterData.readingTime} min read
            </div>
          ` : ''}
        </div>
      `)}

      ${createContentSection(`
        <h3 style="color: ${EMAIL_COLORS.darkBlue}; font-size: 20px; font-weight: 700; margin: 30px 0 20px 0;">
          🎯 Key Highlights
        </h3>
        <div style="color: ${EMAIL_COLORS.darkGray}; font-size: 14px; line-height: 22px;">
          ${newsletterData.excerpt || 'Discover breakthrough technologies, industry insights, and strategic innovations that are defining the next generation of business solutions. From AI automation to data analytics, explore how forward-thinking companies are leveraging technology to drive unprecedented growth and efficiency.'}
        </div>
      `)}

      ${createContentSection(`
        <div style="text-align: center; margin: 30px 0;">
          ${createButton(
            'Read Full Article',
            newsletterData.articleUrl || `${this.getSiteUrl()}/blog`,
            EMAIL_COLORS.primary
          )}
        </div>
      `)}

      <!-- Social Share Section -->
      ${createContentSection(`
        <div style="text-align: center; padding: 30px 0; border-top: 1px solid ${EMAIL_COLORS.lightGray}; border-bottom: 1px solid ${EMAIL_COLORS.lightGray}; margin: 30px 0;">
          <div style="color: ${EMAIL_COLORS.darkGray}; font-size: 14px; font-weight: 600; margin-bottom: 15px;">
            📢 Share this newsletter
          </div>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
            <tr>
              <td style="padding: 0 10px;">
                <a href="https://www.linkedin.com/sharing/share-offsite/?url={{share_url}}" style="display: inline-block; padding: 10px 20px; background-color: rgba(255,112,51,0.1); border-radius: 6px; text-decoration: none; color: ${EMAIL_COLORS.primary}; font-size: 13px; font-weight: 600;">
                  LinkedIn
                </a>
              </td>
              <td style="padding: 0 10px;">
                <a href="https://twitter.com/intent/tweet?url={{share_url}}&text=${encodeURIComponent(newsletterData.title || 'Check out this newsletter from Strive Tech')}" style="display: inline-block; padding: 10px 20px; background-color: rgba(255,112,51,0.1); border-radius: 6px; text-decoration: none; color: ${EMAIL_COLORS.primary}; font-size: 13px; font-weight: 600;">
                  Twitter
                </a>
              </td>
            </tr>
          </table>
        </div>
      `)}

      ${createSpacer(20)}
    `;
  }

  private generateNewsletterTextVersion(data: EmailTemplateData): string {
    const newsletterData = data as NewsletterData;
    return `
🚀 NEW STRIVELETTER - Innovation at the Core

${newsletterData.content || 'Welcome to the latest insights from Strive Tech. Discover how AI innovation is shaping the future of industry and transforming businesses worldwide.'}

INNOVATION AT THE CORE: SHAPING THE FUTURE OF INDUSTRY

${newsletterData.excerpt || 'Discover breakthrough technologies, industry insights, and strategic innovations that are defining the next generation of business solutions.'}

---
🌐 www.strivetech.ai | 📞 (731) 431-2320

Strive Tech - AI Solutions Company
    `.trim();
  }
}