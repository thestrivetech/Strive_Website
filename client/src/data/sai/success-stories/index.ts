// SAI Platform Success Stories
// Placeholder for agent testimonials and success stories (Coming soon)

export interface SuccessStory {
  id: string;
  agentName: string;
  agentRole: string;
  location: string;
  agentType: 'solo' | 'team' | 'investor' | 'broker';
  quote: string;
  metrics: {
    metric: string;
    value: string;
  }[];
  photo?: string; // URL to agent photo
  featured?: boolean;
}

// Placeholder - no success stories yet (per user request)
// This structure is ready for when real testimonials are available
export const successStories: SuccessStory[] = [];

// Helper functions
export const getSuccessStoriesByType = (agentType: string): SuccessStory[] => {
  return successStories.filter(story => story.agentType === agentType);
};

export const getFeaturedSuccessStories = (): SuccessStory[] => {
  return successStories.filter(story => story.featured === true);
};

export const getSuccessStoryById = (id: string): SuccessStory | undefined => {
  return successStories.find(story => story.id === id);
};
