import type { SAIModule } from "@/data/sai";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface ModuleFeaturesGridProps {
  module: SAIModule;
}

/**
 * Displays detailed features grid for a selected SAI Platform module
 * Shows pain points with source citations and solutions
 * Design matches the "AI SOLUTIONS" pattern from main branch
 */
export function ModuleFeaturesGrid({ module }: ModuleFeaturesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {module.detailedFeatures.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <Card
            key={index}
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <CardContent className="p-4 md:p-6 text-center">
              {/* Icon */}
              <div className="text-white mb-4 flex justify-center">
                <Icon className="w-8 h-8" />
              </div>

              {/* Feature Name */}
              <h4 className="text-white font-semibold mb-3 text-sm leading-tight">
                {feature.name}
              </h4>

              {/* Pain Point */}
              <div className="mb-3">
                <p className="text-red-400 text-xs font-semibold mb-2">
                  Pain Point: {feature.painPoint}
                </p>
                <a
                  href={feature.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1 mt-1 transition-colors duration-200"
                >
                  Source
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Solution */}
              <p className="text-white/90 text-xs leading-relaxed">
                <span className="font-semibold text-white">Solution:</span> {feature.solution}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
