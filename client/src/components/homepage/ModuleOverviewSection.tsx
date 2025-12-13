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
 * Displays all 6 SAI Platform modules in a responsive grid
 * Shows SAI Assistant, CRM, The Office, Content Studio, REID, and Taxes & Expenses
 */
export function ModuleOverviewSection({ linkToPlatform = false, compact = false }: ModuleOverviewSectionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 hero-gradient relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          {/* Eyebrow Label */}
          <div className="text-sm uppercase tracking-wide text-orange-300 font-semibold mb-4">
            6 Powerful Modules, One Unified Platform
          </div>

          {/* Main Headline with Gradient Accent */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Everything You Need in{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              SAI Platform
            </span>
          </h2>

          {/* Supporting Copy */}
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            From lead capture to closing, SAI Platform handles every aspect of your real estate business
            with AI-powered automation, all in one place.
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

        {/* Enhanced Footer Note */}
        <div className="text-center mt-12 sm:mt-16 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-3">
              All 6 Modules Share One Database
            </h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Update a contact in <span className="font-semibold text-orange-300">CRM</span>, and it instantly
              updates in <span className="font-semibold text-orange-300">Content Studio</span> and{" "}
              <span className="font-semibold text-orange-300">The Office</span>.
              No exports, no duplicate data, no headaches.
            </p>
            {linkToPlatform && (
              <p className="text-sm sm:text-base text-white/80 mt-4 font-medium">
                Click any module to explore full details on our Platform page →
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
