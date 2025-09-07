import { Project } from '../types';

export const mcpServerFramework: Project = {
  id: 6,
  title: "MCP Server Framework",
  category: "Infrastructure",
  type: "prototype",
  technologies: ["Protocol", "TypeScript", "WebSocket", "Docker"],
  shortDescription: "Model Context Protocol server enabling seamless AI model integration across different platforms and applications.",
  fullDescription: "A robust MCP (Model Context Protocol) server that standardizes AI model communication, enabling easy integration of various AI models into your applications with consistent APIs and real-time capabilities.",
  imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
  demoUrl: "https://demo.strive.ai/mcp-server",
  githubUrl: "https://github.com/strive-ai/mcp-framework",
  features: ["Protocol standardization", "Multi-model support", "Real-time communication", "Easy integration"],
  metrics: { "Models Supported": "25+", "Latency": "< 100ms", "Uptime": "99.9%" }
};