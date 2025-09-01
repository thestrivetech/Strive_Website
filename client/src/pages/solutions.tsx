import { Bot, BarChart, Blocks, ShieldCheck, Eye, Check, Heart, Brain, ShoppingCart, Laptop, GraduationCap, Factory } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Solutions = () => {
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
      title: "Data & Analytics",
      description: "Transform raw data into actionable insights with advanced analytics platforms and real-time reporting capabilities.",
      features: [
        "Real-time Dashboards",
        "Business Intelligence",
        "Data Visualization", 
        "Advanced Reporting"
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
      title: "Smart Business Solutions",
      description: "Intelligent business automation and optimization systems that adapt and learn from your operations.",
      features: [
        "Automated Decision Making",
        "Business Process Mining",
        "Workflow Optimization",
        "Performance Analytics"
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
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              data-testid="text-solutions-title"
            >
              Our Solutions
            </h1>
            <p 
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-solutions-subtitle"
            >
              Comprehensive business solutions designed to transform your operations and drive sustainable growth.
            </p>
          </div>

          {/* Solution Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
            {mainSolutions.map((solution, index) => (
              <Card 
                key={index} 
                id={solution.title.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}
                className="p-8 group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1 relative overflow-hidden"
                data-testid={`card-main-solution-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <CardContent className="p-0 relative z-10">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110">
                      {solution.icon}
                    </div>
                    <h2 
                      className="text-2xl font-bold group-hover:text-primary transition-colors duration-300"
                      data-testid={`text-solution-title-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {solution.title}
                    </h2>
                  </div>
                  <p 
                    className="text-muted-foreground mb-6"
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
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Industry Solutions */}
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
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
              <Card 
                key={index} 
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
