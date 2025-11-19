import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ValuePropCardProps {
  /**
   * Icon component from lucide-react
   */
  icon: LucideIcon;
  /**
   * Main title of the value proposition
   */
  title: string;
  /**
   * Description explaining the value proposition
   */
  description: string;
  /**
   * Specific benefit or outcome statement
   */
  benefit: string;
  /**
   * Optional className for custom styling
   */
  className?: string;
}

/**
 * Displays a single value proposition with icon, title, description, and benefit
 * Used in WhySAISection to highlight key platform advantages
 */
export function ValuePropCard({
  icon: Icon,
  title,
  description,
  benefit,
  className,
}: ValuePropCardProps) {
  return (
    <Card
      className={cn(
        "group hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2",
        className
      )}
    >
      <CardContent className="p-6 sm:p-8">
        {/* Icon */}
        <div className="mb-4 sm:mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
          {description}
        </p>

        {/* Benefit Statement */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm sm:text-base font-semibold text-primary flex items-start">
            <span className="mr-2 mt-0.5">✓</span>
            <span>{benefit}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
