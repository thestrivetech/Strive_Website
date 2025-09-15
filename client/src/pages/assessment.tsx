import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ArrowRight, Calendar, Clock, Phone, Video, MapPin, Users, Building, Target, Lightbulb, AlertCircle } from "lucide-react";
import { validateEmail, validatePhone } from "@/lib/validation";
import { CalendlyFallback } from "@/components/ui/calendly-fallback";
import React from "react";

// Calendly Iframe Component - extracted outside to prevent re-creation on re-renders
const CalendlyIframe = React.memo(({ onError, onLoad }: { onError: (error: string) => void; onLoad: () => void }) => {
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
        src="https://calendly.com/strivetech"
        width="100%"
        height="500"
        frameBorder="0"
        title="Schedule Your Assessment - Strive Tech"
        className="md:h-[630px]"
        style={{ borderRadius: '0px' }}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
    </div>
  );
});

CalendlyIframe.displayName = 'CalendlyIframe';

const Assessment = () => {
  const [step, setStep] = useState(1);
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    communicationMethod: "google-meet",
    industry: "",
    otherIndustry: "", // Added for custom industry input
    companySize: "",
    currentChallenges: [] as string[],
    otherChallenge: "", // Added for custom challenge input
    budgetRange: "",
    timeline: "",
    projectDescription: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    phone: ""
  });

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



  // Validation functions using reusable utilities
  const isEmailValid = (email: string) => validateEmail(email).isValid;
  const isPhoneValid = (phone: string) => validatePhone(phone, true).isValid;

  // Load Calendly script when component mounts
  useEffect(() => {
    let scriptLoadTimeout: NodeJS.Timeout;
    let script: HTMLScriptElement;

    const loadCalendlyScript = () => {
      console.log(`[Calendly] Attempting to load script (attempt ${retryCount + 1})`);
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

  const handleInputChange = (field: string, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (field === 'email' || field === 'phone') {
      setValidationErrors(prev => ({ ...prev, [field]: "" }));
    }
    
    // Validate on blur for immediate feedback
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
    setContactData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : ((prev[field as keyof typeof prev] as string[]).filter((item: string) => item !== value))
    }));
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email and phone before submission
    const emailValidation = validateEmail(contactData.email);
    const phoneValidation = validatePhone(contactData.phone, true);
    
    const newErrors = {
      email: !emailValidation.isValid ? emailValidation.errorMessage || "" : "",
      phone: !phoneValidation.isValid ? phoneValidation.errorMessage || "" : ""
    };
    
    setValidationErrors(newErrors);
    
    // Only proceed if no validation errors
    if (emailValidation.isValid && phoneValidation.isValid) {
      // Prepare data for submission to request API
      const submissionData = {
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        fullName: `${contactData.firstName} ${contactData.lastName}`,
        email: contactData.email,
        phone: contactData.phone,
        company: contactData.company,
        jobTitle: contactData.industry === "Other" && contactData.otherIndustry ? contactData.otherIndustry : "", // Use other field for job title if needed
        industry: contactData.industry === "Other" && contactData.otherIndustry ? contactData.otherIndustry : contactData.industry,
        companySize: contactData.companySize,
        currentChallenges: JSON.stringify(contactData.currentChallenges.includes("Other") && contactData.otherChallenge
          ? [...contactData.currentChallenges.filter(c => c !== "Other"), `Other: ${contactData.otherChallenge}`]
          : contactData.currentChallenges),
        projectTimeline: contactData.timeline,
        budgetRange: contactData.budgetRange,
        requestTypes: "assessment", // Assessment request type
        demoFocusAreas: JSON.stringify([]), // Empty for assessment
        additionalRequirements: `Communication Method: ${contactData.communicationMethod}

Project Description: ${contactData.projectDescription || 'Not provided'}`,
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
          console.log("Assessment request submitted successfully:", result);
          setIsSubmitted(true);
          setStep(2);
          // Scroll to top when reaching the Calendly step (step 2)
          setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }, 100);
        } else {
          console.error("Assessment request submission failed:", result);
          alert("Failed to submit assessment request. Please try again.");
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("Network error. Please check your connection and try again.");
      }
    }
  };

  const isContactValid = () => {
    return contactData.firstName && 
           contactData.lastName && 
           contactData.email && 
           isEmailValid(contactData.email) &&
           contactData.company && 
           contactData.phone &&
           isPhoneValid(contactData.phone) &&
           contactData.industry &&
           contactData.companySize;
  };

  const communicationMethods = [
    { id: "google-meet", name: "Google Meet", icon: <Video className="w-4 h-4" /> },
    { id: "zoom", name: "Zoom", icon: <Video className="w-4 h-4" /> },
    { id: "phone", name: "Phone Call", icon: <Phone className="w-4 h-4" /> },
    { id: "in-person", name: "In-Person Meeting", icon: <MapPin className="w-4 h-4" /> }
  ];

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="space-y-4 md:space-y-6">
          <div className="text-center mb-6 md:mb-8">
            <Users className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-3 md:mb-4" />
            <h2 className="text-xl md:text-2xl font-bold mb-2" style={{ color: '#ff7033' }} data-testid="step-title">
              Contact Information
            </h2>
            <p className="text-sm md:text-base text-muted-foreground" style={{ color: '#020a1c' }}>
              Tell us about your goals so we can recommend the ideal AI solution for your unique business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#020a1c' }}>First Name *</label>
              <Input
                type="text"
                placeholder="John"
                value={contactData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="h-11 md:h-10"
                style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
                data-testid="input-first-name"
              />
            </div>
            
            <div>
              <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Last Name *</label>
              <Input
                type="text"
                placeholder="Doe"
                value={contactData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="h-11 md:h-10"
                style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
                data-testid="input-last-name"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Business Email *</label>
            <Input
              type="email"
              placeholder="john@company.com"
              value={contactData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="h-11 md:h-10"
              style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: validationErrors.email ? '#ef4444' : '#ff7033' }}
              data-testid="input-email"
            />
            {validationErrors.email && (
              <p className="text-sm text-red-500 mt-1">{validationErrors.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Company Name *</label>
            <Input
              type="text"
              placeholder="Your Company"
              value={contactData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="h-11 md:h-10"
              style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
              data-testid="input-company"
            />
          </div>
          
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Phone Number *</label>
            <Input
              type="tel"
              placeholder="(731)-431-2320"
              value={contactData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="h-11 md:h-10"
              style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: validationErrors.phone ? '#ef4444' : '#ff7033' }}
              data-testid="input-phone"
            />
            {validationErrors.phone && (
              <p className="text-sm text-red-500 mt-1">{validationErrors.phone}</p>
            )}
          </div>
          
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Preferred Communication Method</label>
            <Select value={contactData.communicationMethod} onValueChange={(value) => handleInputChange('communicationMethod', value)}>
              <SelectTrigger className="h-11 md:h-10" data-testid="select-communication-method" style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                {communicationMethods.map((method) => (
                  <SelectItem key={method.id} value={method.id}>
                    <div className="flex items-center gap-2">
                      {method.icon}
                      {method.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Industry Selection */}
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Industry *</label>
            <Select value={contactData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
              <SelectTrigger className="h-11 md:h-10" data-testid="select-industry" style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {/* Custom industry input - shown when "Other" is selected */}
            {contactData.industry === "other" && (
              <Input
                type="text"
                placeholder="Please specify your industry..."
                value={contactData.otherIndustry}
                onChange={(e) => handleInputChange('otherIndustry', e.target.value)}
                className="mt-2 h-11 md:h-10"
                style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
                data-testid="input-other-industry"
              />
            )}
          </div>
          
          {/* Company Size */}
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Company Size *</label>
            <Select value={contactData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
              <SelectTrigger className="h-11 md:h-10" data-testid="select-company-size" style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}>
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
          
          {/* Current Challenges */}
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Current Challenges (Select all that apply)</label>
            <div className="space-y-2">
              {[
                "Process Automation",
                "Data Analytics",
                "Customer Experience",
                "Operational Efficiency",
                "Cost Reduction",
                "Scalability",
                "Security & Compliance",
                "Digital Transformation",
                "Other"
              ].map((challenge) => (
                <div key={challenge} className="flex items-center space-x-2">
                  <Checkbox
                    id={challenge}
                    checked={contactData.currentChallenges.includes(challenge)}
                    onCheckedChange={(checked) => handleCheckboxChange('currentChallenges', challenge, checked as boolean)}
                  />
                  <label htmlFor={challenge} className="text-xs md:text-sm cursor-pointer" style={{ color: '#020a1c' }}>
                    {challenge}
                  </label>
                </div>
              ))}
            </div>
            {/* Custom challenge input - shown when "Other" is selected */}
            {contactData.currentChallenges.includes("Other") && (
              <Input
                type="text"
                placeholder="Please specify your challenge..."
                value={contactData.otherChallenge}
                onChange={(e) => handleInputChange('otherChallenge', e.target.value)}
                className="mt-2 h-11 md:h-10"
                style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
                data-testid="input-other-challenge"
              />
            )}
          </div>
          
          {/* Budget Range */}
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Budget Range</label>
            <Select value={contactData.budgetRange} onValueChange={(value) => handleInputChange('budgetRange', value)}>
              <SelectTrigger className="h-11 md:h-10" data-testid="select-budget" style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5k">$1,000 - $5,000</SelectItem>
                <SelectItem value="5-10k">$5,000 - $10,000</SelectItem>
                <SelectItem value="10-25k">$10,000 - $25,000</SelectItem>
                <SelectItem value="25-50k">$25,000 - $50,000</SelectItem>
                <SelectItem value="over-50k">Over $50,000</SelectItem>
                <SelectItem value="not-sure">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Timeline */}
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Project Timeline</label>
            <Select value={contactData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
              <SelectTrigger className="h-11 md:h-10" data-testid="select-timeline" style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}>
                <SelectValue placeholder="When do you need this?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate (ASAP)</SelectItem>
                <SelectItem value="1-3months">1-3 months</SelectItem>
                <SelectItem value="3-6months">3-6 months</SelectItem>
                <SelectItem value="6-12months">6-12 months</SelectItem>
                <SelectItem value="planning">Just planning/researching</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Project Description */}
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: '#020a1c' }}>Project Description</label>
            <Textarea
              placeholder="Please briefly describe your project needs and goals..."
              value={contactData.projectDescription}
              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
              className="min-h-[80px] md:min-h-[100px] resize-none"
              style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
              data-testid="textarea-project-description"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 md:space-y-6">
        {/* Calendly Embed */}
        <div className="bg-card rounded-lg border">
          <CardHeader className="p-3 md:p-6">
            <CardTitle className="text-center flex items-center justify-center gap-2 text-base md:text-lg">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              Schedule Your Assessment
            </CardTitle>
            <p className="text-center text-muted-foreground text-xs md:text-sm">
              Choose a convenient time for your 30-minute assessment
            </p>
          </CardHeader>
          <CardContent className="p-0 md:p-6">
            {/* Calendly Integration with Error Handling */}
            {calendlyStatus === 'loaded' ? (
              <CalendlyIframe 
                onError={handleCalendlyError}
                onLoad={handleCalendlyLoad}
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
            <div className="mt-3 md:mt-4 mx-3 md:mx-0 p-3 md:p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="space-y-2 md:space-y-3 text-sm">
                <h4 className="text-center font-semibold text-lg mb-3" style={{ color: '#ff7033' }}>— Your Details —</h4>
                <div className="space-y-1">
                  <p><span className="font-medium" style={{ color: '#ff7033' }}>Communication Method:</span> <span className="font-medium" style={{ color: '#020a1c' }}>
                    {communicationMethods.find(m => m.id === contactData.communicationMethod)?.name}
                  </span></p>
                  <p><span className="font-medium" style={{ color: '#ff7033' }}>Contact:</span> <span className="font-medium" style={{ color: '#020a1c' }}>{contactData.firstName} {contactData.lastName}</span></p>
                  <p><span className="font-medium" style={{ color: '#ff7033' }}>Email:</span> <span className="font-medium" style={{ color: '#020a1c' }}>{contactData.email}</span></p>
                </div>
              </div>
            </div>
            
            {/* Meeting Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6 text-center mx-3 md:mx-0">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-xs md:text-sm">30 minutes</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs md:text-sm">1-on-1 Session</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-xs md:text-sm">Tailored Solutions</span>
              </div>
            </div>
          </CardContent>
        </div>
        
        {/* Next Steps Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900">Email Confirmations</h4>
              <p className="text-sm text-blue-700 mt-1">
                You'll receive email confirmations immediately after booking, plus reminders 24 hours and 1 hour before your meeting.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-16 min-h-screen hero-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight" data-testid="assessment-title">
              Unlock Your Business's <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">AI Advantage</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Discover actionable AI strategies tailored to your company's biggest challenges. Book your complimentary 30-minute assessment today.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-center space-x-4 mb-3 md:mb-4">
              {[1, 2].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-all ${
                    stepNum <= step
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                  data-testid={`step-indicator-${stepNum}`}
                >
                  {stepNum}
                </div>
              ))}
            </div>
            <div className="text-center text-xs md:text-sm text-muted-foreground">
              Step {step} of 2: {step === 1 ? "Contact Information" : "Schedule Meeting"}
            </div>
          </div>

          {/* Form Card */}
          <Card className="bg-card border-border" style={{ backgroundColor: '#ffffffeb' }}>
            <CardContent className="p-6 md:p-8">
              {step === 1 ? (
                <form onSubmit={handleSubmitContact}>
                  {renderStep()}
                  
                  {/* Submit Button */}
                  <div className="flex justify-end pt-6 md:pt-8">
                    <Button
                      type="submit"
                      disabled={!isContactValid()}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 md:px-8 h-11 md:h-auto text-sm md:text-base"
                      data-testid="button-proceed-to-scheduling"
                    >
                      Proceed to Scheduling
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              ) : (
                renderStep()
              )}
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center p-4 md:p-6 rounded-lg bg-card/50 border">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2 md:mb-3" />
              <h3 className="font-semibold mb-2 text-sm md:text-base">Strategic AI Assessment</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Receive actionable insights from industry-experienced AI consultants
              </p>
            </div>
            <div className="text-center p-4 md:p-6 rounded-lg bg-card/50 border">
              <Target className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2 md:mb-3" />
              <h3 className="font-semibold mb-2 text-sm md:text-base">Custom AI Roadmap</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Get a step-by-step plan, mapped to your priorities, for deploying AI at scale
              </p>
            </div>
            <div className="text-center p-4 md:p-6 rounded-lg bg-card/50 border">
              <Building className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2 md:mb-3" />
              <h3 className="font-semibold mb-2 text-sm md:text-base">Fast-Track Implementation</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Accelerate adoption with clear timelines and ongoing expert support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;