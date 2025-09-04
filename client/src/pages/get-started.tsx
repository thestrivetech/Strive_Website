import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, DollarSign, Factory, ShoppingCart, Laptop, GraduationCap, Home as HomeIcon, Scale, Building2, Users } from "lucide-react";

const GetStarted = () => {
  const [step, setStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [customIndustry, setCustomIndustry] = useState<string>("");
  const [employeeCount, setEmployeeCount] = useState<string>("");
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: ""
  });

  // Industry options from your website
  const industries = [
    { id: "healthcare", name: "Healthcare", icon: <Heart className="w-6 h-6" /> },
    { id: "financial", name: "Financial Services", icon: <DollarSign className="w-6 h-6" /> },
    { id: "manufacturing", name: "Manufacturing", icon: <Factory className="w-6 h-6" /> },
    { id: "retail", name: "Retail", icon: <ShoppingCart className="w-6 h-6" /> },
    { id: "technology", name: "Technology", icon: <Laptop className="w-6 h-6" /> },
    { id: "education", name: "Education", icon: <GraduationCap className="w-6 h-6" /> },
    { id: "real-estate", name: "Real Estate", icon: <HomeIcon className="w-6 h-6" /> },
    { id: "legal", name: "Legal", icon: <Scale className="w-6 h-6" /> },
    { id: "other", name: "Other", icon: <Building2 className="w-6 h-6" /> }
  ];

  const employeeRanges = [
    { id: "1-9", label: "1 - 9" },
    { id: "10-49", label: "10 - 49" },
    { id: "50-149", label: "50 - 149" },
    { id: "150-999", label: "150 - 999" },
    { id: "1000+", label: "1,000+" }
  ];

  const handleIndustrySelect = (industryId: string) => {
    setSelectedIndustry(industryId);
  };

  const handleEmployeeSelect = (range: string) => {
    setEmployeeCount(range);
  };

  const handleContactChange = (field: string, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", {
      industry: selectedIndustry === 'other' ? customIndustry : selectedIndustry,
      employeeCount,
      ...contactData
    });
    // You can add success message or redirect here
  };

  const isStep1Valid = () => {
    return selectedIndustry && (selectedIndustry !== 'other' || customIndustry.trim());
  };

  const isStep2Valid = () => {
    return employeeCount;
  };

  const isStep3Valid = () => {
    return contactData.firstName && 
           contactData.lastName && 
           contactData.phone && 
           contactData.email && 
           contactData.company;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center space-y-12">
            <div>
              <div className="text-sm text-muted-foreground mb-4 tracking-widest">STEP 1 OF 3</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                What industry is your company in?
              </h1>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => handleIndustrySelect(industry.id)}
                  className={`p-6 rounded-xl transition-all duration-200 text-left ${
                    selectedIndustry === industry.id
                      ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background'
                      : 'bg-card/80 text-white hover:bg-card border border-muted/20'
                  }`}
                  data-testid={`button-industry-${industry.id}`}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`${selectedIndustry === industry.id ? 'text-primary-foreground' : 'text-primary'}`}>
                      {industry.icon}
                    </div>
                    <span className="font-medium">{industry.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {selectedIndustry === 'other' && (
              <div className="max-w-md mx-auto">
                <Input
                  type="text"
                  placeholder="Please specify your industry"
                  value={customIndustry}
                  onChange={(e) => setCustomIndustry(e.target.value)}
                  className="bg-card/80 border-muted/20 text-white placeholder:text-muted-foreground"
                  data-testid="input-custom-industry"
                />
              </div>
            )}

            <Button
              onClick={handleNextStep}
              disabled={!isStep1Valid()}
              className="bg-muted text-muted-foreground hover:bg-muted/80 px-12 py-6 text-lg rounded-full font-medium"
              data-testid="button-step1-next"
            >
              Next
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="text-center space-y-12">
            <div>
              <div className="text-sm text-muted-foreground mb-4 tracking-widest">STEP 2 OF 3</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                How many employees does your company have?
              </h1>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {employeeRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => handleEmployeeSelect(range.id)}
                  className={`p-8 rounded-xl transition-all duration-200 text-xl font-medium ${
                    employeeCount === range.id
                      ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background'
                      : 'bg-card/80 text-white hover:bg-card border border-muted/20'
                  }`}
                  data-testid={`button-employees-${range.id}`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={handlePrevStep}
                variant="ghost"
                className="text-white hover:bg-muted/20 px-8 py-6 text-lg"
                data-testid="button-step2-back"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={!isStep2Valid()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-lg rounded-full font-medium"
                data-testid="button-step2-next"
              >
                Next
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-8">
            <div>
              <div className="text-sm text-muted-foreground mb-4 tracking-widest">STEP 3 OF 3</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Last step: where can we reach you?
              </h1>
              <p className="text-xl text-muted-foreground">
                This ensures you get the best experience possible.
              </p>
            </div>
            
            <Card className="max-w-2xl mx-auto bg-white">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      type="text"
                      placeholder="First name"
                      value={contactData.firstName}
                      onChange={(e) => handleContactChange('firstName', e.target.value)}
                      className="bg-muted/20 border-muted/30"
                      data-testid="input-first-name"
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Last name"
                      value={contactData.lastName}
                      onChange={(e) => handleContactChange('lastName', e.target.value)}
                      className="bg-muted/20 border-muted/30"
                      data-testid="input-last-name"
                      required
                    />
                  </div>
                  
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={contactData.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="bg-muted/20 border-muted/30"
                    data-testid="input-phone"
                    required
                  />
                  
                  <Input
                    type="email"
                    placeholder="Company email"
                    value={contactData.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="bg-muted/20 border-muted/30"
                    data-testid="input-email"
                    required
                  />
                  
                  <Input
                    type="text"
                    placeholder="Company name"
                    value={contactData.company}
                    onChange={(e) => handleContactChange('company', e.target.value)}
                    className="bg-muted/20 border-muted/30"
                    data-testid="input-company"
                    required
                  />

                  <Button
                    type="submit"
                    disabled={!isStep3Valid()}
                    className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white py-6 text-lg rounded-xl font-medium"
                    data-testid="button-submit"
                  >
                    Submit
                  </Button>
                  
                  <p className="text-sm text-muted-foreground text-center">
                    By clicking "Submit," I acknowledge receipt of the Strive{' '}
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>

            <Button
              onClick={handlePrevStep}
              variant="ghost"
              className="text-white hover:bg-muted/20 px-8 py-4"
              data-testid="button-step3-back"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
      
      <div className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default GetStarted;