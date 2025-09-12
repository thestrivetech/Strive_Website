import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calculator, TrendingUp, DollarSign, Clock, Stethoscope, CreditCard, 
  ShoppingCart, Factory, Cpu, GraduationCap, Home as HomeIcon, Scale, 
  Hotel, Zap, Truck, Leaf, Film, Heart, Building2, Globe, Briefcase, 
  Gamepad2, Trophy, ChevronDown, Shield, Radio, Tractor, Train, Activity, Info
} from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { roiMethodology } from "@/data/industry-statistics";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { roiCalculator } from "@/lib/roi-calculator";
import type { IndustryName } from "@/types/roi-calculator";

// Industry icon mapping for UI display
const industryIcons: Record<IndustryName, JSX.Element> = {
  'Healthcare': <Stethoscope className="h-4 w-4" />,
  'Financial Services': <CreditCard className="h-4 w-4" />,
  'Retail': <ShoppingCart className="h-4 w-4" />,
  'Manufacturing': <Factory className="h-4 w-4" />,
  'Technology': <Cpu className="h-4 w-4" />,
  'Government': <Building2 className="h-4 w-4" />,
  'Legal': <Scale className="h-4 w-4" />,
  'Real Estate': <HomeIcon className="h-4 w-4" />,
  'Transportation': <Train className="h-4 w-4" />,
  'Insurance': <Shield className="h-4 w-4" />,
  'Energy': <Zap className="h-4 w-4" />,
  'Telecommunications': <Radio className="h-4 w-4" />,
  'Agriculture': <Tractor className="h-4 w-4" />,
  'Media & Entertainment': <Film className="h-4 w-4" />,
  'Logistics & Supply Chain': <Truck className="h-4 w-4" />,
  'Hospitality & Tourism': <Hotel className="h-4 w-4" />,
  'Gaming': <Gamepad2 className="h-4 w-4" />,
  'Energy & Utilities': <Activity className="h-4 w-4" />,
  'eSports': <Trophy className="h-4 w-4" />,
  'All Industries': <Globe className="h-4 w-4" />,
  'Education': <GraduationCap className="h-4 w-4" />
};

const ROICalculator = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryName>("All Industries");
  const [open, setOpen] = useState(false);
  const [industrySearch, setIndustrySearch] = useState("");
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [investmentAmount, setInvestmentAmount] = useState([50000]);
  const [calculatedROI, setCalculatedROI] = useState(0);
  const [timeSavings, setTimeSavings] = useState("0%");
  const [annualReturn, setAnnualReturn] = useState(0);
  const [paybackMonths, setPaybackMonths] = useState(0);
  const [roiMultiplier, setRoiMultiplier] = useState(0);

  // Custom ordered list of industries for better UX
  const industryOrder: IndustryName[] = [
    'All Industries',
    'Healthcare',
    'Financial Services',
    'Manufacturing',
    'Retail',
    'Technology',
    'Education',
    'Real Estate',
    'Legal',
    'Logistics & Supply Chain',
    'Hospitality & Tourism',
    'Energy & Utilities',
    'Government',
    'Agriculture',
    'Media & Entertainment',
    'Gaming',
    'eSports',
    'Transportation',
    'Insurance',
    'Energy',
    'Telecommunications'
  ];
  
  // Filter to only include industries that exist in the calculator
  const allIndustries = industryOrder.filter(industry => 
    roiCalculator.getAllIndustries().includes(industry)
  );
  
  // Get solutions for the selected industry
  const availableSolutions = roiCalculator.getSolutionsForIndustry(selectedIndustry);

  // Update selected solutions when industry changes
  useEffect(() => {
    const solutions = roiCalculator.getSolutionsForIndustry(selectedIndustry);
    if (solutions.length > 0) {
      // Select first solution by default
      setSelectedSolutions([solutions[0]]);
    } else {
      setSelectedSolutions([]);
    }
  }, [selectedIndustry]);

  // Calculate ROI whenever inputs change
  useEffect(() => {
    if (selectedIndustry && selectedSolutions.length > 0) {
      const result = roiCalculator.calculateROI(
        selectedIndustry,
        investmentAmount[0],
        selectedSolutions
      );
      
      // Parse the formatted results
      const roiValue = parseInt(result.fiveYearROI.replace(/[$,]/g, ''));
      const annualValue = parseInt(result.annualReturn.replace(/[$,]/g, ''));
      
      setCalculatedROI(roiValue);
      setTimeSavings(result.timeSavings);
      setAnnualReturn(annualValue);
      setPaybackMonths(result.paybackMonths);
      setRoiMultiplier(result.roiMultiplier);
    } else {
      // Reset values when no solutions are selected
      setCalculatedROI(0);
      setTimeSavings("0%");
      setAnnualReturn(0);
      setPaybackMonths(0);
      setRoiMultiplier(0);
    }
  }, [selectedIndustry, selectedSolutions, investmentAmount]);

  const toggleSolution = (solution: string) => {
    setSelectedSolutions(prev => 
      prev.includes(solution) 
        ? prev.filter(s => s !== solution)
        : [...prev, solution]
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8">
            {/* Calculator Controls */}
            <Card className="p-2 sm:p-4 md:p-6 flex flex-col">
              <CardContent className="space-y-3 sm:space-y-6 p-0 flex-grow">
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
                        className="w-full justify-between min-h-[48px]"
                        data-testid="select-industry"
                      >
                        <div className="flex items-center gap-2">
                          {industryIcons[selectedIndustry]}
                          <span className="truncate">{selectedIndustry}</span>
                        </div>
                        <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0 max-h-[300px]" align="start" side="bottom" sideOffset={5}>
                      <Command>
                        <CommandInput 
                          placeholder="Search industries..." 
                          value={industrySearch}
                          onValueChange={setIndustrySearch}
                          className="border-b"
                        />
                        <CommandList className="max-h-[200px] overflow-y-auto">
                          <CommandEmpty>No industry found.</CommandEmpty>
                          <CommandGroup>
                            {allIndustries
                              .filter(industry => 
                                industry.toLowerCase().includes(industrySearch.toLowerCase())
                              )
                              .map((industry) => (
                              <CommandItem
                                key={industry}
                                value={industry}
                                onSelect={() => {
                                  setSelectedIndustry(industry as IndustryName);
                                  setOpen(false);
                                  setIndustrySearch("");
                                }}
                                className={cn(
                                  "flex items-center gap-2 cursor-pointer hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033]",
                                  selectedIndustry === industry && "bg-[#ff7033]/10 text-[#ff7033] [&>svg]:text-[#ff7033]"
                                )}
                              >
                                {industryIcons[industry as IndustryName]}
                                <span>{industry}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
                    Select AI Solutions ({selectedSolutions.length} selected)
                  </label>
                  <div className="space-y-2">
                    {availableSolutions.map((solution) => {
                      const solutionDetails = roiCalculator.getSolutionDetails(selectedIndustry, solution);
                      return (
                        <TooltipProvider key={solution}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                variant={selectedSolutions.includes(solution) ? "default" : "outline"}
                                className="cursor-pointer p-3 w-full justify-start hover:bg-primary/10 transition-colors"
                                onClick={() => toggleSolution(solution)}
                                data-testid={`solution-${solution.replace(/\s+/g, '-').toLowerCase()}`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span className="text-left">{solution}</span>
                                  {solutionDetails && (
                                    <span className="text-xs opacity-70 ml-2">
                                      {solutionDetails.timeSavingsPercent}% time saved
                                    </span>
                                  )}
                                </div>
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                              {solutionDetails && (
                                <div className="space-y-2">
                                  <p className="font-semibold">{solutionDetails.name}</p>
                                  <p className="text-xs">{solutionDetails.description}</p>
                                  <div className="text-xs space-y-1 pt-2 border-t">
                                    <p>ROI Multiplier: {solutionDetails.roiMultiplier}x</p>
                                    <p>Time Savings: {solutionDetails.timeSavingsPercent}%</p>
                                    <p>Annual Benefit per $1K: ${solutionDetails.annualBenefitPer1K}</p>
                                  </div>
                                </div>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
              
              {/* Schedule Assessment Button - Bottom aligned */}
              <div className="pt-4 mt-auto">
                <button 
                  onClick={() => window.location.href = "/request"}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group
                  before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500"
                  data-testid="button-schedule-discovery-call"
                >
                  Request Solution Showcase
                </button>
              </div>
            </Card>

            {/* Results */}
            <Card className="p-2 sm:p-4 md:p-6 bg-gradient-to-br from-primary/5 to-orange-500/5">
              <CardContent className="space-y-3 sm:space-y-6 p-0">
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
                      5 Year ROI
                    </div>
                  </div>

                  <div className="text-center p-4 hero-gradient roi-badge rounded-lg border border-white/20">
                    <Clock className="text-blue-500 h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-500" data-testid="text-time-savings">
                      {timeSavings}
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

                  <div className="text-center p-4 hero-gradient roi-badge rounded-lg border border-white/20">
                    <Calculator className="text-purple-500 h-8 w-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-500">
                      {paybackMonths} months
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Payback Period
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <TooltipProvider>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <p className="text-sm text-muted-foreground">
                        Based on {selectedIndustry} industry with {roiMultiplier}x ROI multiplier
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