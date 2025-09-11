import { Project } from '../types';

export const neuralLanguageAssistant: Project = {
  id: 1,
  title: "Neural Language Assistant",
  category: "AI Agent",
  type: "demo",
  technologies: ["GPT-4", "React", "Node.js", "Python"],
  shortDescription: "Advanced conversational AI that understands context and provides intelligent responses across multiple domains.",
  fullDescription: "A sophisticated AI assistant powered by state-of-the-art language models, capable of understanding nuanced conversations, maintaining context across long interactions, and providing expert-level assistance in various fields including business analysis, technical support, and creative writing.",
  imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
  demoUrl: "https://demo.strive.ai/neural-assistant",
  githubUrl: "https://github.com/strive-ai/neural-assistant",
  features: ["Multi-turn conversations", "Domain expertise", "Context retention", "Real-time responses"],
  metrics: { "Accuracy": "94.2%", "Response Time": "1.2s", "User Satisfaction": "4.8/5" },
  sources: [
    {
      title: "OpenAI GPT-4 Technical Report",
      url: "https://arxiv.org/abs/2303.08774",
      description: "Technical foundations for large language models"
    },
    {
      title: "Conversational AI Best Practices - Microsoft Research",
      url: "https://www.microsoft.com/en-us/research/publication/conversational-ai/",
      description: "Industry standards for conversational AI systems"
    },
    {
      title: "Natural Language Understanding Benchmarks",
      url: "https://paperswithcode.com/task/natural-language-understanding",
      description: "Performance benchmarks and evaluation metrics"
    }
  ],
  relatedSolutions: ["ai-automation", "nlp-solutions", "healthcare-solutions"]
};