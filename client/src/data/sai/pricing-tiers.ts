// SAI Platform Pricing Tiers
// 3 tiers: Free, Elite ($999/mo), Custom
// Complete feature comparison matrix

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  price: string;
  priceNumeric: number | null; // null for Custom
  billingInfo: string;
  description: string;
  features: string[];
  limitations?: string[];
  additionalBenefits?: string[];
  valueComparison?: string[];
  idealFor?: string[];
  cta: {
    text: string;
    href: string;
    subtext?: string;
    variant: 'primary' | 'secondary';
  };
  highlighted?: boolean;
}

export interface FeatureComparison {
  category: string;
  features: {
    name: string;
    free: string | boolean;
    elite: string | boolean;
    custom: string | boolean;
  }[];
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    badge: 'Perfect for Getting Started',
    price: '$0',
    priceNumeric: 0,
    billingInfo: 'Forever free • No credit card required',
    description: "Try SAI with real leads and deals to see if it's right for your business. Upgrade to Elite when you're ready for unlimited everything.",
    features: [
      '1 user account',
      'Up to 100 contacts',
      'Up to 10 active deals',
      'All 5 modules (CRM, The Office, Content Studio, REID, Global SAI)',
      'Smart lead scoring (HOT/WARM/COLD)',
      'Basic automation (3 automations max)',
      'Content generation (50 pieces/month)',
      'REID market data (view-only, 10 CA markets)',
      'Global SAI (100 AI queries/month)',
      'Email support (48-hour response)',
    ],
    limitations: [
      '100 contact limit (vs. unlimited on Elite)',
      '10 deal limit (vs. unlimited on Elite)',
      '50 content pieces/month (vs. unlimited on Elite)',
      '100 AI queries/month (vs. unlimited on Elite)',
      '3 automations max (vs. unlimited on Elite)',
    ],
    cta: {
      text: 'Start Free →',
      href: '/signup?plan=free',
      subtext: 'No credit card required',
      variant: 'secondary',
    },
  },
  {
    id: 'elite',
    name: 'Elite',
    badge: 'Most Popular',
    price: '$999',
    priceNumeric: 999,
    billingInfo: 'Billed monthly or $9,990/year (save $1,998)',
    description: 'Everything you need to run your entire real estate business from one platform. No limits, no add-ons, no surprises.',
    features: [
      'Unlimited users',
      'Unlimited contacts',
      'Unlimited deals',
      'All 5 modules with full access',
      'Advanced automation (unlimited workflows)',
      'Unlimited content generation',
      'REID market data (10 CA markets + custom imports)',
      'Global SAI (unlimited AI queries, all 12+ models)',
      'Priority email support (24-hour response)',
      'Phone support (business hours)',
      'Dedicated onboarding session (1 hour)',
      'Advanced analytics & reporting',
      'Team collaboration tools',
      'API access (coming Q2 2025)',
      'Quarterly strategy sessions',
    ],
    additionalBenefits: [
      'Unlimited document storage',
      'Advanced lead scoring with custom rules',
      'A/B testing for emails and social content',
      'White-label content (coming Q3 2025)',
      'Mobile app access (coming Q3 2025)',
      'SMS/WhatsApp integration (coming Q2 2025)',
      'DocuSign integration (coming Q1 2025)',
      'MLS integration (coming Q1 2025)',
    ],
    valueComparison: [
      'Follow Up Boss: $69/user/mo = $828/year for 1 user (CRM only)',
      'Dotloop: $29/mo (transaction management only)',
      'Jasper AI: $49/mo (content creation only)',
      'BoomTown: $750-1,500/mo (CRM + leads)',
      '',
      'Total: $800-1,500/mo for separate tools',
      'SAI Elite: $999/mo for EVERYTHING',
    ],
    cta: {
      text: 'Start Free Trial →',
      href: '/signup?plan=elite&trial=true',
      subtext: '14-day free trial • No credit card required • Upgrade anytime',
      variant: 'primary',
    },
    highlighted: true,
  },
  {
    id: 'custom',
    name: 'Custom',
    badge: 'For Growing Teams',
    price: "Let's Talk",
    priceNumeric: null,
    billingInfo: 'Custom pricing based on team size and needs',
    description: 'Tailored solutions for teams, brokerages, and enterprises. Custom features, integrations, and white-label options.',
    features: [
      'Everything in Elite, plus:',
      'Custom user limits (20, 50, 100+ users)',
      'White-label branding (your logo, colors, domain)',
      'SSO (Single Sign-On) for enterprise security',
      'Custom integrations (your MLS, CRM, tools)',
      'Dedicated account manager',
      'Custom training & onboarding for your team',
      'SLA guarantees (99.9% uptime)',
      'Advanced security & compliance (SOC 2, HIPAA if needed)',
      'Custom feature development (roadmap prioritization)',
      'Volume discounts for large teams',
      'Annual contract discounts (10-20% off)',
    ],
    idealFor: [
      'Real estate teams (10+ agents)',
      'Brokerages (50+ agents)',
      'Franchises (multiple locations)',
      'PropTech companies (white-label resale)',
    ],
    cta: {
      text: 'Contact Sales',
      href: '/contact?subject=custom-pricing',
      subtext: "We'll create a custom plan for your team",
      variant: 'secondary',
    },
  },
];

// Feature Comparison Matrix - 50+ features across 12 categories
export const featureComparison: FeatureComparison[] = [
  {
    category: 'USERS & CONTACTS',
    features: [
      { name: 'Number of users', free: '1', elite: 'Unlimited', custom: 'Unlimited' },
      { name: 'Number of contacts', free: '100', elite: 'Unlimited', custom: 'Unlimited' },
      { name: 'Contact import (CSV, other CRMs)', free: true, elite: true, custom: true },
      { name: 'Duplicate detection', free: true, elite: true, custom: true },
      { name: 'Custom contact fields', free: '5', elite: 'Unlimited', custom: 'Unlimited' },
      { name: 'Contact segmentation', free: 'Basic', elite: 'Advanced', custom: 'Advanced' },
      { name: 'Contact tags', free: true, elite: true, custom: true },
    ],
  },
  {
    category: 'LEAD MANAGEMENT',
    features: [
      { name: 'Smart lead scoring (HOT/WARM/COLD)', free: true, elite: true, custom: true },
      { name: 'Custom scoring rules', free: false, elite: true, custom: true },
      { name: 'Lead source tracking', free: true, elite: true, custom: true },
      { name: 'Lead assignment automation', free: false, elite: true, custom: true },
      { name: 'Lead nurture sequences', free: '3 max', elite: 'Unlimited', custom: 'Unlimited' },
      { name: 'Web form integrations', free: false, elite: true, custom: true },
    ],
  },
  {
    category: 'DEAL MANAGEMENT (THE OFFICE)',
    features: [
      { name: 'Number of active deals', free: '10', elite: 'Unlimited', custom: 'Unlimited' },
      { name: 'Deal types supported', free: 'All 6', elite: 'All 6', custom: 'All 6' },
      { name: 'Deal pipeline visualization', free: true, elite: true, custom: true },
      { name: 'Custom deal stages', free: false, elite: true, custom: true },
      { name: 'Deal document storage', free: '100MB', elite: 'Unlimited', custom: 'Unlimited' },
      { name: 'Commission calculator', free: true, elite: true, custom: true },
      { name: 'Commission split tracking', free: true, elite: true, custom: true },
      { name: 'Deal deadline reminders', free: true, elite: true, custom: true },
      { name: 'Team deal collaboration', free: false, elite: true, custom: true },
    ],
  },
  {
    category: 'CONTENT STUDIO',
    features: [
      { name: 'Content pieces generated/month', free: '50', elite: 'Unlimited', custom: 'Unlimited' },
      { name: 'Content types supported', free: 'All 13', elite: 'All 13', custom: 'All 13' },
      { name: 'AI models available', free: '3', elite: 'All 12+', custom: 'All 12+' },
      { name: 'Custom content templates', free: '5', elite: 'Unlimited', custom: 'Unlimited' },
      { name: 'Brand voice customization', free: 'Basic', elite: 'Advanced', custom: 'Advanced' },
      { name: 'A/B testing for emails', free: false, elite: true, custom: true },
      { name: 'Content performance analytics', free: false, elite: true, custom: true },
      { name: 'Social media scheduling', free: false, elite: true, custom: true },
      { name: 'Email campaign builder', free: 'Basic', elite: 'Advanced', custom: 'Advanced' },
    ],
  },
  {
    category: 'REID (MARKET INTELLIGENCE)',
    features: [
      { name: 'California markets covered', free: '10', elite: '10', custom: '10 + Custom' },
      { name: 'Market data access', free: 'View-only', elite: 'Full access', custom: 'Full access' },
      { name: 'ROI calculator', free: true, elite: true, custom: true },
      { name: 'Investment analysis tools', free: false, elite: true, custom: true },
      { name: 'Custom market data imports', free: false, elite: false, custom: true },
      { name: 'Client-facing market reports', free: false, elite: true, custom: true },
      { name: 'Neighborhood comparisons', free: false, elite: true, custom: true },
    ],
  },
  {
    category: 'GLOBAL SAI (AI ASSISTANT)',
    features: [
      { name: 'AI queries per month', free: '100', elite: 'Unlimited', custom: 'Unlimited' },
      { name: 'AI models available', free: '3 basic', elite: 'All 12+', custom: 'All 12+' },
      { name: 'Model selection', free: 'Auto', elite: 'Manual', custom: 'Manual' },
      { name: 'Custom AI prompts', free: '5', elite: 'Unlimited', custom: 'Unlimited' },
      { name: 'Document analysis', free: false, elite: true, custom: true },
      { name: 'Contract review', free: false, elite: true, custom: true },
      { name: 'Property research', free: true, elite: true, custom: true },
    ],
  },
  {
    category: 'AUTOMATION & WORKFLOWS',
    features: [
      { name: 'Automated workflows', free: '3', elite: 'Unlimited', custom: 'Unlimited' },
      { name: 'Workflow triggers', free: 'Basic', elite: 'All', custom: 'All' },
      { name: 'Workflow actions', free: 'Basic', elite: 'All', custom: 'All' },
      { name: 'Multi-step automations', free: false, elite: true, custom: true },
      { name: 'Conditional logic', free: false, elite: true, custom: true },
      { name: 'Scheduled automations', free: false, elite: true, custom: true },
    ],
  },
  {
    category: 'CALENDAR & REMINDERS',
    features: [
      { name: 'Calendar integration', free: true, elite: true, custom: true },
      { name: 'Automated reminders', free: true, elite: true, custom: true },
      { name: 'Reminder types', free: 'All 7', elite: 'All 7', custom: 'All 7' },
      { name: 'Recurring reminders', free: false, elite: true, custom: true },
      { name: 'Team calendar sharing', free: false, elite: true, custom: true },
    ],
  },
  {
    category: 'ANALYTICS & REPORTING',
    features: [
      { name: 'Basic dashboards', free: true, elite: true, custom: true },
      { name: 'Advanced analytics', free: false, elite: true, custom: true },
      { name: 'Custom reports', free: false, elite: true, custom: true },
      { name: 'Export to CSV/PDF', free: false, elite: true, custom: true },
      { name: 'Pipeline analytics', free: false, elite: true, custom: true },
      { name: 'Team performance metrics', free: false, elite: true, custom: true },
      { name: 'Goal tracking', free: false, elite: true, custom: true },
    ],
  },
  {
    category: 'INTEGRATIONS',
    features: [
      { name: 'DocuSign (coming Q1 2025)', free: false, elite: true, custom: true },
      { name: 'MLS integration (coming Q1 2025)', free: false, elite: true, custom: true },
      { name: 'QuickBooks (coming Q2 2025)', free: false, elite: true, custom: true },
      { name: 'SMS/WhatsApp (coming Q2 2025)', free: false, elite: true, custom: true },
      { name: 'API access (coming Q2 2025)', free: false, elite: true, custom: true },
      { name: 'Custom integrations', free: false, elite: false, custom: true },
      { name: 'Zapier webhooks', free: false, elite: true, custom: true },
    ],
  },
  {
    category: 'SUPPORT & SERVICES',
    features: [
      { name: 'Email support', free: '48-hour', elite: '24-hour', custom: '24-hour' },
      { name: 'Phone support', free: false, elite: 'Business hrs', custom: 'Priority' },
      { name: 'Dedicated onboarding', free: false, elite: '1 hour', custom: 'Custom' },
      { name: 'Dedicated account manager', free: false, elite: false, custom: true },
      { name: 'Training sessions', free: false, elite: 'Quarterly', custom: 'Custom' },
      { name: 'SLA guarantee', free: false, elite: false, custom: '99.9%' },
    ],
  },
  {
    category: 'SECURITY & COMPLIANCE',
    features: [
      { name: 'SSL encryption', free: true, elite: true, custom: true },
      { name: '2FA (two-factor authentication)', free: true, elite: true, custom: true },
      { name: 'SSO (Single Sign-On)', free: false, elite: false, custom: true },
      { name: 'SOC 2 compliance', free: false, elite: false, custom: true },
      { name: 'Custom security requirements', free: false, elite: false, custom: true },
    ],
  },
  {
    category: 'CUSTOMIZATION',
    features: [
      { name: 'White-label branding', free: false, elite: false, custom: true },
      { name: 'Custom domain', free: false, elite: false, custom: true },
      { name: 'Custom features', free: false, elite: false, custom: true },
      { name: 'Roadmap prioritization', free: false, elite: false, custom: true },
    ],
  },
];

// Helper function to get a specific tier by ID
export const getTierById = (id: string): PricingTier | undefined => {
  return pricingTiers.find(tier => tier.id === id);
};

// Helper function to get the highlighted tier (Elite)
export const getHighlightedTier = (): PricingTier | undefined => {
  return pricingTiers.find(tier => tier.highlighted);
};
