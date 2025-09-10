import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, TrendingUp, DollarSign, Clock, Stethoscope, CreditCard, ShoppingCart, Factory, Cpu, GraduationCap, Home as HomeIcon, Scale, Hotel, Zap, Truck, Leaf, Film, Heart, Building2, Globe, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { industryStatistics, roiMethodology } from "@/data/industry-statistics";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  // Additional industries for broader coverage
  hospitality: {
    name: "Hospitality & Tourism",
    icon: <Hotel className="h-4 w-4" />,
    baseROI: 2.6,
    services: {
      automation: { name: "Booking Automation", multiplier: 3.1, timeSaving: 40 },
      analytics: { name: "Guest Analytics", multiplier: 2.9, timeSaving: 30 },
      ai: { name: "Revenue Management", multiplier: 3.6, timeSaving: 45 },
      compliance: { name: "Operations Optimization", multiplier: 2.5, timeSaving: 25 },
    },
  },
  energy: {
    name: "Energy & Utilities",
    icon: <Zap className="h-4 w-4" />,
    baseROI: 3.4,
    services: {
      automation: { name: "Grid Automation", multiplier: 3.9, timeSaving: 50 },
      analytics: { name: "Consumption Analytics", multiplier: 3.3, timeSaving: 35 },
      ai: { name: "Predictive Grid Management", multiplier: 4.5, timeSaving: 55 },
      compliance: { name: "Regulatory Compliance", multiplier: 2.8, timeSaving: 20 },
    },
  },
  logistics: {
    name: "Transportation & Logistics",
    icon: <Truck className="h-4 w-4" />,
    baseROI: 3.0,
    services: {
      automation: { name: "Route Optimization", multiplier: 3.5, timeSaving: 45 },
      analytics: { name: "Fleet Analytics", multiplier: 3.2, timeSaving: 35 },
      ai: { name: "Demand Forecasting", multiplier: 3.8, timeSaving: 40 },
      compliance: { name: "Supply Chain Management", multiplier: 2.9, timeSaving: 30 },
    },
  },
  agriculture: {
    name: "Agriculture & Food",
    icon: <Leaf className="h-4 w-4" />,
    baseROI: 2.5,
    services: {
      automation: { name: "Farm Automation", multiplier: 3.0, timeSaving: 40 },
      analytics: { name: "Crop Analytics", multiplier: 2.8, timeSaving: 30 },
      ai: { name: "Yield Prediction", multiplier: 3.4, timeSaving: 45 },
      compliance: { name: "Supply Chain Tracking", multiplier: 2.4, timeSaving: 25 },
    },
  },
  media: {
    name: "Media & Entertainment",
    icon: <Film className="h-4 w-4" />,
    baseROI: 2.8,
    services: {
      automation: { name: "Content Distribution", multiplier: 3.2, timeSaving: 35 },
      analytics: { name: "Audience Analytics", multiplier: 3.5, timeSaving: 40 },
      ai: { name: "Content Personalization", multiplier: 3.9, timeSaving: 45 },
      compliance: { name: "Rights Management", multiplier: 2.6, timeSaving: 20 },
    },
  },
  nonprofit: {
    name: "Non-profit Organizations",
    icon: <Heart className="h-4 w-4" />,
    baseROI: 2.2,
    services: {
      automation: { name: "Donor Management", multiplier: 2.6, timeSaving: 35 },
      analytics: { name: "Impact Analytics", multiplier: 2.4, timeSaving: 30 },
      ai: { name: "Grant Writing Assistance", multiplier: 3.0, timeSaving: 40 },
      compliance: { name: "Compliance Reporting", multiplier: 2.2, timeSaving: 25 },
    },
  },
  government: {
    name: "Government & Public Sector",
    icon: <Building2 className="h-4 w-4" />,
    baseROI: 2.4,
    services: {
      automation: { name: "Service Automation", multiplier: 2.8, timeSaving: 40 },
      analytics: { name: "Citizen Analytics", multiplier: 2.6, timeSaving: 30 },
      ai: { name: "Smart City Solutions", multiplier: 3.3, timeSaving: 45 },
      compliance: { name: "Regulatory Management", multiplier: 2.5, timeSaving: 25 },
    },
  },
  other: {
    name: "Other Industry",
    icon: <Briefcase className="h-4 w-4" />,
    baseROI: 2.5, // Default average for custom industries
    services: {
      automation: { name: "Process Automation", multiplier: 3.0, timeSaving: 35 },
      analytics: { name: "Data Analytics", multiplier: 2.8, timeSaving: 30 },
      ai: { name: "AI Solutions", multiplier: 3.5, timeSaving: 40 },
      compliance: { name: "Compliance Management", multiplier: 2.5, timeSaving: 25 },
    },
  },
};

