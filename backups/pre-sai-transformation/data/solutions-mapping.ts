// Solution mapping system for portfolio-to-solutions navigation
export interface SolutionMapping {
  id: string;
  title: string;
  category: string;
  path: string; // URL path for navigation
}

export const solutionMappings: SolutionMapping[] = [
  // Healthcare Solutions
  {
    id: "healthcare-solutions",
    title: "Healthcare Solutions",
    category: "Healthcare",
    path: "/solutions?solution=healthcare"
  },
  
  // Financial Services
  {
    id: "financial-services",
    title: "Financial Services Solutions", 
    category: "Finance",
    path: "/solutions?solution=finance"
  },
  
  // Manufacturing Solutions
  {
    id: "manufacturing-solutions",
    title: "Manufacturing Solutions",
    category: "Manufacturing", 
    path: "/solutions?solution=manufacturing"
  },
  
  // AI & Automation Solutions
  {
    id: "ai-automation",
    title: "AI & Automation",
    category: "Technology",
    path: "/solutions?solution=ai-automation"
  },
  
  // Computer Vision
  {
    id: "computer-vision",
    title: "Computer Vision",
    category: "Technology",
    path: "/solutions?solution=computer-vision"
  },
  
  // Data Analytics
  {
    id: "data-analytics", 
    title: "Data Analytics",
    category: "Technology",
    path: "/solutions?solution=data-analytics"
  },
  
  // Natural Language Processing
  {
    id: "nlp-solutions",
    title: "Natural Language Processing",
    category: "Technology", 
    path: "/solutions?solution=nlp"
  },
  
  // Process Automation
  {
    id: "process-automation",
    title: "Process Automation",
    category: "Technology",
    path: "/solutions?solution=process-automation"
  },
  
  // Cloud Infrastructure
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    category: "Technology",
    path: "/solutions?solution=cloud-infrastructure"
  },
  
  // Security & Compliance
  {
    id: "security-compliance",
    title: "Security & Compliance", 
    category: "Technology",
    path: "/solutions?solution=security-compliance"
  }
];

// Helper function to get solution by ID
export const getSolutionById = (id: string): SolutionMapping | undefined => {
  return solutionMappings.find(solution => solution.id === id);
};

// Helper function to get solutions by category
export const getSolutionsByCategory = (category: string): SolutionMapping[] => {
  return solutionMappings.filter(solution => solution.category === category);
};