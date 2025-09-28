// ROI Calculator Type Definitions
// Based on the comprehensive algorithm from docs/roi-calc.md

export type IndustryName = 
  | 'Healthcare'
  | 'Financial Services'
  | 'Retail'
  | 'Manufacturing'
  | 'Technology'
  | 'Government'
  | 'Legal'
  | 'Real Estate'
  | 'Transportation'
  | 'Insurance'
  | 'Energy'
  | 'Telecommunications'
  | 'Agriculture'
  | 'Media & Entertainment'
  | 'Logistics & Supply Chain'
  | 'Hospitality & Tourism'
  | 'Gaming'
  | 'Energy & Utilities'
  | 'eSports'
  | 'All Industries'
  | 'Education';

export interface SolutionData {
  name: string;
  roiMultiplier: number;
  timeSavingsPercent: number;
  annualBenefitPer1K: number;
  description: string;
}

export interface ROICalculationResult {
  fiveYearROI: string;
  timeSavings: string;
  annualReturn: string;
  roiMultiplier: number;
}

export interface IndustrySolutions {
  [solutionKey: string]: SolutionData;
}

export interface ROICalculatorConfig {
  industryBaseROI: Record<IndustryName, number>;
  industrySolutions: Record<IndustryName, IndustrySolutions>;
}