import { useState } from "react";
import type { SAIModule } from "@/data/sai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle2, TrendingUp, Users as UsersIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ModuleCardProps {
  /**
   * SAI module data object
   */
  module: SAIModule;
  /**
   * Optional className for custom styling
   */
  className?: string;
  /**
   * Visual variant - light for light backgrounds, dark for gradient backgrounds
   */
  variant?: "light" | "dark";
  /**
   * If true, clicking the card links to /platform instead of opening a modal
   * Use this for homepage cards to reduce redundancy
   */
  linkToPlatform?: boolean;
  /**
   * Compact mode - smaller card with fewer features shown
   */
  compact?: boolean;
}

/**
 * Displays a single SAI module with icon, title, tagline, and key features
 * Opens a detailed modal when clicked
 */
export function ModuleCard({ module, className, variant = "light", linkToPlatform = false, compact = false }: ModuleCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = module.icon;
  const isDark = variant === "dark";

  const handleClick = () => {
    if (linkToPlatform) {
      window.location.href = "/platform";
    } else {
      setIsOpen(true);
    }
  };

  // Compact homepage version - simple icon + title + tagline
  if (compact && linkToPlatform) {
    return (
      <Card
        className={cn(
          "group cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-orange-400",
          isDark
            ? "bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/15"
            : "bg-white border-2 border-gray-200",
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
        <CardContent className="p-6 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className={cn(
              "w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110",
              isDark
                ? "bg-gradient-to-br from-orange-100/20 to-orange-200/20"
                : "bg-gradient-to-br from-orange-100 to-orange-200"
            )}>
              <Icon className={cn(
                "w-8 h-8",
                isDark ? "text-orange-400" : "text-orange-600"
              )} />
            </div>
          </div>

          {/* Title */}
          <h3 className={cn(
            "text-xl font-bold mb-2 transition-colors duration-200",
            isDark ? "text-white group-hover:text-orange-300" : "text-gray-900 group-hover:text-orange-600"
          )}>
            {module.title}
          </h3>

          {/* Tagline */}
          <p className={cn(
            "text-sm leading-relaxed mb-4",
            isDark ? "text-white/70" : "text-gray-600"
          )}>
            {module.tagline}
          </p>

          {/* View Details Hint */}
          <div className={cn(
            "flex items-center justify-center gap-1 text-xs font-semibold transition-colors duration-200",
            isDark ? "text-orange-300" : "text-orange-600"
          )}>
            <span>View Details</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Full version for platform page
  return (
    <>
      <Card
        className={cn(
          "group cursor-pointer transition-all duration-200",
          isDark
            ? "bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl"
            : "bg-white border-2 hover:border-orange-400 hover:shadow-xl",
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
            <div className={cn(
              "rounded-lg flex items-center justify-center transition-colors duration-300",
              "w-14 h-14 sm:w-16 sm:h-16",
              isDark
                ? "bg-gradient-to-br from-orange-100/20 to-orange-200/20 group-hover:from-orange-200/30 group-hover:to-orange-300/30"
                : "bg-gradient-to-br from-orange-100 to-orange-200 group-hover:from-orange-200 group-hover:to-orange-300"
            )}>
              <Icon className={cn(
                "w-7 h-7 sm:w-8 sm:h-8",
                isDark ? "text-orange-400" : "text-orange-600"
              )} />
            </div>
          </div>

          {/* Title */}
          <CardTitle className={cn(
            "font-bold transition-colors duration-300 text-xl sm:text-2xl",
            isDark
              ? "text-white group-hover:text-orange-300"
              : "text-gray-900 group-hover:text-orange-600"
          )}>
            {module.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Tagline */}
          <p className={cn(
            "leading-relaxed text-sm sm:text-base mb-4 sm:mb-6",
            isDark ? "text-white/80" : "text-gray-600"
          )}>
            {module.tagline}
          </p>

          {/* Key Features */}
          <div className="mb-4 sm:mb-6 space-y-2">
            {module.features.slice(0, 4).map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start text-xs sm:text-sm",
                  isDark ? "text-white/70" : "text-gray-700"
                )}
              >
                <span className={cn(
                  "mr-2 mt-0.5",
                  isDark ? "text-orange-400" : "text-orange-600"
                )}>✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Learn More Button */}
          <Button
            variant="ghost"
            className={cn(
              "w-full transition-colors duration-300 min-h-[44px]",
              isDark
                ? "text-white hover:bg-white/20"
                : "text-gray-900 group-hover:bg-orange-100"
            )}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            <span className="flex items-center justify-center">
              View Full Details
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </CardContent>
      </Card>

      {/* Modal - only render if not linking to platform */}
      {!linkToPlatform && (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow-md">
                <Icon className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {module.title}
                </DialogTitle>
                <Badge className="mt-2 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-300 font-semibold">
                  SAI Platform Module
                </Badge>
              </div>
            </div>
            <DialogDescription className="text-lg text-gray-600 leading-relaxed">
              {module.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Features Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Key Features</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {module.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-800 bg-gradient-to-br from-gray-50 to-white p-3 rounded-lg border border-gray-100 hover:border-green-200 hover:shadow-sm transition-all duration-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <span className="bg-gradient-to-r from-orange-700 to-orange-600 bg-clip-text text-transparent">Key Benefits</span>
              </h3>
              <div className="space-y-3">
                {module.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-800 bg-gradient-to-br from-orange-50 to-white p-4 rounded-lg border border-orange-200 hover:border-orange-300 hover:shadow-md transition-all duration-200"
                  >
                    <TrendingUp className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-blue-600" />
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">Real-World Use Cases</span>
              </h3>
              <div className="space-y-3">
                {module.useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-800 bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border border-blue-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="leading-relaxed">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6 border-t-2 border-gray-100">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => window.location.href = "/waitlist"}
              >
                Join Waitlist to Get Early Access
              </Button>
              <p className="text-xs text-gray-500 mt-3 text-center sm:text-left font-medium">
                <span className="text-orange-600">✓</span> All modules included •
                <span className="text-orange-600"> ✓</span> Unlimited users •
                <span className="text-orange-600"> ✓</span> No per-contact fees
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      )}
    </>
  );
}
