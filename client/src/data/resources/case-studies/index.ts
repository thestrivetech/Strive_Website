// Real Estate Case Study Exports (SAI Platform focused)
export { realEstateAiTransformation } from './real-estate-ai-transformation';
export { retailWalmartAiImplementation } from './retail-walmart-ai-implementation'; // Transformed to Orange County Realty
export { financialServicesAutomation } from './financial-services-automation'; // Transformed to Solo Agent Success

// Aggregated array for easy import (Real Estate only)
import { realEstateAiTransformation } from './real-estate-ai-transformation';
import { retailWalmartAiImplementation } from './retail-walmart-ai-implementation';
import { financialServicesAutomation } from './financial-services-automation';

export const caseStudies = [
  realEstateAiTransformation,      // Premier Realty Group - Large brokerage
  retailWalmartAiImplementation,     // Orange County Realty - 50-agent team
  financialServicesAutomation        // Sarah Thompson - Solo agent
];