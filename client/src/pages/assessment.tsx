import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ArrowRight, Calendar, Clock, Phone, Video, MapPin, Users, Building, Target, Lightbulb, AlertCircle } from "lucide-react";

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

  const handleInputChange = (field: string, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setContactData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : ((prev[field as keyof typeof prev] as string[]).filter((item: string) => item !== value))
    }));
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact info submitted:", contactData);
    setIsSubmitted(true);
    setStep(2);
  };

  const isContactValid = () => {
    return contactData.firstName && 
           contactData.lastName && 
           contactData.email && 
           contactData.company && 
           contactData.phone &&
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
        <div className="space-y-6">
          <div className="text-center mb-8">
            <Users className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#020a1c' }} data-testid="step-title">
              Contact Information
            </h2>
            <p className="text-muted-foreground" style={{ color: '#020a1c' }}>
              Tell us about your goals so we can recommend the ideal AI solution for your unique business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#ff7033' }}>First Name *</label>
              <Input
                type="text"
                placeholder="John"
                value={contactData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
                data-testid="input-first-name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#ff7033' }}>Last Name *</label>
              <Input
                type="text"
                placeholder="Doe"
                value={contactData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
                data-testid="input-last-name"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#ff7033' }}>Business Email *</label>
            <Input
              type="email"
              placeholder="john@company.com"
              value={contactData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
              data-testid="input-email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#ff7033' }}>Company Name *</label>
            <Input
              type="text"
              placeholder="Your Company"
              value={contactData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
              data-testid="input-company"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#ff7033' }}>Phone Number *</label>
            <Input
              type="tel"
              placeholder="(731)-431-2320"
              value={contactData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
              data-testid="input-phone"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#ff7033' }}>Preferred Communication Method</label>
            <Select value={contactData.communicationMethod} onValueChange={(value) => handleInputChange('communicationMethod', value)}>
              <SelectTrigger data-testid="select-communication-method" style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}>
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
            <label className="block text-sm font-medium mb-2" style={{ color: '#ff7033' }}>Industry *</label>
            <Select value={contactData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
              <SelectTrigger data-testid="select-industry" style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}>
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
                style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
                className="mt-2"
                data-testid="input-other-industry"
              />
            )}
          </div>
          
          {/* Company Size */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#ff7033' }}>Company Size *</label>
            <Select value={contactData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
              <SelectTrigger data-testid="select-company-size" style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}>
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
            <label className="block text-sm font-medium mb-2" style={{ color: '#ff7033' }}>Current Challenges (Select all that apply)</label>
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
                  <label htmlFor={challenge} className="text-sm cursor-pointer" style={{ color: '#020a1c' }}>
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
                style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
                className="mt-2"
                data-testid="input-other-challenge"
              />
            )}
          </div>
          
          {/* Budget Range */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#ff7033' }}>Budget Range</label>
            <Select value={contactData.budgetRange} onValueChange={(value) => handleInputChange('budgetRange', value)}>
              <SelectTrigger data-testid="select-budget" style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}>
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
            <label className="block text-sm font-medium mb-2" style={{ color: '#ff7033' }}>Project Timeline</label>
            <Select value={contactData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
              <SelectTrigger data-testid="select-timeline" style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}>
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
            <label className="block text-sm font-medium mb-2" style={{ color: '#ff7033' }}>Project Description</label>
            <Textarea
              placeholder="Please briefly describe your project needs and goals..."
              value={contactData.projectDescription}
              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
              className="min-h-[100px]"
              style={{ backgroundColor: '#ffffff', color: '#020a1c', borderColor: '#ff7033' }}
              data-testid="textarea-project-description"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#020a1c' }} data-testid="step-title">
            Contact Information Received!
          </h2>
          <p className="text-muted-foreground">
            Now let's schedule your assessment
          </p>
        </div>
        
        {/* Calendly Embed */}
        <div className="bg-card rounded-lg border">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              Schedule Your Assessment
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Choose a convenient time for your 30-minute assessment
            </p>
          </CardHeader>
          <CardContent>
            {/* Calendly Integration */}
            <div className="w-full rounded-lg overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
              <iframe
                src="https://calendly.com/strivetech"
                width="100%"
                height="630"
                frameBorder="0"
                title="Schedule Your Assessment - Strive Tech"
                style={{ borderRadius: '8px' }}
              />
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="space-y-2 text-xs text-muted-foreground">
                <p><strong>Your Details:</strong></p>
                <p>Communication Method: <span className="font-medium text-foreground">
                  {communicationMethods.find(m => m.id === contactData.communicationMethod)?.name}
                </span></p>
                <p>Contact: <span className="font-medium text-foreground">{contactData.firstName} {contactData.lastName}</span></p>
                <p>Email: <span className="font-medium text-foreground">{contactData.email}</span></p>
              </div>
            </div>
            
            {/* Meeting Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-center">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm">30 minutes</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm">1-on-1 Session</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm">Tailored Solutions</span>
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="assessment-title">
              Unlock Your Business's <span className="bg-gradient-to-br from-[#ff7033] via-orange-500 to-purple-600 bg-clip-text text-transparent inline-block">AI Advantage</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover actionable AI strategies tailored to your company's biggest challenges—book your complimentary 30-minute assessment today.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              {[1, 2].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
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
            <div className="text-center text-sm text-muted-foreground">
              Step {step} of 2: {step === 1 ? "Contact Information" : "Schedule Meeting"}
            </div>
          </div>

          {/* Form Card */}
          <Card className="bg-card border-border" style={{ backgroundColor: '#ffffffeb' }}>
            <CardContent className="p-8">
              {step === 1 ? (
                <form onSubmit={handleSubmitContact}>
                  {renderStep()}
                  
                  {/* Submit Button */}
                  <div className="flex justify-end pt-8">
                    <Button
                      type="submit"
                      disabled={!isContactValid()}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
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
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-card/50 border">
              <Lightbulb className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Strategic AI Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Receive actionable insights from industry-experienced AI consultants
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card/50 border">
              <Target className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Custom AI Roadmap</h3>
              <p className="text-sm text-muted-foreground">
                Get a step-by-step plan, mapped to your priorities, for deploying AI at scale
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card/50 border">
              <Building className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Fast-Track Implementation</h3>
              <p className="text-sm text-muted-foreground">
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