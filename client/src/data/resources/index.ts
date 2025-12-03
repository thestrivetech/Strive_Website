// Export types
export type { Resource } from './types';

// Export individual category modules
export * from './blog-posts';
export * from './whitepapers';
export * from './case-studies';
export * from './featured';

// Import aggregated arrays from each category
import { blogPosts } from './blog-posts';
import { whitepapers } from './whitepapers';
import { caseStudies } from './case-studies';

// Combined resources array (maintains backward compatibility)
export const resources = [
  ...blogPosts,      // Blog posts
  ...whitepapers,    // Whitepapers
  ...caseStudies     // Case studies
];
