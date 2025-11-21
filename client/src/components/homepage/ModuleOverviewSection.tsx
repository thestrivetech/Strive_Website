import { saiModules } from "@/data/sai";
import { ModuleCard } from "./ModuleCard";

interface ModuleOverviewSectionProps {
  /**
   * If true, cards link to /platform instead of opening modals
   */
  linkToPlatform?: boolean;
  /**
   * If true, cards are displayed in compact mode
   */
  compact?: boolean;
}

/**
 * Displays all 5 SAI Platform modules in a responsive grid
 * Shows CRM, The Office, Content Studio, REID, and Global SAI
 */
export function ModuleOverviewSection({ linkToPlatform = false, compact = false }: ModuleOverviewSectionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 hero-gradient relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Everything You Need in One Platform
          </h2>
          <p className="text-lg sm:text-xl text-white/80">
            SAI Platform combines 5 powerful modules to handle every aspect of your real estate business—from
            first contact to commission check.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {saiModules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              variant="dark"
              linkToPlatform={linkToPlatform}
              compact={compact}
            />
          ))}
        </div>

        {/* Optional: Add a footer note */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-sm sm:text-base text-white/70">
            All modules work seamlessly together. Data flows automatically—no manual imports or exports needed.
          </p>
          {linkToPlatform && (
            <p className="text-sm sm:text-base text-white/80 mt-4 font-medium">
              Click any module to explore details on our Platform page →
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
