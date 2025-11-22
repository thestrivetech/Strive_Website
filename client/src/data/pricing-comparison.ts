// Competitor Software Stack Pricing Data
// Research-backed pricing for real estate agent software tools

export interface CompetitorTool {
  name: string;
  category: string;
  monthlyPrice: number;
  annualPrice: number;
  saiReplacement: string; // Which SAI module replaces this tool
  logo?: string; // Optional logo path
  commonComplaints: string[];
  sourceUrl: string;
}

export const competitorTools: CompetitorTool[] = [
  {
    name: 'Follow Up Boss',
    category: 'CRM & Lead Management',
    monthlyPrice: 58,
    annualPrice: 696,
    saiReplacement: 'CRM & Lead Management',
    commonComplaints: [
      'Premium pricing at $69/user',
      'Expensive for small teams',
      'Per-user fees add up quickly',
    ],
    sourceUrl: 'https://leadsync.me/blog/real-estate-crms/'
  },
  {
    name: 'Mailchimp Essentials',
    category: 'Email Marketing',
    monthlyPrice: 13,
    annualPrice: 156,
    saiReplacement: 'Content Studio',
    commonComplaints: [
      'Separate tool from CRM',
      'Manual contact syncing',
      'Limited automation on lower tiers',
    ],
    sourceUrl: 'https://mailchimp.com/pricing/'
  },
  {
    name: 'Hootsuite Professional',
    category: 'Social Media Management',
    monthlyPrice: 99,
    annualPrice: 1188,
    saiReplacement: 'Content Studio',
    commonComplaints: [
      'Expensive for solo agents',
      'Complex interface',
      'Doesn\'t integrate with real estate CRM',
    ],
    sourceUrl: 'https://zapier.com/blog/hootsuite-vs-buffer/'
  },
  {
    name: 'Dotloop',
    category: 'Transaction Management',
    monthlyPrice: 32,
    annualPrice: 384,
    saiReplacement: 'The Office',
    commonComplaints: [
      'Separate from CRM',
      'Data duplication issues',
      'Learning curve for new users',
    ],
    sourceUrl: 'https://www.paperlesspipeline.com/blog/skyslope-vs-dotloop-vs-paperless-pipeline'
  },
  {
    name: 'CoStar',
    category: 'Market Data & Analytics',
    monthlyPrice: 455,
    annualPrice: 5460,
    saiReplacement: 'REID',
    commonComplaints: [
      'Very expensive ($455/month)',
      'Overkill for residential agents',
      'Primarily commercial real estate focused',
    ],
    sourceUrl: 'https://www.vendr.com/buyer-guides/costar'
  },
  {
    name: 'Jasper AI Creator',
    category: 'AI Content Creation',
    monthlyPrice: 39,
    annualPrice: 468,
    saiReplacement: 'Content Studio',
    commonComplaints: [
      'Not real estate specific',
      'Separate tool requiring login',
      'Doesn\'t integrate with CRM or social scheduling',
    ],
    sourceUrl: 'https://www.jasper.ai/pricing'
  },
  {
    name: 'DocuSign Realtor',
    category: 'E-Signature',
    monthlyPrice: 20,
    annualPrice: 240,
    saiReplacement: 'The Office',
    commonComplaints: [
      'Separate from transaction management',
      'Per-envelope fees on some plans',
      'Additional cost beyond CRM',
    ],
    sourceUrl: 'https://ecom.docusign.com/plans-and-pricing/real-estate'
  },
  {
    name: 'AgentFire + IDX',
    category: 'Website & IDX',
    monthlyPrice: 144,
    annualPrice: 1728,
    saiReplacement: 'SAI Platform Website Integration',
    commonComplaints: [
      'Expensive setup fees',
      'Doesn\'t sync leads to CRM automatically',
      'Requires tech knowledge to customize',
    ],
    sourceUrl: 'https://placester.com/real-estate-marketing-academy/agent-fire-vs-placester'
  },
];

// Agent profile software stack examples
export interface AgentProfile {
  profileName: string;
  description: string;
  toolsUsed: {
    tool: string;
    monthlyPrice: number;
  }[];
  totalMonthly: number;
  totalAnnual: number;
  painPoints: string[];
}

