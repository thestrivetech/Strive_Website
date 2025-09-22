import { useState, useEffect, useCallback } from "react";
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
import { validateEmail, validatePhone } from "@/lib/validation";
import { CalendlyFallback } from "@/components/ui/calendly-fallback";
import { getCalendlyConfig } from "@/lib/browser-detection";
import React from "react";

// Calendly Iframe Component - extracted outside to prevent re-creation on re-renders
const CalendlyIframe = React.memo(({
  onError,
  onLoad,
  formData
}: {
  onError: (error: string) => void;
  onLoad: () => void;
  formData: any;
}) => {
  const [iframeStatus, setIframeStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading');

  const handleIframeLoad = React.useCallback(() => {
    console.log('[Calendly] Iframe loaded successfully');
    setIframeStatus('loaded');
    onLoad();
  }, [onLoad]);

  const handleIframeError = React.useCallback(() => {
    console.error('[Calendly] Iframe failed to load');
    setIframeStatus('error');
    onError('Iframe failed to load');
  }, [onError]);

  // Build Calendly URL with prefilled data
  const buildCalendlyUrl = () => {
    const baseUrl = "https://calendly.com/strivetech";
    const params = new URLSearchParams();

    if (formData.firstName && formData.lastName) {
      params.append('name', `${formData.firstName} ${formData.lastName}`);
    }
    if (formData.email) {
      params.append('email', formData.email);
    }
    if (formData.companyName) {
      params.append('a1', formData.companyName);
    }
    if (formData.phone) {
      params.append('a2', formData.phone);
    }
    if (formData.requestTypes.length > 0) {
      params.append('a3', formData.requestTypes.join(', '));
    }

    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  };

  return (
    <div className="w-full rounded-none md:rounded-lg overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
      {iframeStatus === 'loading' && (
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-10">
          <div className="text-center space-y-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading calendar...</p>
          </div>
        </div>
      )}
      <iframe
        src={buildCalendlyUrl()}
        width="100%"
        height="500"
        frameBorder="0"
        title="Schedule Your Showcase - Strive Tech"
        className="md:h-[630px]"
        style={{ borderRadius: '0px' }}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        allow="camera; microphone; geolocation"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
});

CalendlyIframe.displayName = 'CalendlyIframe';

const Request = () => {
  const [formStep, setFormStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    phone: ""
  });
  const [formData, setFormData] = useState({
    // Contact Information
    firstName: "",
    lastName: "",
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
    
    // Request Types
    requestTypes: [] as string[],
    
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

  const requestTypeOptions = [
    { value: "showcase", label: "Solution Showcase", description: "Tailored presentation with personalized demo of AI solutions customized for your specific business needs" },
    { value: "assessment", label: "AI Assessment", description: "Comprehensive evaluation of your AI readiness and opportunities" }
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

  // Validation functions using reusable utilities
  const isEmailValid = (email: string) => validateEmail(email).isValid;
  const isPhoneValid = (phone: string) => validatePhone(phone, true).isValid;

  // State for Calendly loading and error handling
  const [calendlyStatus, setCalendlyStatus] = useState<'loading' | 'loaded' | 'error' | 'timeout'>('loading');
  const [calendlyError, setCalendlyError] = useState<string>('');
  const [retryCount, setRetryCount] = useState(0);

  // Stable callback functions for CalendlyIframe to prevent unnecessary re-renders
  const handleCalendlyError = useCallback((error: string) => {
    console.error('[Calendly] Iframe error:', error);
    setCalendlyStatus('error');
    setCalendlyError('The calendar widget failed to load properly.');
  }, []);

  const handleCalendlyLoad = useCallback(() => {
    console.log('[Calendly] Iframe loaded successfully');
  }, []);



  // Load Calendly script when component mounts
  useEffect(() => {
    let scriptLoadTimeout: NodeJS.Timeout;
    let script: HTMLScriptElement;

    const loadCalendlyScript = () => {
      // Check browser compatibility first
      const calendlyConfig = getCalendlyConfig();
      calendlyConfig.logBrowserInfo();
      
      console.log(`[Calendly] Attempting to load script (attempt ${retryCount + 1})`);
      
      // If browser has compatibility issues, skip to fallback
      if (calendlyConfig.shouldUseFallback) {
        console.log('[Calendly] Browser compatibility issues detected, using fallback');
        setCalendlyStatus('error');
        setCalendlyError(`${calendlyConfig.browserInfo.name} browser detected. Using direct calendar link for better compatibility.`);
        return;
      }
      
      setCalendlyStatus('loading');
      setCalendlyError('');

      // Check if script already exists
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        console.log('[Calendly] Script already exists, checking if loaded');
        setCalendlyStatus('loaded');
        return;
      }

      script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;

      // Success handler
      script.onload = () => {
        console.log('[Calendly] Script loaded successfully');
        setCalendlyStatus('loaded');
        if (scriptLoadTimeout) clearTimeout(scriptLoadTimeout);
      };

      // Error handler
      script.onerror = (error) => {
        console.error('[Calendly] Script failed to load:', error);
        setCalendlyStatus('error');
        setCalendlyError('Failed to load Calendly script. This may be due to network issues or ad blockers.');
        if (scriptLoadTimeout) clearTimeout(scriptLoadTimeout);
      };

      // Timeout handler (10 seconds)
      scriptLoadTimeout = setTimeout(() => {
        console.warn('[Calendly] Script loading timed out after 10 seconds');
        setCalendlyStatus('timeout');
        setCalendlyError('Calendly is taking longer than expected to load. Please check your internet connection.');
      }, 10000);

      document.body.appendChild(script);
    };

    loadCalendlyScript();

    return () => {
      // Cleanup
      if (scriptLoadTimeout) clearTimeout(scriptLoadTimeout);
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [retryCount]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (field === 'email' || field === 'phone') {
      setValidationErrors(prev => ({ ...prev, [field]: "" }));
    }
    
    // Validate on change for immediate feedback
    if (field === 'email' && value) {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid) {
        setValidationErrors(prev => ({ ...prev, email: emailValidation.errorMessage || "" }));
      }
    }
    
    if (field === 'phone' && value) {
      const phoneValidation = validatePhone(value, true);
      if (!phoneValidation.isValid) {
        setValidationErrors(prev => ({ ...prev, phone: phoneValidation.errorMessage || "" }));
      }
    }
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter((item: string) => item !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only submit if we're on step 3, otherwise do nothing
    if (formStep !== 3) {
      return;
    }
    
    // Include custom challenge text in the submission if "Other" is selected
    const submissionData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      company: formData.companyName,
      jobTitle: formData.jobTitle,
      industry: formData.industry,
      companySize: formData.companySize,
      currentChallenges: JSON.stringify(formData.currentChallenges.includes("Other") && formData.otherChallengeText
        ? [...formData.currentChallenges.filter(c => c !== "Other"), `Other: ${formData.otherChallengeText}`]
        : formData.currentChallenges),
      projectTimeline: formData.projectTimeline,
      budgetRange: formData.budgetRange,
      requestTypes: formData.requestTypes.join(','),
      demoFocusAreas: JSON.stringify(formData.demoFocusAreas.includes("Other") && formData.otherDemoFocusText
        ? [...formData.demoFocusAreas.filter(d => d !== "Other"), `Other: ${formData.otherDemoFocusText}`]
        : formData.demoFocusAreas),
      additionalRequirements: formData.additionalRequirements,
      preferredDate: null // Add missing required field
    };
    
    try {
      const response = await fetch('/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setIsSubmitted(true);
        // Scroll to top to show success message
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        console.log("Request submitted successfully:", result);
      } else {
        console.error("Request submission failed:", result);
        // Could add error handling UI here
        alert("Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please check your connection and try again.");
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && 
               formData.lastName && 
               formData.email && 
               isEmailValid(formData.email) &&
               formData.companyName &&
               formData.phone &&
               isPhoneValid(formData.phone);
      case 2:
        return formData.industry && formData.companySize && formData.currentChallenges.length > 0 && formData.projectTimeline && formData.requestTypes.length > 0;
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
              Request Received - Showcase Preparation Begins!
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Thank you for choosing Strive. Our solution architects are now preparing your personalized AI showcase. Within 24 hours, you'll receive a detailed showcase agenda tailored to your specific requirements and industry challenges.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-[#020a1c] mb-3">Your Showcase Timeline:</h3>
              <ul className="text-left space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span><strong>Within 2 hours:</strong> Our solution architects begin reviewing your specific requirements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span><strong>Within 24 hours:</strong> You'll receive a personalized showcase agenda and calendar invitation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span><strong>Showcase session:</strong> Live demonstration of AI solutions tailored to your business challenges</span>
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
      <section className="py-12 md:py-16 bg-[#ffffffeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="relative mb-4">
                <div className="flex justify-between items-center">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-semibold z-10 relative
                        ${formStep >= step ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}
                        transition-all duration-300
                      `}>
                        {step}
                      </div>
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
                <span className={`text-center flex-1 ${formStep >= 1 ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                  Contact Info
                </span>
                <span className={`text-center flex-1 ${formStep >= 2 ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                  Business Details
                </span>
                <span className={`text-center flex-1 ${formStep >= 3 ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                  Customize Your Solution
                </span>
              </div>
            </div>

            {/* Form Card */}
            <Card className="hero-gradient shadow-xl">
              <CardHeader className="p-6 md:p-8">
                <CardTitle className="text-xl md:text-2xl text-[#ff7033]">
                  {formStep === 1 && "Ready to See AI in Action?"}
                  {formStep === 2 && "Tell Us About Your Business"}
                  {formStep === 3 && "See Your AI Roadmap"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Contact Information */}
                  {formStep === 1 && (
                    <div className="space-y-4 md:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <Label htmlFor="firstName" className="text-white text-sm md:text-base">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            placeholder="John"
                            className="h-11 md:h-10"
                            style={inputStyle}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-white text-sm md:text-base">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            placeholder="Doe"
                            className="h-11 md:h-10"
                            style={inputStyle}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-white text-sm md:text-base">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="john@company.com"
                          className="h-11 md:h-10"
                          style={{
                            ...inputStyle,
                            borderColor: validationErrors.email ? '#ef4444' : '#ff7033'
                          }}
                          required
                        />
                        {validationErrors.email && (
                          <p className="text-sm text-red-400 mt-1">{validationErrors.email}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <Label htmlFor="phone" className="text-white text-sm md:text-base">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="(731)-431-2320"
                            className="h-11 md:h-10"
                            style={{
                              ...inputStyle,
                              borderColor: validationErrors.phone ? '#ef4444' : '#ff7033'
                            }}
                            required
                          />
                          {validationErrors.phone && (
                            <p className="text-sm text-red-400 mt-1">{validationErrors.phone}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="companyName" className="text-white text-sm md:text-base">Company Name *</Label>
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange("companyName", e.target.value)}
                            placeholder="Acme Corporation"
                            className="h-11 md:h-10"
                            style={inputStyle}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="jobTitle" className="text-white text-sm md:text-base">Job Title</Label>
                        <Input
                          id="jobTitle"
                          value={formData.jobTitle}
                          onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                          placeholder="Chief Technology Officer"
                          className="h-11 md:h-10"
                          style={inputStyle}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Business Information */}
                  {formStep === 2 && (
                    <div className="space-y-4 md:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <Label htmlFor="industry" className="text-white text-sm md:text-base">Industry *</Label>
                          <Select 
                            value={formData.industry} 
                            onValueChange={(value) => handleInputChange("industry", value)}
                          >
                            <SelectTrigger className="h-11 md:h-10" style={inputStyle}>
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
                          <Label htmlFor="companySize" className="text-white text-sm md:text-base">Company Size *</Label>
                          <Select 
                            value={formData.companySize} 
                            onValueChange={(value) => handleInputChange("companySize", value)}
                          >
                            <SelectTrigger className="h-11 md:h-10" style={inputStyle}>
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
                        <Label className="text-white text-sm md:text-base">Current Challenges * (Select all that apply)</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-3">
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
                                className="text-xs md:text-sm font-normal cursor-pointer text-white"
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
                              className="text-xs md:text-sm font-normal cursor-pointer text-white"
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
                              className="w-full h-11 md:h-10"
                              style={inputStyle}
                            />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="projectTimeline" className="text-white text-sm md:text-base">Project Timeline *</Label>
                        <Select 
                          value={formData.projectTimeline} 
                          onValueChange={(value) => handleInputChange("projectTimeline", value)}
                        >
                          <SelectTrigger className="h-11 md:h-10" style={inputStyle}>
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
                        <Label htmlFor="budgetRange" className="text-white text-sm md:text-base">Budget Range</Label>
                        <Select 
                          value={formData.budgetRange} 
                          onValueChange={(value) => handleInputChange("budgetRange", value)}
                        >
                          <SelectTrigger className="h-11 md:h-10" style={inputStyle}>
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

                      {/* Request Types Selection */}
                      <div>
                        <Label className="text-white text-sm md:text-base">Services Requested * (Select all that apply)</Label>
                        <div className="grid grid-cols-1 gap-3 md:gap-4 mt-3">
                          {requestTypeOptions.map((option) => (
                            <div
                              key={option.value}
                              className="border border-gray-300 rounded-lg p-3 md:p-4 bg-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors"
                              onClick={() => {
                                const isCurrentlyChecked = formData.requestTypes.includes(option.value);
                                handleCheckboxChange("requestTypes", option.value, !isCurrentlyChecked);
                              }}
                            >
                              <div className="flex items-center space-x-3">
                                <Checkbox
                                  id={option.value}
                                  checked={formData.requestTypes.includes(option.value)}
                                  onCheckedChange={(checked) => {
                                    handleCheckboxChange("requestTypes", option.value, checked as boolean);
                                  }}
                                  className="border-white data-[state=checked]:bg-[#ff7033] data-[state=checked]:border-[#ff7033]"
                                />
                                <div>
                                  <Label
                                    htmlFor={option.value}
                                    className="text-white font-semibold cursor-pointer text-sm md:text-base"
                                  >
                                    {option.label}
                                  </Label>
                                  <p className="text-gray-200 text-xs md:text-sm mt-1">{option.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {formData.requestTypes.length === 0 && (
                          <p className="text-red-400 text-sm mt-2">Please select at least one service</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Demo Preferences */}
                  {formStep === 3 && (
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <Label className="text-white text-sm md:text-base">Solution Focus Areas * (Select all that interest you)</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-3">
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
                                className="text-xs md:text-sm font-normal cursor-pointer text-white"
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
                              className="w-full h-11 md:h-10"
                              style={inputStyle}
                            />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="additionalRequirements" className="text-white text-sm md:text-base">
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
                          <div className="p-3 md:p-4">
                            <h4 className="text-center flex items-center justify-center gap-2 font-semibold mb-2 text-base md:text-lg">
                              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                              Schedule Your Showcase
                            </h4>
                            <p className="text-center text-muted-foreground mb-3 md:mb-4 text-xs md:text-sm">
                              Choose a convenient time for your personalized solution Showcase
                            </p>
                          </div>
                          <div className="px-0 md:px-4 pb-3 md:pb-4">
                            {/* Calendly Integration with Error Handling */}
                            {calendlyStatus === 'loaded' ? (
                              <CalendlyIframe
                                onError={handleCalendlyError}
                                onLoad={handleCalendlyLoad}
                                formData={formData}
                              />
                            ) : (
                              <CalendlyFallback 
                                status={calendlyStatus}
                                error={calendlyError}
                                onRetry={() => {
                                  if (retryCount < 3) {
                                    setRetryCount(prev => prev + 1);
                                  }
                                }}
                                retryCount={retryCount}
                              />
                            )}
                            <div className="mt-3 md:mt-4 p-3 md:p-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                              <div className="space-y-2 md:space-y-3 text-sm">
                                <h4 className="text-center font-semibold text-lg mb-3" style={{ color: '#ff7033' }}>— Your Details —</h4>
                                <div className="space-y-1">
                                  <p><span className="font-medium" style={{ color: '#ff7033' }}>Communication Method:</span> <span className="font-medium" style={{ color: '#020a1c' }}>Google Meet</span></p>
                                  <p><span className="font-medium" style={{ color: '#ff7033' }}>Contact:</span> <span className="font-medium" style={{ color: '#020a1c' }}>{formData.firstName} {formData.lastName}</span></p>
                                  <p><span className="font-medium" style={{ color: '#ff7033' }}>Email:</span> <span className="font-medium" style={{ color: '#020a1c' }}>{formData.email}</span></p>
                                  <p><span className="font-medium" style={{ color: '#ff7033' }}>Company:</span> <span className="font-medium" style={{ color: '#020a1c' }}>{formData.companyName}</span></p>
                                </div>
                              </div>
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground mt-2 text-center">
                              * You'll receive a calendar invite and confirmation email after scheduling, plus 3 reminders: 24 hours before, 2 hours before, and 15 minutes before your meeting
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
                        onClick={() => {
                          const nextStep = formStep + 1;
                          setFormStep(nextStep);
                          // Scroll to top when reaching the Calendly step (step 3)
                          if (nextStep === 3) {
                            setTimeout(() => {
                              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }, 100);
                          }
                        }}
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
                          background: 'linear-gradient(135deg, #ff7033 0%, #9333ea 50%, #ff7033 100%)'
                        }}
                        disabled={!isStepComplete(3)}
                      >
                        <span className="relative z-10 flex items-center">
                          <Zap className="mr-2 h-5 w-5" />
                          Submit Request
                          <Zap className="ml-2 h-5 w-5" />
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
            <div className="mt-8 md:mt-12">
              {/* Mobile horizontal scroll, desktop grid */}
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:snap-none md:pb-0">
              <Card className="hero-gradient backdrop-blur-sm min-w-[280px] snap-center md:min-w-0">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Target className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-sm md:text-base">Tailored to You</h3>
                  <p className="text-xs md:text-sm text-white/80">
                    Your solution showcase will focus on your specific industry and challenges
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hero-gradient backdrop-blur-sm min-w-[280px] snap-center md:min-w-0">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-sm md:text-base">Quick Response</h3>
                  <p className="text-xs md:text-sm text-white/80">
                    We'll contact you within 24 hours to confirm your showcase
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hero-gradient backdrop-blur-sm min-w-[280px] snap-center md:min-w-0">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-sm md:text-base">Expert Guidance</h3>
                  <p className="text-xs md:text-sm text-white/80">
                    Our solution architects will guide you through the best options
                  </p>
                </CardContent>
              </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Request;