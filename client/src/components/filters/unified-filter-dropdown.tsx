import { useState } from "react";
import { ChevronDown, Filter, Search, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { industryOptions } from "@/data/industries";
import { solutionTypeOptions } from "@/data/solutions";
import { 
  getSolutionCountForIndustry, 
  getSolutionCountForSolutionType,
  getCorrelatedSolutionTypes,
  getCorrelatedIndustries
} from "@/lib/data-helpers";

export interface FilterSelection {
  type: 'all' | 'industry' | 'solution';
  value: string;
}

interface UnifiedFilterDropdownProps {
  selectedFilter: FilterSelection;
  onFilterChange: (filter: FilterSelection) => void;
  className?: string;
  showCounts?: boolean;
  showCorrelations?: boolean;
  maxCorrelationsToShow?: number;
}

export function UnifiedFilterDropdown({
  selectedFilter,
  onFilterChange,
  className = "",
  showCounts = true,
  showCorrelations = true,
  maxCorrelationsToShow = 3
}: UnifiedFilterDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");

  const getFilterLabel = () => {
    if (selectedFilter.type === 'all') {
      return "All Solutions";
    } else if (selectedFilter.type === 'industry') {
      if (selectedFilter.value === 'all-industries') {
        return "All Industries";
      }
      const industry = industryOptions.find(i => i.value === selectedFilter.value);
      return industry?.label || selectedFilter.value;
    } else if (selectedFilter.type === 'solution') {
      if (selectedFilter.value === 'all-solutions') {
        return "All Solution Types";
      }
      const solution = solutionTypeOptions.find(s => s.value === selectedFilter.value);
      return solution?.label || selectedFilter.value;
    }
    return "Select Filter";
  };

  const getFilterIcon = () => {
    if (selectedFilter.type === 'industry' && selectedFilter.value !== 'all-industries') {
      const industry = industryOptions.find(i => i.value === selectedFilter.value);
      return industry?.icon;
    } else if (selectedFilter.type === 'solution' && selectedFilter.value !== 'all-solutions') {
      const solution = solutionTypeOptions.find(s => s.value === selectedFilter.value);
      return solution?.icon;
    }
    return <Filter className="h-4 w-4" />;
  };

  const getCorrelationBadges = (key: string, type: 'industry' | 'solution') => {
    const correlations = type === 'industry' 
      ? getCorrelatedSolutionTypes(key)
      : getCorrelatedIndustries(key);
    
    if (!correlations || correlations.length === 0) return null;
    
    const shown = correlations.slice(0, maxCorrelationsToShow);
    const remaining = correlations.length - maxCorrelationsToShow;
    
    return {
      shown,
      remaining: remaining > 0 ? remaining : 0,
      total: correlations.length
    };
  };

  const filteredIndustries = industryOptions.filter(industry =>
    industry.label.toLowerCase().includes(filterSearch.toLowerCase())
  );

  const filteredSolutionTypes = solutionTypeOptions.filter(solution =>
    solution.label.toLowerCase().includes(filterSearch.toLowerCase())
  );

  return (
    <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "min-w-[250px] justify-between bg-white hover:bg-gray-50",
            className
          )}
        >
          <div className="flex items-center gap-2">
            {getFilterIcon()}
            <span className="truncate">{getFilterLabel()}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search filters..."
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {/* All Solutions Option */}
          <div className="p-2">
            <button
              onClick={() => {
                onFilterChange({ type: 'all', value: 'All' });
                setDropdownOpen(false);
                setFilterSearch("");
              }}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors",
                selectedFilter.type === 'all' && "bg-primary/10 text-primary"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="font-medium">All Solutions</span>
                </div>
                {selectedFilter.type === 'all' && <Check className="h-4 w-4" />}
              </div>
            </button>
          </div>

          {/* Industry Filters */}
          <div className="border-t border-gray-200 bg-gray-50/50">
            <div className="px-3 py-2 text-sm font-semibold text-muted-foreground border-b border-gray-100 bg-white">
              Filter by Industry
            </div>
            
            {/* All Industries Option */}
            <div className="px-2">
              <button
                onClick={() => {
                  onFilterChange({ type: 'industry', value: 'all-industries' });
                  setDropdownOpen(false);
                  setFilterSearch("");
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors",
                  selectedFilter.type === 'industry' && selectedFilter.value === 'all-industries' && "bg-primary/10 text-primary"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="font-medium">All Industries</span>
                  </div>
                  {selectedFilter.type === 'industry' && selectedFilter.value === 'all-industries' && <Check className="h-4 w-4" />}
                </div>
                {showCounts && (
                  <div className="mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {industryOptions.length} industries
                    </Badge>
                  </div>
                )}
              </button>
            </div>

            {/* Individual Industries */}
            <div className="px-2 space-y-1 py-2 bg-white">
              {filteredIndustries.map((industry) => {
                const solutionCount = getSolutionCountForIndustry(industry.value);
                const correlations = showCorrelations ? getCorrelationBadges(industry.value, 'industry') : null;
                
                return (
                  <button
                    key={industry.value}
                    onClick={() => {
                      onFilterChange({ type: 'industry', value: industry.value });
                      setDropdownOpen(false);
                      setFilterSearch("");
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors",
                      selectedFilter.type === 'industry' && selectedFilter.value === industry.value && "bg-primary/10 text-primary"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {industry.icon}
                        <span>{industry.label}</span>
                      </div>
                      {selectedFilter.type === 'industry' && selectedFilter.value === industry.value && <Check className="h-4 w-4" />}
                    </div>
                    {(showCounts || showCorrelations) && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {showCounts && (
                          <Badge variant="secondary" className="text-xs">
                            {solutionCount} solutions
                          </Badge>
                        )}
                        {showCorrelations && correlations && correlations.shown.map((corr, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {corr}
                          </Badge>
                        ))}
                        {showCorrelations && correlations && correlations.remaining > 0 && (
                          <Badge variant="outline" className="text-xs">
                            +{correlations.remaining} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Solution Type Filters */}
          <div className="border-t border-gray-200 bg-gray-50/50">
            <div className="px-3 py-2 text-sm font-semibold text-muted-foreground border-b border-gray-100 bg-white">
              Filter by Solution Type
            </div>
            
            {/* All Solution Types Option */}
            <div className="px-2">
              <button
                onClick={() => {
                  onFilterChange({ type: 'solution', value: 'all-solutions' });
                  setDropdownOpen(false);
                  setFilterSearch("");
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors",
                  selectedFilter.type === 'solution' && selectedFilter.value === 'all-solutions' && "bg-primary/10 text-primary"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="font-medium">All Solution Types</span>
                  </div>
                  {selectedFilter.type === 'solution' && selectedFilter.value === 'all-solutions' && <Check className="h-4 w-4" />}
                </div>
                {showCounts && (
                  <div className="mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {solutionTypeOptions.length} types
                    </Badge>
                  </div>
                )}
              </button>
            </div>

            {/* Individual Solution Types */}
            <div className="px-2 space-y-1 pb-2">
              {filteredSolutionTypes.map((solution) => {
                const solutionCount = getSolutionCountForSolutionType(solution.value);
                const correlations = showCorrelations ? getCorrelationBadges(solution.value, 'solution') : null;
                
                return (
                  <button
                    key={solution.value}
                    onClick={() => {
                      onFilterChange({ type: 'solution', value: solution.value });
                      setDropdownOpen(false);
                      setFilterSearch("");
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors",
                      selectedFilter.type === 'solution' && selectedFilter.value === solution.value && "bg-primary/10 text-primary"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {solution.icon}
                        <span>{solution.label}</span>
                      </div>
                      {selectedFilter.type === 'solution' && selectedFilter.value === solution.value && <Check className="h-4 w-4" />}
                    </div>
                    {(showCounts || showCorrelations) && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {showCounts && (
                          <Badge variant="secondary" className="text-xs">
                            {solutionCount} solutions
                          </Badge>
                        )}
                        {showCorrelations && correlations && correlations.shown.map((corr, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {corr}
                          </Badge>
                        ))}
                        {showCorrelations && correlations && correlations.remaining > 0 && (
                          <Badge variant="outline" className="text-xs">
                            +{correlations.remaining} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}