// SAI Platform Data - Barrel Export
// Centralized export for all SAI data files

// Modules
export {
  saiModules,
  type SAIModule,
} from './modules';

// Pricing Tiers
export {
  pricingTiers,
  featureComparison,
  getTierById,
  getHighlightedTier,
  type PricingTier,
  type FeatureComparison,
} from './pricing-tiers';

// Roadmap
export {
  roadmapFeatures,
  roadmapPeriods,
  roadmapCategories,
  getFeaturesByCategory,
  getFeaturesByStatus,
  getFeaturesByPhase,
  type RoadmapFeature,
  type RoadmapPeriod,
  type RoadmapStatus,
  type RoadmapPhase,
} from './roadmap';

// Competitors
export {
  competitors,
  competitivePositioning,
  featureComparison as competitorFeatureComparison,
  costToReplicateScenarios,
  saiCompetitiveAdvantages,
  getCompetitorById,
  getCompetitorsByAiNative,
  getCostScenarioById,
  getPositiveSavingsScenarios,
  type Competitor,
  type CompetitorFeatureRow,
  type CostToReplicateScenario,
  type ToolCost,
  type FeatureValue,
} from './competitors';

// Market Statistics
export {
  marketStats,
  keyStats,
  getStatsByCategory,
  getStatById,
  getPainPointStats,
  getMarketSizeStats,
  getCompetitiveStats,
  type MarketStat,
  type MarketStatCategory,
} from './market-stats';

// Use Cases
export {
  useCases,
  agentTypes,
  getUseCasesByAgentType,
  getUseCaseById,
  type UseCase,
} from './use-cases';

// FAQs
export {
  faqs,
  faqGroups,
  getFAQsByCategory,
  getFAQById,
  searchFAQs,
  type FAQ,
  type FAQGroup,
  type FAQCategory,
} from './faqs';

// Success Stories (placeholder for now)
export {
  successStories,
  getSuccessStoriesByType,
  getFeaturedSuccessStories,
  getSuccessStoryById,
  type SuccessStory,
} from './success-stories';