const ROICalculator = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("healthcare");
  const [customIndustry, setCustomIndustry] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>(["automation"]);
  const [investmentAmount, setInvestmentAmount] = useState([50000]);
  const [calculatedROI, setCalculatedROI] = useState(0);
  const [timeSavings, setTimeSavings] = useState(0);
  const [annualReturn, setAnnualReturn] = useState(0);

  useEffect(() => {
    // Use custom industry data if "other" is selected and custom name provided
    const industry = selectedIndustry === "other" && customIndustry 
      ? { ...industryData.other, name: customIndustry }
      : industryData[selectedIndustry];
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
                See How AI Delivers Real Business Value
              </h2>
            </div>
            <p className="max-w-2xl mx-auto text-[#020a1c]" data-testid="roi-calculator-subtitle">
              Know exactly how much time and money you could save. Select your industry, enter your numbers, and get your personalized ROI projection in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Calculator Controls */}
            <Card className="p-4 md:p-6 flex flex-col">
              <CardContent className="space-y-6 p-0 flex-grow">
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Select Your Industry
                  </label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                        data-testid="select-industry"
                      >
                        <div className="flex items-center gap-2">
                          {industryData[selectedIndustry]?.icon}
                          <span>
                            {selectedIndustry === "other" && customIndustry 
                              ? customIndustry 
                              : industryData[selectedIndustry]?.name || "Select industry..."}
                          </span>
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput 
                          placeholder="Search or type custom industry..." 
                          onValueChange={(value) => {
                            setCustomIndustry(value);
                          }}
                        />
                        <CommandEmpty>
                          <div className="p-4 text-sm">
                            <p className="mb-2">Industry not found?</p>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => {
                                setSelectedIndustry("other");
                                setOpen(false);
                              }}
                            >
                              Use "{customIndustry || "Custom Industry"}"
                            </Button>
                          </div>
                        </CommandEmpty>
                        <CommandGroup>
                          {Object.entries(industryData).filter(([key]) => key !== "other").map(([key, industry]) => (
                            <CommandItem
                              key={key}
                              value={industry.name}
                              onSelect={() => {
                                setSelectedIndustry(key);
                                setCustomIndustry("");
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedIndustry === key ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <div className="flex items-center gap-2">
                                {industry.icon}
                                <span>{industry.name}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {selectedIndustry === "other" && customIndustry && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Using custom industry: {customIndustry}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Investment Amount: {formatCurrency(investmentAmount[0])}
                  </label>
                  <Slider
                    value={investmentAmount}
                    onValueChange={setInvestmentAmount}
                    max={250000}
                    min={1000}
                    step={1000}
                    className="w-full"
                    data-testid="slider-investment"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$1K</span>
                    <span>$250K</span>
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
              
              {/* Schedule Assessment Button - Bottom aligned */}
              <div className="pt-4 mt-auto">
                <button 
                  onClick={() => window.location.href = "/request"}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  data-testid="button-schedule-discovery-call"
                >
                  Request Solution Showcase
                </button>
              </div>
            </Card>

            {/* Results */}
            <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/5 to-orange-500/5">
              <CardContent className="space-y-6 p-0">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4" data-testid="results-title">
                    Your Estimated ROI Instantly
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
                  <TooltipProvider>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <p className="text-sm text-muted-foreground">
                        Based on {selectedIndustry === "other" && customIndustry 
                          ? customIndustry 
                          : industryData[selectedIndustry]?.name} industry averages and selected solutions
                      </p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <div className="space-y-2">
                            <p className="font-semibold">ROI Methodology</p>
                            <p className="text-xs">{roiMethodology.methodology}</p>
                            <p className="text-xs text-muted-foreground">
                              Validated by: {roiMethodology.validation}
                            </p>
                            <p className="text-xs italic">{roiMethodology.disclaimer}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                  <button 
                    onClick={() => window.location.href = "/contact"}
                    className="text-primary font-semibold hover:underline"
                    data-testid="button-get-detailed-analysis"
                  >
                    Talk to an Expert →
                  </button>
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