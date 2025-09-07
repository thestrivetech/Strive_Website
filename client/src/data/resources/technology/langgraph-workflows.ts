import { Resource } from '../types';

export const langgraphWorkflows: Resource = {
  id: 117,
  type: "TECH GUIDE",
  title: "LangGraph Workflows",
  shortDescription: "Graph-based framework for building stateful, multi-actor applications with LLMs.",
  fullDescription: "LangGraph extends LangChain with graph-based workflows, enabling the creation of sophisticated multi-agent systems and stateful applications. This guide covers graph construction, state management, conditional logic, and agent coordination patterns. Learn to build complex AI workflows where multiple agents collaborate, make decisions, and maintain context across extended interactions for enterprise-scale AI applications.",
  imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  imageAlt: "LangGraph workflow visualization",
  metadata: "Workflow Framework",
  date: "LangGraph 2024",
  author: "Strive AI Team",
  readTime: "20 min",
  tags: ["LangGraph", "Workflows", "State Management", "AI Orchestration"],
  content: {
    keyPoints: [
      "Graph-based architecture for complex AI workflows",
      "Built-in state management and persistence",
      "Conditional routing and decision logic",
      "Multi-agent coordination and communication",
      "Visual workflow design and monitoring"
    ],
    insights: [
      "Graph-based workflows improve task completion by 75%",
      "Stateful applications maintain context 90% more effectively",
      "Visual workflow design reduces development time by 50%"
    ],
    actionItems: [
      "Design workflow graphs for your use cases",
      "Implement state management and persistence",
      "Build multi-step reasoning applications",
      "Deploy and monitor graph-based workflows"
    ]
  }
};