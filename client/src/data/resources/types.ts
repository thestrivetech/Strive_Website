export interface Resource {
  id: number;
  type: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  imageAlt: string;
  metadata: string;
  date: string;
  author?: string;
  readTime?: string;
  downloadCount?: string;
  tags: string[];
  content: {
    keyPoints: string[];
    insights: string[];
    actionItems: string[];
  };
  sources?: Array<{
    title: string;
    url: string;
    description?: string;
  }>;
  relatedSolutions?: string[];
}