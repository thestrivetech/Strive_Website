import PortfolioCard from "@/components/ui/portfolio-card";

const Portfolio = () => {
  const demos = [
    {
      category: "DEMO",
      title: "AI Customer Service Bot",
      description: "Interactive demo of our conversational AI that handles customer inquiries with 95% accuracy.",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "AI chatbot interface demonstration",
      duration: "Live Demo",
    },
    {
      category: "DEMO",
      title: "Predictive Analytics Engine",
      description: "Real-time demonstration of our AI forecasting models predicting business trends and outcomes.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Analytics dashboard with predictive models",
      duration: "Live Demo",
    }
  ];

  const templates = [
    {
      category: "TEMPLATE",
      title: "E-commerce Recommendation Engine",
      description: "Pre-built AI template for personalized product recommendations with easy customization.",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "E-commerce recommendation system template",
      duration: "Template",
    },
    {
      category: "TEMPLATE",
      title: "Document Processing AI",
      description: "Ready-to-use template for intelligent document classification and data extraction.",
      imageUrl: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Document processing AI template interface",
      duration: "Template",
    },
    {
      category: "TEMPLATE",
      title: "Financial Fraud Detection",
      description: "AI-powered template for real-time fraud detection and risk assessment in financial transactions.",
      imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Financial fraud detection system template",
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

          {/* Demos Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" data-testid="text-demos-title">
              Live Demos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {demos.map((item, index) => (
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

          {/* Templates Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center" data-testid="text-templates-title">
              Ready-to-Use Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((item, index) => (
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
