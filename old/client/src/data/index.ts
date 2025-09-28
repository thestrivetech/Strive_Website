// Export all resources page data (includes technology, blog-posts, whitepapers, case-studies, quizzes, featured)
export * from './resources';

// Export all portfolio page data
export * from './portfolio';

// Export industries and solutions data
export * from './industries';
export * from './industry-cards';

// Export solutions data with explicit naming to avoid conflicts
export { 
  solutions,
  solutionTypeOptions,
  solutionCorrelations,
  getSolutionById as getSolutionById,
  getSolutionsByCategory as getSolutionsByCategory,
  type Solution,
  type SolutionTypeOption
} from './solutions';

// Export solutions mapping with renamed functions to avoid conflicts
export { 
  solutionMappings,
  getSolutionById as getMappedSolutionById,
  getSolutionsByCategory as getMappedSolutionsByCategory,
  type SolutionMapping
} from './solutions-mapping';