import { Bot, BarChart, Blocks, ShieldCheck, Eye, Check, Heart, Brain, ShoppingCart, Laptop, GraduationCap, Factory, Building2, DollarSign, Home as HomeIcon, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";

const Solutions = () => {
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
  // URL mappings for main solutions
  const getMainSolutionUrl = (title: string) => {
    const urlMap: { [key: string]: string } = {
      "AI & Automation": "/solutions/ai-automation",
      "Data & Analytics": "/solutions/data-analytics",
      "Blockchain Solutions": "/solutions/blockchain",
      "Business Intelligence": "/solutions/business-intelligence",
      "Computer Vision": "/solutions/computer-vision",
      "Security & Compliance": "/solutions/security-compliance"
    };
    return urlMap[title] || "";
  };

  // URL mappings for industry solutions
  const getIndustryUrl = (title: string) => {
    const urlMap: { [key: string]: string } = {
      "Healthcare": "/solutions/healthcare",
      "Financial Services": "/solutions/financial",
      "Manufacturing": "/solutions/manufacturing",
      "Retail": "/solutions/retail",
      "Technology": "/solutions/technology",
      "Education": "/solutions/education"
    };
    return urlMap[title] || "";
  };

  const mainSolutions = [
    {
      icon: <Bot className="text-primary text-xl" />,
      title: "AI & Automation",
      description: "Leverage artificial intelligence and automation to streamline processes, reduce costs, and improve decision-making across your organization.",
      features: [
        "Intelligent Process Automation",
        "Machine Learning Models", 
        "Predictive Analytics",
        "Natural Language Processing"
      ]
    },
    {
      icon: <BarChart className="text-primary text-xl" />,
      title: "Generative AI Solutions",
      description: "Transform raw data into actionable insights with advanced analytics platforms and real-time reporting capabilities.",
      features: [
        "Content Generation & Editing",
        "Image & Video Synthesis",
        "Code & App Prototyping", 
        "Personalized Marketing Tools"
      ]
    },
    {
      icon: <Blocks className="text-primary text-xl" />,
      title: "Blockchain Solutions",
      description: "Secure, transparent blockchain applications for supply chain, smart contracts, and decentralized systems.",
      features: [
        "Smart Contract Development",
        "Supply Chain Tracking",
        "Cryptocurrency Integration",
        "Decentralized Applications"
      ]
    },
    {
      icon: <ShieldCheck className="text-primary text-xl" />,
      title: "Business Intelligence",
      description: "Intelligent business automation and optimization systems that adapt and learn from your operations.",
      features: [
        "Real-time Dashboards",
        "Workflow Optimization",
        "Data Analysis Visualization",
        "Intelligent KPI Analysis",
        "Advanced Reporting"
      ]
    },
    {
      icon: <Eye className="text-primary text-xl" />,
      title: "Computer Vision",
      description: "Advanced AI-powered visual recognition and analysis systems that can interpret, analyze, and understand digital images and videos.",
      features: [
        "Image Recognition & Classification",
        "Object Detection & Tracking",
        "Facial Recognition Systems",
        "Threat Detection & Security Monitoring"
      ]
    },
    {
      icon: <ShieldCheck className="text-primary text-xl" />,
      title: "Security & Compliance",
      description: "Comprehensive security frameworks and automated compliance monitoring to protect your business and meet regulatory requirements.",
      features: [
        "Regulatory Compliance Automation",
        "Security Policy Management",
        "Audit Trail & Reporting",
        "Risk Assessment & Mitigation"
      ]
    }
  ];

  const industrySolutions = [
    { icon: <Heart className="text-primary text-3xl" />, title: "Healthcare", description: "Patient management, compliance tracking, and telemedicine solutions." },
    { icon: <Factory className="text-primary text-3xl" />, title: "Financial Services", description: "Risk management, regulatory compliance, and digital banking platforms." },
    { icon: <Factory className="text-primary text-3xl" />, title: "Manufacturing", description: "IoT integration, supply chain optimization, and quality management." },
    { icon: <ShoppingCart className="text-primary text-3xl" />, title: "Retail", description: "Omnichannel experiences, inventory management, and customer analytics." },
    { icon: <Laptop className="text-primary text-3xl" />, title: "Technology", description: "DevOps acceleration, cloud-native development, and API management." },
    { icon: <GraduationCap className="text-primary text-3xl" />, title: "Education", description: "Learning management systems, student analytics, and digital classrooms." }
  ];

  return (
    <div className="pt-16">
      {/* Industry Solutions Selector Hero */}
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
              Select your industry to discover how our AI-powered solutions can scale your business operations.
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
                  <div className={selectedIndustry === industry.id ? 'text-[#0f172a] !important' : 'text-[hsl(24,100%,58%)] !important'}>
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
      
      <section className="pt-20 pb-16 bg-gradient-to-br from-[#ffffffeb] via-[#fff7f0] to-primary/20 relative overflow-hidden">
        {/* Beautiful gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffffffeb] via-transparent to-primary/10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-[#ff7e29]"
              data-testid="text-solutions-title"
            >
              Our Solutions
            </h1>
            <p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-solutions-subtitle"
            >
              Comprehensive AI solutions designed to transform your operations and drive sustainable growth.
            </p>
          </div>

          {/* Solution Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
            {mainSolutions.map((solution, index) => (
              <Link key={index} href={getMainSolutionUrl(solution.title)}>
                <Card 
                  id={solution.title.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}
                  className="p-8 group hover:shadow-[0_0_80px_rgba(255,126,41,0.4)] transition-all duration-500 hover:border-primary/50 hover:-translate-y-1 relative overflow-hidden cursor-pointer"
                  data-testid={`card-main-solution-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                <CardContent className="p-0 relative z-10">
                  {/* Glow effect */}
                  <div className="absolute -inset-6 bg-gradient-to-br from-primary/8 via-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110">
                      {solution.icon}
                    </div>
                    <h2 
                      className="text-2xl font-bold group-hover:text-[#ff7e29] transition-colors duration-300"
                      data-testid={`text-solution-title-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {solution.title}
                    </h2>
                  </div>
                  <p 
                    className="text-muted-foreground group-hover:text-[#ff7e29] mb-6 transition-colors duration-300"
                    data-testid={`text-solution-description-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {solution.description}
                  </p>
                  <div className="space-y-4">
                    {solution.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex} 
                        className="flex items-center"
                        data-testid={`feature-${solution.title.toLowerCase().replace(/\s+/g, "-")}-${featureIndex}`}
                      >
                        <Check className="text-primary mr-3 h-4 w-4" />
                        <span className="group-hover:text-[#ff7e29] transition-colors duration-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Industry Solutions */}
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-[#ff7e29]"
              data-testid="text-industry-title"
            >
              Industry-Specific Solutions
            </h2>
            <p 
              className="text-xl text-muted-foreground"
              data-testid="text-industry-subtitle"
            >
              Tailored solutions for your industry's unique challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industrySolutions.map((industry, index) => (
              <Link key={index} href={getIndustryUrl(industry.title)}>
                <Card 
                  className="p-6 text-center group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 cursor-pointer"
                  data-testid={`card-industry-${industry.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                <CardContent className="p-0">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    {industry.icon}
                  </div>
                  <h3 
                    className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300"
                    data-testid={`text-industry-title-${industry.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {industry.title}
                  </h3>
                  <p 
                    className="text-muted-foreground"
                    data-testid={`text-industry-description-${industry.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {industry.description}
                  </p>
                </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
