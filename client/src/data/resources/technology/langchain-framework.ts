import { Resource } from '../types';

export const langchainFramework: Resource = {
  id: 107,
  type: "TECH GUIDE",
  title: "LangChain Framework",
  shortDescription: "Powerful framework for building applications with large language models and external data sources.",
  fullDescription: "LangChain revolutionizes how developers build LLM-powered applications by providing a comprehensive framework for chaining language models with external tools, APIs, and data sources. This guide explores advanced patterns including retrieval-augmented generation (RAG), agents with tool usage, memory management, and complex reasoning chains. Learn to build sophisticated AI applications that can interact with databases, APIs, and perform multi-step reasoning tasks.",
  imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  imageAlt: "LangChain framework architecture",
  metadata: "LLM Framework",
  date: "LangChain v0.1",
  author: "Strive AI Team",
  readTime: "18 min",
  tags: ["LangChain", "LLM", "RAG", "AI Agents"],
  content: {
    keyPoints: [
      "Modular components for chaining LLM operations",
      "Built-in support for vector databases and embeddings",
      "Agent framework for tool usage and API integration",
      "Memory management for conversational contexts",
      "Extensive library of pre-built chains and prompts"
    ],
    insights: [
      "LangChain applications show 70% faster development cycles",
      "RAG implementations improve answer accuracy by 45%",
      "Agent-based architectures handle complex tasks 80% more effectively"
    ],
    actionItems: [
      "Set up LangChain with your preferred LLM provider",
      "Build a simple question-answering chain",
      "Implement RAG with vector database integration",
      "Create custom agents with external tool access"
    ]
  }
};