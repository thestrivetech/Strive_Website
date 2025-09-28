import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getIndustrySolutions, getIndustryLabel } from "@/lib/data-helpers";
import type { IndustrySolution } from "@/data/industries";

interface IndustrySolutionsGridProps {
  selectedIndustry: string;
  className?: string;
  showTitle?: boolean;
  columns?: 2 | 3 | 4;
}

export function IndustrySolutionsGrid({
  selectedIndustry,
  className = "",
  showTitle = true,
  columns = 4
}: IndustrySolutionsGridProps) {
  const solutions = getIndustrySolutions(selectedIndustry);
  const industryLabel = getIndustryLabel(selectedIndustry);

  if (!solutions || solutions.length === 0) {
    return null;
  }

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className={`mt-12 ${className}`}>
      {showTitle && (
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            {industryLabel} Solutions
          </h3>
        </div>
      )}
      <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
        {solutions.map((solution: IndustrySolution, index: number) => (
          <Card 
            key={index} 
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <CardContent className="p-3 md:p-6 text-center">
              <div className="text-white mb-4 flex justify-center">
                {solution.icon}
              </div>
              <h4 className="text-white font-semibold mb-2 text-sm leading-tight">
                {solution.name}
              </h4>
              {solution.painPoint && (
                <div className="mb-2">
                  <p className="text-red-400 text-xs font-semibold">
                    Pain Point: {solution.painPoint}
                  </p>
                  <a 
                    href={solution.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1 mt-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Source
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
              <p className="text-white/90 text-xs leading-relaxed">
                Solution: {solution.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}