import { Lightbulb, TrendingUp, Users, Zap, Target, Workflow } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const SmartBusiness = () => {
  const solutions = [
    {
      icon: <TrendingUp className="text-primary text-xl" />,
      title: "Business Intelligence Platform",
      description: "Transform raw data into actionable insights with comprehensive analytics and real-time reporting dashboards.",
      features: ["Real-time Dashboards", "KPI Tracking", "Performance Analytics", "Custom Reports"]
    },
    {
      icon: <Workflow className="text-primary text-xl" />,
      title: "Process Optimization",
      description: "Streamline operations and eliminate inefficiencies through intelligent workflow automation and optimization.",
      features: ["Workflow Analysis", "Bottleneck Identification", "Process Automation", "Efficiency Metrics"]
    },
    {
      icon: <Users className="text-primary text-xl" />,
      title: "Customer Intelligence",
      description: "Gain deep insights into customer behavior, preferences, and trends to drive better business decisions.",
      features: ["Customer Segmentation", "Behavior Analysis", "Predictive Modeling", "Churn Prevention"]
    },
    {
      icon: <Target className="text-primary text-xl" />,
      title: "Strategic Planning Tools",
      description: "Make informed strategic decisions with advanced forecasting, scenario planning, and market analysis tools.",
      features: ["Market Analysis", "Scenario Planning", "Risk Assessment", "Strategic Roadmaps"]
    }
  ];

  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Lightbulb className="text-primary mr-4 h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-smart-business-title">
                Smart Business Solutions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-smart-business-subtitle">
              Empower your business with intelligent solutions that drive growth, optimize operations, and unlock new opportunities through data-driven insights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <Card 
                key={index}
                className="p-8 group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1"
                data-testid={`card-smart-business-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center mr-4 transition-all duration-300">
                      {solution.icon}
                    </div>
                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                      {solution.title}
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {solution.description}
                  </p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Zap className="text-primary mr-2 h-4 w-4" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/get-started">
              <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-get-started-smart-business">
                Get Started with Smart Business Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmartBusiness;