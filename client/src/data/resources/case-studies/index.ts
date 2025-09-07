// Individual case study exports
export { enterpriseAiImplementation } from './enterprise-ai-implementation';
export { healthcareAiTransformation } from './healthcare-ai-transformation';
export { financialFraudDetection } from './financial-fraud-detection';
export { manufacturingSmartFactory } from './manufacturing-smart-factory';
export { retailPersonalization } from './retail-personalization';

// Aggregated array for easy import
import { enterpriseAiImplementation } from './enterprise-ai-implementation';
import { healthcareAiTransformation } from './healthcare-ai-transformation';
import { financialFraudDetection } from './financial-fraud-detection';
import { manufacturingSmartFactory } from './manufacturing-smart-factory';
import { retailPersonalization } from './retail-personalization';

export const caseStudies = [
  enterpriseAiImplementation,
  healthcareAiTransformation,
  financialFraudDetection,
  manufacturingSmartFactory,
  retailPersonalization
];