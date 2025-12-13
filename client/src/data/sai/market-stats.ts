// SAI Platform Market Statistics
// Verified data from NAR, BLS, and industry research
// Sources: NAR 2025 Technology Survey, NAR 2025 Member Profile, BLS, McKinsey, T3 Sixty

export type MarketStatCategory = 'pain-point' | 'market-size' | 'opportunity' | 'competitive';

export interface MarketStat {
  id: string;
  category: MarketStatCategory;
  stat: string;
  context: string;
  source?: string;
  sourceUrl?: string;
  year?: number;
}

export const marketStats: MarketStat[] = [
  // Pain Points - Industry Problems (Verified)
  {
    id: 'agent-churn',
    category: 'pain-point',
    stat: '75%',
    context: 'of real estate agents fail within the first year (87% within 5 years)',
    source: 'Industry Analysis',
    sourceUrl: 'https://www.tomferry.com/blog/87-of-all-agents-fail-in-real-estate/',
  },
  {
    id: 'tool-fragmentation',
    category: 'pain-point',
    stat: '23',
    context: 'average technology tools in a brokerage agent tech stack',
    source: 'T3 Sixty Research',
    sourceUrl: 'https://agently.substack.com/p/23-tools-per-agent-or-why-is-real',
    year: 2025,
  },
  {
    id: 'tech-spend',
    category: 'pain-point',
    stat: '24%',
    context: 'of agents spend $500+/month on technology tools',
    source: 'NAR 2025 Technology Survey',
    sourceUrl: 'https://www.nar.realtor/research-and-statistics/research-reports/realtor-technology-survey',
    year: 2025,
  },
  {
    id: 'lead-response',
    category: 'pain-point',
    stat: '47 hours',
    context: 'average lead response time (only 27% of leads get contacted at all)',
    source: 'Industry Research',
    sourceUrl: 'https://theclose.com/real-estate-lead-generation-statistics/',
    year: 2024,
  },
  {
    id: 'conversion-rate',
    category: 'pain-point',
    stat: '0.4-1.2%',
    context: 'average real estate lead conversion rate',
    source: 'Industry Research',
    sourceUrl: 'https://www.realgeeks.com/blog/how-much-do-real-estate-leads-convert',
    year: 2024,
  },
  {
    id: 'follow-up-gap',
    category: 'pain-point',
    stat: '48%',
    context: 'of agents do not follow up after their first call',
    source: 'Industry Research',
    sourceUrl: 'https://www.followupboss.com/blog/real-estate-lead-follow-up',
    year: 2024,
  },

  // Market Size & Opportunity (Verified)
  {
    id: 'licensed-agents',
    category: 'market-size',
    stat: '532,000+',
    context: 'real estate agents and brokers in the US',
    source: 'Bureau of Labor Statistics',
    sourceUrl: 'https://www.bls.gov/ooh/sales/real-estate-brokers-and-sales-agents.htm',
    year: 2024,
  },
  {
    id: 'crm-market',
    category: 'market-size',
    stat: '$25.7B',
    context: 'CRM sales software market (12.2% growth in 2024)',
    source: 'Gartner',
    sourceUrl: 'https://www.gartner.com/en/documents/7029598',
    year: 2024,
  },
  {
    id: 'ai-adoption',
    category: 'market-size',
    stat: '68%',
    context: 'of real estate agents have adopted AI tools',
    source: 'NAR 2025 Technology Survey',
    sourceUrl: 'https://www.nar.realtor/research-and-statistics/research-reports/realtor-technology-survey',
    year: 2025,
  },
  {
    id: 'ai-content',
    category: 'market-size',
    stat: '46%',
    context: 'of agents use AI-generated content',
    source: 'NAR 2025 Technology Survey',
    sourceUrl: 'https://www.housingwire.com/articles/nar-2025-technology-survey-realtor-tech-usage-trends/',
    year: 2025,
  },

  // Competitive Advantages (Qualitative - Internal Claims)
  {
    id: 'platform-consolidation',
    category: 'competitive',
    stat: 'All-in-One',
    context: 'replaces 5+ separate tools with one integrated platform',
    source: 'SAI Platform',
  },
  {
    id: 'ai-native',
    category: 'competitive',
    stat: 'AI-Native',
    context: 'built with AI from the ground up, not retrofitted',
    source: 'SAI Platform',
  },
  {
    id: 'unlimited-users',
    category: 'competitive',
    stat: 'Unlimited',
    context: 'users at flat monthly rate (no per-seat fees)',
    source: 'SAI Platform',
  },

  // Opportunity Stats (Verified)
  {
    id: 'crm-lead-gen',
    category: 'opportunity',
    stat: '23%',
    context: 'of agents say CRM is their top lead-generating tool',
    source: 'NAR 2025 Technology Survey',
    sourceUrl: 'https://www.nar.realtor/research-and-statistics/research-reports/realtor-technology-survey',
    year: 2025,
  },
  {
    id: 'buyer-interview',
    category: 'opportunity',
    stat: '75%',
    context: 'of buyers interview only one real estate agent during their home search',
    source: 'Industry Research',
    sourceUrl: 'https://theclose.com/real-estate-lead-generation-statistics/',
    year: 2024,
  },
];

// Helper functions
export const getStatsByCategory = (category: MarketStatCategory): MarketStat[] => {
  return marketStats.filter((s) => s.category === category);
};

export const getStatById = (id: string): MarketStat | undefined => {
  return marketStats.find((s) => s.id === id);
};

export const getPainPointStats = (): MarketStat[] => {
  return getStatsByCategory('pain-point');
};

export const getMarketSizeStats = (): MarketStat[] => {
  return getStatsByCategory('market-size');
};

export const getCompetitiveStats = (): MarketStat[] => {
  return getStatsByCategory('competitive');
};

// Key statistics for quick access (Verified)
export const keyStats = {
  agentChurn: '75%',
  toolFragmentation: '23 tools',
  techSpend: '24% spend $500+/mo',
  leadResponse: '47 hours avg',
  conversionRate: '0.4-1.2%',
  aiAdoption: '68%',
  aiContent: '46%',
  crmLeadGen: '23%',
};
