// SAI Platform FAQs - 22 Questions
// Categories: Pricing & Billing, Features & Capabilities, Data & Migration, Support & Training, Technical & Integrations

export type FAQCategory = 'pricing' | 'features' | 'data' | 'support' | 'technical';

export interface FAQ {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

export interface FAQGroup {
  category: FAQCategory;
  title: string;
  faqs: FAQ[];
}

export const faqs: FAQ[] = [
  // PRICING & BILLING
  {
    id: 'pricing-01',
    category: 'pricing',
    question: 'What is the Free Month offer?',
    answer: 'When you purchase your first month of SAI Platform, you get the month of December for free! This means you pay for one month and get two months of full access to all features. This launch special is valid until January 1, 2026, and is available to all new customers as part of our first 10 legacy clients program.',
  },
  {
    id: 'pricing-02',
    category: 'pricing',
    question: 'Can I cancel anytime?',
    answer: 'Yes. SAI is month-to-month with no contracts or cancellation fees. You can cancel anytime from your account settings, and you\'ll retain access until the end of your current billing period. We\'ll even help you export your data if you decide to leave.',
  },
  {
    id: 'pricing-03',
    category: 'pricing',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and ACH bank transfers for annual plans. For Custom plans, we can also invoice via Net-30 terms.',
  },
  {
    id: 'pricing-04',
    category: 'pricing',
    question: 'Is there a discount for annual billing?',
    answer: 'Yes! Pay annually and save 20-30% depending on team size. Annual billing locks in your rate and provides additional savings compared to monthly billing.',
  },
  {
    id: 'pricing-05',
    category: 'pricing',
    question: 'Are there any limits on contacts or deals?',
    answer: 'No. All SAI Platform plans include unlimited contacts, unlimited deals, and unlimited content generation. You get full access to all 6 modules and every feature we offer: no limits, no hidden caps, no surprises.',
  },
  {
    id: 'pricing-06',
    category: 'pricing',
    question: 'Can I get a refund if I\'m not satisfied?',
    answer: 'Yes. We offer a 30-day money-back guarantee on all SAI Platform subscriptions. If you\'re not satisfied within the first 30 days, contact support for a full refund, no questions asked.',
  },

  // FEATURES & CAPABILITIES
  {
    id: 'features-01',
    category: 'features',
    question: 'Can SAI really replace all my current tools?',
    answer: 'For most agents, yes. SAI replaces CRM, transaction management, content creation, email marketing, market intelligence, and basic project management. The tools it may NOT replace: specialized accounting software (QuickBooks integration coming soon), video editing software, or highly specialized niche tools. For many agents, SAI eliminates 5-8 separate subscriptions.',
  },
  {
    id: 'features-02',
    category: 'features',
    question: 'What AI models does SAI Assistant include?',
    answer: 'SAI Platform includes access to multiple advanced AI models to handle any task. Our AI automatically selects the best model for each request, whether you\'re drafting emails, analyzing market data, or managing your CRM. All customers get unlimited access to our full AI capabilities.',
  },
  {
    id: 'features-03',
    category: 'features',
    question: 'Does SAI integrate with my MLS?',
    answer: 'MLS integration is coming in Q2 2026. You\'ll be able to sync listings directly from your MLS to SAI, auto-populate property data, and push listing descriptions back to your MLS. In the meantime, you can manually enter property information or import via CSV.',
  },
  {
    id: 'features-04',
    category: 'features',
    question: 'Can I use SAI for commercial real estate?',
    answer: 'Absolutely. SAI supports two commercial deal types: COMMERCIAL_SALE and COMMERCIAL_LEASE, with fields specific to commercial transactions (cap rate, NOI, CAM charges, TI allowances, etc.). Many commercial agents use REID for investment analysis and SAI Assistant for property research.',
  },
  {
    id: 'features-05',
    category: 'features',
    question: 'Does SAI work for teams and brokerages?',
    answer: 'Yes. SAI Platform supports unlimited users per account, so teams of any size can collaborate on contacts, deals, and content. We offer volume discounts for larger teams: the more seats you need, the more you save.',
  },
  {
    id: 'features-06',
    category: 'features',
    question: 'Can I customize SAI to match my brand?',
    answer: 'Yes! All users can customize email templates, content templates, and document templates with their branding. White-label branding (custom logo, colors, domain) is available for larger teams. Contact us for details.',
  },

  // DATA & MIGRATION
  {
    id: 'data-01',
    category: 'data',
    question: 'How do I import my contacts from my current CRM?',
    answer: 'SAI supports CSV imports and direct imports from popular CRMs (Follow Up Boss, LionDesk, HubSpot, Salesforce). During onboarding, we\'ll help you map fields and import your data. Most imports take 15-30 minutes depending on database size.',
  },
  {
    id: 'data-02',
    category: 'data',
    question: 'What happens to my data if I cancel?',
    answer: 'You own your data. Before canceling, you can export all contacts, deals, content, and documents as CSV files and PDFs. We retain your data for 90 days after cancellation in case you want to reactivate. After 90 days, data is permanently deleted per our privacy policy.',
  },
  {
    id: 'data-03',
    category: 'data',
    question: 'Is my data secure?',
    answer: 'Yes. SAI uses bank-level SSL encryption, SOC 2 compliance (Custom plans), two-factor authentication, and regular security audits. Your data is stored on secure AWS servers with automatic backups. We never sell or share your data with third parties.',
  },

  // SUPPORT & TRAINING
  {
    id: 'support-01',
    category: 'support',
    question: 'What kind of support do you offer?',
    answer: 'All SAI Platform customers receive email support (24-hour response), phone support during business hours (M-F 9am-6pm PT), and a 1-hour dedicated onboarding session. For larger teams (20+ seats), we offer custom plans with a dedicated account manager and priority support.',
  },
  {
    id: 'support-02',
    category: 'support',
    question: 'Do you offer training for my team?',
    answer: 'Yes! All SAI Platform customers get access to quarterly group training webinars (live Q&A sessions). For larger teams, we offer custom training sessions tailored to your needs. We\'ll train your entire brokerage if needed. We also provide a comprehensive knowledge base and video tutorials for self-service learning.',
  },
  {
    id: 'support-03',
    category: 'support',
    question: 'How long does onboarding take?',
    answer: 'Most users are up and running within 1-2 hours. All customers get a dedicated 1-hour onboarding call where we\'ll help you import data, set up automations, customize templates, and configure your account. For teams/brokerages, onboarding typically takes 1-2 weeks for full adoption.',
  },

  // TECHNICAL & INTEGRATIONS
  {
    id: 'technical-01',
    category: 'technical',
    question: 'Does SAI have a mobile app?',
    answer: 'Native mobile apps (iOS and Android) are coming in Q1 2026. In the meantime, SAI is fully mobile-responsive and works great in your phone\'s web browser. You can access everything from your phone today.',
  },
  {
    id: 'technical-02',
    category: 'technical',
    question: 'What integrations are coming soon?',
    answer: 'Our roadmap includes: Mobile app (Q1 2026), MLS integrations (Q2 2026), SMS/WhatsApp, QuickBooks, DocuSign, Google Workspace, and public API for custom integrations. All customers get early access to beta integrations.',
  },
  {
    id: 'technical-03',
    category: 'technical',
    question: 'Can I use SAI offline?',
    answer: 'SAI requires an internet connection for most features (it\'s a cloud-based platform). However, we\'re working on offline mode for mobile apps (launching Q1 2026) that will allow you to view contacts, deals, and content offline, with changes syncing when you reconnect.',
  },
  {
    id: 'technical-04',
    category: 'technical',
    question: 'Do you offer API access for custom integrations?',
    answer: 'Yes, API access is on our roadmap for all SAI Platform customers. You\'ll be able to programmatically access contacts, deals, content, and webhooks for automation. We\'ll provide comprehensive API documentation and support.',
  },
];

// Group FAQs by category
export const faqGroups: FAQGroup[] = [
  {
    category: 'pricing',
    title: 'Pricing & Billing',
    faqs: faqs.filter(faq => faq.category === 'pricing'),
  },
  {
    category: 'features',
    title: 'Features & Capabilities',
    faqs: faqs.filter(faq => faq.category === 'features'),
  },
  {
    category: 'data',
    title: 'Data & Migration',
    faqs: faqs.filter(faq => faq.category === 'data'),
  },
  {
    category: 'support',
    title: 'Support & Training',
    faqs: faqs.filter(faq => faq.category === 'support'),
  },
  {
    category: 'technical',
    title: 'Technical & Integrations',
    faqs: faqs.filter(faq => faq.category === 'technical'),
  },
];

// Helper functions
export const getFAQsByCategory = (category: FAQCategory): FAQ[] => {
  return faqs.filter(faq => faq.category === category);
};

export const getFAQById = (id: string): FAQ | undefined => {
  return faqs.find(faq => faq.id === id);
};

export const searchFAQs = (searchTerm: string): FAQ[] => {
  const lowerSearch = searchTerm.toLowerCase();
  return faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(lowerSearch) ||
      faq.answer.toLowerCase().includes(lowerSearch)
  );
};
