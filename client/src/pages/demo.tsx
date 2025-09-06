import { useState } from "react";
import { Play, Pause, RotateCcw, Monitor, Users, TrendingUp, Shield, Brain, BarChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Demo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoSteps = [
    {
      title: "AI-Powered Dashboard Overview",
      description: "See how Strive's intelligent dashboard provides real-time insights into your business operations with predictive analytics and automated reporting.",
      icon: <Monitor className="text-primary text-2xl" />,
      features: ["Real-time data visualization", "Predictive trend analysis", "Automated alerts and notifications"]
    },
    {
      title: "Team Collaboration & Automation",
      description: "Experience seamless team collaboration with AI-assisted project management, automated task distribution, and intelligent resource allocation.",
      icon: <Users className="text-primary text-2xl" />,
      features: ["Smart task automation", "Team performance analytics", "Resource optimization"]
    },
    {
      title: "Business Intelligence & Growth",
      description: "Discover how our advanced analytics engine identifies growth opportunities, optimizes processes, and provides actionable business insights.",
      icon: <TrendingUp className="text-primary text-2xl" />,
      features: ["Growth opportunity identification", "Process optimization", "ROI tracking and analysis"]
    },
    {
      title: "Security & Compliance Management",
      description: "Learn about our comprehensive security framework that automatically monitors compliance, detects threats, and maintains audit trails.",
      icon: <Shield className="text-primary text-2xl" />,
      features: ["Automated compliance monitoring", "Threat detection & response", "Audit trail management"]
    },
    {
      title: "AI Decision Making Engine",
      description: "See how our AI engine analyzes patterns, predicts outcomes, and provides intelligent recommendations for critical business decisions.",
      icon: <Brain className="text-primary text-2xl" />,
      features: ["Pattern recognition", "Outcome prediction", "Intelligent recommendations"]
    },
    {
      title: "Advanced Analytics & Reporting",
      description: "Explore our sophisticated reporting capabilities that transform complex data into clear, actionable insights for strategic planning.",
      icon: <BarChart className="text-primary text-2xl" />,
      features: ["Custom report generation", "Data visualization", "Strategic planning tools"]
    }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    setIsPlaying(false);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              data-testid="text-demo-title"
            >
              Experience Strive in Action
            </h1>
            <p 
              className="text-xl text-white/90 max-w-3xl mx-auto mb-8"
              data-testid="text-demo-subtitle"
            >
              See how our AI-powered solutions transform business operations and drive growth through intelligent automation.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Demo Controls */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4 bg-off-white rounded-lg shadow-lg p-4">
              <Button
                onClick={handlePlayPause}
                variant={isPlaying ? "default" : "outline"}
                size="lg"
                className="flex items-center space-x-2"
                data-testid="button-play-pause"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                <span>{isPlaying ? "Pause" : "Play"} Demo</span>
              </Button>
              <Button
                onClick={handleRestart}
                variant="outline"
                size="lg"
                className="flex items-center space-x-2"
                data-testid="button-restart"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Restart</span>
              </Button>
            </div>
          </div>

          {/* Demo Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Step Navigation */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4" data-testid="text-demo-steps-title">
                Demo Steps
              </h3>
              {demoSteps.map((step, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 ${
                    currentStep === index 
                      ? "border-primary bg-primary/5" 
                      : "hover:border-primary/50 hover:bg-accent/50"
                  }`}
                  onClick={() => handleStepClick(index)}
                  data-testid={`card-demo-step-${index}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        currentStep === index ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{step.title}</h4>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Demo Display */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      {demoSteps[currentStep].icon}
                    </div>
                    <h2 
                      className="text-2xl md:text-3xl font-bold mb-4"
                      data-testid={`text-current-step-title`}
                    >
                      {demoSteps[currentStep].title}
                    </h2>
                    <p 
                      className="text-muted-foreground text-lg"
                      data-testid={`text-current-step-description`}
                    >
                      {demoSteps[currentStep].description}
                    </p>
                  </div>

                  {/* Demo Visualization */}
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8 mb-8">
                    <div className="text-center">
                      <div className="w-full h-48 bg-white/60 backdrop-blur-sm rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30">
                        <div className="text-center">
                          <div className="text-6xl mb-4">{demoSteps[currentStep].icon}</div>
                          <p className="text-muted-foreground">Interactive Demo Visualization</p>
                          <p className="text-sm text-muted-foreground">Step {currentStep + 1} of {demoSteps.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h3 className="font-bold mb-4">Key Features Demonstrated:</h3>
                    <div className="space-y-2">
                      {demoSteps[currentStep].features.map((feature, index) => (
                        <div 
                          key={index}
                          className="flex items-center space-x-3"
                          data-testid={`feature-${currentStep}-${index}`}
                        >
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Demo Navigation */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                variant="outline"
                data-testid="button-previous-step"
              >
                Previous
              </Button>
              <span className="text-muted-foreground">
                {currentStep + 1} of {demoSteps.length}
              </span>
              <Button
                onClick={() => setCurrentStep(Math.min(demoSteps.length - 1, currentStep + 1))}
                disabled={currentStep === demoSteps.length - 1}
                variant="outline"
                data-testid="button-next-step"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              data-testid="text-cta-title"
            >
              Ready to Transform Your Business?
            </h2>
            <p 
              className="text-xl text-muted-foreground mb-8"
              data-testid="text-cta-description"
            >
              See how Strive can revolutionize your operations with personalized AI solutions designed for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => window.location.href = "/contact"}
                data-testid="button-schedule-consultation"
              >
                Schedule a Personal Demo
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => window.location.href = "/get-started"}
                data-testid="button-get-started-now"
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;