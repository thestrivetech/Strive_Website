import { Trophy, Shield, Brain, TrendingUp, Clock, Users, BarChart, Cog, Calculator, ShieldCheck, Building2, DollarSign, Factory, ShoppingCart, Laptop, GraduationCap, Home as HomeIcon, Scale, Truck, Zap } from "lucide-react";
import { useState } from "react";
import HeroSection from "@/components/ui/hero-section";
import SolutionCard from "@/components/ui/solution-card";
import ResourceCard from "@/components/ui/resource-card";
import ROICalculator from "@/components/ui/roi-calculator";
import { Button } from "@/components/ui/button";

const Home = () => {
  const handleGetStarted = () => {
    window.location.href = "/get-started";
  };

  const handleWatchDemo = () => {
    window.location.href = "/demo";
  };

  const solutions = [
    {
      icon: <Clock className="text-primary text-2xl" />,
      title: "Project Management",
      description: "Streamline your projects with AI-powered planning, tracking, and collaboration tools.",
      href: "/solutions#ai-automation",
    },
    {
      icon: <BarChart className="text-primary text-2xl" />,
      title: "Business Intelligence",
      description: "Make data-driven decisions with advanced analytics and real-time insights.",
      href: "/solutions#data-analytics",
    },
    {
      icon: <Cog className="text-primary text-2xl" />,
      title: "Process Automation",
      description: "Automate repetitive tasks and workflows to boost productivity and reduce errors.",
      href: "/solutions#ai-automation",
    },
    {
      icon: <Users className="text-primary text-2xl" />,
      title: "Customer Management",
      description: "Build stronger relationships with comprehensive customer insights and engagement tools.",
      href: "/solutions#data-analytics",
    },
    {
      icon: <Calculator className="text-primary text-2xl" />,
      title: "Financial Planning",
      description: "Optimize your financial performance with predictive modeling and smart budgeting.",
      href: "/solutions#data-analytics",
    },
    {
      icon: <ShieldCheck className="text-primary text-2xl" />,
      title: "Security & Compliance",
      description: "Protect your business with enterprise-grade security and automated compliance monitoring.",
      href: "/solutions#security-compliance",
    },
  ];

  const resources = [
    {
      type: "PRODUCT UPDATES",
      title: "Announcing Strive 2025",
      description: "Unveiled at our annual conference, Strive's latest AI-powered features are transforming how businesses operate.",
      imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Modern office workspace with team collaboration",
    },
    {
      type: "ON-DEMAND WEBINAR",
      title: "Expert Advice: How to Maximize Business Efficiency",
      description: "Learn from industry experts about implementing automation and AI to drive productivity.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Technology solutions dashboard and analytics",
    },
    {
      type: "INDUSTRY NEWS",
      title: "Strive named #1 in Business Solutions",
      description: "Industry recognition for our comprehensive platform and customer satisfaction ratings.",
      imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      imageAlt: "Professional business meeting with handshake",
    },
  ];

  const [selectedIndustry, setSelectedIndustry] = useState("healthcare");

  const industries = [
    {
      id: "healthcare",
      name: "Healthcare",
      icon: <Building2 className="text-primary text-xl" />,
      solutions: [
        "AI-powered diagnostics and imaging analysis",
        "Patient data management and EHR integration", 
        "Automated compliance and regulatory reporting",
        "Predictive analytics for patient outcomes"
      ]
    },
    {
      id: "finance",
      name: "Finance",
      icon: <DollarSign className="text-primary text-xl" />,
      solutions: [
        "Real-time fraud detection and prevention",
        "Automated risk assessment and reporting",
        "Algorithmic trading and portfolio optimization",
        "Customer behavior analytics and personalization"
      ]
    },
    {
      id: "manufacturing",
      name: "Manufacturing",
      icon: <Factory className="text-primary text-xl" />,
      solutions: [
        "Predictive maintenance and equipment monitoring",
        "Quality control automation with computer vision",
        "Supply chain optimization and demand forecasting",
        "Production workflow automation"
      ]
    },
    {
      id: "retail",
      name: "Retail",
      icon: <ShoppingCart className="text-primary text-xl" />,
      solutions: [
        "Customer analytics and personalized recommendations",
        "Inventory management and demand prediction",
        "Dynamic pricing optimization",
        "Omnichannel customer experience automation"
      ]
    },
    {
      id: "technology",
      name: "Technology",
      icon: <Laptop className="text-primary text-xl" />,
      solutions: [
        "DevOps automation and CI/CD optimization",
        "AI agent development and deployment",
        "Cloud infrastructure and scaling solutions",
        "Data pipeline automation and analytics"
      ]
    },
    {
      id: "education",
      name: "Education",
      icon: <GraduationCap className="text-primary text-xl" />,
      solutions: [
        "Learning analytics and student performance insights",
        "Administrative workflow automation",
        "Personalized learning path recommendations",
        "Automated grading and assessment tools"
      ]
    },
    {
      id: "real-estate",
      name: "Real Estate",
      icon: <HomeIcon className="text-primary text-xl" />,
      solutions: [
        "Property valuation and market analysis",
        "Automated property management workflows",
        "Lead generation and customer relationship management",
        "Market trend prediction and investment insights"
      ]
    },
    {
      id: "legal",
      name: "Legal",
      icon: <Scale className="text-primary text-xl" />,
      solutions: [
        "Document automation and contract analysis",
        "Case management and workflow optimization",
        "Legal research and precedent discovery",
        "Compliance monitoring and risk assessment"
      ]
    }
  ];

  const selectedIndustryData = industries.find(industry => industry.id === selectedIndustry) || industries[0];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection
        title="Technology that makes your business operations more efficient."
        subtitle="One platform to help improve the productivity, efficiency, and profitability of your operations."
        onPrimaryClick={handleGetStarted}
        onSecondaryClick={handleWatchDemo}
      />
      {/* ROI Calculator */}
      <ROICalculator />
      {/* Integrated Platform Section */}
      <section className="py-16 md:py-24 bg-[#ffffffeb] text-[#f8fafc]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div 
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-section-label"
            >
              INTEGRATED BUSINESS PLATFORM
            </div>
            <h2 
              className="text-3xl md:text-5xl font-bold mb-6 text-[#020a1c]"
              data-testid="text-platform-title"
            >
              A fully integrated suite of solutions, powered by industry leading AI.
            </h2>
          </div>

          {/* Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <SolutionCard
                key={index}
                icon={solution.icon}
                title={solution.title}
                description={solution.description}
                href={solution.href}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Industry Solutions Selector */}
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div 
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-industry-label"
            >
              SOLUTIONS BY INDUSTRY
            </div>
            <h2 
              className="text-2xl md:text-3xl font-bold mb-4 text-white"
              data-testid="text-industry-title"
            >
              Find tailored solutions for your industry
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Select your industry to discover how our AI-powered solutions can transform your business operations.
            </p>
          </div>

          {/* Industry Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedIndustry === industry.id
                    ? 'bg-primary border-primary text-white shadow-lg scale-105'
                    : 'bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 hover:border-white/30'
                }`}
                data-testid={`button-industry-${industry.id}`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={selectedIndustry === industry.id ? 'text-white' : 'text-primary'}>
                    {industry.icon}
                  </div>
                  <span className="text-sm font-medium">{industry.name}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Industry Solutions */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="text-primary mr-4">
                  {selectedIndustryData.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {selectedIndustryData.name} Solutions
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedIndustryData.solutions.map((solution, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg"
                    data-testid={`solution-${selectedIndustry}-${index}`}
                  >
                    <div className="text-primary mt-1">
                      <BarChart className="h-5 w-5" />
                    </div>
                    <span className="text-white/90 text-sm leading-relaxed">
                      {solution}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
                  size="lg"
                  onClick={() => window.location.href = "/contact"}
                  data-testid="button-get-started-industry"
                >
                  Get Started with {selectedIndustryData.name} Solutions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Resources Preview */}
      <section className="py-16 md:py-24 bg-[#ffffffeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-[#020a1c]"
              data-testid="text-resources-title"
            >
              Discover what's new with Strive.
            </h2>
            <a 
              href="/resources" 
              className="text-primary font-semibold hover:underline"
              data-testid="link-all-resources"
            >
              View all resources →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <ResourceCard
                key={index}
                type={resource.type}
                title={resource.title}
                description={resource.description}
                imageUrl={resource.imageUrl}
                imageAlt={resource.imageAlt}
              />
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 md:py-24 text-[#020a1c] bg-[#ffffffeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className="text-sm uppercase tracking-wide text-primary font-semibold mb-4"
              data-testid="text-cta-label"
            >
              CONNECT WITH US
            </div>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              data-testid="text-cta-title"
            >
              We'd love to show you around
            </h2>
            <p 
              className="text-xl text-muted-foreground mb-8"
              data-testid="text-cta-description"
            >
              With Strive you can streamline operations, automate processes, and drive growth with intelligent insights.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <Shield className="text-primary text-3xl mb-4 mx-auto" />
                <p 
                  className="text-muted-foreground"
                  data-testid="text-benefit-compliance"
                >
                  Comply with industry standards and regulations.
                </p>
              </div>
              <div className="text-center">
                <Brain className="text-primary text-3xl mb-4 mx-auto" />
                <p 
                  className="text-muted-foreground"
                  data-testid="text-benefit-automation"
                >
                  Identify opportunities and automate decision-making.
                </p>
              </div>
              <div className="text-center">
                <TrendingUp className="text-primary text-3xl mb-4 mx-auto" />
                <p 
                  className="text-muted-foreground"
                  data-testid="text-benefit-visibility"
                >
                  Improve visibility and automate operations.
                </p>
              </div>
            </div>

            <Button 
              className="bg-primary text-primary-foreground px-8 py-3 text-lg hover:bg-primary/90"
              size="lg"
              onClick={() => window.location.href = "/contact"}
              data-testid="button-schedule-demo"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