export const agentProfiles: AgentProfile[] = [
  {
    profileName: 'Budget-Conscious Solo Agent',
    description: 'New agent with limited budget, uses free/cheap tools',
    toolsUsed: [
      { tool: 'LionDesk CRM', monthlyPrice: 25 },
      { tool: 'Mailchimp Free', monthlyPrice: 0 },
      { tool: 'Buffer (1 channel)', monthlyPrice: 6 },
      { tool: 'DocuSign Starter', monthlyPrice: 10 },
      { tool: 'Basic Website', monthlyPrice: 50 },
      { tool: 'ChatGPT Plus', monthlyPrice: 20 },
      { tool: 'MLS Subscription', monthlyPrice: 50 },
    ],
    totalMonthly: 161,
    totalAnnual: 1932,
    painPoints: [
      '7 different logins to manage',
      'Manual data entry between tools',
      'Limited automation features',
      'No integration between platforms',
    ],
  },
  {
    profileName: 'Mid-Tier Active Agent',
    description: 'Established agent closing 20-30 deals/year',
    toolsUsed: [
      { tool: 'Follow Up Boss', monthlyPrice: 58 },
      { tool: 'Mailchimp Essentials', monthlyPrice: 13 },
      { tool: 'Hootsuite Professional', monthlyPrice: 99 },
      { tool: 'Dotloop', monthlyPrice: 32 },
      { tool: 'DocuSign Realtor', monthlyPrice: 20 },
      { tool: 'AgentFire + IDX', monthlyPrice: 144 },
      { tool: 'Jasper AI', monthlyPrice: 39 },
      { tool: 'MLS Subscription', monthlyPrice: 75 },
    ],
    totalMonthly: 480,
    totalAnnual: 5760,
    painPoints: [
      '8 different platforms to manage',
      'Data syncing nightmares',
      '15+ hours/week on admin tasks',
      'Overlapping features being paid for',
    ],
  },
  {
    profileName: 'High-Volume Investor Agent',
    description: 'Investor-focused agent needing market data and ROI tools',
    toolsUsed: [
      { tool: 'Follow Up Boss', monthlyPrice: 58 },
      { tool: 'Mailchimp', monthlyPrice: 20 },
      { tool: 'Hootsuite', monthlyPrice: 99 },
      { tool: 'Dotloop', monthlyPrice: 32 },
      { tool: 'CoStar', monthlyPrice: 455 },
      { tool: 'Jasper AI', monthlyPrice: 59 },
      { tool: 'DocuSign', monthlyPrice: 40 },
      { tool: 'AgentFire', monthlyPrice: 144 },
      { tool: 'MLS Subscription', monthlyPrice: 100 },
    ],
    totalMonthly: 1007,
    totalAnnual: 12084,
    painPoints: [
      '9 separate subscriptions',
      '$12,000+/year in software costs',
      'CoStar is $455/month alone',
      'Creating investment reports takes 3 hours each',
      'No unified platform',
    ],
  },
];

// SAI Platform pricing tiers (waitlist/TBD)
export interface SAIPricingTier {
  tierName: string;
  description: string;
  estimatedMonthly: string; // "TBD" or price
  features: string[];
  idealFor: string;
  savings: {
    vsProfile: string;
    monthlySavings: string;
    annualSavings: string;
  };
}

export const saiPricingTiers: SAIPricingTier[] = [
  {
    tierName: 'Solo Agent',
    description: 'Perfect for individual agents building their business',
    estimatedMonthly: 'Join Waitlist',
    features: [
      'All 5 modules included',
      'Unlimited contacts',
      '10,000 emails/month',
      'AI content generation',
      'Standard support',
      '1 user',
    ],
    idealFor: 'Solo agents closing 10-20 deals/year',
    savings: {
      vsProfile: 'Budget-Conscious Solo Agent',
      monthlySavings: '$100-200',
      annualSavings: '$1,200-2,400',
    },
  },
  {
    tierName: 'Active Agent',
    description: 'For busy agents who need advanced automation',
    estimatedMonthly: 'Join Waitlist',
    features: [
      'All 5 modules included',
      'Unlimited contacts',
      'Unlimited emails',
      'Advanced AI features',
      'Priority support',
      '1-2 users',
    ],
    idealFor: 'Active agents closing 20-40 deals/year',
    savings: {
      vsProfile: 'Mid-Tier Active Agent',
      monthlySavings: '$250-450',
      annualSavings: '$3,000-5,400',
    },
  },
  {
    tierName: 'Team/Brokerage',
    description: 'Scalable solution for teams and brokerages',
    estimatedMonthly: 'Join Waitlist',
    features: [
      'All 5 modules included',
      'Unlimited everything',
      'Enterprise automation',
      'Dedicated support',
      'White-label options',
      'Unlimited users',
    ],
    idealFor: 'Teams (5+ agents) and brokerages',
    savings: {
      vsProfile: 'High-Volume Investor Agent',
      monthlySavings: '$800-1,500/team',
      annualSavings: '$9,600-18,000/team',
    },
  },
];

// Calculate total cost of fragmented stack
export const calculateFragmentedStackCost = (tools: string[]): number => {
  return tools.reduce((total, toolName) => {
    const tool = competitorTools.find(t => t.name === toolName);
    return total + (tool?.monthlyPrice || 0);
  }, 0);
};

// Common tool combinations
export const commonToolStacks = {
  minimal: ['Follow Up Boss', 'Mailchimp Essentials', 'DocuSign Realtor'],
  standard: ['Follow Up Boss', 'Mailchimp Essentials', 'Hootsuite Professional', 'Dotloop', 'DocuSign Realtor', 'AgentFire + IDX'],
  premium: ['Follow Up Boss', 'Mailchimp Essentials', 'Hootsuite Professional', 'Dotloop', 'CoStar', 'Jasper AI Creator', 'DocuSign Realtor', 'AgentFire + IDX'],
};
