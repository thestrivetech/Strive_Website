import { useState } from "react";
import { 
  Building2, Users, Target, Calendar, Clock, Mail, Phone, User, 
  Briefcase, CheckCircle, ChevronRight, Sparkles, Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const Demo = () => {
  const [formStep, setFormStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Contact Information
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    jobTitle: "",
    
    // Business Information
    industry: "",
    companySize: "",
    currentChallenges: [] as string[],
    budgetRange: "",
    
    // Demo Preferences
    demoFocusAreas: [] as string[],
    preferredDate: "",
    preferredTime: "",
    additionalRequirements: ""
  });

  const industries = [
    "Healthcare", "Finance", "Manufacturing", "Retail", 
    "Technology", "Education", "Real Estate", "Legal", "Other"
  ];

  const companySizes = [
    "1-10 employees", "11-50 employees", "51-200 employees", 
    "201-500 employees", "501-1000 employees", "1000+ employees"
  ];

  const challenges = [
    "Process Automation", "Data Analytics", "Customer Experience", 
    "Operational Efficiency", "Cost Reduction", "Scalability",
    "Security & Compliance", "Digital Transformation"
  ];

  const budgetRanges = [
    "Under $10,000", "$10,000 - $50,000", "$50,000 - $100,000", 
    "$100,000 - $500,000", "$500,000+", "Not sure yet"
  ];

  const demoFocusOptions = [
    "AI-Powered Dashboard", "Team Collaboration Tools", "Business Intelligence",
    "Security & Compliance", "Automation Solutions", "Analytics & Reporting",
    "Custom AI Models", "Integration Capabilities"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter((item: string) => item !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the form data to your backend
    console.log("Demo request submitted:", formData);
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return formData.fullName && formData.email && formData.companyName;
      case 2:
        return formData.industry && formData.companySize && formData.currentChallenges.length > 0;
      case 3:
        return formData.demoFocusAreas.length > 0;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-16 min-h-screen hero-gradient flex items-center justify-center">
        <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-[#020a1c] mb-4">
              Demo Request Received!
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your interest in Strive. Our team will review your requirements 
              and contact you within 24 hours to schedule your personalized demo.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-[#020a1c] mb-3">What happens next?</h3>
              <ul className="text-left space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>Our solution architects will review your requirements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>We'll prepare a customized demo based on your needs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>You'll receive a calendar invite for your demo session</span>
                </li>
              </ul>
            </div>
            <Button 
              onClick={() => window.location.href = "/"}
              className="bg-primary hover:bg-primary/90"
              size="lg"
            >
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-12 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Sparkles className="text-primary h-16 w-16 animate-pulse" />
                <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Request Your Free Custom Demo
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Let us show you exactly how Strive can transform your business. 
              Get a personalized demonstration tailored to your specific needs and challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-[#ffffffeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center flex-1">
                    {step > 1 && (
                      <div className={`
                        h-1 flex-1 mr-2
                        ${formStep > step - 1 ? 'bg-primary' : 'bg-gray-200'}
                        transition-all duration-300
                      `} />
                    )}
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold mx-auto
                      ${formStep >= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}
                      transition-all duration-300
                    `}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`
                        h-1 flex-1 ml-2
                        ${formStep > step ? 'bg-primary' : 'bg-gray-200'}
                        transition-all duration-300
                      `} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm">
                <span className={`text-center ${formStep >= 1 ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                  Contact Info
                </span>
                <span className={`text-center ${formStep >= 2 ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                  Business Details
                </span>
                <span className={`text-center ${formStep >= 3 ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                  Demo Preferences
                </span>
              </div>
            </div>

            {/* Form Card */}
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-[#020a1c]">
                  {formStep === 1 && "Tell us about yourself"}
                  {formStep === 2 && "Help us understand your business"}
                  {formStep === 3 && "Customize your demo experience"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Contact Information */}
                  {formStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="fullName" className="text-[#ff7033]">Full Name *</Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-[#ff7033]">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="john@company.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="phone" className="text-[#ff7033]">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <Label htmlFor="companyName" className="text-[#ff7033]">Company Name *</Label>
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange("companyName", e.target.value)}
                            placeholder="Acme Corporation"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="jobTitle" className="text-[#ff7033]">Job Title</Label>
                        <Input
                          id="jobTitle"
                          value={formData.jobTitle}
                          onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                          placeholder="Chief Technology Officer"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Business Information */}
                  {formStep === 2 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="industry" className="text-[#ff7033]">Industry *</Label>
                          <Select 
                            value={formData.industry} 
                            onValueChange={(value) => handleInputChange("industry", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                            <SelectContent>
                              {industries.map((industry) => (
                                <SelectItem key={industry} value={industry}>
                                  {industry}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="companySize" className="text-[#ff7033]">Company Size *</Label>
                          <Select 
                            value={formData.companySize} 
                            onValueChange={(value) => handleInputChange("companySize", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select company size" />
                            </SelectTrigger>
                            <SelectContent>
                              {companySizes.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-[#ff7033]">Current Challenges * (Select all that apply)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                          {challenges.map((challenge) => (
                            <div key={challenge} className="flex items-center space-x-2">
                              <Checkbox
                                id={challenge}
                                checked={formData.currentChallenges.includes(challenge)}
                                onCheckedChange={(checked) => 
                                  handleCheckboxChange("currentChallenges", challenge, checked as boolean)
                                }
                              />
                              <Label 
                                htmlFor={challenge} 
                                className="text-sm font-normal cursor-pointer text-[#020a1c]"
                              >
                                {challenge}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="budgetRange" className="text-[#ff7033]">Budget Range</Label>
                        <Select 
                          value={formData.budgetRange} 
                          onValueChange={(value) => handleInputChange("budgetRange", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Demo Preferences */}
                  {formStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-[#ff7033]">Demo Focus Areas * (Select all that interest you)</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          {demoFocusOptions.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <Checkbox
                                id={option}
                                checked={formData.demoFocusAreas.includes(option)}
                                onCheckedChange={(checked) => 
                                  handleCheckboxChange("demoFocusAreas", option, checked as boolean)
                                }
                              />
                              <Label 
                                htmlFor={option} 
                                className="text-sm font-normal cursor-pointer text-[#020a1c]"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="preferredDate" className="text-[#ff7033]">Preferred Date</Label>
                          <Input
                            id="preferredDate"
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <Label htmlFor="preferredTime" className="text-[#ff7033]">Preferred Time</Label>
                          <Select 
                            value={formData.preferredTime} 
                            onValueChange={(value) => handleInputChange("preferredTime", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">Morning (9 AM - 12 PM EST)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (12 PM - 5 PM EST)</SelectItem>
                              <SelectItem value="evening">Evening (5 PM - 7 PM EST)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="additionalRequirements" className="text-[#ff7033]">
                          Additional Requirements or Questions
                        </Label>
                        <Textarea
                          id="additionalRequirements"
                          value={formData.additionalRequirements}
                          onChange={(e) => handleInputChange("additionalRequirements", e.target.value)}
                          placeholder="Tell us about any specific features you'd like to see or questions you have..."
                          rows={4}
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    {formStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setFormStep(formStep - 1)}
                      >
                        Previous
                      </Button>
                    )}
                    
                    {formStep < 3 ? (
                      <Button
                        type="button"
                        className="ml-auto bg-primary hover:bg-primary/90"
                        onClick={() => setFormStep(formStep + 1)}
                        disabled={!isStepComplete(formStep)}
                      >
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="ml-auto bg-primary hover:bg-primary/90"
                        disabled={!isStepComplete(3)}
                      >
                        Submit Demo Request
                        <Zap className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Benefits Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-[#020a1c] mb-2">Tailored to You</h3>
                  <p className="text-sm text-muted-foreground">
                    Your demo will focus on your specific industry and challenges
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-[#020a1c] mb-2">Quick Response</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll contact you within 24 hours to schedule your demo
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-[#020a1c] mb-2">Expert Guidance</h3>
                  <p className="text-sm text-muted-foreground">
                    Our solution architects will guide you through the best options
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;