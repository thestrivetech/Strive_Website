import { saiModules } from "@/data/sai";
import { ModuleCard } from "./ModuleCard";

/**
 * Displays all 5 SAI Platform modules in a responsive grid
 * Shows CRM, The Office, Content Studio, REID, and Global SAI
 */
export function ModuleOverviewSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Everything You Need in One Platform
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            SAI Platform combines 5 powerful modules to handle every aspect of your real estate business—from
            first contact to commission check.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {saiModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>

        {/* Optional: Add a footer note */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-sm sm:text-base text-muted-foreground">
            All modules work seamlessly together. Data flows automatically—no manual imports or exports needed.
          </p>
        </div>
      </div>
    </section>
  );
}
