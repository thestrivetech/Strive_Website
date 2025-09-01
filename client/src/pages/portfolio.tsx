import PortfolioCard from "@/components/ui/portfolio-card";
import { Bot, Code, Blocks } from "lucide-react";

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

  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              data-testid="text-portfolio-title"
            >
              Demos, Templates & Prototypes
            </h1>
            <p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-portfolio-subtitle"
            >
              Explore our AI solutions in action through live demos, ready-to-use templates, and cutting-edge prototypes.
            </p>
          </div>

          {/* Live Demos Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center" data-testid="text-demos-title">
              Live Demos
            </h2>
            
            {/* AI Models Column */}
            <div className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <Bot className="text-primary mr-3 h-8 w-8" />
                <h3 className="text-2xl font-bold" data-testid="text-ai-models-title">AI Models</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {aiModels.map((item, index) => (
                  <PortfolioCard
                    key={index}
                    category={item.category}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    imageAlt={item.imageAlt}
                    duration={item.duration}
                  />
                ))}
              </div>
            </div>

            {/* Custom Software Column */}
            <div className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <Code className="text-primary mr-3 h-8 w-8" />
                <h3 className="text-2xl font-bold" data-testid="text-custom-software-title">Custom Software</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {customSoftware.map((item, index) => (
                  <PortfolioCard
                    key={index}
                    category={item.category}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    imageAlt={item.imageAlt}
                    duration={item.duration}
                  />
                ))}
              </div>
            </div>

            {/* Blockchain Column */}
            <div className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <Blocks className="text-primary mr-3 h-8 w-8" />
                <h3 className="text-2xl font-bold" data-testid="text-blockchain-title">Blockchain</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blockchain.map((item, index) => (
                  <PortfolioCard
                    key={index}
                    category={item.category}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    imageAlt={item.imageAlt}
                    duration={item.duration}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Web Design & UI/UX Templates Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" data-testid="text-templates-title">
              Web Design & UI/UX Templates
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Professional design templates and UI components ready for customization and implementation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {webDesignTemplates.map((item, index) => (
                <PortfolioCard
                  key={index}
                  category={item.category}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  imageAlt={item.imageAlt}
                  duration={item.duration}
                />
              ))}
            </div>
          </div>

          {/* Prototypes Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" data-testid="text-prototypes-title">
              Future Prototypes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {prototypes.map((item, index) => (
                <PortfolioCard
                  key={index}
                  category={item.category}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  imageAlt={item.imageAlt}
                  duration={item.duration}
                />
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 bg-muted rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                data-testid="text-stats-title"
              >
                AI Innovation by the Numbers
              </h2>
              <p 
                className="text-xl text-muted-foreground"
                data-testid="text-stats-subtitle"
              >
                Our AI solutions deliver measurable impact across industries.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <div 
                    className="text-4xl font-bold text-primary mb-2"
                    data-testid={`text-stat-number-${index}`}
                  >
                    {stat.number}
                  </div>
                  <div 
                    className="text-muted-foreground"
                    data-testid={`text-stat-label-${index}`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;