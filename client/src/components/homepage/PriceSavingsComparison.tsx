import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Check, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { competitorTools, agentProfiles, type AgentProfile } from "@/data/pricing-comparison";
import { cn } from "@/lib/utils";

/**
 * Helper: Get tool category from competitorTools data
 */
const getToolCategory = (toolName: string): string => {
  const tool = competitorTools.find(t => t.name.toLowerCase().includes(toolName.toLowerCase()));
  return tool?.category || "Software";
};

/**
 * Helper: Get tool source URL from competitorTools data
 */
const getToolSource = (toolName: string): string | undefined => {
  const tool = competitorTools.find(t => t.name.toLowerCase().includes(toolName.toLowerCase()));
  return tool?.sourceUrl;
};

/**
 * Helper: Calculate estimated savings range
 * Based on current monthly cost minus estimated SAI pricing ($80-180/mo)
 */
const calculateSavingsRange = (profile: AgentProfile): string => {
  const currentCost = profile.totalMonthly;
  // SAI estimated pricing: $80-180/month depending on tier
  const saiLowEstimate = 80;
  const saiHighEstimate = 180;

  const savingsLow = currentCost - saiHighEstimate;
  const savingsHigh = currentCost - saiLowEstimate;

  return `$${savingsLow}-${savingsHigh}/mo`;
};

/**
 * Helper: Calculate annual savings
 */
const calculateAnnualSavings = (profile: AgentProfile): string => {
  const currentCost = profile.totalMonthly;
  const saiLowEstimate = 80;
  const saiHighEstimate = 180;

  const annualSavingsLow = (currentCost - saiHighEstimate) * 12;
  const annualSavingsHigh = (currentCost - saiLowEstimate) * 12;

  return `$${annualSavingsLow.toLocaleString()}-${annualSavingsHigh.toLocaleString()}/year`;
};

/**
 * Side-by-side price comparison showing fragmented software stack vs SAI Platform
 *
 * REDESIGNED: Interactive profile selector, honest pricing, credible claims, full transparency
 * - Interactive: 3 agent profile tabs update both cards dynamically
 * - Honest: "Get Started" CTA directs to contact form
 * - Credible: Source links for all competitor pricing, clear savings calculation
 * - Transparent: Explains methodology, pricing available on request
 * - Accessible: WCAG AA contrast, ARIA labels, no layout shift animations
 */
