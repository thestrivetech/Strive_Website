export interface Project {
  id: number;
  title: string;
  category: string;
  type: string;
  technologies: string[];
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  features: string[];
  metrics: Record<string, string | undefined>;
  sources: Array<{
    title: string;
    url: string;
    description?: string;
  }>;
  relatedSolutions: string[];
}