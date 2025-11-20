import { Button } from "@/components/ui/button";
import { UserPlus, CalendarDays, Rocket } from "lucide-react";

/**
 * Final call-to-action section at the bottom of the homepage
 * Includes dual CTAs and 3-step onboarding process
 */
export function FinalCTASection() {
  const steps = [
    {
      icon: UserPlus,
      label: "Join Waitlist",
      description: "Request early access in under 60 seconds",
    },
    {
      icon: CalendarDays,
      label: "Schedule a Demo",
      description: "See SAI Platform in action with our team",
    },
    {
      icon: Rocket,
      label: "Get Started",
      description: "Launch your real estate business to the next level",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 hero-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Transform Your Real Estate Business?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10">
            Be among the first to experience the future of real estate CRM. Request early access today.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center mb-12 sm:mb-16">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[44px] px-8 py-6 text-lg font-semibold"
              onClick={() => window.location.href = "/waitlist"}
            >
              Join Waitlist
            </Button>
          </div>

          {/* 3-Step Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  {/* Step Number Badge */}
                  <div className="w-12 h-12 rounded-full bg-white/20 text-white font-bold text-xl flex items-center justify-center mb-4">
                    {index + 1}
                  </div>
                  {/* Icon */}
                  <Icon className="w-8 h-8 text-white mb-3" />
                  {/* Label */}
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    {step.label}
                  </h3>
                  {/* Description */}
                  <p className="text-sm sm:text-base text-white/80">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
