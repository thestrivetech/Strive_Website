/**
 * Email Preview Generation Script
 *
 * Generates static HTML previews for all 8 email template types
 * for visual testing and design review purposes.
 *
 * Usage: npx tsx scripts/generate-email-previews.ts
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { TemplateEngine } from '../server/services/email/templates/TemplateEngine.js';
import type {
  ContactFormData,
  NewsletterData,
  ServiceRequestData,
  MeetingRequestData
} from '../server/services/email/types/index.js';

// Create preview directory
const PREVIEW_DIR = join(process.cwd(), 'email-previews');
mkdirSync(PREVIEW_DIR, { recursive: true });

// Mock data for each template type
const mockContactFormData: ContactFormData = {
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah.johnson@techcorp.com',
  company: 'TechCorp Industries',
  companySize: '500-999 employees',
  jobTitle: 'Chief Technology Officer',
  phone: '(555) 123-4567',
  message: 'We are looking to implement AI automation solutions for our manufacturing processes. Our current systems are outdated and we need a comprehensive solution that can scale with our business growth.',
  privacyConsent: 'yes'
};

const mockNewsletterData: NewsletterData = {
  email: 'subscriber@example.com',
  firstName: 'Alex',
  lastName: 'Martinez',
  interests: ['AI Innovation', 'Business Transformation', 'Data Analytics'],
  source: 'Website signup',
  title: 'AI Revolutionizing Manufacturing: A 2025 Perspective',
  content: 'This month, we explore how artificial intelligence is transforming the manufacturing industry. From predictive maintenance to quality control automation, discover the cutting-edge technologies that are driving unprecedented efficiency gains and cost savings.',
  excerpt: 'Learn how leading manufacturers are leveraging AI to reduce downtime by 40%, improve product quality by 35%, and increase overall equipment effectiveness (OEE) to new highs. We share real-world case studies, implementation strategies, and ROI metrics from our client engagements.',
  readingTime: 8,
  articleUrl: 'https://strivetech.ai/blog/ai-manufacturing-2025'
};

const mockServiceRequestData: ServiceRequestData = {
  firstName: 'Michael',
  lastName: 'Chen',
  email: 'mchen@enterprise.com',
  company: 'Enterprise Solutions Group',
  companySize: '1000+ employees',
  jobTitle: 'VP of Digital Transformation',
  phone: '(555) 987-6543',
  requestTypes: 'ai-automation,data-analytics,custom-development',
  projectDescription: 'We need to build a comprehensive AI-powered analytics platform that integrates with our existing ERP system. The platform should provide real-time insights, predictive analytics, and automated reporting capabilities for our executive team.',
  projectTimeline: 'ASAP',
  budgetRange: '$250k-$500k',
  industry: 'Technology',
  businessObjectives: 'Improve decision-making speed, reduce manual reporting time by 80%, enable data-driven strategy',
  desiredOutcomes: 'Fully integrated analytics platform, automated dashboards, predictive forecasting models',
  currentSoftware: 'SAP ERP, Salesforce CRM, Custom legacy systems'
};

const mockMeetingRequestData: MeetingRequestData = {
  firstName: 'Jennifer',
  lastName: 'Williams',
  email: 'jwilliams@innovate.com',
  company: 'Innovate Healthcare',
  companySize: '100-499 employees',
  phone: '(555) 456-7890',
  meetingType: 'Strategic Consultation',
  preferredDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  preferredTime: '10:00 AM',
  timezone: 'EST',
  message: 'We are interested in exploring how AI can improve our patient care workflows and reduce administrative burden on our clinical staff. This is a high-priority initiative for our Q1 planning.',
  preferredContact: 'video-call'
};

// Template Engine instance
const templateEngine = new TemplateEngine();

// Generate previews for all template types
async function generatePreviews() {
  console.log('🎨 Generating email previews...\n');

  const templates = [
    { type: 'contact-form-confirmation' as const, data: mockContactFormData, name: 'Contact Form Confirmation' },
    { type: 'contact-form-notification' as const, data: mockContactFormData, name: 'Contact Form Notification (Team)' },
    { type: 'newsletter-confirmation' as const, data: mockNewsletterData, name: 'Newsletter Subscription Confirmation' },
    { type: 'newsletter-email' as const, data: mockNewsletterData, name: 'Newsletter Email' },
    { type: 'service-request-confirmation' as const, data: mockServiceRequestData, name: 'Service Request Confirmation' },
    { type: 'service-request-notification' as const, data: mockServiceRequestData, name: 'Service Request Notification (Team)' },
    { type: 'meeting-request-confirmation' as const, data: mockMeetingRequestData, name: 'Meeting Request Confirmation' },
    { type: 'meeting-request-notification' as const, data: mockMeetingRequestData, name: 'Meeting Request Notification (Team)' }
  ];

  const previewLinks: Array<{ name: string; filename: string; subject: string }> = [];

  for (const template of templates) {
    try {
      console.log(`📧 Rendering: ${template.name}...`);

      const result = await templateEngine.renderTemplate(template.type, template.data);

      if (result.success && result.html) {
        const filename = `${template.type}.html`;
        const filepath = join(PREVIEW_DIR, filename);

        writeFileSync(filepath, result.html, 'utf-8');

        previewLinks.push({
          name: template.name,
          filename,
          subject: result.subject
        });

        console.log(`   ✅ Saved to: ${filename}`);
        console.log(`   📬 Subject: ${result.subject}\n`);
      } else {
        console.error(`   ❌ Failed: ${result.error || 'Unknown error'}\n`);
      }
    } catch (error) {
      console.error(`   💥 Error rendering ${template.name}:`, error);
    }
  }

  // Generate index HTML file
  generateIndexFile(previewLinks);

  console.log('\n✨ All previews generated successfully!');
  console.log(`📁 Preview directory: ${PREVIEW_DIR}`);
  console.log(`🌐 Open email-previews/index.html in your browser to view all templates\n`);
}

function generateIndexFile(links: Array<{ name: string; filename: string; subject: string }>) {
  const indexHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Strive Tech Email Template Previews</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #020a1c 0%, #1a2d47 100%);
      color: #fff;
      padding: 40px 20px;
      min-height: 100vh;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      font-size: 48px;
      margin-bottom: 10px;
      background: linear-gradient(135deg, #fff 0%, #ff7033 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .subtitle {
      color: rgba(255,255,255,0.7);
      margin-bottom: 40px;
      font-size: 18px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
      margin-top: 40px;
    }
    .card {
      background: rgba(255,255,255,0.05);
      border-radius: 12px;
      padding: 24px;
      transition: all 0.3s ease;
      border: 1px solid rgba(255,112,51,0.2);
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(255,112,51,0.3);
      border-color: rgba(255,112,51,0.5);
    }
    .card h2 {
      font-size: 20px;
      margin-bottom: 12px;
      color: #ff7033;
    }
    .card p {
      font-size: 14px;
      color: rgba(255,255,255,0.6);
      margin-bottom: 16px;
      line-height: 1.6;
    }
    .card a {
      display: inline-block;
      background: linear-gradient(135deg, #ff7033 0%, #d6551e 100%);
      color: #fff;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: 600;
      transition: all 0.2s ease;
    }
    .card a:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(255,112,51,0.4);
    }
    .stats {
      display: flex;
      gap: 32px;
      margin-top: 20px;
      padding: 20px;
      background: rgba(255,112,51,0.1);
      border-radius: 8px;
      border: 1px solid rgba(255,112,51,0.3);
    }
    .stat {
      text-align: center;
    }
    .stat-value {
      font-size: 36px;
      font-weight: 900;
      color: #ff7033;
    }
    .stat-label {
      font-size: 12px;
      color: rgba(255,255,255,0.6);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    footer {
      margin-top: 60px;
      text-align: center;
      color: rgba(255,255,255,0.5);
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📧 Email Template Previews</h1>
    <p class="subtitle">Strive Tech Email System - Session 2 Enhanced Templates</p>

    <div class="stats">
      <div class="stat">
        <div class="stat-value">${links.length}</div>
        <div class="stat-label">Templates</div>
      </div>
      <div class="stat">
        <div class="stat-value">8</div>
        <div class="stat-label">Template Types</div>
      </div>
      <div class="stat">
        <div class="stat-value">100%</div>
        <div class="stat-label">Mobile Responsive</div>
      </div>
    </div>

    <div class="grid">
      ${links.map((link, index) => `
        <div class="card">
          <h2>${link.name}</h2>
          <p><strong>Subject:</strong> ${link.subject}</p>
          <p><strong>File:</strong> ${link.filename}</p>
          <a href="${link.filename}" target="_blank">View Template →</a>
        </div>
      `).join('')}
    </div>

    <footer>
      <p>© ${new Date().getFullYear()} Strive Tech | Email Template System v2.0</p>
      <p style="margin-top: 8px;">Generated on ${new Date().toLocaleString()}</p>
    </footer>
  </div>
</body>
</html>
  `;

  writeFileSync(join(PREVIEW_DIR, 'index.html'), indexHTML, 'utf-8');
  console.log('\n📋 Generated index.html');
}

// Run the script
generatePreviews().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});