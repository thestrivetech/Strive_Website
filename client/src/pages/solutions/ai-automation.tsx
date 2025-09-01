import { Bot, Cpu, Brain, Workflow, Zap, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const AIAutomation = () => {
  const solutions = [
    {
      icon: <Brain className="text-primary text-xl" />,
      title: "Intelligent Process Automation",
      description: "Automate complex business processes with AI-driven decision making and adaptive workflow management.",
      features: ["Robotic Process Automation", "Smart Decision Trees", "Adaptive Workflows", "Exception Handling"]
    },
    {
      icon: <Cpu className="text-primary text-xl" />,
      title: "Machine Learning Models",
      description: "Custom ML models tailored to your business needs, from predictive analytics to pattern recognition.",
      features: ["Custom Model Development", "Data Training", "Model Optimization", "Performance Monitoring"]
    },
    {
      icon: <Target className="text-primary text-xl" />,
      title: "Predictive Analytics Platform",
      description: "Forecast trends, anticipate customer behavior, and make data-driven decisions with advanced analytics.",
      features: ["Trend Forecasting", "Customer Behavior Analysis", "Risk Prediction", "Market Intelligence"]
    },
    {
      icon: <Workflow className="text-primary text-xl" />,
      title: "Natural Language Processing",
      description: "Extract insights from text data, automate document processing, and enable conversational AI interfaces.",
      features: ["Text Analysis", "Document Processing", "Chatbot Development", "Sentiment Analysis"]
    }
  ];

  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Bot className="text-primary mr-4 h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-ai-automation-title">
                AI & Automation Solutions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-ai-automation-subtitle">
              Leverage artificial intelligence and automation to streamline processes, reduce costs, and improve decision-making across your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <Card 
                key={index}
                className="p-8 group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1"
                data-testid={`card-ai-automation-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
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
              <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-get-started-ai-automation">
                Get Started with AI & Automation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIAutomation;