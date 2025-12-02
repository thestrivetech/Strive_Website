// SAI Platform Product Roadmap
// Q1 2025 → 2026+ feature timeline

export type RoadmapStatus = 'in-development' | 'planned' | 'coming-soon' | 'future';
export type RoadmapPhase = 'Q1-2025' | 'Q2-2025' | 'Q3-2025' | 'Q4-2025' | 'Q1-2026' | 'Q2-2026' | '2026' | '2026+';

export interface RoadmapFeature {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  phase: RoadmapPhase;
  category: string; // Integrations, AI, Mobile, Automation, etc.
  benefits: string[];
  useCases?: string[];
}

export interface RoadmapPeriod {
  period: RoadmapPhase;
  title: string;
  focusArea: string;
  features: RoadmapFeature[];
}

export const roadmapFeatures: RoadmapFeature[] = [
  // Q1 2025 - Integrations & Communications
  {
    id: 'third-party-integrations',
    title: 'Third-Party Integrations',
    description: 'Seamless integrations with DocuSign (e-signatures), Google Workspace (Calendar, Drive, Gmail, Meet), QuickBooks (accounting/tax), MLS (property data), and social media platforms (Facebook, Instagram, LinkedIn, Twitter, TikTok, YouTube).',
    status: 'in-development',
    phase: 'Q1-2025',
    category: 'Integrations',
    benefits: [
      'Eliminate switching between multiple platforms',
      'Automatic data sync across all your tools',
      'Save 10+ hours per week on manual data entry',
      'Professional workflows without the complexity',
    ],
    useCases: [
      'Sign documents with DocuSign from SAI',
      'Auto-sync calendar events with Google Calendar',
      'Export expenses to QuickBooks automatically',
      'Publish listings to MLS and social media simultaneously',
    ],
  },
  {
    id: 'sms-communications',
    title: 'SMS & Multi-Channel Communications',
    description: 'Twilio-powered SMS and WhatsApp messaging from within SAI. Send and receive text messages, automated notifications, and bulk messaging for market updates and open houses.',
    status: 'coming-soon',
    phase: 'Q1-2025',
    category: 'Communications',
    benefits: [
      'Meet clients where they are (98% open rate for SMS)',
      'Faster response times lead to more closed deals',
      'Automated reminders reduce no-shows',
      'Two-way conversations tracked in contact history',
    ],
    useCases: [
      'Open house invitations',
      'Showing confirmations',
      'Price drop alerts',
      'Offer status updates',
    ],
  },

  // Q2 2025 - Advanced Integrations
  {
    id: 'social-media-publishing',
    title: 'Social Media Direct Publishing',
    description: 'One-click publishing to Facebook, Instagram, LinkedIn, Twitter, TikTok, and YouTube with OAuth account connection. Schedule posts across all platforms simultaneously.',
    status: 'planned',
    phase: 'Q2-2025',
    category: 'Marketing',
    benefits: [
      'Schedule a month of social content in an hour',
      'Professional consistency without daily posting effort',
      'Real-time engagement tracking',
      'Platform-specific video optimization',
    ],
  },
  {
    id: 'mls-integration',
    title: 'MLS Integration',
    description: 'Official Multiple Listing Service data integration with automatic property data sync, listing synchronization, and comprehensive market data access.',
    status: 'planned',
    phase: 'Q2-2026',
    category: 'Integrations',
    benefits: [
      'Eliminate manual MLS searches',
      'Always have latest market information',
      'Create CMAs in minutes, not hours',
      'All MLS listings available for search',
    ],
  },
  {
    id: 'quickbooks-integration',
    title: 'QuickBooks & Intuit Tax Integration',
    description: 'QuickBooks Online sync with automatic expense tracking, tax-ready reports, and quarterly tax estimates. Reduce tax preparation time by 80%.',
    status: 'planned',
    phase: 'Q2-2025',
    category: 'Financial',
    benefits: [
      'Eliminate double data entry',
      'Save thousands on accounting fees',
      'Maximize deductions with proper categorization',
      'Year-end tax package ready for CPA',
    ],
  },

  // Q3 2025 - AI Intelligence & Mobile
  {
    id: 'predictive-lead-scoring',
    title: 'Advanced Lead Scoring with Predictive AI',
    description: 'Machine learning predicts conversion probability (0-100%). AI-powered lead qualification, smart routing, and win/loss pattern analysis.',
    status: 'coming-soon',
    phase: 'Q3-2025',
    category: 'AI',
    benefits: [
      'Focus time on leads most likely to close',
      'Increase conversion rates by 35-50%',
      'AI learns from your specific market',
      'Automated lead qualification via chat',
    ],
  },
  {
    id: 'agent-marketplace',
    title: 'Agent Lead Marketplace',
    description: 'Buy and sell leads with other agents, connect with service providers, and trade quality-rated leads with transparent metrics.',
    status: 'coming-soon',
    phase: 'Q3-2025',
    category: 'Platform',
    benefits: [
      'Monetize leads outside your service area',
      'Find qualified leads in your target market',
      'Generate passive income from referrals',
      'Build your preferred vendor network',
    ],
  },
  {
    id: 'google-workspace',
    title: 'Complete Google Workspace Integration',
    description: 'Seamless two-way sync with Google Calendar, Drive, Gmail, Contacts, and Meet. AI-powered document organization and analysis.',
    status: 'coming-soon',
    phase: 'Q3-2025',
    category: 'Integrations',
    benefits: [
      'Everything syncs automatically',
      'AI insights on your Drive documents',
      'Professional Gmail integration',
      'No duplicate data entry',
    ],
    useCases: [
      'Schedule showing in SAI → Appears in Google Calendar',
      'Client emails contract → SAI AI extracts deadlines → Creates tasks',
      'Upload to Drive → SAI AI categorizes → Files in correct folder',
    ],
  },

  // Q1 2026 - Mobile & Client Experience
  {
    id: 'mobile-apps',
    title: 'Mobile Apps (iOS & Android)',
    description: 'Native mobile apps with offline mode, push notifications, mobile document signing, and voice-to-text notes.',
    status: 'in-development',
    phase: 'Q1-2026',
    category: 'Mobile',
    benefits: [
      'Run your business from anywhere',
      'Update clients immediately after showings',
      'Never lose a deal because you weren\'t at your desk',
      'True mobile-first real estate',
    ],
  },
  {
    id: 'client-portal',
    title: 'Client Portal & Self-Service Accounts',
    description: 'Branded client portal with document tracking, self-service document upload, e-signature integration, and transaction status dashboard.',
    status: 'coming-soon',
    phase: 'Q4-2025',
    category: 'Client Experience',
    benefits: [
      'Reduce "Where do we stand?" calls by 90%',
      'Clients feel informed and in control',
      'Professional experience sets you apart',
      'Automated document collection saves hours',
    ],
  },
  {
    id: 'mortgage-lender-module',
    title: 'Mortgage Broker & Loan Officer Accounts',
    description: 'Dedicated workspace for mortgage professionals with loan pipeline tracking, pre-approval management, rate comparison tools, and seamless agent-lender collaboration. Real-time loan status updates sync directly to agent transactions.',
    status: 'planned',
    phase: 'Q2-2026',
    category: 'Collaboration',
    benefits: [
      'Eliminate back-and-forth calls about loan status',
      'Pre-approvals attached directly to buyer profiles',
      'Rate lock alerts and deadline tracking',
      'Strengthen agent-lender relationships with shared visibility',
    ],
    useCases: [
      'Lenders update loan status → agents notified instantly',
      'Pre-approval letters stored in client records',
      'Track multiple loan scenarios per buyer',
      'Coordinate closing timelines across all parties',
    ],
  },
  {
    id: 'ai-video-tours',
    title: 'AI-Generated Property Video & Virtual Tours',
    description: 'AI video generation for virtual property tours, automated narration, marketing videos, and virtual staging.',
    status: 'coming-soon',
    phase: 'Q4-2025',
    category: 'AI',
    benefits: [
      'Professional video without videographer costs ($500-2000 per property)',
      'Create unlimited marketing videos',
      'Stand out with cutting-edge AI technology',
      'Before/after renovation visualization',
    ],
  },
  {
    id: 'ai-market-reports',
    title: 'AI-Generated Market Reports & Predictions',
    description: 'Automated weekly/monthly market summaries, custom territory reports, price trend predictions, and branded PDF reports.',
    status: 'coming-soon',
    phase: 'Q4-2025',
    category: 'AI',
    benefits: [
      'Position yourself as the market authority',
      'Share data-driven insights clients can\'t get elsewhere',
      'Win listings by demonstrating market expertise',
      'Automated content saves 5-10 hours per week',
    ],
  },
  {
    id: 'ai-property-insights',
    title: 'AI Property Insights - Appreciation & Depreciation Analysis',
    description: 'Multi-timeframe appreciation forecasting, depreciation risk analysis, neighborhood growth trajectory, and investment timing recommendations.',
    status: 'coming-soon',
    phase: 'Q4-2025',
    category: 'AI',
    benefits: [
      'Give investor clients institutional-grade analysis',
      'Identify risky properties before purchase',
      'Timing recommendations increase client ROI',
      'Differentiate from agents who rely on gut feel',
    ],
  },

  // 2026 - Automation & White-Label
  {
    id: 'custom-ai-agents',
    title: 'Custom AI Agents & Assistants',
    description: 'Build your own AI agents with custom system prompts, specialized tool sets, and multi-agent workflows. Share with community or keep private.',
    status: 'future',
    phase: '2026',
    category: 'AI',
    benefits: [
      'Customize SAI to match your exact business model',
      'Automate repetitive tasks with AI that knows your style',
      'Clone your best practices across your team',
      'Agent marketplace for proven strategies',
    ],
  },
  {
    id: 'visual-workflow-builder',
    title: 'Visual Workflow Automation Builder',
    description: 'No-code drag-and-drop automation creation with trigger-based workflows, conditional logic, AI-powered actions, and webhook triggers.',
    status: 'coming-soon',
    phase: '2026',
    category: 'Automation',
    benefits: [
      'Automate your entire business process',
      'Eliminate manual task creation',
      'Ensure no lead falls through the cracks',
      'Scale your business without hiring',
    ],
  },
  {
    id: 'advanced-cma',
    title: 'Advanced CMA & Automated Market Analysis',
    description: 'One-click CMA generation with AI-selected comparables, automated market condition analysis, and professional branded reports.',
    status: 'future',
    phase: '2026',
    category: 'Analytics',
    benefits: [
      'Create CMAs in 2 minutes instead of 2 hours',
      'Win more listings with data-driven pricing',
      'Professional reports increase credibility',
      'AI does the analysis, you do the strategy',
    ],
  },
  {
    id: 'white-label-platform',
    title: 'White-Label Platform & Reseller Program',
    description: 'Custom branding, custom domain, reseller revenue sharing, and branded mobile apps. Perfect for brokerages and enterprises.',
    status: 'future',
    phase: '2026',
    category: 'Enterprise',
    benefits: [
      'Brokers can offer SAI as proprietary platform',
      'Teams can standardize on branded solution',
      'Create new revenue streams',
      'Attract and retain top talent',
    ],
  },
  {
    id: 'public-api',
    title: 'Public API & Developer Ecosystem',
    description: 'REST API access, webhook system, OAuth authentication, and complete developer documentation for custom integrations.',
    status: 'future',
    phase: '2026',
    category: 'Platform',
    benefits: [
      'Custom website integrations',
      'Third-party tool connections',
      'Custom reporting tools',
      'Integration with proprietary systems',
    ],
  },

  // 2026+ - Advanced Features
  {
    id: 'advanced-rag',
    title: 'Advanced RAG & Institutional Memory',
    description: 'Semantic document search, AI learns from transaction history, contextual recommendations, and multi-document analysis.',
    status: 'future',
    phase: '2026+',
    category: 'AI',
    benefits: [
      'Ask questions about documents in natural language',
      'AI learns from your entire transaction history',
      'Automated insights from past successes',
      'Patterns identified across thousands of deals',
    ],
  },
  {
    id: 'virtual-staging',
    title: 'Virtual Staging & 3D Visualization',
    description: 'AI-powered virtual staging, style customization, 3D property models, and before/after renovation visualization.',
    status: 'future',
    phase: '2026+',
    category: 'Marketing',
    benefits: [
      'Furnish empty properties with AI',
      'Interactive 3D walkthroughs',
      'Show renovation potential',
      'Multiple staging styles instantly',
    ],
  },
  {
    id: 'video-conferencing',
    title: 'Built-In Video Conferencing',
    description: 'In-platform video calls with screen sharing, recording capability, virtual showings, and calendar integration.',
    status: 'future',
    phase: '2026+',
    category: 'Communications',
    benefits: [
      'No Zoom link needed',
      'Conduct property tours via video',
      'Record consultations for reference',
      'Dedicated virtual spaces per client',
    ],
  },
  {
    id: 'multi-language',
    title: 'Multi-Language Support',
    description: 'Full platform available in Spanish, Mandarin Chinese, French, Portuguese, and German with AI translation for content.',
    status: 'future',
    phase: '2026+',
    category: 'Platform',
    benefits: [
      'Serve international clients',
      'Property descriptions in multiple languages',
      'Currency and unit conversion',
      'Expand to new markets',
    ],
  },
  {
    id: 'advanced-compliance',
    title: 'Advanced Compliance & Regulatory',
    description: 'Automated compliance checking, state-specific form libraries, regulatory updates, and audit report generation.',
    status: 'future',
    phase: '2026+',
    category: 'Compliance',
    benefits: [
      'AI verifies required documents present',
      'Automatic form updates when laws change',
      'Complete audit trail for regulatory review',
      'License tracking and expiration reminders',
    ],
  },
];

