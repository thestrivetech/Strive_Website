import { BarChart, TrendingUp, PieChart, Activity, Database, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const DataAnalytics = () => {
  const solutions = [
    {
      icon: <Activity className="text-primary text-xl" />,
      title: "Real-time Dashboards",
      description: "Interactive dashboards that provide live insights into your business performance with customizable visualizations.",
      features: ["Live Data Streaming", "Custom Visualizations", "KPI Monitoring", "Alert Systems"]
    },
    {
      icon: <TrendingUp className="text-primary text-xl" />,
      title: "Business Intelligence Platform",
      description: "Comprehensive BI solution that transforms raw data into actionable business insights and strategic recommendations.",
      features: ["Data Warehousing", "ETL Processes", "Report Automation", "Performance Analytics"]
    },
    {
      icon: <PieChart className="text-primary text-xl" />,
      title: "Advanced Data Visualization",
      description: "Create compelling visual stories from your data with interactive charts, maps, and custom reporting tools.",
      features: ["Interactive Charts", "Geographic Mapping", "Custom Reports", "Export Capabilities"]
    },
    {
      icon: <Database className="text-primary text-xl" />,
      title: "Data Integration & Processing",
      description: "Seamlessly connect and process data from multiple sources to create a unified view of your business.",
      features: ["Multi-source Integration", "Data Cleansing", "Real-time Processing", "API Connectivity"]
    }
  ];

  return (
    <div className="pt-16">
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <BarChart className="text-primary mr-4 h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-data-analytics-title">
                Data & Analytics Solutions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-data-analytics-subtitle">
              Transform raw data into actionable insights with advanced analytics platforms and real-time reporting capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <Card 
                key={index}
                className="p-8 group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:border-primary/50 hover:-translate-y-1"
                data-testid={`card-data-analytics-${solution.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center mr-4 transition-all duration-300">
                      {solution.icon}
                    </div>
                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                      {solution.title}
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {solution.description}
                  </p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Eye className="text-primary mr-2 h-4 w-4" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/request">
              <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-get-started-data-analytics">
                Get Started with Data & Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataAnalytics;