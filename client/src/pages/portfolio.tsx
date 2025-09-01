import PortfolioCard from "@/components/ui/portfolio-card";
import { Bot, Code, Blocks, Sparkles, Zap, Star, ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Portfolio = () => {
  const aiModels = [
    {
      category: "AI MODELS",
      title: "Natural Language Processing",
      description: "Advanced NLP models for document analysis, sentiment detection, and automated content generation.",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "AI language processing demonstration",
      duration: "Live Demo",
    },
    {
      category: "AI MODELS",
      title: "Computer Vision Solutions",
      description: "Image recognition and analysis models for quality control, security, and automated inspection.",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Computer vision AI demonstration",
      duration: "Live Demo",
    }
  ];

  const customSoftware = [
    {
      category: "CUSTOM SOFTWARE",
      title: "Enterprise Resource Planning",
      description: "Fully customized ERP system tailored to manufacturing workflows and industry requirements.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Custom ERP software interface",
      duration: "Live Demo",
    },
    {
      category: "CUSTOM SOFTWARE",
      title: "Financial Management Platform", 
      description: "Bespoke financial software with real-time reporting, risk assessment, and compliance tracking.",
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Financial management software demo",
      duration: "Live Demo",
    }
  ];

  const blockchain = [
    {
      category: "BLOCKCHAIN",
      title: "Supply Chain Transparency",
      description: "Blockchain-based tracking system providing end-to-end supply chain visibility and verification.",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Blockchain supply chain tracking demo",
      duration: "Live Demo",
    },
    {
      category: "BLOCKCHAIN",
      title: "Smart Contract Automation",
      description: "Automated contract execution and payment systems reducing processing time by 90%.",
      imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Smart contract automation demo",
      duration: "Live Demo",
    }
  ];

  const webDesignTemplates = [
    {
      category: "WEB DESIGN",
      title: "Modern E-commerce UI Kit",
      description: "Complete UI/UX template with responsive design, product catalogs, and checkout flows.",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "E-commerce web design template",
      duration: "Template",
    },
    {
      category: "UI/UX DESIGN",
      title: "SaaS Dashboard Templates",
      description: "Professional dashboard designs with data visualization components and user management interfaces.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "SaaS dashboard UI template",
      duration: "Template",
    },
    {
      category: "WEB DESIGN",
      title: "Corporate Website Templates", 
      description: "Professional business website templates with modern layouts and conversion-optimized designs.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Corporate website design template",
      duration: "Template",
    }
  ];

  const prototypes = [
    {
      category: "PROTOTYPE",
      title: "Voice-to-Code AI Assistant",
      description: "Experimental prototype that converts natural language descriptions into working code.",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Voice-to-code AI assistant prototype",
      duration: "Beta",
    },
    {
      category: "PROTOTYPE",
      title: "Multi-Modal AI Platform",
      description: "Next-generation AI platform processing text, images, and audio simultaneously.",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Multi-modal AI platform prototype interface",
      duration: "Beta",
    },
    {
      category: "PROTOTYPE",
      title: "Autonomous Business Analyst",
      description: "AI prototype that autonomously analyzes business metrics and provides strategic recommendations.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Autonomous business analyst AI prototype",
      duration: "Beta",
    }
  ];

  const stats = [
    { number: "50+", label: "AI Models Deployed" },
    { number: "25+", label: "Ready Templates" },
    { number: "10+", label: "Beta Prototypes" },
    { number: "99.2%", label: "Model Accuracy" },
  ];

  // Create compact portfolio badge component
  const PortfolioBadge = ({ item, variant = "default" }: { item: any, variant?: "default" | "featured" | "prototype" }) => {
    const variantStyles = {
      default: "bg-white/5 hover:bg-white/10 border-white/10 hover:border-primary/30",
      featured: "bg-gradient-to-br from-primary/20 to-blue-600/20 border-primary/30 hover:border-primary/50 shadow-lg shadow-primary/20",
      prototype: "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/30 hover:border-purple-400/50 shadow-lg shadow-purple-500/20"
    };

    return (
      <Card 
        className={`group relative overflow-hidden backdrop-blur-sm border-2 transition-all duration-500 hover:scale-105 cursor-pointer ${variantStyles[variant]}`}
        data-testid={`badge-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs font-semibold bg-primary/20 text-primary border-none">
              {item.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {item.duration}
            </Badge>
          </div>
          <h4 className="font-bold text-white text-sm mb-2 group-hover:text-primary transition-colors">
            {item.title}
          </h4>
          <p className="text-white/70 text-xs leading-relaxed mb-3 line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-primary text-xs font-medium group-hover:text-white transition-colors">
              <span>View Demo</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="pt-16">
      {/* Futuristic Header Section */}
      <section className="pt-20 pb-20 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-600/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-primary/20 rounded-2xl mr-4">
                <Sparkles className="text-primary h-8 w-8" />
              </div>
              <h1 
                className="text-4xl md:text-6xl font-bold text-white"
                data-testid="text-portfolio-title"
              >
                Innovation Gallery
              </h1>
            </div>
            <p 
              className="text-xl text-white/80 max-w-4xl mx-auto mb-8"
              data-testid="text-portfolio-subtitle"
            >
              Discover our cutting-edge AI solutions, live demonstrations, and future-ready prototypes that are shaping tomorrow's business landscape.
            </p>
            <div className="flex items-center justify-center space-x-8 text-white/60">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-2" />
                <span className="text-sm">50+ Live Demos</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                <span className="text-sm">Real-time AI Processing</span>
              </div>
              <div className="flex items-center">
                <Bot className="h-4 w-4 mr-2" />
                <span className="text-sm">Next-Gen Prototypes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0f1c]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Live Demos Section - Dynamic Masonry Layout */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-4">
                <Bot className="text-primary mr-3 h-8 w-8" />
                <h2 className="text-4xl font-bold text-white" data-testid="text-demos-title">
                  Live AI Demonstrations
                </h2>
              </div>
              <p className="text-white/70 max-w-2xl mx-auto">
                Experience our AI solutions in real-time with interactive demos and live processing capabilities.
              </p>
            </div>
            
            {/* Mixed AI Solutions Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-12">
              {/* AI Models - Featured positioning */}
              {aiModels.map((item, index) => (
                <div key={`ai-${index}`} className={index === 0 ? "col-span-2 row-span-2" : ""}>
                  <PortfolioBadge item={item} variant="featured" />
                </div>
              ))}
              
              {/* Custom Software - Mixed sizes */}
              {customSoftware.map((item, index) => (
                <div key={`software-${index}`} className={index === 1 ? "col-span-2" : ""}>
                  <PortfolioBadge item={item} variant="default" />
                </div>
              ))}
              
              {/* Blockchain - Standard grid */}
              {blockchain.map((item, index) => (
                <PortfolioBadge key={`blockchain-${index}`} item={item} variant="default" />
              ))}
            </div>
          </div>

          {/* Design Templates - Floating Cloud Layout */}
          <div className="mb-32 relative">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-4">
                <Code className="text-primary mr-3 h-8 w-8" />
                <h2 className="text-4xl font-bold text-white" data-testid="text-templates-title">
                  Design Templates & UI Kits
                </h2>
              </div>
              <p className="text-white/70 max-w-2xl mx-auto">
                Ready-to-deploy design systems and UI components crafted for modern applications.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {webDesignTemplates.map((item, index) => (
                <div key={`template-${index}`} className="transform hover:rotate-1 transition-transform duration-500">
                  <PortfolioBadge item={item} variant="default" />
                </div>
              ))}
            </div>
            
            {/* Floating decoration */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          </div>

          {/* Future Prototypes - Spotlight Section */}
          <div className="mb-32 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="text-center mb-16">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="text-purple-400 mr-3 h-8 w-8" />
                  <h2 className="text-4xl font-bold text-white" data-testid="text-prototypes-title">
                    Next-Generation Prototypes
                  </h2>
                </div>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Experimental AI technologies pushing the boundaries of what's possible in business automation.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prototypes.map((item, index) => (
                  <div key={`prototype-${index}`} className="transform hover:scale-105 transition-all duration-500">
                    <PortfolioBadge item={item} variant="prototype" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Futuristic Stats Section */}
          <div className="mb-20">
            <div className="relative bg-gradient-to-br from-primary/20 via-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12 border border-primary/30 overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>
              
              <div className="relative text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <Zap className="text-primary mr-3 h-8 w-8" />
                  <h2 
                    className="text-4xl md:text-5xl font-bold text-white"
                    data-testid="text-stats-title"
                  >
                    Innovation Metrics
                  </h2>
                </div>
                <p 
                  className="text-xl text-white/80"
                  data-testid="text-stats-subtitle"
                >
                  Real numbers from our AI-powered transformation initiatives.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="group"
                    data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-105">
                      <div 
                        className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:text-white transition-colors"
                        data-testid={`text-stat-number-${index}`}
                      >
                        {stat.number}
                      </div>
                      <div 
                        className="text-white/70 font-medium group-hover:text-white/90 transition-colors"
                        data-testid={`text-stat-label-${index}`}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;