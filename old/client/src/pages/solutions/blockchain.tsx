import { Blocks, Link2, Shield, Coins, FileText, Network } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Blockchain = () => {
  const solutions = [
    {
      icon: <FileText className="text-primary text-xl" />,
      title: "Smart Contract Development",
      description: "Create secure, automated contracts that execute when predetermined conditions are met, reducing costs and eliminating intermediaries.",
      features: ["Contract Automation", "Multi-platform Support", "Security Audits", "Gas Optimization"]
    },
    {
      icon: <Link2 className="text-primary text-xl" />,
      title: "Supply Chain Tracking",
      description: "End-to-end transparency in your supply chain with immutable records and real-time tracking capabilities.",
      features: ["Product Traceability", "Authenticity Verification", "Quality Assurance", "Compliance Monitoring"]
    },
    {
      icon: <Coins className="text-primary text-xl" />,
      title: "Cryptocurrency Integration",
      description: "Seamlessly integrate digital payment systems and cryptocurrency solutions into your existing business infrastructure.",
      features: ["Payment Processing", "Wallet Integration", "Multi-currency Support", "Transaction Security"]
    },
    {
      icon: <Network className="text-primary text-xl" />,
      title: "Decentralized Applications",
      description: "Build robust DApps that leverage blockchain technology for enhanced security, transparency, and user control.",
      features: ["dApp Development", "Web3 Integration", "Decentralized Storage", "User Authentication"]
    }
  ];

  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Blocks className="text-primary mr-4 h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-blockchain-title">
                Blockchain Solutions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-blockchain-subtitle">
              Secure, transparent blockchain applications for supply chain, smart contracts, and decentralized systems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <Card 
                key={index}
                className="p-8 group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1"
                data-testid={`card-blockchain-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
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
                        <Shield className="text-primary mr-2 h-4 w-4" />
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
              <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-get-started-blockchain">
                Get Started with Blockchain Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blockchain;