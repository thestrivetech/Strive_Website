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
  // Full content structure for whitepapers with professional viewing
  fullContent?: {
    sections: Array<{
      id: string;
      title: string;
      content: string;
      subsections?: Array<{
        id: string;
        title: string;
        content: string;
      }>;
    }>;
    citations?: Array<{
      number: string;
      text: string;
      url?: string;
    }>;
  };
}