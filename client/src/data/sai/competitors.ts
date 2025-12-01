// SAI Platform Competitor Analysis - Verified Data
// Source: SAI-Competitive-Analysis-Verified.md (November 26, 2025)
// All pricing and features verified from GetApp, Capterra, G2, AgentAdvice, and official websites

export interface Competitor {
  id: string;
  name: string;
  description: string;
  formerlyKnownAs?: string;
  pricing: {
    model: 'per-user' | 'flat-rate' | 'tiered';
    startingPrice: string;
    priceRange: string;
    details: string[];
  };
  aiNative: 'yes' | 'no' | 'partial';
  aiNativeNotes: string;
  features: {
    crm: boolean;
    transactionManagement: boolean | 'partial';
    transactionNotes?: string;
    aiContentCreation: boolean | 'basic';
    expenseTracking: boolean;
    aiCommandCenter: boolean | 'partial';
    idxWebsite: boolean;
    leadGeneration: boolean;
    mobileApp: boolean;
  };
  strengths: string[];
  weaknesses: string[];
  userSentiment: {
    pros: string[];
    cons: string[];
  };
  competitivePosition: string;
}

export const competitors: Competitor[] = [
  {
    id: 'boldtrail',
    name: 'BoldTrail',
    description: 'Enterprise real estate platform formerly known as kvCORE, focused on CRM and marketing automation for teams and brokerages.',
    formerlyKnownAs: 'kvCORE',
    pricing: {
      model: 'tiered',
      startingPrice: '$499/month',
      priceRange: '$499+',
      details: [
        '$499/month for solo agents (verified)',
        'Scales up for teams and brokerages',
        'Additional onboarding fee: $999 (some sources)',
        'Back Office module required for full transaction management',
      ],
    },
    aiNative: 'no',
    aiNativeNotes: 'Legacy platform retrofitted with AI features. Built on older kvCORE architecture, NOT AI-native from ground up.',
    features: {
      crm: true,
      transactionManagement: 'partial',
      transactionNotes: 'Requires BoldTrail Back Office (separate product/module) or third-party tools like dotloop',
      aiContentCreation: 'basic',
      expenseTracking: false,
      aiCommandCenter: false,
      idxWebsite: true,
      leadGeneration: true,
      mobileApp: true,
    },
    strengths: [
      'Comprehensive feature set',
      'Good for teams',
      'Centralized platform',
      'IDX websites with customization',
      'Campaign management and automation',
      'Integrations with Meta, dotloop, Zapier',
    ],
    weaknesses: [
      'Steep learning curve',
      'Can be clunky',
      'Customer support inconsistent',
      'Expensive for solo agents',
      'Requires additional modules for full functionality',
      'Not AI-native architecture',
    ],
    userSentiment: {
      pros: ['Comprehensive feature set', 'Good for teams', 'Centralized platform'],
      cons: ['Steep learning curve', 'Clunky interface', 'Customer support inconsistent', 'Expensive'],
    },
    competitivePosition: 'Strong CRM with marketing automation, but NOT AI-native and requires additional modules for transaction management.',
  },
  {
    id: 'lofty',
    name: 'Lofty.ai',
    description: 'AI-integrated real estate platform with CRM, lead generation, and transaction management. More AI features than most competitors.',
    formerlyKnownAs: 'Chime',
    pricing: {
      model: 'tiered',
      startingPrice: '$449/month',
      priceRange: '$449-$700',
      details: [
        'Core Plan: $449/month (verified)',
        'Premier Plan: $700/month (verified)',
        'Enterprise Plan: Up to $1,500/month (verified)',
        'Special pricing for Real Brokerage agents: $50/month (partnership)',
      ],
    },
    aiNative: 'partial',
    aiNativeNotes: 'Originally Chime, rebranded as Lofty with added AI capabilities. More AI-integrated than BoldTrail, but not originally built AI-native.',
    features: {
      crm: true,
      transactionManagement: true,
      transactionNotes: 'Complete transaction management integrated into platform',
      aiContentCreation: 'basic',
      expenseTracking: false,
      aiCommandCenter: 'partial',
      idxWebsite: true,
      leadGeneration: true,
      mobileApp: true,
    },
    strengths: [
      'AI-powered CRM with predictive insights',
      '33+ lead generation methods',
      'Social Studio (automated social media)',
      'Dynamic CMA tool',
      'Built-in transaction management',
      '360° cross-platform marketing',
    ],
    weaknesses: [
      'Expensive',
      'Customer support declined after India move',
      'Learning curve',
      'Limited customization on website',
      'Quality of leads varies',
      'AI features are additions, not core architecture',
    ],
    userSentiment: {
      pros: ['User-friendly', 'Comprehensive features', 'Good lead generation', 'AI features helpful'],
      cons: ['Expensive', 'Customer support issues', 'Learning curve', 'Limited website customization'],
    },
    competitivePosition: 'Strong AI-integrated platform with transaction management, but expensive and AI features are additions rather than core architecture.',
  },
  {
    id: 'follow-up-boss',
    name: 'Follow Up Boss',
    description: 'Focused CRM for lead management with strong automation. Entry-level pricing but CRM-only with no transaction management.',
    pricing: {
      model: 'per-user',
      startingPrice: '$58/month per user',
      priceRange: '$58-$833',
      details: [
        'Grow Plan: $58-$69/month per user (verified)',
        'Pro Plan: $416/month for teams (verified)',
        'Platform Plan: $833/month for large brokerages (30 users included)',
        'Dialer add-on: +$33/user/month',
        'Additional Pro users: +$41/user/month',
      ],
    },
    aiNative: 'no',
    aiNativeNotes: 'Traditional CRM platform with no AI-native features. Focused purely on CRM functionality.',
    features: {
      crm: true,
      transactionManagement: false,
      transactionNotes: 'CRM only - requires integration with Open To Close, Dotloop, or Skyslope',
      aiContentCreation: false,
      expenseTracking: false,
      aiCommandCenter: false,
      idxWebsite: false,
      leadGeneration: false,
      mobileApp: true,
    },
    strengths: [
      'Simple and easy to use',
      'Reliable and proven (14+ years)',
      'Good for lead follow-up',
      'Affordable entry price',
      'No contracts',
      'Strong integrations with lead sources (Zillow, Realtor.com, Facebook)',
    ],
    weaknesses: [
      'CRM only - no transaction management',
      'No AI content generation',
      'No AI assistant features',
      'Missing batch texting',
      'Expensive once you add features/users',
      'Requires multiple additional tools',
    ],
    userSentiment: {
      pros: ['Simple', 'Easy to use', 'Good for lead follow-up', 'Affordable entry', 'No contracts'],
      cons: ['Limited features', 'Missing transaction management', 'Lacks AI', 'Gets expensive with add-ons'],
    },
    competitivePosition: 'Entry-level CRM focused solely on lead management. NOT a comprehensive platform - requires multiple other tools to match SAI functionality.',
  },
  {
    id: 'cinc',
    name: 'CINC',
    description: 'Enterprise-level platform focused on done-for-you lead generation and CRM automation. Highest price point with included advertising.',
    pricing: {
      model: 'tiered',
      startingPrice: '$899/month',
      priceRange: '$899+',
      details: [
        'Starting at $899-$900/month (verified - SelectHub, HousingWire 2025)',
        'Pricing INCLUDES done-for-you lead generation (Google/Facebook ads)',
        'Cannot purchase CINC without included lead generation service',
        'Scales up based on team size and ad spend',
      ],
    },
    aiNative: 'no',
    aiNativeNotes: 'Legacy platform with added AI features. Has "CINC AI" but not built AI-native.',
    features: {
      crm: true,
      transactionManagement: 'partial',
      transactionNotes: 'Basic transaction tracking, e-signature, document storage. Often requires dotloop or Skyslope for full functionality.',
      aiContentCreation: 'basic',
      expenseTracking: false,
      aiCommandCenter: false,
      idxWebsite: true,
      leadGeneration: true,
      mobileApp: true,
    },
    strengths: [
      'Excellent lead quality',
      'Done-for-you advertising ($30M+ annual ad spend managed)',
      'Powerful CRM automation ("Autotracks")',
      'Comprehensive training and success coaching',
      'Strong for teams',
      'Dedicated support team',
    ],
    weaknesses: [
      'VERY expensive',
      'Steep learning curve',
      'Clunky interface',
      'Frequent price increases reported',
      "Can't buy without lead gen service",
      'Forced ongoing ad spend investment',
    ],
    userSentiment: {
      pros: ['Excellent lead quality', 'Powerful CRM automation', 'Comprehensive training', 'Strong for teams', 'Done-for-you advertising'],
      cons: ['Very expensive', 'Steep learning curve', 'Clunky interface', 'Frequent price increases', 'Forced ad spend'],
    },
    competitivePosition: 'Enterprise-level platform focused on lead generation and CRM automation. Strong competitor but 2-3X price of SAI and requires ongoing ad spend investment.',
  },
];

