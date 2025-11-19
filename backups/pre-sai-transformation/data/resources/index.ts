// Export types
export type { Resource } from './types';

// Export individual category modules
export * from './technology';
export * from './blog-posts';
export * from './whitepapers';
export * from './case-studies';
export * from './quizzes';
export * from './featured';

// Import aggregated arrays from each category
import { technologyCards } from './technology';
import { blogPosts } from './blog-posts';
import { whitepapers } from './whitepapers';
import { caseStudies } from './case-studies';

// Combined resources array (maintains backward compatibility)
export const resources = [
  ...blogPosts,      // IDs 1, 4, 5
  ...whitepapers,    // IDs 2, 6, 7, 8  
  ...caseStudies     // IDs 3, 9, 10, 11, 12
];

// Export technology cards separately (as they were in original structure)
export { technologyCards };