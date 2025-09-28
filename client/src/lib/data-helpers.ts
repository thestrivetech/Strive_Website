import { 
  industryOptions, 
  industrySpecificSolutions, 
  industryCorrelations,
  type IndustryOption,
  type IndustrySolution 
} from "@/data/industries";
import { 
  solutions, 
  solutionTypeOptions, 
  solutionCorrelations,
  type Solution,
  type SolutionTypeOption 
} from "@/data/solutions";
import { 
  industryCards,
  type IndustryCard 
} from "@/data/industry-cards";

// Industry helper functions
export const getIndustryByValue = (value: string): IndustryOption | undefined => {
  return industryOptions.find(industry => industry.value === value);
};

export const getIndustryLabel = (value: string): string => {
  const industry = getIndustryByValue(value);
  return industry?.label || value;
};

export const getIndustrySolutions = (industryId: string): IndustrySolution[] => {
  return industrySpecificSolutions[industryId] || [];
};

// Solution helper functions
export const getSolutionsByIndustry = (industryValue: string): Solution[] => {
  // Map industry values to industry names used in solutions
  const industryMapping: Record<string, string[]> = {
    "healthcare": ["Healthcare"],
    "finance": ["Financial Services"],
    "manufacturing": ["Manufacturing"],
    "retail": ["Retail", "E-commerce"],
    "technology": ["Technology"],
    "education": ["Education"],
    "real-estate": ["Real Estate"],
    "legal": ["Legal", "Legal Services"],
    "logistics": ["Supply Chain"],
    "hospitality": ["Hospitality"],
    "energy": ["Energy"],
    "government": ["Government"],
    "insurance": ["Insurance"],
    "automotive": ["Automotive"],
    "agriculture": ["Agriculture"],
    "media": ["Media", "Content Media", "Marketing", "Content Creation"],
    "gaming": ["Gaming"],
    "esports": ["eSports"],
    "nonprofit": ["Non-profit"],
    "telecommunications": ["Telecommunications"],
    "transportation": ["Transportation"]
  };
  
  const targetIndustries = industryMapping[industryValue] || [];
  return solutions.filter(solution =>
    solution.applicableIndustries.some(industry =>
      targetIndustries.some(targetIndustry =>
        industry.toLowerCase().includes(targetIndustry.toLowerCase()) ||
        targetIndustry.toLowerCase().includes(industry.toLowerCase())
      )
    )
  );
};

export const getIndustriesBySolution = (solutionType: string): string[] => {
  // Get the solution type option to get the proper label
  const solutionOption = solutionTypeOptions.find(opt => opt.value === solutionType);
  if (!solutionOption) return [];
  
  // Get correlated industries from the mapping
  return solutionCorrelations[solutionType] || [];
};

export const getCorrelatedSolutionTypes = (industryValue: string): string[] => {
  return industryCorrelations[industryValue] || [];
};

export const getCorrelatedIndustries = (solutionType: string): string[] => {
  return solutionCorrelations[solutionType] || [];
};

// Count functions
export const getSolutionCountForIndustry = (industryValue: string): number => {
  return getSolutionsByIndustry(industryValue).length;
};

export const getSolutionCountForSolutionType = (solutionType: string): number => {
  const solutionOption = solutionTypeOptions.find(opt => opt.value === solutionType);
  if (!solutionOption) return 0;
  
  return solutions.filter(solution => solution.category === solutionOption.label).length;
};

export const getIndustryCountForSolutionType = (solutionType: string): number => {
  return getCorrelatedIndustries(solutionType).length;
};

// Industry card helpers
export const getIndustryCard = (industryValue: string): IndustryCard | undefined => {
  return industryCards.find(card => card.industryValue === industryValue);
};

export const getIndustryCardsByPrimarySolution = (solutionType: string): IndustryCard[] => {
  return industryCards.filter(card => 
    card.primarySolutions.includes(solutionType)
  );
};

// Filtering helpers
export const getFilteredContent = (filterType: 'all' | 'industry' | 'solution', filterValue: string): (Solution | IndustryCard)[] => {
  let contentItems: (Solution | IndustryCard)[] = [];
  
  if (filterType === 'all') {
    // Show all solutions + all industry cards at the end
    contentItems = [...solutions, ...industryCards];
  } else if (filterType === 'industry') {
    if (filterValue === 'all-industries') {
      // Show all industry cards only
      contentItems = [...industryCards];
    } else {
      // Show relevant solutions + specific industry card
      const relevantSolutions = getSolutionsByIndustry(filterValue);
      const relevantIndustryCard = getIndustryCard(filterValue);
      contentItems = [...relevantSolutions, ...(relevantIndustryCard ? [relevantIndustryCard] : [])];
    }
  } else if (filterType === 'solution') {
    if (filterValue === 'all-solutions') {
      // Show all solutions only (no industry cards for solution type filters)
      contentItems = [...solutions];
    } else {
      // Show solutions matching specific solution type only
      const solutionType = solutionTypeOptions.find(opt => opt.value === filterValue);
      if (solutionType) {
        contentItems = solutions.filter(solution => solution.category === solutionType.label);
      }
    }
  } else {
    contentItems = [...solutions];
  }
  
  return contentItems;
};

// Type guard to check if content item is a solution
export const isSolution = (item: Solution | IndustryCard): item is Solution => {
  return 'technologies' in item && 'features' in item;
};

// Type guard to check if content item is an industry card  
export const isIndustryCard = (item: Solution | IndustryCard): item is IndustryCard => {
  return 'keyApplications' in item && 'primarySolutions' in item;
};