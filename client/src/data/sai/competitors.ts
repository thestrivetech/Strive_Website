// SAI Platform Competitor Analysis
// 6 major competitors in real estate CRM/software market

export interface Competitor {
  id: string;
  name: string;
  description: string;
  founded: number;
  headquarters: string;
  customers?: string;
  pricing: {
    model: string; // 'per-user' | 'flat-rate' | 'tiered'
    startingPrice: string;
    details: string[];
  };
  target: string; // Target customer segment
  strengths: string[];
  weaknesses: string[];
  features: {
    category: string;
    hasFeature: boolean;
    notes?: string;
  }[];
  whenTheyWin: string[]; // Scenarios where competitor is better choice
  whenSAIWins: string[]; // Scenarios where SAI is better choice
  migrationPath?: string;
}

export const competitors: Competitor[] = [
  {
    id: 'follow-up-boss',
    name: 'Follow Up Boss',
    description: 'The most popular real estate CRM in the U.S., known for simple lead management and automated follow-ups.',
    founded: 2011,
    headquarters: 'Charlotte, NC',
    customers: '25,000+ agents',
    pricing: {
      model: 'per-user',
      startingPrice: '$69/user/month',
      details: [
        'Standard: $69/user/month',
        'Premium: $99/user/month (includes text messaging)',
        'Annual discount: 10% (2 months free)',
        'Pay per contact after 5,000 contacts',
      ],
    },
    target: 'Solo agents and small teams (1-5 agents)',
    strengths: [
      'Clean UI and user-friendly',
      'Reliable and proven (14+ years)',
      'Strong email/SMS automation',
      'Extensive integrations (Zapier)',
      '24/7 live chat support',
      'Excellent email campaign builder',
    ],
    weaknesses: [
      'CRM-only (no transaction management)',
      'No AI content generation',
      'No market intelligence/data',
      'No social media scheduling',
      'Per-user pricing scales expensively',
      'Per-contact fees after 5,000',
    ],
    features: [
      { category: 'CRM & Lead Management', hasFeature: true },
      { category: 'Transaction Management', hasFeature: false },
      { category: 'AI Content Generation', hasFeature: false },
      { category: 'Social Media Scheduling', hasFeature: false },
      { category: 'Market Intelligence', hasFeature: false },
      { category: 'AI Assistant', hasFeature: false },
      { category: 'Zapier Integration', hasFeature: true },
    ],
    whenTheyWin: [
      "You're a solo agent on a tight budget ($69/mo vs. $999/mo)",
      'You only need CRM (no transaction mgmt, no marketing)',
      'You already have a tech stack you love and don\'t want to consolidate',
      'You need Zapier today (SAI coming Q2 2025)',
      'You want 10+ years of proven reliability',
      'You prioritize 24/7 live chat support',
    ],
    whenSAIWins: [
      "You're a team of 2+ agents (flat pricing saves money vs. per-user costs)",
      'You need transaction management (Follow Up Boss has no deal pipeline)',
      'You want all-in-one consolidation (tired of logging into 5+ tools)',
      'You need AI content generation',
      'You need market intelligence (REID)',
      "You're investor-focused (SAI's REID module built for investment properties)",
      'You want unlimited users without scaling costs',
    ],
    migrationPath: 'Export contacts to CSV from Follow Up Boss → Import to SAI CRM → Recreate automated workflows → Train team (1-hour onboarding) → Run parallel for 30 days. Estimated timeline: 2-3 weeks.',
  },
  {
    id: 'boomtown',
    name: 'BoomTown',
    description: 'Enterprise real estate platform focused on lead generation and team management, popular with large brokerages.',
    founded: 2006,
    headquarters: 'Charleston, SC',
    customers: '100,000+ agents (mostly enterprise)',
    pricing: {
      model: 'tiered',
      startingPrice: '$1,000/month',
      details: [
        'Essential: $1,000/month (up to 10 agents)',
        'Advanced: $1,500/month (up to 20 agents)',
        'Premium: $2,000-2,500/month (20+ agents)',
        '12-24 month contracts (early termination fees apply)',
        'Lead generation included (budget varies by plan)',
      ],
    },
    target: 'Large teams (10-100+ agents), brokerages',
    strengths: [
      'Lead generation included (IDX website, Facebook ads, Google ads)',
      'Advanced team management features',
      'Leaderboards and performance tracking',
      'Team goals tracking',
      'Mature platform (18+ years)',
      'Strong for large teams/brokerages',
    ],
    weaknesses: [
      'Expensive ($1,000-2,500/month)',
      'Long contracts (12-24 months)',
      'Steep learning curve',
      'No AI content generation',
      'No investment analysis tools',
      'Requires ad spend for lead gen ($500-2,000/mo typical)',
    ],
    features: [
      { category: 'CRM & Lead Management', hasFeature: true },
      { category: 'Lead Generation (IDX, Facebook/Google Ads)', hasFeature: true },
      { category: 'Transaction Management', hasFeature: true, notes: 'Basic' },
      { category: 'AI Content Generation', hasFeature: false },
      { category: 'Investment Analysis', hasFeature: false },
      { category: 'Team Performance Tracking', hasFeature: true, notes: 'Advanced' },
      { category: 'AI Assistant', hasFeature: false },
    ],
    whenTheyWin: [
      'You need lead generation included (IDX website, Facebook/Google ads)',
      "You're a large team or brokerage (20+ agents)",
      'You want advanced team performance tracking (leaderboards, goals, scorecards)',
      'You have a dedicated marketing budget for lead gen ($500-2,000/mo)',
      'You need an IDX website (SAI doesn\'t include website builder yet)',
    ],
    whenSAIWins: [
      'You want lower cost ($999/mo vs. $1,000-2,500/mo)',
      'You don\'t need lead generation included (handle your own ads or get referrals)',
      'You need AI content creation (BoomTown has none)',
      'You need investment analysis tools (SAI\'s REID module)',
      'You want month-to-month flexibility (no 12-24 month contracts)',
      'You have a small team (1-10 agents) - BoomTown may be overkill',
      'You want faster onboarding (SAI: 1-hour vs. BoomTown: 2-4 weeks)',
    ],
  },
  {
    id: 'liondesk',
    name: 'LionDesk',
    description: 'Budget-friendly real estate CRM with video email and text messaging capabilities.',
    founded: 2013,
    headquarters: 'Plano, TX',
    pricing: {
      model: 'per-user',
      startingPrice: '$50/user/month',
      details: [
        'Pro: $50/user/month',
        'Team: $99/user/month (includes team features)',
        'Annual discount: 20% off',
        'Includes text messaging and video email',
      ],
    },
    target: 'Solo agents and small teams on a budget',
    strengths: [
      'Affordable pricing ($50/user)',
      'Video email capabilities',
      'Text messaging included',
      'Good for budget-conscious agents',
      'Transaction coordinator features',
      'Mobile app available',
    ],
    weaknesses: [
      'CRM-only (no comprehensive transaction management)',
      'No AI content generation',
      'No market intelligence',
      'Limited automation',
      'Per-user pricing scales with team',
      'Basic feature set compared to all-in-one platforms',
    ],
    features: [
      { category: 'CRM & Lead Management', hasFeature: true },
      { category: 'Video Email', hasFeature: true },
      { category: 'Text Messaging', hasFeature: true },
      { category: 'Transaction Management', hasFeature: false, notes: 'Basic TC features only' },
      { category: 'AI Content Generation', hasFeature: false },
      { category: 'Market Intelligence', hasFeature: false },
      { category: 'AI Assistant', hasFeature: false },
    ],
    whenTheyWin: [
      "You're a solo agent needing only CRM ($50/mo vs. $999/mo)",
      'You prioritize video email capabilities',
      'You want text messaging included without extra cost',
      'You have a very tight budget',
      'You don\'t need transaction management or marketing tools',
    ],
    whenSAIWins: [
      "You're a team of 2+ agents ($100/mo for 2 users vs. $999/mo unlimited)",
      'You need all-in-one platform (CRM + transactions + marketing + AI)',
      'You need AI content generation (LionDesk has none)',
      'You need market intelligence (REID)',
      'You want unlimited users without per-user costs',
      "You're investor-focused (need ROI calculators)",
    ],
  },
  {
    id: 'salesforce',
    name: 'Salesforce Real Estate Cloud',
    description: 'Enterprise CRM powerhouse with real estate customizations, built on the world\'s #1 CRM platform.',
    founded: 1999,
    headquarters: 'San Francisco, CA',
    pricing: {
      model: 'per-user',
      startingPrice: '$150/user/month',
      details: [
        'Professional: $150/user/month',
        'Enterprise: $225/user/month',
        'Unlimited: $300/user/month',
        'Implementation costs: $20,000-50,000+',
        'Annual contracts required',
      ],
    },
    target: 'Large enterprises, national brokerages (100+ agents)',
    strengths: [
      'Most powerful CRM platform globally',
      'Infinite customization possibilities',
      'Advanced automation (Flow, Process Builder)',
      'Massive ecosystem of integrations',
      'Enterprise-grade security and compliance',
      'Dedicated account management',
    ],
    weaknesses: [
      'Extremely expensive ($150-300/user + $20-50k implementation)',
      'Overkill for most real estate teams',
      'Requires Salesforce admin/developer',
      'Steep learning curve',
      'No real estate features out-of-the-box',
      'Long implementation (6-12 months)',
    ],
    features: [
      { category: 'CRM & Lead Management', hasFeature: true, notes: 'Most advanced' },
      { category: 'Customization', hasFeature: true, notes: 'Infinite' },
      { category: 'Transaction Management', hasFeature: true, notes: 'Requires custom build' },
      { category: 'AI Content Generation', hasFeature: false },
      { category: 'Real Estate Features Out-of-Box', hasFeature: false },
      { category: 'Market Intelligence', hasFeature: false },
    ],
    whenTheyWin: [
      "You're a national brokerage with 100+ agents",
      'You have a dedicated Salesforce admin team',
      'You need infinite customization',
      'You have $50,000+ for implementation',
      'You require enterprise security/compliance (SOC 2, HIPAA)',
      'You want to build a completely custom platform',
    ],
    whenSAIWins: [
      'You need real estate features out-of-the-box (6 deal types, MLS content, ROI calculators)',
      "You don't want a $20-50k implementation project",
      'You want to start in hours, not months',
      'You have a team <100 agents',
      "You don't have a dedicated Salesforce admin",
      'You need AI content generation and market intelligence built-in',
    ],
  },
  {
    id: 'kvcore',
    name: 'kvCORE',
    description: 'All-in-one real estate platform by Inside Real Estate with lead generation, CRM, and IDX websites.',
    founded: 2014,
    headquarters: 'Calgary, Canada',
    pricing: {
      model: 'tiered',
      startingPrice: '$1,500/month',
      details: [
        'Team plan: $1,500+/month (pricing varies by team size)',
        'Brokerage plan: Custom pricing',
        '12-month contracts required',
        'Setup fees apply',
      ],
    },
    target: 'Medium to large teams (10-100+ agents)',
    strengths: [
      'All-in-one platform (CRM + website + lead gen)',
      'IDX website included',
      'Lead generation tools',
      'Mobile app',
      'Advanced automation',
      'Good for medium-large teams',
    ],
    weaknesses: [
      'Expensive ($1,500+ with 12-month contract)',
      'Complex platform with steep learning curve',
      'No AI content generation',
      'No AI assistant',
      'No investment analysis tools (REID)',
      'Lock-in contracts',
    ],
    features: [
      { category: 'CRM & Lead Management', hasFeature: true },
      { category: 'IDX Website', hasFeature: true },
      { category: 'Lead Generation', hasFeature: true },
      { category: 'Transaction Management', hasFeature: true },
      { category: 'AI Content Generation', hasFeature: false },
      { category: 'AI Assistant', hasFeature: false },
      { category: 'Investment Analysis', hasFeature: false },
    ],
    whenTheyWin: [
      'You need IDX website included',
      "You're a medium-large team (20-50 agents)",
      'You want proven all-in-one platform (10+ years)',
      'You need advanced website customization',
      'You can commit to 12-month contract',
    ],
    whenSAIWins: [
      'You want month-to-month flexibility (no 12-month lock-in)',
      'You want lower cost ($999/mo vs. $1,500+/mo)',
      'You need AI features (AI assistant, AI content generation)',
      'You need investment analysis tools (REID)',
      "You're a smaller team (1-20 agents)",
      'You want faster onboarding and simpler interface',
    ],
  },
  {
    id: 'wise-agent',
    name: 'Wise Agent',
    description: 'Budget-friendly CRM designed specifically for real estate agents with transaction management features.',
    founded: 2009,
    headquarters: 'Glendale, AZ',
    pricing: {
      model: 'per-user',
      startingPrice: '$39/user/month',
      details: [
        'Standard: $39/user/month',
        'Annual discount: $29/user/month (save $120/year)',
        'Unlimited contacts',
        '14-day free trial',
      ],
    },
    target: 'Solo agents on tight budgets',
    strengths: [
      'Most affordable ($39/user)',
      'Real estate-specific from day one',
      'Transaction management included',
      'Unlimited contacts',
      'Easy to learn',
      'Good for solo agents',
    ],
    weaknesses: [
      'Dated interface',
      'Limited AI/automation',
      'No AI content generation',
      'No market intelligence',
      'Basic feature set',
      'Per-user pricing (not good for teams)',
    ],
    features: [
      { category: 'CRM & Lead Management', hasFeature: true },
      { category: 'Transaction Management', hasFeature: true, notes: 'Basic' },
      { category: 'AI Content Generation', hasFeature: false },
      { category: 'Market Intelligence', hasFeature: false },
      { category: 'AI Assistant', hasFeature: false },
      { category: 'Social Media Scheduling', hasFeature: false },
    ],
    whenTheyWin: [
      "You're a solo agent on a very tight budget ($39/mo)",
      'You only need basic CRM + transaction tracking',
      "You don't need AI, market data, or advanced features",
      'You want the absolute lowest price',
      'You prefer simplicity over features',
    ],
    whenSAIWins: [
      "You're growing a team (Wise Agent: $39 × 10 = $390/mo vs. SAI: $999 unlimited)",
      'You need AI content generation',
      'You need market intelligence (REID)',
      'You need modern UI and advanced automation',
      'You want all-in-one platform with social scheduling, email marketing, AI',
      "You're investor-focused (need ROI calculators)",
    ],
  },
];

// Helper functions
export const getCompetitorById = (id: string): Competitor | undefined => {
  return competitors.find(c => c.id === id);
};

export const getCompetitorsByPricingModel = (model: string): Competitor[] => {
  return competitors.filter(c => c.pricing.model === model);
};

// Competitive positioning
export interface CompetitivePosition {
  saiSweetSpot: {
    teamSize: string;
    budget: string;
    useCase: string;
    painPoint: string;
    valueProp: string;
  };
  saiDifferentiators: string[];
  saiWinsWhen: string[];
  saiLosesWhen: string[];
}

export const competitivePositioning: CompetitivePosition = {
  saiSweetSpot: {
    teamSize: '2-50 agents (unlimited users is key differentiator)',
    budget: '$1,000-2,000/month for software',
    useCase: 'Need all-in-one (CRM + transactions + marketing + data + AI)',
    painPoint: 'Tool fragmentation, high per-user costs',
    valueProp: 'Replace 5+ tools with one platform. Save $6,000+/year.',
  },
  saiDifferentiators: [
    'Unlimited Users at Flat Pricing - Only SAI offers this in real estate CRM market',
    'AI-Native (12+ Models) - Built with AI from day one, not bolted on',
    'All-in-One Platform - 5 modules replace 5+ separate tools with 100% data sync',
    'Real Estate Specialized - 6 deal types, MLS-ready content, investment analysis (REID)',
  ],
  saiWinsWhen: [
    'Team size: 2+ agents (flat pricing advantage)',
    'Need: All-in-one consolidation',
    'Pain: Tool fragmentation, high costs',
    'Vertical: Investment-focused agents',
  ],
  saiLosesWhen: [
    'Solo agent on tight budget ($39-69/mo competitors)',
    'Need: IDX website (BoomTown, kvCORE)',
    'Need: Lead generation included (BoomTown, kvCORE)',
    'Need: Zapier today (Q2 2025 for SAI)',
    'Enterprise: 100+ agents (Salesforce\'s advanced features)',
  ],
};

// Positioning statements vs. each competitor
export const positioningStatements: Record<string, string> = {
  'follow-up-boss': 'Follow Up Boss is a great CRM, but it\'s just a CRM. SAI gives you CRM + transaction management + AI content + market data in one platform, at a flat rate for your entire team.',
  'boomtown': 'BoomTown costs $1,000-2,500/month and requires lead gen ad spend. SAI is $999/month all-in, with AI content generation that often outperforms BoomTown\'s templates.',
  'liondesk': 'LionDesk is affordable at $50/user, but multiply that by your team size and add tools for transactions, marketing, and data—you\'re at $400+/month per agent. SAI is $999 flat for unlimited users.',
  'salesforce': 'Salesforce is powerful but overkill for most real estate teams. SAI gives you real estate features out-of-the-box—6 deal types, MLS-ready content, ROI calculators—without a $50,000 implementation project.',
  'kvcore': 'kvCORE costs $1,500+ with a 12-month contract. SAI is $999 month-to-month, with AI features kvCORE doesn\'t have (AI assistant, AI content generation, investment analysis).',
  'wise-agent': 'Wise Agent is great for solo agents on a budget. But if you need AI content, market data, or you\'re growing a team, SAI\'s $999 flat rate for unlimited users is a better long-term investment.',
};