// Feature comparison for pricing page table
export type FeatureValue = boolean | 'partial' | 'basic' | string;

export interface CompetitorFeatureRow {
  feature: string;
  sai: FeatureValue;
  boldtrail: FeatureValue;
  lofty: FeatureValue;
  followUpBoss: FeatureValue;
  cinc: FeatureValue;
}

export const featureComparison: CompetitorFeatureRow[] = [
  {
    feature: 'Monthly Price',
    sai: '$499',
    boldtrail: '$499+',
    lofty: '$449-$700',
    followUpBoss: '$58-$833',
    cinc: '$899+'
  },
  {
    feature: 'AI-Native Architecture',
    sai: true,
    boldtrail: false,
    lofty: 'partial',
    followUpBoss: false,
    cinc: false
  },
  {
    feature: 'CRM',
    sai: true,
    boldtrail: true,
    lofty: true,
    followUpBoss: true,
    cinc: true
  },
  {
    feature: 'Transaction Management',
    sai: true,
    boldtrail: 'partial',
    lofty: true,
    followUpBoss: false,
    cinc: 'partial'
  },
  {
    feature: 'Predictive Market Intelligence',
    sai: true,
    boldtrail: false,
    lofty: false,
    followUpBoss: false,
    cinc: false
  },
  {
    feature: 'AI Content Creation',
    sai: true,
    boldtrail: 'basic',
    lofty: 'basic',
    followUpBoss: false,
    cinc: 'basic'
  },
  {
    feature: 'Expense & Tax Tracking',
    sai: true,
    boldtrail: false,
    lofty: false,
    followUpBoss: false,
    cinc: false
  },
  {
    feature: 'AI Command Center',
    sai: true,
    boldtrail: false,
    lofty: 'partial',
    followUpBoss: false,
    cinc: false
  },
  {
    feature: 'IDX Website',
    sai: true,
    boldtrail: true,
    lofty: true,
    followUpBoss: false,
    cinc: true
  },
  {
    feature: 'Mobile App',
    sai: true,
    boldtrail: true,
    lofty: true,
    followUpBoss: true,
    cinc: true
  },
];

