import { ShieldCheck, Settings, Workflow, BarChart3, Target, Cog } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const SmartBusiness = () => {
  const solutions = [
    {
      icon: <Settings className="text-primary text-xl" />,
      title: "Automated Decision Making",
      description: "AI-powered decision engines that analyze data patterns and business rules to make optimal decisions in real-time.",
      features: ["Rule-based Automation", "Machine Learning Decisions", "Risk Assessment", "Performance Optimization"]
    },
    {
      icon: <Workflow className="text-primary text-xl" />,
      title: "Business Process Mining",
      description: "Discover, monitor, and improve your business processes through advanced process mining and analytics.",
      features: ["Process Discovery", "Bottleneck Identification", "Compliance Monitoring", "Process Visualization"]
    },
    {
      icon: <Target className="text-primary text-xl" />,
      title: "Workflow Optimization",
      description: "Streamline operations with intelligent workflow management that adapts to changing business conditions.",
      features: ["Dynamic Routing", "Resource Allocation", "Priority Management", "SLA Monitoring"]
    },
    {
      icon: <BarChart3 className="text-primary text-xl" />,
      title: "Performance Analytics",
      description: "Comprehensive performance monitoring with predictive insights and actionable recommendations.",
      features: ["KPI Tracking", "Predictive Analytics", "Benchmarking", "Custom Reports"]
    }
  ];

  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <ShieldCheck className="text-primary mr-4 h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-smart-business-title">
                Business Intelligence
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-smart-business-subtitle">
              Intelligent business automation and optimization systems that adapt and learn from your operations.
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
                        <Cog className="text-primary mr-2 h-4 w-4" />
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