import { useState, useEffect } from "react";
import { 
  Users, Target, Calendar, Clock, CheckCircle, ChevronRight, Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const Request = () => {
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
    otherChallengeText: "", // New field for custom challenge text
    projectTimeline: "",
    budgetRange: "",
    
    // Demo Preferences
    demoFocusAreas: [] as string[],
    otherDemoFocusText: "", // New field for custom demo focus text
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

  const projectTimelines = [
    "Immediate (ASAP)",
    "Within 1 month", 
    "1-3 months",
    "3-6 months", 
    "6-12 months",
    "12+ months",
    "Just exploring"
  ];

  const budgetRanges = [
    "$1,000 - $5,000", "$5,000 - $10,000", "$10,000 - $25,000", 
    "$25,000 - $50,000", "Over $50,000", "Not sure yet"
  ];

  const demoFocusOptions = [
    "AI-Powered Dashboard", "Team Collaboration Tools", "Business Intelligence",
    "Security & Compliance", "Automation Solutions", "Analytics & Reporting",
    "Custom AI Models", "Integration Capabilities", "Other"
  ];

  // Repeated input styling
  const inputStyle = { 
    backgroundColor: '#ffffff', 
    color: '#020a1c', 
    borderColor: '#ff7033' 
  };

  // Load Calendly script when component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

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
    
    // Only submit if we're on step 3, otherwise do nothing
    if (formStep !== 3) {
      return;
    }
    
    // Include custom challenge text in the submission if "Other" is selected
    const submissionData = {
      ...formData,
      currentChallenges: formData.currentChallenges.includes("Other") && formData.otherChallengeText
        ? [...formData.currentChallenges.filter(c => c !== "Other"), `Other: ${formData.otherChallengeText}`]
        : formData.currentChallenges,
      demoFocusAreas: formData.demoFocusAreas.includes("Other") && formData.otherDemoFocusText
        ? [...formData.demoFocusAreas.filter(d => d !== "Other"), `Other: ${formData.otherDemoFocusText}`]
        : formData.demoFocusAreas
    };
    
    setIsSubmitted(true);
    // Here you would typically send the form data to your backend
    console.log("Request submitted:", submissionData);
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return formData.fullName && formData.email && formData.companyName;
      case 2:
        return formData.industry && formData.companySize && formData.currentChallenges.length > 0 && formData.projectTimeline;
      case 3:
        return formData.demoFocusAreas.length > 0;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-16 min-h-screen hero-gradient flex items-center justify-center">
        <Card className="max-w-2xl mx-auto hero-gradient backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-[#ff7033] mb-4">
              Your AI Journey Begins Now!
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Thank you for choosing Strive. Our AI specialists are already reviewing your requirements to craft a custom solution showcase. You'll receive a personalized roadmap within 24 hours.
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
                  <span>We'll prepare a customized showcase based on your needs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span>You'll receive a calendar invite for your showcase session</span>
                </li>
              </ul>
            </div>
            <Button 
              onClick={() => window.location.href = "/"}
              className="bg-primary hover:bg-primary/90 hover:scale-105 hover:shadow-xl transition-all duration-300"
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
      {/* Form Section */}
      <section className="py-16 bg-[#ffffffeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="relative mb-4">
                <div className="flex justify-between items-center">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold z-10 relative
                      ${formStep >= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}
                      transition-all duration-300
                    `}>
                      {step}
                    </div>
                  ))}
                </div>
                {/* Progress line */}
                <div className="absolute top-5 left-5 right-5 h-1 bg-gray-200">
                  <div 
                    className={`h-full bg-primary transition-all duration-300`}
                    style={{ width: `${((formStep - 1) / 2) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className={`text-center ${formStep >= 1 ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                  Contact Info
                </span>
                <span className={`text-center ${formStep >= 2 ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                  Business Details
                </span>
                <span className={`text-center ${formStep >= 3 ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                  Customize Your Solution
                </span>
              </div>
            </div>

            {/* Form Card */}
            <Card className="hero-gradient shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-[#ff7033]">
                  {formStep === 1 && "Ready to See AI in Action?"}
                  {formStep === 2 && "Tell Us About Your Business"}
                  {formStep === 3 && "See Your AI Roadmap"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Contact Information */}
                  {formStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="fullName" className="text-white">Full Name *</Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            placeholder="John Doe"
                            style={inputStyle}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-white">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="john@company.com"
                            style={inputStyle}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="phone" className="text-white">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="(731)-431-2320"
                            style={inputStyle}
                          />
                        </div>
                        <div>
                          <Label htmlFor="companyName" className="text-white">Company Name *</Label>
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange("companyName", e.target.value)}
                            placeholder="Acme Corporation"
                            style={inputStyle}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="jobTitle" className="text-white">Job Title</Label>
                        <Input
                          id="jobTitle"
                          value={formData.jobTitle}
                          onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                          placeholder="Chief Technology Officer"
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Business Information */}
                  {formStep === 2 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="industry" className="text-white">Industry *</Label>
                          <Select 
                            value={formData.industry} 
                            onValueChange={(value) => handleInputChange("industry", value)}
                          >
                            <SelectTrigger style={inputStyle}>
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
                          <Label htmlFor="companySize" className="text-white">Company Size *</Label>
                          <Select 
                            value={formData.companySize} 
                            onValueChange={(value) => handleInputChange("companySize", value)}
                          >
                            <SelectTrigger style={inputStyle}>
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
                        <Label className="text-white">Current Challenges * (Select all that apply)</Label>
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
                                className="text-sm font-normal cursor-pointer text-white"
                              >
                                {challenge}
                              </Label>
                            </div>
                          ))}
                          {/* Other option */}
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="other-challenge"
                              checked={formData.currentChallenges.includes("Other")}
                              onCheckedChange={(checked) => {
                                handleCheckboxChange("currentChallenges", "Other", checked as boolean);
                                // Clear the custom text if unchecked
                                if (!checked) {
                                  handleInputChange("otherChallengeText", "");
                                }
                              }}
                            />
                            <Label 
                              htmlFor="other-challenge" 
                              className="text-sm font-normal cursor-pointer text-white"
                            >
                              Other
                            </Label>
                          </div>
                        </div>
                        {/* Custom challenge text input - shown when "Other" is selected */}
                        {formData.currentChallenges.includes("Other") && (
                          <div className="mt-4">
                            <Input
                              placeholder="Please specify your challenge or pain point..."
                              value={formData.otherChallengeText}
                              onChange={(e) => handleInputChange("otherChallengeText", e.target.value)}
                              className="w-full"
                              style={inputStyle}
                            />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="projectTimeline" className="text-white">Project Timeline *</Label>
                        <Select 
                          value={formData.projectTimeline} 
                          onValueChange={(value) => handleInputChange("projectTimeline", value)}
                        >
                          <SelectTrigger style={inputStyle}>
                            <SelectValue placeholder="Select your project timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            {projectTimelines.map((timeline) => (
                              <SelectItem key={timeline} value={timeline}>
                                {timeline}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="budgetRange" className="text-white">Budget Range</Label>
                        <Select 
                          value={formData.budgetRange} 
                          onValueChange={(value) => handleInputChange("budgetRange", value)}
                        >
                          <SelectTrigger style={inputStyle}>
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
                        <Label className="text-white">Solution Focus Areas * (Select all that interest you)</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          {demoFocusOptions.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <Checkbox
                                id={option}
                                checked={formData.demoFocusAreas.includes(option)}
                                onCheckedChange={(checked) => {
                                  handleCheckboxChange("demoFocusAreas", option, checked as boolean);
                                  // Clear the custom text if "Other" is unchecked
                                  if (option === "Other" && !checked) {
                                    handleInputChange("otherDemoFocusText", "");
                                  }
                                }}
                              />
                              <Label 
                                htmlFor={option} 
                                className="text-sm font-normal cursor-pointer text-white"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </div>
                        {/* Custom solutions focus text input - shown when "Other" is selected */}
                        {formData.demoFocusAreas.includes("Other") && (
                          <div className="mt-4">
                            <Input
                              placeholder="Please specify your additional demo focus areas..."
                              value={formData.otherDemoFocusText}
                              onChange={(e) => handleInputChange("otherDemoFocusText", e.target.value)}
                              className="w-full"
                              style={inputStyle}
                            />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="additionalRequirements" className="text-white">
                          Additional Requirements or Questions
                        </Label>
                        <Textarea
                          id="additionalRequirements"
                          value={formData.additionalRequirements}
                          onChange={(e) => handleInputChange("additionalRequirements", e.target.value)}
                          placeholder="Tell us about any specific features you'd like to see or questions you have..."
                          rows={4}
                          style={inputStyle}
                        />
                      </div>

                      {/* Calendly Embed Section */}
                      <div>
                        <div className="bg-card rounded-lg border">
                          <div className="p-4">
                            <h4 className="text-center flex items-center justify-center gap-2 font-semibold mb-2">
                              <Calendar className="w-6 h-6 text-primary" />
                              Schedule Your Showcase
                            </h4>
                            <p className="text-center text-muted-foreground mb-4 text-sm">
                              Choose a convenient time for your personalized solution Showcase
                            </p>
                          </div>
                          <div className="px-4 pb-4">
                            {/* Calendly Integration */}
                            <div className="w-full rounded-lg overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
                              <iframe
                                src="https://calendly.com/strivetech"
                                width="100%"
                                height="630"
                                frameBorder="0"
                                title="Schedule Your Showcase - Strive Tech"
                                style={{ borderRadius: '8px' }}
                              />
                            </div>
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <div className="space-y-2 text-xs text-muted-foreground">
                                <p><strong>Your Details:</strong></p>
                                <p>Contact: <span className="font-medium text-foreground">{formData.fullName}</span></p>
                                <p>Email: <span className="font-medium text-foreground">{formData.email}</span></p>
                                <p>Company: <span className="font-medium text-foreground">{formData.companyName}</span></p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 text-center">
                              * You'll receive a calendar invite and confirmation email after scheduling
                            </p>
                          </div>
                        </div>
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
                        className="ml-auto text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg relative overflow-hidden group"
                        style={{
                          background: 'linear-gradient(135deg, #ff7033 0%, #6b46c1 50%, #ff5420 100%)'
                        }}
                        disabled={!isStepComplete(3)}
                      >
                        <span className="relative z-10">
                          Submit Request
                          <Zap className="ml-2 h-4 w-4 inline" />
                        </span>
                        {/* Shimmer effect on hover */}
                        <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Benefits Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hero-gradient backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Tailored to You</h3>
                  <p className="text-sm text-white/80">
                    Your solution showcase will focus on your specific industry and challenges
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hero-gradient backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Quick Response</h3>
                  <p className="text-sm text-white/80">
                    We'll contact you within 24 hours to confirm your showcase
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hero-gradient backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Expert Guidance</h3>
                  <p className="text-sm text-white/80">
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

export default Request;