import { ArrowLeft, Brain, Cpu, Zap, TrendingUp, Shield, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

const AiMlDocumentation = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/solutions">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Solutions
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Brain className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
              AI & Machine Learning
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Harness the power of artificial intelligence and machine learning to transform your business 
            operations, automate complex processes, and unlock insights from your data.
          </p>
        </div>

        {/* Overview Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">What is AI/ML?</h2>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p className="mb-4">
                Artificial Intelligence (AI) and Machine Learning (ML) represent the cutting edge of 
                computational technology, enabling systems to learn from data, identify patterns, and make 
                decisions with minimal human intervention.
              </p>
              <p className="mb-4">
                Our AI/ML solutions leverage advanced algorithms including deep learning, neural networks, 
                and natural language processing to solve complex business challenges across industries.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Key Capabilities */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Core Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <Cpu className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Deep Learning</h3>
                <p className="text-muted-foreground">
                  Advanced neural networks that can process complex data patterns, enabling image recognition, 
                  natural language understanding, and predictive analytics.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <Zap className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Real-time Processing</h3>
                <p className="text-muted-foreground">
                  Process and analyze data streams in real-time, enabling instant decision-making and 
                  responsive automation for critical business operations.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <TrendingUp className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Predictive Analytics</h3>
                <p className="text-muted-foreground">
                  Forecast future trends and behaviors using historical data, helping you make proactive 
                  business decisions and optimize resource allocation.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <Brain className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Natural Language Processing</h3>
                <p className="text-muted-foreground">
                  Understand and generate human language, powering chatbots, sentiment analysis, and 
                  automated document processing.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <Shield className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Anomaly Detection</h3>
                <p className="text-muted-foreground">
                  Identify unusual patterns and outliers in data, crucial for fraud detection, quality 
                  control, and security monitoring.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <Lightbulb className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Intelligent Automation</h3>
                <p className="text-muted-foreground">
                  Automate complex decision-making processes that traditionally required human judgment, 
                  increasing efficiency and consistency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Use Cases */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Industry Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Healthcare</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Diagnostic image analysis and interpretation</li>
                  <li>• Drug discovery and development</li>
                  <li>• Patient risk prediction and care optimization</li>
                  <li>• Treatment recommendation systems</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Financial Services</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Fraud detection and prevention</li>
                  <li>• Credit risk assessment</li>
                  <li>• Algorithmic trading strategies</li>
                  <li>• Customer behavior prediction</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Manufacturing</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Predictive maintenance</li>
                  <li>• Quality control automation</li>
                  <li>• Supply chain optimization</li>
                  <li>• Production planning and scheduling</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Retail</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Personalized recommendations</li>
                  <li>• Demand forecasting</li>
                  <li>• Dynamic pricing optimization</li>
                  <li>• Customer sentiment analysis</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Process */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Implementation Approach</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Data Assessment</h3>
                  <p className="text-muted-foreground">
                    Evaluate your existing data infrastructure and identify opportunities for AI/ML integration.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Model Development</h3>
                  <p className="text-muted-foreground">
                    Design and train custom ML models tailored to your specific business requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Integration & Testing</h3>
                  <p className="text-muted-foreground">
                    Seamlessly integrate AI/ML solutions into your existing systems with comprehensive testing.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Deployment & Monitoring</h3>
                  <p className="text-muted-foreground">
                    Deploy models to production with continuous monitoring and optimization for peak performance.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business with AI?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let our experts help you leverage the power of AI and machine learning to drive innovation 
            and growth in your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started with AI/ML
              </Button>
            </Link>
            <Link href="/consultation">
              <Button size="lg" variant="outline">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiMlDocumentation;