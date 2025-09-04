import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, TrendingUp, DollarSign, Clock, Stethoscope, CreditCard, ShoppingCart, Factory, Cpu, GraduationCap, Home as HomeIcon, Scale } from "lucide-react";

interface IndustryData {
  [key: string]: {
    name: string;
    icon: JSX.Element;
    baseROI: number;
    services: {
      [key: string]: {
        name: string;
        multiplier: number;
        timeSaving: number;
      };
    };
  };
}

const industryData: IndustryData = {
  healthcare: {
    name: "Healthcare",
    icon: <Stethoscope className="h-4 w-4" />,
    baseROI: 2.4,
    services: {
      automation: { name: "Process Automation", multiplier: 3.2, timeSaving: 35 },
      analytics: { name: "Data Analytics", multiplier: 2.8, timeSaving: 25 },
      ai: { name: "AI Solutions", multiplier: 4.1, timeSaving: 45 },
      compliance: { name: "Compliance Tools", multiplier: 2.1, timeSaving: 15 },
    },
  },
  finance: {
    name: "Finance",
    icon: <CreditCard className="h-4 w-4" />,
    baseROI: 3.1,
    services: {
      automation: { name: "Risk Assessment", multiplier: 3.8, timeSaving: 40 },
      analytics: { name: "Trading Analytics", multiplier: 4.2, timeSaving: 30 },
      ai: { name: "Fraud Detection", multiplier: 5.1, timeSaving: 50 },
      compliance: { name: "Regulatory Compliance", multiplier: 2.9, timeSaving: 20 },
    },
  },
  retail: {
    name: "Retail",
    icon: <ShoppingCart className="h-4 w-4" />,
    baseROI: 2.7,
    services: {
      automation: { name: "Inventory Management", multiplier: 2.9, timeSaving: 30 },
      analytics: { name: "Customer Analytics", multiplier: 3.4, timeSaving: 35 },
      ai: { name: "Demand Forecasting", multiplier: 3.9, timeSaving: 40 },
      compliance: { name: "Supply Chain Optimization", multiplier: 2.6, timeSaving: 25 },
    },
  },
  manufacturing: {
    name: "Manufacturing", 
    icon: <Factory className="h-4 w-4" />,
    baseROI: 3.3,
    services: {
      automation: { name: "Production Automation", multiplier: 4.1, timeSaving: 45 },
      analytics: { name: "Quality Analytics", multiplier: 3.2, timeSaving: 30 },
      ai: { name: "Predictive Maintenance", multiplier: 4.8, timeSaving: 55 },
      compliance: { name: "Safety Compliance", multiplier: 2.8, timeSaving: 20 },
    },
  },
  technology: {
    name: "Technology",
    icon: <Cpu className="h-4 w-4" />,
    baseROI: 3.6,
    services: {
      automation: { name: "DevOps Automation", multiplier: 3.7, timeSaving: 40 },
      analytics: { name: "Performance Analytics", multiplier: 3.9, timeSaving: 35 },
      ai: { name: "Smart Infrastructure", multiplier: 4.3, timeSaving: 50 },
      compliance: { name: "Security Automation", multiplier: 3.1, timeSaving: 25 },
    },
  },
  education: {
    name: "Education",
    icon: <GraduationCap className="h-4 w-4" />,
    baseROI: 2.8,
    services: {
      automation: { name: "Administrative Automation", multiplier: 2.9, timeSaving: 35 },
      analytics: { name: "Learning Analytics", multiplier: 3.1, timeSaving: 30 },
      ai: { name: "Personalized Learning", multiplier: 3.8, timeSaving: 45 },
      compliance: { name: "Student Management", multiplier: 2.4, timeSaving: 20 },
    },
  },
  "real-estate": {
    name: "Real Estate",
    icon: <HomeIcon className="h-4 w-4" />,
    baseROI: 2.9,
    services: {
      automation: { name: "Property Management", multiplier: 3.0, timeSaving: 40 },
      analytics: { name: "Market Analytics", multiplier: 3.2, timeSaving: 35 },
      ai: { name: "Property Valuation", multiplier: 3.7, timeSaving: 50 },
      compliance: { name: "Lead Management", multiplier: 2.7, timeSaving: 25 },
    },
  },
  legal: {
    name: "Legal",
    icon: <Scale className="h-4 w-4" />,
    baseROI: 3.2,
    services: {
      automation: { name: "Document Automation", multiplier: 3.4, timeSaving: 45 },
      analytics: { name: "Case Analytics", multiplier: 3.0, timeSaving: 30 },
      ai: { name: "Legal Research", multiplier: 4.0, timeSaving: 55 },
      compliance: { name: "Compliance Monitoring", multiplier: 3.3, timeSaving: 25 },
    },
  },
};

