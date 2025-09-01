import { ShoppingCart, Users, BarChart3, Smartphone, Package, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Retail = () => {
  const solutions = [
    {
      icon: <Smartphone className="text-primary text-xl" />,
      title: "Omnichannel Experience Platform",
      description: "Unified customer experience across all touchpoints with seamless integration between online and offline channels.",
      features: ["Multi-channel Integration", "Customer Journey Mapping", "Personalization Engine", "Cross-platform Analytics"]
    },
    {
      icon: <Package className="text-primary text-xl" />,
      title: "Inventory Management System",
      description: "AI-powered inventory optimization that reduces costs while ensuring product availability.",
      features: ["Real-time Tracking", "Demand Forecasting", "Automated Reordering", "Warehouse Optimization"]
    },
    {
      icon: <Target className="text-primary text-xl" />,
      title: "Customer Analytics Platform",
      description: "Deep customer insights and behavioral analysis to drive sales and improve customer satisfaction.",
      features: ["Customer Segmentation", "Purchase Prediction", "Loyalty Programs", "Marketing Automation"]
    }
  ];

  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <ShoppingCart className="text-primary mr-4 h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-retail-title">
                Retail Solutions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-retail-subtitle">
              Enhance customer experiences and optimize operations with cutting-edge retail technology solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <Card 
                key={index}
                className="p-8 group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1"
                data-testid={`card-retail-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
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
                        <Users className="text-primary mr-2 h-4 w-4" />
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
              <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-get-started-retail">
                Get Started with Retail Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Retail;