import { useState } from "react";
import { saiModules } from "@/data/sai";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ModuleSelectorProps {
  selectedModuleId: string;
  onSelectModule: (moduleId: string) => void;
}

/**
 * Module selector component for SAI Platform modules
 * Desktop: 5-column grid with icons and names
 * Mobile: Searchable dropdown
 */
export function ModuleSelector({ selectedModuleId, onSelectModule }: ModuleSelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedModule = saiModules.find(m => m.id === selectedModuleId);

  return (
    <>
      {/* Mobile: Dropdown selector */}
      <div className="md:hidden mb-8">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between bg-[#020a1c] border-2 border-orange-500 text-white hover:bg-[#020a1c]/90 hover:text-white min-h-[44px]"
            >
              {selectedModule ? (
                <div className="flex items-center gap-2">
                  <selectedModule.icon className="w-4 h-4" />
                  <span>{selectedModule.title}</span>
                </div>
              ) : (
                "Select module..."
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search modules..." />
              <CommandEmpty>No module found.</CommandEmpty>
              <CommandGroup className="max-h-[300px] overflow-y-auto">
                {saiModules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <CommandItem
                      key={module.id}
                      value={module.id}
                      onSelect={() => {
                        onSelectModule(module.id);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedModuleId === module.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <Icon className="mr-2 h-4 w-4" />
                      <span>{module.title}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Desktop: Grid selector */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {saiModules.map((module) => {
          const Icon = module.icon;
          const isSelected = selectedModuleId === module.id;

          return (
            <button
              key={module.id}
              onClick={() => onSelectModule(module.id)}
              className={cn(
                "p-4 rounded-xl border-2 bg-[#020a1c] backdrop-blur-sm text-white transition-all duration-300 hover:scale-105 text-center shadow-lg hover:shadow-orange-500/20 min-h-[44px]",
                isSelected
                  ? "border-orange-400 bg-[#020a1c]/70"
                  : "border-orange-500 hover:bg-[#020a1c]/90 hover:border-orange-400"
              )}
              aria-pressed={isSelected}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="text-white">
                  <Icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-medium leading-tight">{module.title}</span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