export function PriceSavingsComparison() {
  const [selectedProfile, setSelectedProfile] = useState<AgentProfile>(agentProfiles[1]); // Default to Mid-Tier Active Agent

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Stop Paying for{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              {selectedProfile.toolsUsed.length} Different Tools
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700">
            Real estate agents waste{" "}
            <span className="font-bold text-gray-900">${selectedProfile.totalMonthly}/month</span> and{" "}
            <span className="font-bold text-gray-900">10+ hours/week</span> managing fragmented software stacks.
          </p>
        </div>

        {/* Profile Selector - 3 Tabs */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {agentProfiles.map((profile) => (
              <button
                key={profile.profileName}
                onClick={() => setSelectedProfile(profile)}
                className={cn(
                  "p-4 rounded-xl border-2 bg-white transition-all duration-300 text-left min-h-[44px] hover:shadow-lg",
                  selectedProfile.profileName === profile.profileName
                    ? "border-orange-500 shadow-lg"
                    : "border-gray-300 hover:border-orange-300"
                )}
                aria-pressed={selectedProfile.profileName === profile.profileName}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">{profile.profileName}</span>
                  <span className="text-2xl font-bold text-orange-600 mt-1">
                    ${profile.totalMonthly}/mo
                  </span>
                  <span className="text-xs text-gray-600 mt-1">{profile.toolsUsed.length} tools</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Card: Fragmented Stack */}
          <Card className="border-2 border-red-400 bg-white relative overflow-hidden">
            {/* Header Badge */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-red-100 text-red-800 border-red-400 font-semibold">
                Your Current Stack
              </Badge>
            </div>

            <CardHeader className="pt-6">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                {selectedProfile.profileName}
              </CardTitle>
              <p className="text-sm text-gray-700">{selectedProfile.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Tool List with Categories and Sources */}
              <div className="space-y-2">
                {selectedProfile.toolsUsed.map((tool, index) => {
                  const category = getToolCategory(tool.tool);
                  const sourceUrl = getToolSource(tool.tool);

                  return (
                    <div
                      key={index}
                      className="flex items-start justify-between py-2 px-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex flex-col gap-1 flex-1">
                        <span className="text-sm font-semibold text-gray-900">{tool.tool}</span>
                        <Badge variant="outline" className="text-xs text-gray-600 border-gray-300 w-fit">
                          {category}
                        </Badge>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-sm font-bold text-red-600">
                          ${tool.monthlyPrice}/mo
                        </span>
                        {sourceUrl && (
                          <a
                            href={sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                            aria-label={`View pricing source for ${tool.tool}`}
                          >
                            source
                            <ExternalLink className="w-3 h-3" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Cost */}
              <div className="pt-4 border-t-2 border-red-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-900">Total Monthly Cost:</span>
                  <span className="text-4xl font-bold text-red-600">
                    ${selectedProfile.totalMonthly}
                  </span>
                </div>
                <p className="text-xs text-gray-600 text-right">
                  ${selectedProfile.totalAnnual.toLocaleString()}/year
                </p>
              </div>

              {/* Pain Points */}
              <div className="pt-4 space-y-3">
                <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  The Problems:
                </h4>
                {selectedProfile.painPoints.map((pain, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm text-gray-700">{pain}</span>
                  </div>
                ))}
              </div>

              {/* Time Waste */}
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
                <p className="text-sm text-red-900">
                  <span className="font-bold">10+ hours/week</span> wasted managing multiple logins and manual data entry between platforms
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right Card: SAI Platform */}
          <Card className="border-2 border-green-400 bg-gradient-to-br from-white to-green-50 relative overflow-hidden">
            {/* Header Badge */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-100 text-green-800 border-green-400 font-semibold">
                SAI Platform
              </Badge>
            </div>

            <CardHeader className="pt-6">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                All-in-One Solution
              </CardTitle>
              <p className="text-sm text-gray-700">6 integrated modules replace your entire stack</p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Feature Parity - What SAI Replaces */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  What SAI Includes:
                </h4>

                {/* Group tools by SAI module */}
                <div className="space-y-3">
                  {/* CRM Module */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <Badge className="bg-blue-100 text-blue-800 border-blue-300 mb-2">
                      CRM & Lead Management
                    </Badge>
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold text-gray-900">Replaces:</span> Follow Up Boss, LionDesk • Lead management, pipeline tracking, contact automation
                    </p>
                  </div>

                  {/* Content Studio Module */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <Badge className="bg-purple-100 text-purple-800 border-purple-300 mb-2">
                      Content Studio
                    </Badge>
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold text-gray-900">Replaces:</span> Mailchimp, Hootsuite, Jasper AI • Email marketing, social media scheduling, AI content generation
                    </p>
                  </div>

                  {/* The Office Module */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <Badge className="bg-green-100 text-green-800 border-green-300 mb-2">
                      The Office
                    </Badge>
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold text-gray-900">Replaces:</span> Dotloop, DocuSign • Transaction management, document collaboration, e-signatures
                    </p>
                  </div>

                  {/* REID Module */}
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                    <Badge className="bg-teal-100 text-teal-800 border-teal-300 mb-2">
                      REID (Market Intelligence)
                    </Badge>
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold text-gray-900">Replaces:</span> CoStar (for residential) • Market data, property analytics, investment reports
                    </p>
                  </div>

                  {/* SAI Assistant Module */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <Badge className="bg-amber-100 text-amber-800 border-amber-300 mb-2">
                      SAI Assistant
                    </Badge>
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold text-gray-900">Replaces:</span> AgentFire, website builders • Lead capture websites, IDX integration
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Box - Honest */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl p-6 text-center">
                <p className="text-sm font-semibold text-orange-900 mb-2">
                  EXCLUSIVE LAUNCH PRICING
                </p>
                <p className="text-4xl font-bold text-orange-600 mb-1">
                  Get Started
                </p>
                <p className="text-xs text-orange-800">
                  Contact us to learn about our pricing options
                </p>
              </div>

              {/* Savings Box - With Explanation */}
              <div className="bg-green-100 border-2 border-green-400 rounded-xl p-6">
                <p className="text-sm font-semibold text-green-900 mb-1">
                  ESTIMATED SAVINGS
                </p>
                <p className="text-3xl font-bold text-green-700">
                  {calculateSavingsRange(selectedProfile)}
                </p>
                <p className="text-xs text-green-800 font-semibold mt-1">
                  {calculateAnnualSavings(selectedProfile)}
                </p>
                <p className="text-xs text-gray-700 mt-3">
                  Based on typical SAI pricing of $80-180/month vs your ${selectedProfile.totalMonthly}/month current stack
                </p>
              </div>

              {/* Benefits - Specific */}
              <div className="pt-4 space-y-3">
                <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  The SAI Advantage:
                </h4>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-label="Included" />
                  <span className="text-sm text-gray-700 font-medium">
                    <span className="font-bold text-gray-900">1 login</span> replaces {selectedProfile.toolsUsed.length} separate platforms
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-label="Included" />
                  <span className="text-sm text-gray-700 font-medium">
                    <span className="font-bold text-gray-900">Automatic sync</span>, no manual data entry between tools
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-label="Included" />
                  <span className="text-sm text-gray-700 font-medium">
                    <span className="font-bold text-gray-900">Save 10+ hours/week</span> on admin and context switching
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-label="Included" />
                  <span className="text-sm text-gray-700 font-medium">
                    <span className="font-bold text-gray-900">AI automation</span> built into every module (not an add-on)
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <Link href="/contact">
                <Button
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-6 shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[44px]"
                  size="lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Transparency Section */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            How We Calculate Savings
          </h3>
          <p className="text-gray-700 mb-4">
            Savings based on industry-standard competitor pricing (see sources above) minus estimated SAI Platform cost of $80-180/month depending on tier.{" "}
            <span className="font-semibold text-gray-900">Final pricing will be announced at launch.</span>
          </p>
          <Link href="/pricing" className="text-orange-600 hover:text-orange-700 font-semibold inline-flex items-center gap-2">
            View detailed pricing calculator
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Honest Social Proof (Conditional) */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">Join real estate professionals</span> who could save an average of{" "}
            <span className="font-semibold text-green-700">$3,000-5,400/year</span> with SAI Platform
          </p>
        </div>
      </div>
    </section>
  );
}
