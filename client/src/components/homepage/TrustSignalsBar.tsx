import { Users, CheckCircle, DollarSign, Shield } from "lucide-react";

/**
 * Displays trust signals showing SAI Platform's reach and reliability
 */
export function TrustSignalsBar() {
  const trustMetrics = [
    {
      icon: Users,
      value: "500+",
      label: "Early Adopters",
    },
    {
      icon: CheckCircle,
      value: "5",
      label: "Integrated Modules",
    },
    {
      icon: DollarSign,
      value: "10+",
      label: "Tools Replaced",
    },
    {
      icon: Shield,
      value: "24/7",
      label: "AI Assistant",
    },
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {trustMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <Icon className="w-8 h-8 text-primary mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {metric.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600 mt-1">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
