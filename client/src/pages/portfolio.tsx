import { useState } from "react";
import { Bot, Code, Blocks, Brain, BrainCircuit, Database, Globe, Zap, Eye, Play, ExternalLink, X, Github, Monitor, Smartphone, ChevronRight, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Project {
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
}

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const projects = [
    {
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
      metrics: { "Accuracy": "94.2%", "Response Time": "1.2s", "User Satisfaction": "4.8/5" }
    },
    {
      id: 2,
      title: "Computer Vision Analytics",
      category: "AI Model",
      type: "demo",
      technologies: ["TensorFlow", "OpenCV", "Python", "FastAPI"],
      shortDescription: "Real-time image and video analysis for quality control, object detection, and automated inspection systems.",
      fullDescription: "A comprehensive computer vision platform that processes visual data in real-time, providing accurate object detection, quality assessment, and anomaly detection. Perfect for manufacturing, security, and retail applications.",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      demoUrl: "https://demo.strive.ai/computer-vision",
      githubUrl: "https://github.com/strive-ai/cv-analytics",
      features: ["Real-time processing", "Multi-object detection", "Quality scoring", "Anomaly detection"],
      metrics: { "Accuracy": "97.8%", "Processing Speed": "30fps", "Detection Rate": "99.1%" }
    },
    {
      id: 3,
      title: "RAG Knowledge System",
      category: "RAG Solution",
      type: "prototype",
      technologies: ["LangChain", "Vector DB", "FastAPI", "React"],
      shortDescription: "Retrieval-Augmented Generation system that combines your knowledge base with AI for accurate, contextual responses.",
      fullDescription: "An intelligent knowledge management system that ingests documents, creates semantic embeddings, and provides AI-powered search and question-answering capabilities. Ideal for enterprise knowledge bases, customer support, and research applications.",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      demoUrl: "https://demo.strive.ai/rag-system",
      githubUrl: "https://github.com/strive-ai/rag-knowledge",
      features: ["Document ingestion", "Semantic search", "Context-aware responses", "Multi-format support"],
      metrics: { "Accuracy": "91.7%", "Retrieval Speed": "0.8s", "Document Capacity": "10M+" }
    },
    {
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
      metrics: { "Efficiency Gain": "85% faster", "Agent Count": "12", "Success Rate": "96.3%" }
    },
    {
      id: 5,
      title: "Smart Dashboard UI Kit",
      category: "Template",
      type: "template",
      technologies: ["React", "TypeScript", "Tailwind", "Recharts"],
      shortDescription: "Modern, responsive dashboard components with AI-powered insights and real-time data visualization.",
      fullDescription: "A comprehensive UI kit featuring modern dashboard components, interactive charts, and AI-powered insights. Includes dark/light themes, responsive layouts, and customizable widgets for any business intelligence application.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      demoUrl: "https://demo.strive.ai/dashboard-kit",
      githubUrl: "https://github.com/strive-ai/dashboard-kit",
      features: ["50+ Components", "Responsive design", "Dark/light themes", "Real-time updates"],
      metrics: { "Components": "50+", "Themes": "2", "Responsive": "100%", "Performance Score": "95/100" }
    },
    {
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
    }
  ];

  const filters = [
    { id: "all", name: "All Projects", icon: <Globe className="h-4 w-4" /> },
    { id: "AI Agent", name: "AI Agents", icon: <Bot className="h-4 w-4" /> },
    { id: "AI Model", name: "AI Models", icon: <Brain className="h-4 w-4" /> },
    { id: "RAG Solution", name: "RAG Solutions", icon: <Database className="h-4 w-4" /> },
    { id: "Workflow", name: "Workflows", icon: <Zap className="h-4 w-4" /> },
    { id: "Template", name: "Templates", icon: <Code className="h-4 w-4" /> },
    { id: "Infrastructure", name: "Infrastructure", icon: <Blocks className="h-4 w-4" /> }
  ];

  const filteredProjects = selectedFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      "AI Agent": <Bot className="h-5 w-5" />,
      "AI Model": <Brain className="h-5 w-5" />,
      "RAG Solution": <Database className="h-5 w-5" />,
      "Workflow": <Zap className="h-5 w-5" />,
      "Template": <Code className="h-5 w-5" />,
      "Infrastructure": <Blocks className="h-5 w-5" />
    };
    return iconMap[category] || <Globe className="h-5 w-5" />;
  };

  const getTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      "demo": "bg-green-500",
      "prototype": "bg-blue-500", 
      "template": "bg-purple-500"
    };
    return colorMap[type] || "bg-gray-500";
  };

  return (
    <div className="pt-16">
      {/* Hero Section with AI-themed animated background */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-primary rounded-full animate-ping opacity-60`}
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <BrainCircuit className="text-primary h-16 w-16 animate-pulse" />
                <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping"></div>
              </div>
            </div>
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-white"
              data-testid="text-hero-title"
            >
              Unleashing AI Solutions for Tomorrow
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8"
              data-testid="text-hero-subtitle"
            >
              Explore cutting-edge AI demos, production-ready templates, and revolutionary prototypes that showcase the future of intelligent business solutions.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold"
              onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-view-work"
            >
              View Our Work
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      {/* Showcase Section */}
      <section id="showcase" className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'hover:bg-primary/10 hover:border-primary/50'
                }`}
                data-testid={`button-filter-${filter.id}`}
              >
                {filter.icon}
                {filter.name}
              </Button>
            ))}
          </div>

          {/* Project Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card 
                key={project.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 cursor-pointer hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
                onClick={() => setSelectedProject(project)}
                data-testid={`card-project-${project.id}`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    data-testid={`img-project-${project.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={`${getTypeColor(project.type)} text-white border-0`}>
                      {project.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-primary">
                      {getCategoryIcon(project.category)}
                    </div>
                    <span className="text-sm font-medium uppercase tracking-wide text-[#020a1c]">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
                    variant="outline"
                  >
                    View Details
                    <Eye className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogTitle className="sr-only">{selectedProject.title}</DialogTitle>
              <DialogDescription className="sr-only">
                Detailed view of {selectedProject.title} project including description, features, and performance metrics
              </DialogDescription>
              <div className="relative">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 h-8 w-8 p-0"
                  variant="secondary"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="text-primary">
                    {getCategoryIcon(selectedProject.category)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
                    <p className="text-muted-foreground">{selectedProject.category}</p>
                  </div>
                </div>
                
                <p className="text-lg leading-relaxed">{selectedProject.fullDescription}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Performance Metrics</h3>
                    <div className="space-y-2">
                      {Object.entries(selectedProject.metrics).map(([key, value]: [string, string | undefined]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-semibold text-primary">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button className="flex-1" onClick={() => window.open(selectedProject.demoUrl, '_blank')}>
                    <Play className="mr-2 h-4 w-4" />
                    View Demo
                  </Button>
                  <Button variant="outline" onClick={() => window.open(selectedProject.githubUrl, '_blank')}>
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                    Get Started
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Portfolio;