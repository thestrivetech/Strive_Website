import type { SAIModule } from "@/data/sai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  /**
   * SAI module data object
   */
  module: SAIModule;
  /**
   * Optional className for custom styling
   */
  className?: string;
}

/**
 * Displays a single SAI module with icon, title, tagline, and key features
 * Includes hover effects and click-to-navigate functionality
 */
export function ModuleCard({ module, className }: ModuleCardProps) {
  const Icon = module.icon;

  const handleClick = () => {
    window.location.href = module.ctaHref;
  };

  return (
    <Card
      className={cn(
        "group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/50",
        className
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <CardHeader>
        {/* Icon */}
        <div className="mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          </div>
        </div>

        {/* Title */}
        <CardTitle className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {module.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Tagline */}
        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
          {module.tagline}
        </p>

        {/* Key Features (show first 4) */}
        <div className="mb-4 sm:mb-6 space-y-2">
          {module.features.slice(0, 4).map((feature, index) => (
            <div
              key={index}
              className="flex items-start text-xs sm:text-sm text-muted-foreground"
            >
              <span className="text-primary mr-2 mt-0.5">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <Button
          variant="ghost"
          className="w-full group-hover:bg-primary/10 transition-colors duration-300 min-h-[44px]"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          <span className="flex items-center justify-center">
            Learn More
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
