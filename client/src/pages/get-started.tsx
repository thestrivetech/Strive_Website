import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, Video, Phone, MessageSquare, CheckCircle, ArrowRight } from "lucide-react";

const GetStarted = () => {
  const [step, setStep] = useState(1);
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    communicationMethod: "google-meet"
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact info submitted:", contactData);
    setIsSubmitted(true);
    setStep(2);
  };

  const isContactValid = () => {
    return contactData.firstName && contactData.lastName && contactData.email && contactData.company;
  };

  const communicationMethods = [
    { id: "google-meet", name: "Google Meet", icon: <Video className="w-5 h-5" />, description: "Video call via Google Meet" },
    { id: "zoom", name: "Zoom", icon: <Video className="w-5 h-5" />, description: "Video call via Zoom" },
    { id: "microsoft-teams", name: "Microsoft Teams", icon: <Video className="w-5 h-5" />, description: "Video call via Teams" },
    { id: "phone", name: "Phone Call", icon: <Phone className="w-5 h-5" />, description: "Traditional phone call" }
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2" data-testid="step-title">
                Let's Get Started
              </h2>
              <p className="text-muted-foreground">
                Provide your contact information to schedule a discovery meeting
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={contactData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="John"
                  data-testid="input-first-name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={contactData.lastName}
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
                value={contactData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@company.com"
                data-testid="input-email"
              />
            </div>
            
            <div>
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                value={contactData.company}
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
                value={contactData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
                data-testid="input-phone"
              />
            </div>

            <div>
              <Label htmlFor="communicationMethod">Preferred Communication Method</Label>
              <Select value={contactData.communicationMethod} onValueChange={(value) => handleInputChange("communicationMethod", value)}>
                <SelectTrigger data-testid="select-communication-method">
                  <SelectValue placeholder="Select communication method" />
                </SelectTrigger>
                <SelectContent>
                  {communicationMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      <div className="flex items-center gap-2">
                        {method.icon}
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-xs text-muted-foreground">{method.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                What to Expect
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>30-minute discovery session</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>1-on-1 consultation with our AI experts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Personalized AI strategy recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Custom solution proposal within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2" data-testid="step-title">
                Contact Information Received!
              </h2>
              <p className="text-muted-foreground">
                Now let's schedule your discovery meeting
              </p>
            </div>
            
            {/* Calendly Embed */}
            <div className="bg-card rounded-lg border">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  Schedule Your Discovery Meeting
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  Choose a convenient time for your 30-minute consultation
                </p>
              </CardHeader>
              <CardContent>
                {/* Calendly iframe placeholder */}
                <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                  <div className="text-center space-y-4">
                    <Calendar className="w-12 h-12 text-primary mx-auto" />
                    <div>
                      <h4 className="font-semibold">Calendly Integration</h4>
                      <p className="text-sm text-muted-foreground max-w-md">
                        Interactive calendar will be embedded here for meeting scheduling
                      </p>
                    </div>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <p>Communication Method: <span className="font-medium text-foreground">
                        {communicationMethods.find(m => m.id === contactData.communicationMethod)?.name}
                      </span></p>
                      <p>Contact: <span className="font-medium text-foreground">{contactData.firstName} {contactData.lastName}</span></p>
                      <p>Email: <span className="font-medium text-foreground">{contactData.email}</span></p>
                    </div>
                  </div>
                </div>
                
                {/* Meeting Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">30 minutes</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    {communicationMethods.find(m => m.id === contactData.communicationMethod)?.icon}
                    <span className="text-sm">{communicationMethods.find(m => m.id === contactData.communicationMethod)?.name}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm">Free consultation</span>
                  </div>
                </div>
              </CardContent>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="get-started-title">
              Schedule Your <span className="gradient-text">Discovery Meeting</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Let's discuss how AI can transform your business. Book a free 30-minute consultation with our experts.
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
          <Card className="bg-card border-border">
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
          {step === 1 && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Expert Consultation</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized advice from our AI specialists
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Custom Solutions</h3>
                <p className="text-sm text-muted-foreground">
                  AI recommendations tailored to your business needs
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Fast Implementation</h3>
                <p className="text-sm text-muted-foreground">
                  Quick deployment with minimal disruption
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetStarted;