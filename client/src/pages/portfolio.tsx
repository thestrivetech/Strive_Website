import PortfolioCard from "@/components/ui/portfolio-card";

const Portfolio = () => {
  const portfolioItems = [
    {
      category: "TECHNOLOGY",
      title: "TechCorp Digital Transformation",
      description: "Streamlined operations and increased efficiency by 40% through AI-powered automation.",
      imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Professional business team in modern office",
      duration: "6 months",
    },
    {
      category: "FINANCE",
      title: "Global Financial Services",
      description: "Implemented comprehensive risk management and compliance automation platform.",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Corporate building exterior with modern architecture",
      duration: "8 months",
    },
    {
      category: "HEALTHCARE",
      title: "MedHealth Analytics Platform",
      description: "Revolutionized patient care with predictive analytics and automated workflows.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Technology solutions workspace with multiple screens",
      duration: "12 months",
    },
    {
      category: "RETAIL",
      title: "RetailMax Omnichannel Solution",
      description: "Unified customer experience across all channels with AI-driven personalization.",
      imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Business handshake meeting in professional setting",
      duration: "10 months",
    },
    {
      category: "MANUFACTURING",
      title: "Industrial IoT Integration",
      description: "Connected factory systems for real-time monitoring and predictive maintenance.",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Modern office workspace with collaborative team",
      duration: "14 months",
    },
    {
      category: "LOGISTICS",
      title: "LogiFlow Optimization",
      description: "Optimized supply chain operations with AI-powered route planning and inventory management.",
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Technology solutions dashboard display",
      duration: "9 months",
    },
  ];

  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "45%", label: "Average Efficiency Gain" },
    { number: "$2.5M", label: "Average Cost Savings" },
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
              Our Portfolio
            </h1>
            <p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-portfolio-subtitle"
            >
              Discover how we've helped businesses across industries transform their operations and achieve exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
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

          {/* Stats Section */}
          <div className="mt-20 bg-muted rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                data-testid="text-stats-title"
              >
                Results That Matter
              </h2>
              <p 
                className="text-xl text-muted-foreground"
                data-testid="text-stats-subtitle"
              >
                Our portfolio speaks for itself with measurable business outcomes.
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
