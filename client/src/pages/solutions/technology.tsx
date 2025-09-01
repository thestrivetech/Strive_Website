import { Laptop, Code2, Cloud, Zap, GitBranch, Server } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Technology = () => {
  const solutions = [
    {
      icon: <GitBranch className="text-primary text-xl" />,
      title: "DevOps Acceleration Platform",
      description: "Streamline development workflows with automated CI/CD pipelines and deployment optimization.",
      features: ["Automated Deployments", "Pipeline Optimization", "Code Quality Analysis", "Performance Monitoring"]
    },
    {
      icon: <Cloud className="text-primary text-xl" />,
      title: "Cloud-Native Development",
      description: "Build scalable, resilient applications designed for modern cloud infrastructure.",
      features: ["Microservices Architecture", "Container Orchestration", "Auto-scaling", "Service Mesh"]
    },
    {
      icon: <Server className="text-primary text-xl" />,
      title: "API Management Suite",
      description: "Comprehensive API lifecycle management with security, monitoring, and developer portal integration.",
      features: ["API Gateway", "Rate Limiting", "Analytics Dashboard", "Developer Documentation"]
    }
  ];

  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Laptop className="text-primary mr-4 h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-technology-title">
                Technology Solutions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-technology-subtitle">
              Accelerate your technology initiatives with modern development tools and cloud-native solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <Card 
                key={index}
                className="p-8 group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1"
                data-testid={`card-technology-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
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
                        <Code2 className="text-primary mr-2 h-4 w-4" />
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
              <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-get-started-technology">
                Get Started with Technology Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technology;