// Cost to replicate SAI with competitor stacks
export interface ToolCost {
  name: string;
  monthlyPrice: number;
  purpose: string;
}

export interface CostToReplicateScenario {
  id: string;
  name: string;
  description: string;
  tools: ToolCost[];
  totalMonthlyLow: number;
  totalMonthlyHigh: number;
  saiPrice: number;
  monthlySavingsLow: number;
  monthlySavingsHigh: number;
}

export const costToReplicateScenarios: CostToReplicateScenario[] = [
  {
    id: 'boldtrail-stack',
    name: 'BoldTrail Stack',
    description: 'BoldTrail CRM with required add-ons for full functionality',
    tools: [
      { name: 'BoldTrail CRM', monthlyPrice: 499, purpose: 'CRM & Marketing' },
      { name: 'Back Office Module', monthlyPrice: 75, purpose: 'Transaction Management' },
      { name: 'QuickBooks', monthlyPrice: 30, purpose: 'Expense Tracking' },
      { name: 'ChatGPT Plus', monthlyPrice: 20, purpose: 'AI Assistance' },
      { name: 'Canva Pro', monthlyPrice: 13, purpose: 'Content Creation' },
    ],
    totalMonthlyLow: 612,
    totalMonthlyHigh: 662,
    saiPrice: 499,
    monthlySavingsLow: 113,
    monthlySavingsHigh: 163,
  },
  {
    id: 'fub-stack',
    name: 'Follow Up Boss Stack',
    description: 'Follow Up Boss with tools to match SAI functionality',
    tools: [
      { name: 'Follow Up Boss Pro', monthlyPrice: 416, purpose: 'CRM' },
      { name: 'Dotloop', monthlyPrice: 59, purpose: 'Transaction Management' },
      { name: 'QuickBooks', monthlyPrice: 30, purpose: 'Expense Tracking' },
      { name: 'ChatGPT Plus', monthlyPrice: 20, purpose: 'AI Assistance' },
      { name: 'Canva Pro', monthlyPrice: 13, purpose: 'Content Creation' },
      { name: 'Lead Gen Tool', monthlyPrice: 200, purpose: 'Lead Generation' },
    ],
    totalMonthlyLow: 738,
    totalMonthlyHigh: 1038,
    saiPrice: 499,
    monthlySavingsLow: 239,
    monthlySavingsHigh: 539,
  },
  {
    id: 'cinc-stack',
    name: 'CINC Alternative',
    description: 'CINC with additional tools for missing features',
    tools: [
      { name: 'CINC (includes leads)', monthlyPrice: 899, purpose: 'CRM & Lead Gen' },
      { name: 'QuickBooks', monthlyPrice: 30, purpose: 'Expense Tracking' },
      { name: 'ChatGPT Plus', monthlyPrice: 20, purpose: 'Advanced AI' },
    ],
    totalMonthlyLow: 949,
    totalMonthlyHigh: 949,
    saiPrice: 499,
    monthlySavingsLow: 450,
    monthlySavingsHigh: 450,
  },
  {
    id: 'entry-level-stack',
    name: 'Entry-Level Stack',
    description: 'Budget option (missing AI, advanced features, lead gen)',
    tools: [
      { name: 'Follow Up Boss Grow', monthlyPrice: 58, purpose: 'Basic CRM' },
      { name: 'Open To Close', monthlyPrice: 35, purpose: 'Transaction Management' },
      { name: 'QuickBooks', monthlyPrice: 30, purpose: 'Expense Tracking' },
      { name: 'Basic Tools', monthlyPrice: 20, purpose: 'Content' },
    ],
    totalMonthlyLow: 143,
    totalMonthlyHigh: 143,
    saiPrice: 499,
    monthlySavingsLow: -356, // This scenario costs less but is missing key features
    monthlySavingsHigh: -356,
  },
];

