// Individual whitepaper exports
export { cloudSecurityBestPractices } from './cloud-security-best-practices';
export { aiMlCompleteGuide } from './ai-ml-complete-guide';
export { computerVisionIntelligence } from './computer-vision-intelligence';
export { nlpMastery } from './nlp-mastery';
export { ethicalAIImplementation } from './SAI-whitepaper';

// Aggregated array for easy import
import { cloudSecurityBestPractices } from './cloud-security-best-practices';
import { aiMlCompleteGuide } from './ai-ml-complete-guide';
import { computerVisionIntelligence } from './computer-vision-intelligence';
import { nlpMastery } from './nlp-mastery';
import { ethicalAIImplementation } from './SAI-whitepaper';

export const whitepapers = [
  ethicalAIImplementation,
  // Temporarily hiding existing whitepapers
  // cloudSecurityBestPractices,
  // aiMlCompleteGuide,
  // computerVisionIntelligence,
  // nlpMastery
];