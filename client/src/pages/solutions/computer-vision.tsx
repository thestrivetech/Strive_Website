import { Eye, Camera, Scan, Shield, User, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const ComputerVision = () => {
  const solutions = [
    {
      icon: <Search className="text-primary text-xl" />,
      title: "Image Recognition & Classification",
      description: "Advanced AI systems that can identify, categorize, and analyze visual content with human-level accuracy.",
      features: ["Object Identification", "Image Categorization", "Content Moderation", "Quality Control"]
    },
    {
      icon: <Scan className="text-primary text-xl" />,
      title: "Object Detection & Tracking",
      description: "Real-time object detection and tracking capabilities for surveillance, inventory management, and process monitoring.",
      features: ["Real-time Detection", "Multi-object Tracking", "Movement Analysis", "Automated Counting"]
    },
    {
      icon: <User className="text-primary text-xl" />,
      title: "Facial Recognition Systems",
      description: "Secure and accurate facial recognition technology for access control, attendance, and identity verification.",
      features: ["Identity Verification", "Access Control", "Attendance Tracking", "Security Monitoring"]
    },
    {
      icon: <Shield className="text-primary text-xl" />,
      title: "Threat Detection & Security",
      description: "AI-powered visual surveillance systems that detect anomalies, threats, and security breaches in real-time.",
      features: ["Anomaly Detection", "Intrusion Alerts", "Behavior Analysis", "Automated Response"]
    }
  ];

  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Eye className="text-primary mr-4 h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-computer-vision-title">
                Computer Vision Solutions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-computer-vision-subtitle">
              Advanced AI-powered visual recognition and analysis systems that can interpret, analyze, and understand digital images and videos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <Card 
                key={index}
                className="p-8 group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1"
                data-testid={`card-computer-vision-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
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
                        <Camera className="text-primary mr-2 h-4 w-4" />
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
              <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-get-started-computer-vision">
                Get Started with Computer Vision
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComputerVision;