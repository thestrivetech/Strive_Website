import { Heart, Activity, Shield, FileText, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Healthcare = () => {
  const solutions = [
    {
      icon: <Activity className="text-primary text-xl" />,
      title: "Patient Management System",
      description: "Comprehensive patient record management with AI-powered health insights and predictive analytics.",
      features: ["Electronic Health Records", "AI Diagnostics", "Treatment Planning", "Patient Monitoring"]
    },
    {
      icon: <Shield className="text-primary text-xl" />,
      title: "HIPAA Compliance Platform",
      description: "Automated compliance monitoring and reporting to ensure healthcare data security and regulatory adherence.",
      features: ["Compliance Monitoring", "Data Encryption", "Audit Trails", "Risk Assessment"]
    },
    {
      icon: <FileText className="text-primary text-xl" />,
      title: "Medical Documentation AI",
      description: "Intelligent documentation system that converts voice notes and clinical observations into structured records.",
      features: ["Voice-to-Text", "Clinical Coding", "Report Generation", "Data Extraction"]
    }
  ];

  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Heart className="text-primary mr-4 h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-healthcare-title">
                Healthcare Solutions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-healthcare-subtitle">
              Transform healthcare delivery with AI-powered solutions designed for better patient outcomes and operational efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <Card 
                key={index}
                className="p-8 group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1"
                data-testid={`card-healthcare-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
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
                        <Calendar className="text-primary mr-2 h-4 w-4" />
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
              <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-get-started-healthcare">
                Get Started with Healthcare Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Healthcare;