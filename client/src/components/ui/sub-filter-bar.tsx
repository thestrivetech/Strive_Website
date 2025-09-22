import React, { useState, useCallback, useEffect } from "react";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SubFilterOption {
  value: string;
  label: string;
  count: number;
}

interface SubFilterBarProps {
  searchTerm: string;
  selectedCategory: string;
  options: SubFilterOption[];
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
  className?: string;
  maxVisibleCategories?: number;
}

export const SubFilterBar: React.FC<SubFilterBarProps> = ({
  searchTerm,
  selectedCategory,
  options,
  onSearchChange,
  onCategoryChange,
  className,
  maxVisibleCategories = 4
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Debounced search functionality
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      onSearchChange(term);
    }, 300),
    [onSearchChange]
  );

  useEffect(() => {
    debouncedSearch(localSearchTerm);
  }, [localSearchTerm, debouncedSearch]);

  // Reset local search when parent search term changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setLocalSearchTerm("");
    onSearchChange("");
  };

  const handleCategoryClick = (categoryValue: string) => {
    onCategoryChange(categoryValue);
    setShowAllCategories(false); // Collapse after selection
  };

  // Determine which categories to show
  const categoriesToShow = showAllCategories 
    ? options 
    : options.slice(0, maxVisibleCategories);
  
  const hasMoreCategories = options.length > maxVisibleCategories;
  const hiddenCategoriesCount = options.length - maxVisibleCategories;

  return (
    <div className={cn(
      "bg-white border border-slate-200 rounded-lg p-4 space-y-4 shadow-sm",
      "animate-in slide-in-from-top-2 duration-300",
      className
    )}>
      {/* Search Input Section */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            value={localSearchTerm}
            onChange={handleSearchInputChange}
            placeholder="Search within filtered results..."
            className="pl-10 pr-10 bg-slate-50 border-slate-200 focus:border-orange-500 focus:ring-orange-500 text-slate-700 placeholder:text-slate-400"
          />
          {localSearchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-200 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-wrap gap-2 flex-1 sm:flex-row overflow-x-auto sm:overflow-x-visible scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent pb-2 sm:pb-0">
          {categoriesToShow.map((option) => (
            <Button
              key={option.value}
              variant={selectedCategory === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(option.value)}
              className={cn(
                "flex items-center gap-2 transition-all duration-200",
                selectedCategory === option.value
                  ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md"
                  : "border-slate-200 text-white hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 bg-slate-700"
              )}
            >
              <span className="text-sm font-medium">{option.label}</span>
              <Badge 
                variant="secondary" 
                className={cn(
                  "text-xs px-1.5 py-0.5 min-w-[20px] h-5",
                  selectedCategory === option.value
                    ? "bg-orange-400 text-white"
                    : "bg-slate-500 text-white"
                )}
              >
                {option.count}
              </Badge>
            </Button>
          ))}
          
          {/* Show More/Less Button */}
          {hasMoreCategories && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="border-slate-200 text-white hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 bg-slate-700"
            >
              {showAllCategories ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  +{hiddenCategoriesCount} more
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
          )}
        </div>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-wrap gap-2 flex-1 sm:flex-row overflow-x-auto sm:overflow-x-visible scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent pb-2 sm:pb-0">
          {categoriesToShow.map((option) => (
            <Button
              key={option.value}
              variant={selectedCategory === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(option.value)}
              className={cn(
                "flex items-center gap-2 transition-all duration-200",
                selectedCategory === option.value
                  ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md"
                  : "border-slate-200 text-slate-700 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50"
              )}
            >
              <span className="text-sm font-medium">{option.label}</span>
              <Badge 
                variant="secondary" 
                className={cn(
                  "text-xs px-1.5 py-0.5 min-w-[20px] h-5",
                  selectedCategory === option.value
                    ? "bg-orange-400 text-white"
                    : "bg-slate-200 text-slate-600"
                )}
              >
                {option.count}
              </Badge>
            </Button>
          ))}
          
          {/* Show More/Less Button */}
          {hasMoreCategories && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="border-slate-200 text-slate-600 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50"
            >
              {showAllCategories ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  +{hiddenCategoriesCount} more
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default SubFilterBar;