const ROICalculator = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("healthcare");
  const [selectedServices, setSelectedServices] = useState<string[]>(["automation"]);
  const [investmentAmount, setInvestmentAmount] = useState([100000]);
  const [calculatedROI, setCalculatedROI] = useState(0);
  const [timeSavings, setTimeSavings] = useState(0);
  const [annualReturn, setAnnualReturn] = useState(0);

  useEffect(() => {
    const industry = industryData[selectedIndustry];
    if (!industry) return;

    let totalMultiplier = industry.baseROI;
    let totalTimeSaving = 0;

    selectedServices.forEach(serviceKey => {
      const service = industry.services[serviceKey];
      if (service) {
        totalMultiplier += service.multiplier * 0.3; // Each service adds 30% of its multiplier
        totalTimeSaving += service.timeSaving * 0.4; // Each service adds 40% of its time saving
      }
    });

    const investment = investmentAmount[0];
    const roi = (investment * totalMultiplier) - investment;
    const annualROI = roi * 0.8; // Annual return estimate

    setCalculatedROI(Math.round(roi));
    setTimeSavings(Math.round(totalTimeSaving));
    setAnnualReturn(Math.round(annualROI));
  }, [selectedIndustry, selectedServices, investmentAmount]);

  const toggleService = (serviceKey: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceKey) 
        ? prev.filter(s => s !== serviceKey)
        : [...prev, serviceKey]
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-8 md:py-12 from-primary/5 to-orange-500/5 bg-[#ffffffeb] text-[#020a1c] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="text-primary mr-3 h-8 w-8" />
              <h2 className="text-2xl md:text-3xl font-bold" data-testid="roi-calculator-title">
                ROI Calculator
              </h2>
            </div>
            <p className="max-w-2xl mx-auto text-[#020a1c]" data-testid="roi-calculator-subtitle">
              Discover your potential return on investment with Strive's solutions tailored to your industry
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Calculator Controls */}
            <Card className="p-4 md:p-6">
              <CardContent className="space-y-6 p-0">
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Select Your Industry
                  </label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger data-testid="select-industry" className="gap-2">
                      {industryData[selectedIndustry]?.icon}
                      <SelectValue placeholder="Choose your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(industryData).map(([key, industry]) => (
                        <SelectItem key={key} value={key} className="gap-2">
                          <div className="flex items-center gap-2">
                            {industry.icon}
                            <span>{industry.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Investment Amount: {formatCurrency(investmentAmount[0])}
                  </label>
                  <Slider
                    value={investmentAmount}
                    onValueChange={setInvestmentAmount}
                    max={1000000}
                    min={10000}
                    step={10000}
                    className="w-full"
                    data-testid="slider-investment"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$10K</span>
                    <span>$1M</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Select Solutions
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                    {industryData[selectedIndustry] && Object.entries(industryData[selectedIndustry].services).map(([key, service]) => (
                      <Badge
                        key={key}
                        variant={selectedServices.includes(key) ? "default" : "outline"}
                        className="cursor-pointer p-3 justify-start hover:bg-primary/10 transition-colors"
                        onClick={() => toggleService(key)}
                        data-testid={`service-${key}`}
                      >
                        {service.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/5 to-orange-500/5">
              <CardContent className="space-y-6 p-0">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4" data-testid="results-title">
                    Your Projected Results
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-4 hero-gradient roi-badge rounded-lg border border-white/20">
                    <DollarSign className="text-green-500 h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-500" data-testid="text-total-roi">
                      {formatCurrency(calculatedROI)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total ROI
                    </div>
                  </div>

                  <div className="text-center p-4 hero-gradient roi-badge rounded-lg border border-white/20">
                    <Clock className="text-blue-500 h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-500" data-testid="text-time-savings">
                      {timeSavings}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Time Savings
                    </div>
                  </div>

                  <div className="text-center p-4 hero-gradient roi-badge rounded-lg border border-white/20">
                    <TrendingUp className="text-primary h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary" data-testid="text-annual-return">
                      {formatCurrency(annualReturn)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Annual Return
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on {industryData[selectedIndustry]?.name} industry averages and selected solutions
                  </p>
                  <div className="space-y-3">
                    <button 
                      onClick={() => window.location.href = "/get-started"}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                      data-testid="button-schedule-discovery-call"
                    >
                      Schedule Discovery Call
                    </button>
                    <button 
                      onClick={() => window.location.href = "/contact"}
                      className="text-primary font-semibold hover:underline"
                      data-testid="button-get-detailed-analysis"
                    >
                      Get Detailed Analysis →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;