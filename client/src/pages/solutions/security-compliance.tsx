import { ShieldCheck, FileCheck, Lock, AlertTriangle, CheckCircle, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const SecurityCompliance = () => {
  const solutions = [
    {
      icon: <FileCheck className="text-primary text-xl" />,
      title: "Regulatory Compliance Automation",
      description: "Automated compliance monitoring and reporting systems that ensure adherence to industry standards and regulations.",
      features: ["GDPR Compliance", "SOX Compliance", "HIPAA Monitoring", "ISO Certification Support"]
    },
    {
      icon: <Lock className="text-primary text-xl" />,
      title: "Security Policy Management",
      description: "Comprehensive security policy framework with automated enforcement and continuous monitoring capabilities.",
      features: ["Policy Automation", "Access Control", "Security Training", "Incident Response"]
    },
    {
      icon: <CheckCircle className="text-primary text-xl" />,
      title: "Audit Trail & Reporting",
      description: "Complete audit trail management with detailed reporting and analysis for compliance and security reviews.",
      features: ["Activity Logging", "Compliance Reports", "Forensic Analysis", "Real-time Monitoring"]
    },
    {
      icon: <AlertTriangle className="text-primary text-xl" />,
      title: "Risk Assessment & Mitigation",
      description: "Proactive risk identification and mitigation strategies with continuous threat assessment and response planning.",
      features: ["Vulnerability Scanning", "Risk Analysis", "Threat Intelligence", "Mitigation Planning"]
    }
  ];

  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <ShieldCheck className="text-primary mr-4 h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-security-compliance-title">
                Security & Compliance Solutions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-security-compliance-subtitle">
              Comprehensive security frameworks and automated compliance monitoring to protect your business and meet regulatory requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <Card 
                key={index}
                className="p-8 group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1"
                data-testid={`card-security-compliance-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
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
              <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-get-started-security-compliance">
                Get Started with Security & Compliance
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecurityCompliance;