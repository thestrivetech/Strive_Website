import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles, TrendingUp, Brain, FileText, Mic,
  X, Check, ArrowRight, Clock
} from "lucide-react";
import { Link } from "wouter";
import { aiInsightScenarios, calculateTimeSavings, type AIInsightScenario } from "@/data/ai-insights-comparison";
import { cn } from "@/lib/utils";

/**
 * Combined SAI Advantage Section
 * Merges the redesigned "Why SAI" content with the Agent AI Insights Comparison
 * into one comprehensive section right under the hero.
 */
export function SAIAdvantageSection() {
  // State for AI comparison scenario selector
  const [selectedScenario, setSelectedScenario] = useState<AIInsightScenario>(aiInsightScenarios[0]);
  const timeSavings = calculateTimeSavings(selectedScenario);

  // Hero stats for the stats row
  const heroStats = [
    { value: "More", label: "Deals Closed", description: "with AI lead scoring" },
    { value: "10+", label: "Hours Saved Weekly", description: "on repetitive tasks" },
    { value: "$300+", label: "Monthly Savings", description: "vs. fragmented tools" },
  ];

  // Four AI features for the primary AI card
  const aiFeatures = [
    {
      icon: TrendingUp,
      title: "Market Velocity Intelligence",
      description: "Predict when properties will sell (~10 day accuracy)",
    },
    {
      icon: Brain,
      title: "Price Valuation Intelligence",
      description: "Institutional-grade property analysis (within 7% of market value)",
    },
    {
      icon: FileText,
      title: "AI Content Engine",
      description: "Listings, posts, emails in 30 seconds",
    },
    {
      icon: Mic,
      title: "SaiBot Assistant",
      description: "CRM updates, research, hands-free assistance",
    },
  ];


  return (
    <section id="benefits" className="scroll-mt-20">
      {/* Part 1: Why SAI - Value Propositions */}
      <div className="py-16 sm:py-20 lg:py-24 bg-[#ffffffeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Outcome Focused */}
          <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Close More Deals. Save 10+ Hours Weekly.{" "}
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                Cut Software Costs.
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700">
              The all-in-one platform that replaces 10+ tools with unified workflows and AI that actually works.
            </p>
          </div>

          {/* Hero Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12 sm:mb-16">
            {heroStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-300 rounded-2xl p-6 text-center hover:shadow-lg hover:border-primary transition-all duration-300"
              >
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>

          {/* Primary AI Card - Full Width */}
          <div className="max-w-6xl mx-auto mb-10 sm:mb-14">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 sm:p-10 border border-gray-700 shadow-2xl">
              {/* AI Card Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-primary uppercase tracking-wide">
                    AI-Native Architecture
                  </div>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                AI Built In, Not Bolted On
              </h3>
              <p className="text-white/80 text-lg sm:text-xl mb-8 max-w-3xl">
                While competitors retrofit AI onto 10-year-old platforms, SAI was engineered AI-first from the ground up. Four proprietary AI systems working together to give you an unfair advantage.
              </p>

              {/* AI Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {aiFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 hover:bg-white/15 transition-all duration-200"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/30 to-orange-500/30 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                    <p className="text-white/70 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* AI Benefit Callout */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-white/90 text-lg font-medium">
                  Save 10+ hours/week on repetitive tasks. Close 20% more deals with AI insights.
                </p>
                <span className="bg-primary/20 border border-primary/30 text-primary font-semibold px-4 py-2 rounded-full text-sm whitespace-nowrap">
                  1-2 Year Tech Advantage
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Part 2: Agent AI Insights Comparison */}
      <div className="py-16 sm:py-20 lg:py-24 bg-[#ffffffeb]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                See the AI Difference
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              How SAI's AI Insights{" "}
              <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                Transform Your Workflow
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700">
              Compare the old way vs. the SAI way for common agent tasks.
            </p>
          </div>

          {/* Scenario Selector - 3 Tabs */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {aiInsightScenarios.map((scenario) => {
                const savings = calculateTimeSavings(scenario);
                return (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario)}
                    className={cn(
                      "p-4 rounded-xl border-2 bg-white transition-all duration-300 text-left min-h-[44px] hover:shadow-lg",
                      selectedScenario.id === scenario.id
                        ? "border-primary shadow-lg"
                        : "border-gray-300 hover:border-primary/50"
                    )}
                    aria-pressed={selectedScenario.id === scenario.id}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900">{scenario.scenarioName}</span>
                      <span className="text-2xl font-bold text-primary mt-1">
                        {savings.percentageSaved}% faster
                      </span>
                      <span className="text-xs text-gray-600 mt-1">{scenario.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Card: Without SAI AI */}
            <Card className="border-2 border-red-400 bg-white relative overflow-hidden">
              {/* Header Badge */}
              <div className="absolute top-4 right-4">
                <Badge className="bg-red-100 text-red-800 border-red-400 font-semibold">
                  Without SAI AI
                </Badge>
              </div>

              <CardContent className="p-6 pt-12 sm:pt-14 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedScenario.withoutSAI.title}
                </h3>
                <p className="text-sm text-gray-700">Manual process for {selectedScenario.scenarioName.toLowerCase()}</p>

                {/* Workflow Steps */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                    The Process:
                  </h4>
                  {selectedScenario.withoutSAI.steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between py-2 px-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-start gap-2 flex-1">
                        <span className="text-xs font-bold text-gray-400 mt-0.5">{index + 1}.</span>
                        <span className="text-sm text-gray-900">{step.step}</span>
                      </div>
                      <div className="flex items-center gap-1 text-red-600">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-semibold">{step.timeMinutes} min</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Time */}
                <div className="pt-4 border-t-2 border-red-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-gray-900">Total Time:</span>
                    <span className="text-3xl font-bold text-red-600">
                      {selectedScenario.withoutSAI.totalTimeDisplay}
                    </span>
                  </div>
                </div>

                {/* Pain Points */}
                <div className="pt-4 space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                    The Problems:
                  </h4>
                  {selectedScenario.withoutSAI.painPoints.map((pain, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-gray-700">{pain}</span>
                    </div>
                  ))}
                </div>

                {/* Outcome */}
                <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
                  <p className="text-sm text-red-900 font-medium">
                    <span className="font-bold">Result:</span> {selectedScenario.withoutSAI.outcome}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Right Card: With SAI AI */}
            <Card className="border-2 border-green-400 bg-gradient-to-br from-white to-green-50 relative overflow-hidden">
              {/* Header Badge */}
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-100 text-green-800 border-green-400 font-semibold">
                  With SAI AI
                </Badge>
              </div>

              <CardContent className="p-6 pt-12 sm:pt-14 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedScenario.withSAI.title}
                </h3>
                <p className="text-sm text-gray-700">AI-assisted {selectedScenario.scenarioName.toLowerCase()}</p>

                {/* Workflow Steps */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                    The AI-Powered Process:
                  </h4>
                  {selectedScenario.withSAI.steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between py-2 px-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div className="flex items-start gap-2 flex-1">
                        <span className="text-xs font-bold text-green-600 mt-0.5">{index + 1}.</span>
                        <span className="text-sm text-gray-900">{step.step}</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-semibold">{step.timeMinutes} min</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Time + Improvement */}
                <div className="pt-4 border-t-2 border-green-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-gray-900">Total Time:</span>
                    <span className="text-3xl font-bold text-green-600">
                      {selectedScenario.withSAI.totalTimeDisplay}
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <Badge className="bg-green-100 text-green-800 border-green-400 font-bold">
                      {timeSavings.percentageSaved}% faster
                    </Badge>
                  </div>
                </div>

                {/* Benefits */}
                <div className="pt-4 space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                    The SAI Advantage:
                  </h4>
                  {selectedScenario.withSAI.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Outcome */}
                <div className="bg-green-100 border-2 border-green-400 rounded-xl p-4">
                  <p className="text-sm text-green-900 font-medium">
                    <span className="font-bold">Result:</span> {selectedScenario.withSAI.outcome}
                  </p>
                  <p className="text-lg font-bold text-green-700 mt-2">
                    {selectedScenario.withSAI.improvement}
                  </p>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Summary Stats */}
          <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-3xl font-bold text-primary mb-1">10+ hrs</p>
              <p className="text-sm text-gray-600">Saved weekly with SAI AI</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-3xl font-bold text-primary mb-1">Higher</p>
              <p className="text-sm text-gray-600">Conversion rates</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-3xl font-bold text-primary mb-1">80%</p>
              <p className="text-sm text-gray-600">Faster content creation</p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Join real estate professionals</span> already using AI to work smarter, not harder.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
