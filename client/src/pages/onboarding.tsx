import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Calendar, Clock, Users } from "lucide-react";

const Onboarding = () => {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    
    // Business Info
    industry: "",
    companySize: "",
    currentChallenges: "",
    
    // AI Requirements
    aiGoals: "",
    timeline: "",
    budget: "",
    aiExperience: "",
    
    // Additional Info
    additionalInfo: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (formStep < 4) {
      setFormStep(formStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Onboarding form submitted:", formData);
    setFormStep(5); // Move to completion step
  };

  const isStepValid = () => {
    switch (formStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.company;
      case 2:
        return formData.industry && formData.companySize && formData.currentChallenges;
      case 3:
        return formData.aiGoals && formData.timeline && formData.budget;
      case 4:
        return true; // Additional info is optional
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (formStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2" data-testid="step-title">
                Complete Your Profile
              </h2>
              <p className="text-muted-foreground">
                Tell us about yourself and your company
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="John"
                  data-testid="input-first-name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Doe"
                  data-testid="input-last-name"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@company.com"
                data-testid="input-email"
              />
            </div>
            
            <div>
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="Your Company Inc."
                data-testid="input-company"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                data-testid="input-phone"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2" data-testid="step-title">
                About Your Business
              </h2>
              <p className="text-muted-foreground">
                Help us understand your industry and needs
              </p>
            </div>
            
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                <SelectTrigger data-testid="select-industry">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance & Banking</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail & E-commerce</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="companySize">Company Size *</Label>
              <Select value={formData.companySize} onValueChange={(value) => handleInputChange("companySize", value)}>
                <SelectTrigger data-testid="select-company-size">
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="201-500">201-500 employees</SelectItem>
                  <SelectItem value="501-1000">501-1000 employees</SelectItem>
                  <SelectItem value="1000+">1000+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="currentChallenges">Current Business Challenges *</Label>
              <Textarea
                id="currentChallenges"
                value={formData.currentChallenges}
                onChange={(e) => handleInputChange("currentChallenges", e.target.value)}
                placeholder="Describe the main challenges your business is facing that AI could help solve..."
                className="min-h-[120px]"
                data-testid="textarea-challenges"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2" data-testid="step-title">
                AI Solution Requirements
              </h2>
              <p className="text-muted-foreground">
                What are you looking to achieve with AI?
              </p>
            </div>
            
            <div>
              <Label htmlFor="aiGoals">AI Goals & Objectives *</Label>
              <Textarea
                id="aiGoals"
                value={formData.aiGoals}
                onChange={(e) => handleInputChange("aiGoals", e.target.value)}
                placeholder="What specific outcomes are you hoping to achieve with AI? (e.g., automate customer service, improve data analysis, etc.)"
                className="min-h-[120px]"
                data-testid="textarea-ai-goals"
              />
            </div>
            
            <div>
              <Label htmlFor="timeline">Project Timeline *</Label>
              <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
                <SelectTrigger data-testid="select-timeline">
                  <SelectValue placeholder="When do you want to start?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">As soon as possible</SelectItem>
                  <SelectItem value="1-3months">Within 1-3 months</SelectItem>
                  <SelectItem value="3-6months">Within 3-6 months</SelectItem>
                  <SelectItem value="6-12months">Within 6-12 months</SelectItem>
                  <SelectItem value="planning">Just planning ahead</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="budget">Budget Range *</Label>
              <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                <SelectTrigger data-testid="select-budget">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-50k">Under $50,000</SelectItem>
                  <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                  <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                  <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                  <SelectItem value="500k+">$500,000+</SelectItem>
                  <SelectItem value="discuss">Prefer to discuss</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="aiExperience">AI Experience Level</Label>
              <Select value={formData.aiExperience} onValueChange={(value) => handleInputChange("aiExperience", value)}>
                <SelectTrigger data-testid="select-ai-experience">
                  <SelectValue placeholder="Select your AI experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No prior AI experience</SelectItem>
                  <SelectItem value="basic">Basic understanding</SelectItem>
                  <SelectItem value="some">Some AI implementation experience</SelectItem>
                  <SelectItem value="advanced">Advanced AI experience</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2" data-testid="step-title">
                Additional Information
              </h2>
              <p className="text-muted-foreground">
                Anything else you'd like us to know?
              </p>
            </div>
            
            <div>
              <Label htmlFor="additionalInfo">Additional Details</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                placeholder="Share any additional context, specific requirements, or questions you have about AI implementation..."
                className="min-h-[150px]"
                data-testid="textarea-additional-info"
              />
            </div>
            
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">What happens next?</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>We'll review your requirements within 24 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Access your personalized dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Receive custom AI solution recommendations</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2" data-testid="step-title">
                Welcome to Strive!
              </h2>
              <p className="text-muted-foreground">
                Your profile has been completed successfully.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Your Account is Ready</h3>
                <p className="text-muted-foreground">
                  You now have full access to Strive's AI solutions platform
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">Profile Complete</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm">Expert Support</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm">24/7 Access</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
                  onClick={() => window.location.href = "/solutions"}
                  data-testid="button-explore-solutions"
                >
                  Explore Solutions
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.location.href = "/get-started"}
                  data-testid="button-schedule-consultation"
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-background to-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="onboarding-title">
              Complete Your <span className="gradient-text">Profile</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Help us tailor the perfect AI solutions for your business needs.
            </p>
          </div>

          {/* Progress Indicator */}
          {formStep < 5 && (
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      step <= formStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                    data-testid={`step-indicator-${step}`}
                  >
                    {step}
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Step {formStep} of 4
              </div>
            </div>
          )}

          {/* Form Card */}
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              {formStep < 5 ? (
                <form onSubmit={formStep === 4 ? handleSubmit : (e) => e.preventDefault()}>
                  {renderStep()}
                  
                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-8">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevStep}
                      disabled={formStep === 1}
                      data-testid="button-prev-step"
                    >
                      Previous
                    </Button>
                    
                    <div className="flex space-x-3">
                      {formStep < 4 ? (
                        <Button
                          type="button"
                          onClick={handleNextStep}
                          disabled={!isStepValid()}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                          data-testid="button-next-step"
                        >
                          Next Step
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                          data-testid="button-submit-form"
                        >
                          Complete Profile
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              ) : (
                renderStep()
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;