import { useState } from "react";
import { Bot, Code, Blocks, Brain, BrainCircuit, Database, Globe, Zap, Eye, Play, ExternalLink, X, Github, Monitor, Smartphone, ChevronRight, Filter, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import data from new modular structure
import { Project, projects } from "@/data/portfolio";
import { getSolutionById } from "@/data/solutions-mapping";

// Project interface is now imported from the modular structure

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // projects is now imported from @/data/portfolio

  const filters = [
    { id: "all", name: "All Projects", icon: <Globe className="h-4 w-4" /> },
    { id: "demo", name: "Demos", icon: <Play className="h-4 w-4" /> },
    { id: "prototype", name: "Prototypes", icon: <Code className="h-4 w-4" /> },
    { id: "template", name: "Templates", icon: <Blocks className="h-4 w-4" /> }
  ];

  const filteredProjects = selectedFilter === "all" 
    ? projects 
    : projects.filter(project => project.type === selectedFilter);

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
              Unlock Time and Growth: <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">AI Solutions</span> for Ambitious Businesses
            </h1>
            <p 
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8"
              data-testid="text-hero-subtitle"
            >
              Struggling with slow processes or information overload? Discover AI-powered solutions tailored for your business that are purpose-built to drive efficiency, lower costs, and free your team to focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                onClick={() => window.location.href = '/request'}
                data-testid="button-view-work"
              >
                Request Personalized Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="hero-gradient border-2 border-[#ff7033] text-white hover:text-[#ff7033] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-request-demo"
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Showcase Section */}
      <section id="showcase" className="py-16 bg-[#ffffffeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Navigation */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 md:mb-12">
            {/* Mobile Dropdown */}
            <div className="sm:hidden w-full max-w-xs">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-full bg-[#020a1c] border-orange-500 text-white focus:border-orange-400">
                  <div className="flex items-center gap-2">
                    {filters.find(f => f.id === selectedFilter)?.icon}
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[#020a1c] border-orange-500">
                  {filters.map((filter) => (
                    <SelectItem 
                      key={filter.id} 
                      value={filter.id}
                      className="text-white hover:bg-orange-500/20 focus:bg-orange-500/20"
                    >
                      <div className="flex items-center gap-2">
                        {filter.icon}
                        {filter.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Buttons - Only All and Filter */}
            <div className="hidden sm:flex gap-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("all")}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  selectedFilter === "all"
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'border-primary/20 text-foreground hover:border-primary hover:text-primary hover:scale-105'
                }`}
              >
                <Globe className="h-4 w-4" />
                All
              </Button>
              <Select value={selectedFilter === "all" ? "" : selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-auto min-w-[120px] border-primary/20 hover:border-primary">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Filter" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {filters.filter(f => f.id !== "all").map((filter) => (
                    <SelectItem key={filter.id} value={filter.id}>
                      <div className="flex items-center gap-2">
                        {filter.icon}
                        {filter.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Project Gallery */}
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
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
                    className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    data-testid={`img-project-${project.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 flex gap-2">
                    <Badge className={`${getTypeColor(project.type)} text-white border-0 text-xs px-1 py-0.5`}>
                      {project.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-1 md:gap-2">
                      {project.type === 'demo' && (
                        <Button size="sm" variant="secondary" className="h-6 w-6 md:h-8 md:w-8 p-0">
                          <Play className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="secondary" className="h-6 w-6 md:h-8 md:w-8 p-0">
                        <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-3 md:p-6">
                  <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                    <div className="text-primary text-sm md:text-base">
                      {getCategoryIcon(project.category)}
                    </div>
                    <span className="text-xs md:text-sm font-medium uppercase tracking-wide text-[#020a1c] hidden sm:inline">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-sm md:text-xl font-bold text-[#ff7033] mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-2 md:mb-4 line-clamp-1 md:line-clamp-2 text-xs md:text-sm">
                    {project.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-2 md:mb-4">
                    {project.technologies.slice(0, 2).map((tech, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs cursor-pointer hover:bg-[#ff7033] hover:text-white transition-colors px-1 py-0.5"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `/resources?filter=tools-tech&tech=${encodeURIComponent(tech.toLowerCase())}`;
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 2 && (
                      <Badge variant="secondary" className="text-xs px-1 py-0.5">
                        +{project.technologies.length - 2}
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
                    variant="outline"
                  >
                    {project.type === 'demo' ? 'View Demo' : 
                     project.type === 'prototype' ? 'View Prototype' : 
                     project.type === 'template' ? 'View Template' : 'View Details'}
                    {project.type === 'demo' ? <Play className="ml-2 h-4 w-4" /> :
                     project.type === 'prototype' ? <Code className="ml-2 h-4 w-4" /> :
                     project.type === 'template' ? <Blocks className="ml-2 h-4 w-4" /> :
                     <Eye className="ml-2 h-4 w-4" />}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
            "max-h-[90vh] overflow-y-auto modal-scrollbar"
          )}>
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
              </div>
              <DialogPrimitive.Close className="absolute right-4 top-4 bg-gray-800/80 hover:bg-gray-700/90 border-2 border-orange-500/50 hover:border-orange-500 rounded-lg h-10 w-10 p-0 z-50 transition-all duration-200">
                <X className="h-5 w-5 text-white m-auto" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
              
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
                  <h3 className="text-lg font-semibold mb-3">Solutions</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.relatedSolutions?.map((solutionId: string, index: number) => {
                      const solution = getSolutionById(solutionId);
                      return solution ? (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="px-3 py-1 cursor-pointer hover:bg-[#ff7033] hover:text-white transition-colors"
                          onClick={() => {
                            window.location.href = `/solutions?solution=${solutionId}`;
                          }}
                        >
                          {solution.title}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button className="flex-1" onClick={() => window.open(selectedProject.demoUrl, '_blank')}>
                    <Play className="mr-2 h-4 w-4" />
                    View Demo
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                    Get Started
                  </Button>
                </div>
              </div>
            </>
          )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </Dialog>
    </div>
  );
};

export default Portfolio;