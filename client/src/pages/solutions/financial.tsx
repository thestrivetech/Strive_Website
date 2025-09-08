import { Building2, TrendingUp, Shield, BarChart3, DollarSign, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Financial = () => {
  const solutions = [
    {
      icon: <TrendingUp className="text-primary text-xl" />,
      title: "Risk Management Platform",
      description: "Advanced risk assessment and management tools with real-time monitoring and predictive modeling.",
      features: ["Real-time Risk Analysis", "Compliance Monitoring", "Stress Testing", "Portfolio Analytics"]
    },
    {
      icon: <Shield className="text-primary text-xl" />,
      title: "Fraud Detection System",
      description: "AI-powered fraud detection that identifies suspicious activities and prevents financial crimes.",
      features: ["Transaction Monitoring", "Behavioral Analysis", "Machine Learning Models", "Alert Management"]
    },
    {
      icon: <CreditCard className="text-primary text-xl" />,
      title: "Digital Banking Platform",
      description: "Complete digital banking solution with mobile apps, online services, and payment processing.",
      features: ["Mobile Banking", "Payment Gateway", "Account Management", "API Integration"]
    }
  ];

  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Building2 className="text-primary mr-4 h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-financial-title">
                Financial Services Solutions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-financial-subtitle">
              Secure, compliant, and innovative financial technology solutions for banks, credit unions, and fintech companies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <Card 
                key={index}
                className="p-8 group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1"
                data-testid={`card-financial-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
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
                        <DollarSign className="text-primary mr-2 h-4 w-4" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/request">
              <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-get-started-financial">
                Get Started with Financial Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Financial;