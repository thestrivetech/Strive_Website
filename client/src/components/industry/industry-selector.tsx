import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { homePageIndustries, industryIcons } from "@/data/industries";
import type { IndustryOption } from "@/data/industries";

interface IndustrySelectorProps {
  selectedIndustry: string | null;
  onIndustrySelect: (industryId: string | null) => void;
  industries?: IndustryOption[];
  displayMode?: "dropdown-mobile" | "grid-desktop" | "both";
  className?: string;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

export function IndustrySelector({
  selectedIndustry,
  onIndustrySelect,
  industries = homePageIndustries,
  displayMode = "both",
  className = "",
  mobileOnly = false,
  desktopOnly = false
}: IndustrySelectorProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleIndustrySelect = (industryId: string) => {
    if (selectedIndustry === industryId) {
      onIndustrySelect(null);
    } else {
      onIndustrySelect(industryId);
    }
  };

  const renderMobileDropdown = () => (
    <div className={cn(
      "mb-12",
      desktopOnly && "md:hidden",
      className
    )}>
      <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={dropdownOpen}
            className="w-full max-w-sm mx-auto bg-[#020a1c] border-orange-500 text-white hover:bg-[#020a1c]/90 justify-between"
          >
            <div className="flex items-center gap-2">
              {selectedIndustry && industryIcons[selectedIndustry]}
              <span className="truncate">
                {selectedIndustry ? 
                  industries.find(i => i.value === selectedIndustry)?.label || "Select your industry" : 
                  "Select your industry to see solutions"
                }
              </span>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-0 max-h-[300px]" align="center" side="bottom" sideOffset={5}>
          <Command>
            <CommandInput 
              placeholder="Search industries..." 
              value={search}
              onValueChange={setSearch}
              className="border-b"
            />
            <CommandList className="max-h-[200px] overflow-y-auto">
              <CommandEmpty>No industry found.</CommandEmpty>
              <CommandGroup>
                {industries
                  .filter(industry => 
                    industry.label.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((industry) => (
                  <CommandItem
                    key={industry.value}
                    value={industry.value}
                    onSelect={() => {
                      handleIndustrySelect(industry.value);
                      setDropdownOpen(false);
                      setSearch("");
                    }}
                    className={cn(
                      "flex items-center gap-2 cursor-pointer hover:text-[#ff7033] hover:[&>svg]:text-[#ff7033]",
                      selectedIndustry === industry.value && "bg-[#ff7033]/10 text-[#ff7033] [&>svg]:text-[#ff7033]"
                    )}
                  >
                    {industry.icon}
                    <span>{industry.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );

  const renderDesktopGrid = () => (
    <div className={cn(
      "grid grid-cols-4 lg:grid-cols-8 gap-4 mb-12",
      mobileOnly && "hidden md:grid",
      className
    )}>
      {industries.map((industry) => (
        <button
          key={industry.value}
          onClick={() => handleIndustrySelect(industry.value)}
          className={cn(
            "p-4 rounded-xl border-2 bg-[#020a1c] backdrop-blur-sm text-white transition-all duration-300 hover:scale-105 text-center shadow-lg hover:shadow-orange-500/20",
            selectedIndustry === industry.value 
              ? "border-orange-400 bg-[#020a1c]/70" 
              : "border-orange-500 hover:bg-[#020a1c]/90 hover:border-orange-400"
          )}
          data-testid={`button-industry-${industry.value}`}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="text-white">{industry.icon}</div>
            <span className="text-sm font-medium">{industry.label}</span>
          </div>
        </button>
      ))}
    </div>
  );

  if (displayMode === "dropdown-mobile" || mobileOnly) {
    return <div className="md:hidden">{renderMobileDropdown()}</div>;
  }

  if (displayMode === "grid-desktop" || desktopOnly) {
    return <div className="hidden md:block">{renderDesktopGrid()}</div>;
  }

  // Default "both" mode
  return (
    <>
      <div className="md:hidden">{renderMobileDropdown()}</div>
      <div className="hidden md:block">{renderDesktopGrid()}</div>
    </>
  );
}