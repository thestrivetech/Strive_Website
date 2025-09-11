import { Project } from '../types';

export const agenticWorkflowPlatform: Project = {
  id: 4,
  title: "Agentic Workflow Platform",
  category: "Workflow",
  type: "prototype",
  technologies: ["Multi-Agent", "LangGraph", "Python", "Redis"],
  shortDescription: "Orchestrated AI agents working together, each specialized in specific domains to solve complex business problems.",
  fullDescription: "A revolutionary multi-agent system where specialized AI agents collaborate to handle complex workflows. Each agent is an expert in its domain, working together to deliver comprehensive solutions for business process automation.",
  imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
  demoUrl: "https://demo.strive.ai/agentic-workflow",
  githubUrl: "https://github.com/strive-ai/agentic-platform",
  features: ["Multi-agent coordination", "Specialized expertise", "Task decomposition", "Quality assurance"],
  metrics: { "Efficiency Gain": "85% faster", "Agent Count": "12", "Success Rate": "96.3%" },
  sources: [
    {
      title: "Multi-Agent Systems: Algorithmic, Game-Theoretic, and Logical Foundations",
      url: "https://www.cambridge.org/core/books/multiagent-systems/",
      description: "Theoretical foundations for multi-agent coordination"
    },
    {
      title: "LangGraph Multi-Agent Framework",
      url: "https://langchain-ai.github.io/langgraph/",
      description: "Implementation framework for agent orchestration"
    },
    {
      title: "Business Process Automation with AI - Deloitte",
      url: "https://www2.deloitte.com/us/en/insights/focus/cognitive-technologies/cognitive-automation-artificial-intelligence-business-processes.html",
      description: "Enterprise applications and benefits analysis"
    }
  ],
  relatedSolutions: ["process-automation", "ai-automation", "manufacturing-solutions"]
};