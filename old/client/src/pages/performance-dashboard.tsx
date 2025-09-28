import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCurrentMetrics, getPerformanceScore, getPerformanceInsights } from '@/lib/web-vitals';
import { Activity, Zap, Eye, Clock, Gauge, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface MetricCardProps {
  name: string;
  value: number;
  rating: string;
  icon: React.ReactNode;
  unit: string;
  description: string;
}

function MetricCard({ name, value, rating, icon, unit, description }: MetricCardProps) {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'bg-green-100 text-green-800 border-green-200';
      case 'needs-improvement': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIcon = (rating: string) => {
    switch (rating) {
      case 'good': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'needs-improvement': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'poor': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon}
          {name}
        </CardTitle>
        {getIcon(rating)}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {Math.round(value * 100) / 100}{unit}
        </div>
        <Badge className={`mt-2 ${getRatingColor(rating)}`}>
          {rating.replace('-', ' ')}
        </Badge>
        <p className="text-xs text-muted-foreground mt-2">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<any>({});
  const [performanceScore, setPerformanceScore] = useState<any>({ overall: 0, scores: {}, ratings: {} });
  const [insights, setInsights] = useState<any>({ insights: [], recommendations: [] });

  useEffect(() => {
    const updateMetrics = () => {
      const currentMetrics = getCurrentMetrics();
      const score = getPerformanceScore();
      const performanceInsights = getPerformanceInsights();

      setMetrics(currentMetrics);
      setPerformanceScore(score);
      setInsights(performanceInsights);
    };

    // Update immediately
    updateMetrics();

    // Update every 5 seconds
    const interval = setInterval(updateMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Performance Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time Core Web Vitals monitoring and performance insights
          </p>
        </div>

        {/* Overall Performance Score */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="w-5 h-5" />
              Overall Performance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className={`text-4xl font-bold ${getScoreColor(performanceScore.overall)}`}>
                {performanceScore.overall}/100
              </div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      performanceScore.overall >= 90 ? 'bg-green-600' :
                      performanceScore.overall >= 75 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${performanceScore.overall}%` }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {performanceScore.overall >= 90 ? 'Excellent performance' :
                   performanceScore.overall >= 75 ? 'Good performance, room for improvement' :
                   'Poor performance, needs optimization'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="metrics" className="space-y-4">
          <TabsList>
            <TabsTrigger value="metrics">Core Metrics</TabsTrigger>
            <TabsTrigger value="insights">Insights & Recommendations</TabsTrigger>
            <TabsTrigger value="technical">Technical Details</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metrics.LCP && (
                <MetricCard
                  name="Largest Contentful Paint"
                  value={metrics.LCP.value}
                  rating={metrics.LCP.rating}
                  icon={<Eye className="w-4 h-4" />}
                  unit="ms"
                  description="Time until the largest content element is rendered"
                />
              )}

              {metrics.FID && (
                <MetricCard
                  name="First Input Delay"
                  value={metrics.FID.value}
                  rating={metrics.FID.rating}
                  icon={<Zap className="w-4 h-4" />}
                  unit="ms"
                  description="Time from first user interaction to browser response"
                />
              )}

              {metrics.CLS && (
                <MetricCard
                  name="Cumulative Layout Shift"
                  value={metrics.CLS.value}
                  rating={metrics.CLS.rating}
                  icon={<Activity className="w-4 h-4" />}
                  unit=""
                  description="Amount of unexpected layout shifts during page load"
                />
              )}

              {metrics.FCP && (
                <MetricCard
                  name="First Contentful Paint"
                  value={metrics.FCP.value}
                  rating={metrics.FCP.rating}
                  icon={<TrendingUp className="w-4 h-4" />}
                  unit="ms"
                  description="Time until the first content is painted"
                />
              )}

              {metrics.TTFB && (
                <MetricCard
                  name="Time to First Byte"
                  value={metrics.TTFB.value}
                  rating={metrics.TTFB.rating}
                  icon={<Clock className="w-4 h-4" />}
                  unit="ms"
                  description="Time from navigation start to receiving first byte"
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {insights.insights.length > 0 ? (
                    <ul className="space-y-2">
                      {insights.insights.map((insight: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No performance issues detected. Great job!
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {insights.recommendations.length > 0 ? (
                    <ul className="space-y-2">
                      {insights.recommendations.map((recommendation: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No specific recommendations at this time.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="technical">
            <Card>
              <CardHeader>
                <CardTitle>Technical Metrics Data</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                  {JSON.stringify(metrics, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}