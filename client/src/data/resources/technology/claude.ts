import { Resource } from '../types';

export const claude: Resource = {
  id: 121,
  type: "TECH GUIDE",
  title: "Claude",
  shortDescription: "Claude is Anthropic's advanced conversational AI assistant focused on safe, explainable, and high-performing language and reasoning for enterprise workflows and developer teams.",
  fullDescription: "Deep research synthesis, analytical report writing, and regulatory compliance audits. AI co-pilot for software engineering and troubleshooting in secure environments. Institutional documentation, risk review, or governance with auditing trails.",
  imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  imageAlt: "Claude AI assistant interface",
  metadata: "AI Assistant",
  date: "Claude 3.5 Sonnet",
  author: "Strive AI Team",
  readTime: "14 min",
  tags: ["Claude", "Anthropic", "AI Assistant", "Constitutional AI", "Safety"],
  content: {
    keyPoints: [
      "Tuned for responsible, transparent, and value-aligned interactions",
      "Delivers fast, accurate answers for complex business and technical questions",
      "Supports API integrations and custom prompt engineering",
      "Largest publicly-available context window on the market (200K tokens+)",
      "Competes with GPT-4 and Gemini in enterprise LLM benchmarks"
    ],
    insights: [
      "Outpaces peers in enterprise adoption seeking ethical and trustworthy AI",
      "Hands-down leader for large-context synthesis, analysis, and Q&A tasks",
      "Gets regular trust and safety updates per Anthropic's Constitutional AI approach"
    ],
    actionItems: [
      "Start with Claude-instant or Claude-2 using the web portal or API",
      "Explore Anthropic's prompt engineering templates for advanced use",
      "Deploy to customer support, legal, or research functions for best-in-class accuracy and safety"
    ]
  }
};