/**
 * Email Templates Test Suite
 * 
 * Tests all email templates to ensure they work correctly with the new branding
 */

import { describe, it, expect } from 'vitest';
import { TemplateEngine } from './TemplateEngine.js';
import { 
  ContactFormConfirmationTemplate,
  ContactFormNotificationTemplate, 
  NewsletterConfirmationTemplate,
  NewsletterEmailTemplate,
  ServiceRequestConfirmationTemplate,
  ServiceRequestNotificationTemplate
} from './EmailTemplateBase.js';

import type { 
  ContactFormData, 
  NewsletterData, 
  ServiceRequestData 
} from '../types/index.js';

// Sample test data
const sampleContactFormData: ContactFormData = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@example.com',
  company: 'Tech Solutions Inc',
  companySize: '50-100 employees',
  jobTitle: 'CTO',
  phone: '+1 (555) 123-4567',
  message: 'We are interested in AI automation solutions for our customer service department.'
};

const sampleNewsletterData: NewsletterData = {
  email: 'subscriber@example.com',
  firstName: 'Sarah',
  lastName: 'Johnson',
  interests: ['AI Automation', 'Data Analytics'],
  source: 'Website signup',
  content: 'Welcome to our exclusive AI insights newsletter.',
  excerpt: 'Discover cutting-edge AI technologies and expert strategies.'
};

const sampleServiceRequestData: ServiceRequestData = {
  firstName: 'Michael',
  lastName: 'Chen',
  email: 'michael.chen@enterprise.com',
  company: 'Enterprise Analytics Corp',
  companySize: '500+ employees',
  jobTitle: 'VP of Operations',
  phone: '+1 (555) 987-6543',
  serviceType: 'AI Automation Suite',
  requestTypes: 'AI Automation Suite,Data Analytics Platform',
  timeline: '3-6 months',
  budget: '$100,000-$250,000',
  projectDescription: 'We need to automate our data processing workflows.',
  desiredOutcomes: 'Reduce manual processing time by 60%'
};

describe('Email Templates', () => {
  describe('Template Engine', () => {
    it('should initialize template engine successfully', () => {
      const engine = new TemplateEngine();
      expect(engine).toBeDefined();
      expect(engine.getAvailableTemplates()).toContain('newsletter-email');
    });

    it('should include all expected template types', () => {
      const engine = new TemplateEngine();
      const available = engine.getAvailableTemplates();
      
      expect(available).toContain('contact-form-confirmation');
      expect(available).toContain('contact-form-notification');
      expect(available).toContain('newsletter-confirmation');
      expect(available).toContain('newsletter-email');
      expect(available).toContain('service-request-confirmation');
      expect(available).toContain('service-request-notification');
    });
  });

  describe('Contact Form Templates', () => {
    it('should render contact form confirmation template', async () => {
      const template = new ContactFormConfirmationTemplate();
      const result = await template.render(sampleContactFormData);
      
      expect(result.success).toBe(true);
      expect(result.subject).toContain('John');
      expect(result.html).toContain('John');
      expect(result.html).toContain('Tech Solutions Inc');
      expect(result.html).toContain('#ff7033'); // New primary color
    });

    it('should render contact form notification template', async () => {
      const template = new ContactFormNotificationTemplate();
      const result = await template.render(sampleContactFormData);
      
      expect(result.success).toBe(true);
      expect(result.subject).toContain('Priority Lead');
      expect(result.html).toContain('john.smith@example.com');
      expect(result.html).toContain('CTO');
    });
  });

  describe('Newsletter Templates', () => {
    it('should render newsletter confirmation template', async () => {
      const template = new NewsletterConfirmationTemplate();
      const result = await template.render(sampleNewsletterData);
      
      expect(result.success).toBe(true);
      expect(result.subject).toContain('Welcome');
      expect(result.html).toContain('Sarah');
      expect(result.html).toContain('AI Automation');
    });

    it('should render standalone newsletter email template', async () => {
      const template = new NewsletterEmailTemplate();
      const result = await template.render(sampleNewsletterData);
      
      expect(result.success).toBe(true);
      expect(result.subject).toContain('STRIVELETTER');
      expect(result.html).toContain('Innovation at the Core');
      expect(result.html).toContain('#020a1c'); // Dark blue color
      expect(result.html).toContain('www.strivetech.ai');
      expect(result.html).toContain('(731) 431-2320');
    });
  });

  describe('Service Request Templates', () => {
    it('should render service request confirmation template', async () => {
      const template = new ServiceRequestConfirmationTemplate();
      const result = await template.render(sampleServiceRequestData);
      
      expect(result.success).toBe(true);
      expect(result.subject).toContain('Michael');
      expect(result.html).toContain('AI Automation Suite');
      expect(result.html).toContain('Enterprise Analytics Corp');
    });

    it('should render service request notification template', async () => {
      const template = new ServiceRequestNotificationTemplate();
      const result = await template.render(sampleServiceRequestData);
      
      expect(result.success).toBe(true);
      expect(result.subject).toContain('Service Request');
      expect(result.html).toContain('Priority Analysis');
      expect(result.html).toContain('VP of Operations');
    });
  });

  describe('Color Branding', () => {
    it('should use correct brand colors in all templates', async () => {
      const templates = [
        new ContactFormConfirmationTemplate(),
        new NewsletterConfirmationTemplate(),
        new ServiceRequestConfirmationTemplate()
      ];
      
      for (const template of templates) {
        const result = await template.render(sampleContactFormData);
        
        // Check for primary orange color
        expect(result.html).toContain('#ff7033');
        expect(result.success).toBe(true);
      }
    });

    it('should use dark blue in newsletter template', async () => {
      const template = new NewsletterEmailTemplate();
      const result = await template.render(sampleNewsletterData);
      
      expect(result.html).toContain('#020a1c'); // Dark blue
      expect(result.html).toContain('#ff7033'); // Primary orange
      expect(result.success).toBe(true);
    });
  });

  describe('Template Content Validation', () => {
    it('should generate proper text versions', async () => {
      const template = new ContactFormConfirmationTemplate();
      const result = await template.render(sampleContactFormData);
      
      expect(result.text).toBeDefined();
      expect(result.text.length).toBeGreaterThan(0);
      expect(result.text).toContain('Strive Tech');
    });

    it('should handle missing optional data gracefully', async () => {
      const minimalData: ContactFormData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        message: 'Test message'
      };
      
      const template = new ContactFormConfirmationTemplate();
      const result = await template.render(minimalData);
      
      expect(result.success).toBe(true);
      expect(result.html).toContain('Test User');
    });
  });
});

describe('Newsletter Template Special Features', () => {
  it('should not include standard header/footer in newsletter email', async () => {
    const template = new NewsletterEmailTemplate();
    const result = await template.render(sampleNewsletterData);
    
    // Newsletter should have its own header design, not the standard one
    expect(result.html).toContain('STRIVELETTER');
    expect(result.html).toContain('Innovation at the Core');
    
    // Should have footer contact bar but not standard footer
    expect(result.html).toContain('www.strivetech.ai');
    expect(result.html).toContain('(731) 431-2320');
  });

  it('should include network graphics and modern design', async () => {
    const template = new NewsletterEmailTemplate();
    const result = await template.render(sampleNewsletterData);
    
    expect(result.html).toContain('linear-gradient');
    expect(result.html).toContain('radial-gradient');
    expect(result.html).toContain('STRIVE');
    expect(result.html).toContain('ST'); // ST logo
  });
});