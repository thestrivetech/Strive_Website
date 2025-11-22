import { useState } from "react";
import { saiModules } from "@/data/sai";
import { ModuleSelector } from "./ModuleSelector";
import { ModuleFeaturesGrid } from "./ModuleFeaturesGrid";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

/**
 * SAI Platform Modules - Pain Points & Solutions Section
 * Matches the "AI SOLUTIONS TAILORED TO YOUR INDUSTRY'S BIGGEST CHALLENGES" design from main branch
 * Shows researched pain points with source citations and how SAI Platform solves them
 */
export function ModulePainPointsSection() {
  const [selectedModuleId, setSelectedModuleId] = useState(saiModules[0].id);

  const selectedModule = saiModules.find(m => m.id === selectedModuleId);

  if (!selectedModule) return null;

  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 hero-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          {/* Eyebrow Label */}
          <div className="text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-wide text-primary font-semibold mb-3 sm:mb-4">
            SAI PLATFORM — SOLVING YOUR BIGGEST CHALLENGES
          </div>

          {/* Main Headline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white px-4">
            Built for Real Estate Agents, By Real Estate Professionals
          </h2>

          {/* Subheadline */}
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Select a module below to see how SAI Platform solves the pain points costing you time and money.
          </p>
        </div>

        {/* Module Selector */}
        <ModuleSelector
          selectedModuleId={selectedModuleId}
          onSelectModule={setSelectedModuleId}
        />

        {/* Features Grid */}
        <ModuleFeaturesGrid module={selectedModule} />

        {/* CTA Footer */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">
              Ready to Save 28-41 Hours Per Week?
            </h3>

            <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">
              Join 500+ real estate agents who've eliminated the chaos of juggling 12 different tools.
            </p>

            <Link href="/waitlist">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-3.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500 font-bold text-sm sm:text-base min-h-[44px]"
                size="lg"
              >
                Join Waitlist — Get Early Access
              </Button>
            </Link>

            <p className="text-xs text-white/60 mt-4">
              <span className="text-green-400">✓</span> All 5 modules included •{" "}
              <span className="text-green-400">✓</span> Unlimited contacts •{" "}
              <span className="text-green-400">✓</span> No per-contact fees
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
