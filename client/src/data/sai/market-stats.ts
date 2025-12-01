// SAI Platform Market Statistics
// Verified data from SAI-PITCH-DECK-CONTEXT.md
// Source: NAR Statistics, Inman Reports, CB Insights, Gartner

export type MarketStatCategory = 'pain-point' | 'market-size' | 'opportunity' | 'competitive';

export interface MarketStat {
  id: string;
  category: MarketStatCategory;
  stat: string;
  context: string;
  source?: string;
  year?: number;
}

export const marketStats: MarketStat[] = [
  // Pain Points - Industry Problems
  {
    id: 'agent-churn',
    category: 'pain-point',
    stat: '87%',
    context: 'of agents leave the industry within 5 years',
    source: 'NAR Statistics',
  },
  {
    id: 'tool-spend',
    category: 'pain-point',
    stat: '$15,000+',
    context: 'annual software spend per agent on disconnected tools',
    source: 'Industry Research',
  },
  {
    id: 'inefficiency',
    category: 'pain-point',
    stat: '$2.3B',
    context: 'lost annually to industry inefficiency',
    source: 'CB Insights',
  },
  {
    id: 'admin-waste',
    category: 'pain-point',
    stat: '40%',
    context: 'of top performer time wasted on administrative tasks',
    source: 'NAR Statistics',
  },
  {
    id: 'daily-waste',
    category: 'pain-point',
    stat: '3+ hours',
    context: 'daily wasted on manual data entry and app switching',
    source: 'Industry Research',
  },
  {
    id: 'tool-fragmentation',
    category: 'pain-point',
    stat: '5-7',
    context: 'disconnected tools used by the average real estate agent',
    source: 'Industry Research',
  },

  // Market Size - Opportunity
  {
    id: 'market-size',
    category: 'market-size',
    stat: '$9.0B+',
    context: 'US Real Estate Tech Market (2024)',
    source: 'Gartner',
    year: 2024,
  },
  {
    id: 'licensed-agents',
    category: 'market-size',
    stat: '2.1M+',
    context: 'licensed real estate agents in the US',
    source: 'NAR Statistics',
    year: 2024,
  },
  {
    id: 'market-growth',
    category: 'market-size',
    stat: '12-15%',
    context: 'CAGR for real estate tech market',
    source: 'Gartner',
  },
  {
    id: 'avg-software-spend',
    category: 'market-size',
    stat: '$3,000-$15,000',
    context: 'annual software spend per agent',
    source: 'Industry Research',
  },

  // Competitive Advantages
  {
    id: 'ai-advantage',
    category: 'competitive',
    stat: '3-5 years',
    context: 'head start from AI-native architecture vs retrofitted competitors',
    source: 'SAI Analysis',
  },
  {
    id: 'cost-savings',
    category: 'competitive',
    stat: '$100-$500+',
    context: 'monthly savings vs equivalent competitor tool stacks',
    source: 'Verified Competitor Analysis',
  },
  {
    id: 'time-savings',
    category: 'competitive',
    stat: '15+ hours',
    context: 'saved per week through platform consolidation',
    source: 'SAI Analysis',
  },

  // Opportunity Stats
  {
    id: 'target-agents',
    category: 'opportunity',
    stat: '500,000+',
    context: 'tech-forward agents at top-performing brokerages',
    source: 'SAI Analysis',
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

// Key statistics for quick access
export const keyStats = {
  agentChurn: '87%',
  toolSpend: '$15,000+',
  inefficiency: '$2.3B',
  adminWaste: '40%',
  dailyWaste: '3+ hours',
  marketSize: '$9.0B+',
  licensedAgents: '2.1M+',
  aiAdvantage: '3-5 years',
  monthlySavings: '$100-$500+',
  timeSavings: '15+ hours',
};