// Group features by period
export const roadmapPeriods: RoadmapPeriod[] = [
  {
    period: 'Q1-2025',
    title: 'Q1 2025',
    focusArea: 'Integrations & Communications',
    features: roadmapFeatures.filter(f => f.phase === 'Q1-2025'),
  },
  {
    period: 'Q2-2025',
    title: 'Q2 2025',
    focusArea: 'Advanced Integrations',
    features: roadmapFeatures.filter(f => f.phase === 'Q2-2025'),
  },
  {
    period: 'Q3-2025',
    title: 'Q3 2025',
    focusArea: 'AI Intelligence & Mobile Prep',
    features: roadmapFeatures.filter(f => f.phase === 'Q3-2025'),
  },
  {
    period: 'Q4-2025',
    title: 'Q4 2025',
    focusArea: 'Platform Refinement',
    features: roadmapFeatures.filter(f => f.phase === 'Q4-2025'),
  },
  {
    period: 'Q1-2026',
    title: 'Q1 2026',
    focusArea: 'Mobile Apps & Client Experience',
    features: roadmapFeatures.filter(f => f.phase === 'Q1-2026'),
  },
  {
    period: 'Q2-2026',
    title: 'Q2 2026',
    focusArea: 'MLS & Advanced Integrations',
    features: roadmapFeatures.filter(f => f.phase === 'Q2-2026'),
  },
  {
    period: '2026',
    title: '2026',
    focusArea: 'Automation & White-Label',
    features: roadmapFeatures.filter(f => f.phase === '2026'),
  },
  {
    period: '2026+',
    title: '2026+',
    focusArea: 'Advanced Enterprise Features',
    features: roadmapFeatures.filter(f => f.phase === '2026+'),
  },
];

// Helper functions
export const getFeaturesByCategory = (category: string): RoadmapFeature[] => {
  return roadmapFeatures.filter(f => f.category === category);
};

export const getFeaturesByStatus = (status: RoadmapStatus): RoadmapFeature[] => {
  return roadmapFeatures.filter(f => f.status === status);
};

export const getFeaturesByPhase = (phase: RoadmapPhase): RoadmapFeature[] => {
  return roadmapFeatures.filter(f => f.phase === phase);
};

// Categories for filtering
export const roadmapCategories = [
  'Integrations',
  'AI',
  'Mobile',
  'Communications',
  'Marketing',
  'Financial',
  'Platform',
  'Client Experience',
  'Automation',
  'Analytics',
  'Enterprise',
  'Compliance',
];