// Helper functions
export const getCompetitorById = (id: string): Competitor | undefined => {
  return competitors.find((c) => c.id === id);
};

export const getCompetitorsByAiNative = (aiNative: 'yes' | 'no' | 'partial'): Competitor[] => {
  return competitors.filter((c) => c.aiNative === aiNative);
};

export const getCostScenarioById = (id: string): CostToReplicateScenario | undefined => {
  return costToReplicateScenarios.find((s) => s.id === id);
};

export const getPositiveSavingsScenarios = (): CostToReplicateScenario[] => {
  return costToReplicateScenarios.filter((s) => s.monthlySavingsLow > 0);
};

// Key competitive advantages for messaging
export const saiCompetitiveAdvantages = [
  {
    title: 'True AI-Native Architecture',
    description: 'SAI is built from the ground up with AI at the core. Competitors retrofitted AI onto legacy platforms.',
    advantage: '3-5 year technological head start',
  },
  {
    title: 'Proprietary AI Models',
    description: 'Market Velocity Intelligence (~10 day accuracy) and Precision Valuation Intelligence (~7% accuracy). NO competitor offers predictive market timing.',
    advantage: 'Exclusive predictive capabilities',
  },
  {
    title: 'Complete All-in-One Platform',
    description: 'Only SAI includes CRM + Transaction Mgmt + Expense Tracking + AI Command Center in one platform.',
    advantage: 'True consolidation, not partial solutions',
  },
  {
    title: 'Price-to-Value Ratio',
    description: 'SAI at $499/month matches BoldTrail but with more features. Building equivalent stack costs $612-$1,038/month.',
    advantage: 'Save $100-$500+/month',
  },
  {
    title: 'No Hidden Costs',
    description: 'BoldTrail has onboarding fees, Lofty requires premium tiers, Follow Up Boss needs add-ons, CINC forces ad spend. SAI is all-inclusive.',
    advantage: 'Transparent, predictable pricing',
  },
];

// Positioning statement
export const competitivePositioning = {
  headline: 'No competitor offers SAI\'s combination of AI-native architecture, predictive intelligence, and complete all-in-one functionality',
  subheadline: 'While competitors retrofit AI onto legacy platforms, SAI was built AI-first from day one. This architectural advantage gives us a 3-5 year head start that cannot be easily replicated.',
  costSummary: 'Cost to Replicate SAI with Competitors: $600-$1,000+/month across 3-5 platforms. SAI delivers everything for $499/month.',
};
