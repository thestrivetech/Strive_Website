import { ArrowLeft, Heart, Activity, Users, TrendingUp, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

const HealthcareCaseStudy = () => {
  return (
    <div className="min-h-screen bg-[#ffffffeb] pt-16">
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
            <Heart className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
              Healthcare Transformation
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            How Regional Medical Center revolutionized patient care and reduced operational costs 
            by 30% with AI-powered healthcare solutions
          </p>
        </div>

        {/* Client Overview */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Client Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-primary mb-2">Organization</h3>
                <p className="text-muted-foreground">Regional Medical Center Network</p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Size</h3>
                <p className="text-muted-foreground">12 hospitals, 3,500+ staff</p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Location</h3>
                <p className="text-muted-foreground">Multi-state healthcare system</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Challenge Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">The Challenge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-destructive">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Diagnostic Delays</h3>
                <p className="text-muted-foreground">
                  Manual review of medical imaging resulted in 48-72 hour turnaround times for 
                  critical diagnoses, impacting patient outcomes.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-destructive">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Staff Burnout</h3>
                <p className="text-muted-foreground">
                  Healthcare professionals spending 60% of their time on administrative tasks 
                  rather than patient care.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-destructive">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Data Silos</h3>
                <p className="text-muted-foreground">
                  Fragmented patient data across multiple systems preventing comprehensive 
                  care coordination.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-destructive">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Rising Costs</h3>
                <p className="text-muted-foreground">
                  Operational inefficiencies leading to 15% year-over-year cost increases 
                  while patient satisfaction declined.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Solution Section */}
        <Card className="mb-12 border-2 border-primary">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-6">The Solution</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We implemented a comprehensive AI-powered healthcare platform that transformed every 
              aspect of their operations:
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">AI-Powered Diagnostics</h3>
                  <p className="text-muted-foreground">
                    Deployed computer vision models for automated analysis of X-rays, MRIs, and CT scans, 
                    providing instant preliminary diagnoses with 97.8% accuracy.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Intelligent Patient Management</h3>
                  <p className="text-muted-foreground">
                    Implemented predictive analytics to identify high-risk patients, automate appointment 
                    scheduling, and optimize resource allocation across facilities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Automated Documentation</h3>
                  <p className="text-muted-foreground">
                    Natural language processing for voice-to-text clinical documentation, reducing 
                    administrative burden by 70% and improving accuracy.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Unified Data Platform</h3>
                  <p className="text-muted-foreground">
                    Created a centralized data lake integrating all patient information, enabling 
                    real-time analytics and comprehensive care coordination.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Transformative Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">45%</div>
                <p className="text-sm text-muted-foreground">Reduction in diagnostic time</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">30%</div>
                <p className="text-sm text-muted-foreground">Decrease in operational costs</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">92%</div>
                <p className="text-sm text-muted-foreground">Patient satisfaction score</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">60%</div>
                <p className="text-sm text-muted-foreground">Reduction in readmission rates</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact Stories */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Real-World Impact</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-l-primary pl-6">
                <p className="text-lg italic text-muted-foreground mb-3">
                  "The AI diagnostic system identified early-stage cancer in my routine scan that 
                  human review might have missed. It saved my life."
                </p>
                <p className="text-sm font-semibold">- Sarah M., Patient</p>
              </div>
              <div className="border-l-4 border-l-primary pl-6">
                <p className="text-lg italic text-muted-foreground mb-3">
                  "We've reduced our emergency room wait times by 65% while improving the quality 
                  of care. The AI triage system is revolutionary."
                </p>
                <p className="text-sm font-semibold">- Dr. James Chen, Emergency Department Chief</p>
              </div>
              <div className="border-l-4 border-l-primary pl-6">
                <p className="text-lg italic text-muted-foreground mb-3">
                  "Administrative tasks that used to take hours now take minutes. I can finally 
                  focus on what matters most - my patients."
                </p>
                <p className="text-sm font-semibold">- Maria Rodriguez, RN</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Learnings */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Key Learnings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Phased Implementation
                </h3>
                <p className="text-muted-foreground">
                  Starting with a pilot program in one department allowed us to refine the system 
                  before full-scale deployment.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Staff Training Critical
                </h3>
                <p className="text-muted-foreground">
                  Comprehensive training programs ensured smooth adoption and maximized the 
                  technology's potential.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Data Quality Matters
                </h3>
                <p className="text-muted-foreground">
                  Investing in data cleanup and standardization upfront dramatically improved 
                  AI model performance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Continuous Improvement
                </h3>
                <p className="text-muted-foreground">
                  Regular model retraining and feedback loops ensure the system continues to 
                  improve over time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Transform Your Healthcare Organization</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the healthcare AI revolution. Discover how our solutions can improve patient 
            outcomes while reducing costs in your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/request">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Your Transformation
              </Button>
            </Link>
            <Link href="/assessment">
              <Button size="lg" variant="outline">
                Schedule Assessment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareCaseStudy;