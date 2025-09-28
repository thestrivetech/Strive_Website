import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart3,
  Users,
  Eye,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  TrendingUp,
  Activity,
  Globe,
  Zap,
  RefreshCw,
  Download,
  Calendar,
  MousePointer,
  Target,
  ArrowUp,
  ArrowDown
} from "lucide-react";

interface AnalyticsData {
  summary: {
    totalPageViews: number;
    uniqueSessions: number;
    avgSessionDuration: number;
    bounceRate: number;
  };
  topPages: Array<{
    path: string;
    title: string;
    views: number;
  }>;
  trafficSources: Array<{
    source: string;
    visits: number;
  }>;
  deviceBreakdown: Array<{
    device: string;
    visits: number;
  }>;
  dailyPageViews: Array<{
    date: string;
    views: number;
  }>;
  timeframe: string;
}

interface RealtimeData {
  activeVisitors: number;
  currentTopPages: Array<{
    path: string;
    title: string;
    views: number;
  }>;
  recentEvents: Array<{
    eventType: string;
    eventName: string;
    path: string;
    timestamp: string;
  }>;
  lastUpdated: string;
}

interface PerformanceData {
  performanceMetrics: Array<{
    metricName: string;
    avgValue: number;
    goodCount: number;
    needsImprovementCount: number;
    poorCount: number;
    totalCount: number;
  }>;
  timeframe: string;
}

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [realtimeData, setRealtimeData] = useState<RealtimeData | null>(null);
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [timeframe, setTimeframe] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, realtimeRes, performanceRes] = await Promise.all([
        fetch(`/api/analytics/dashboard?timeframe=${timeframe}`),
        fetch('/api/analytics/realtime'),
        fetch(`/api/analytics/performance?timeframe=${timeframe}`)
      ]);

      if (analyticsRes.ok) {
        const analyticsResult = await analyticsRes.json();
        setAnalyticsData(analyticsResult.data);
      }

      if (realtimeRes.ok) {
        const realtimeResult = await realtimeRes.json();
        setRealtimeData(realtimeResult.data);
      }

      if (performanceRes.ok) {
        const performanceResult = await performanceRes.json();
        setPerformanceData(performanceResult.data);
      }

      setError(null);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
    // Refresh realtime data every 30 seconds
    const interval = setInterval(() => {
      fetch('/api/analytics/realtime')
        .then(res => res.json())
        .then(result => setRealtimeData(result.data))
        .catch(console.error);
    }, 30000);

    return () => clearInterval(interval);
  }, [timeframe]);

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getPerformanceRating = (metric: any) => {
    const total = metric.totalCount;
    if (total === 0) return { score: 0, rating: 'No data' };

    const goodPercent = (metric.goodCount / total) * 100;
    const needsImprovementPercent = (metric.needsImprovementCount / total) * 100;

    if (goodPercent >= 75) return { score: goodPercent, rating: 'Good' };
    if (goodPercent + needsImprovementPercent >= 50) return { score: goodPercent, rating: 'Needs Improvement' };
    return { score: goodPercent, rating: 'Poor' };
  };

  if (loading && !analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="pt-16">
          <section className="pt-20 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-32 bg-gray-300 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="pt-16">
          <section className="pt-20 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Analytics Unavailable</h1>
                <p className="text-muted-foreground mb-6">{error}</p>
                <Button onClick={fetchAnalyticsData}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="pt-16">
        <section className="pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent mb-6">
                  Analytics Dashboard
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Monitor your website's performance, user behavior, and key metrics in real-time
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <Select value={timeframe} onValueChange={handleTimeframeChange}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1d">Last 24 hours</SelectItem>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>

                  <Badge variant="outline" className="flex items-center">
                    <Activity className="h-3 w-3 mr-1 text-green-500" />
                    Live: {realtimeData?.activeVisitors || 0} active
                  </Badge>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" onClick={fetchAnalyticsData} disabled={loading}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Summary Cards */}
              {analyticsData && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card className="bg-white/80 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
                      <Eye className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-600">
                        {formatNumber(analyticsData.summary.totalPageViews)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        +12.5% from last period
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Unique Sessions</CardTitle>
                      <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">
                        {formatNumber(analyticsData.summary.uniqueSessions)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        +8.2% from last period
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-green-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg Session Duration</CardTitle>
                      <Clock className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        {formatDuration(analyticsData.summary.avgSessionDuration)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        +5.7% from last period
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">
                        {analyticsData.summary.bounceRate}%
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        -2.1% from last period
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Main Content Tabs */}
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="traffic">Traffic</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="realtime">Real-time</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Top Pages */}
                    {analyticsData && (
                      <Card className="bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <BarChart3 className="mr-2 h-5 w-5 text-orange-500" />
                            Top Pages
                          </CardTitle>
                          <CardDescription>Most visited pages in the selected timeframe</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {analyticsData.topPages.slice(0, 5).map((page, index) => (
                              <div key={page.path} className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{page.title || page.path}</p>
                                  <p className="text-xs text-muted-foreground truncate">{page.path}</p>
                                </div>
                                <Badge variant="secondary">{formatNumber(page.views)}</Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Traffic Sources */}
                    {analyticsData && (
                      <Card className="bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Globe className="mr-2 h-5 w-5 text-blue-500" />
                            Traffic Sources
                          </CardTitle>
                          <CardDescription>Where your visitors are coming from</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {analyticsData.trafficSources.slice(0, 5).map((source) => (
                              <div key={source.source} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                  <span className="text-sm font-medium">{source.source || 'Direct'}</span>
                                </div>
                                <Badge variant="outline">{formatNumber(source.visits)}</Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                  </div>
                </TabsContent>

                <TabsContent value="traffic" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Device Breakdown */}
                    {analyticsData && (
                      <Card className="bg-white/80 backdrop-blur-sm lg:col-span-1">
                        <CardHeader>
                          <CardTitle>Device Breakdown</CardTitle>
                          <CardDescription>Visitor device types</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {analyticsData.deviceBreakdown.map((device) => (
                              <div key={device.device} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  {getDeviceIcon(device.device)}
                                  <span className="ml-2 text-sm font-medium capitalize">{device.device}</span>
                                </div>
                                <Badge variant="outline">{formatNumber(device.visits)}</Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Daily Page Views Chart Placeholder */}
                    <Card className="bg-white/80 backdrop-blur-sm lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Traffic Trends</CardTitle>
                        <CardDescription>Page views over time</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 flex items-center justify-center text-muted-foreground">
                          <div className="text-center">
                            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Chart visualization would appear here</p>
                            <p className="text-sm">Integration with charting library needed</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                  </div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-6">
                  {performanceData && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {performanceData.performanceMetrics.map((metric) => {
                        const rating = getPerformanceRating(metric);
                        return (
                          <Card key={metric.metricName} className="bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                              <CardTitle className="flex items-center justify-between">
                                <span>{metric.metricName}</span>
                                <Badge
                                  variant={rating.rating === 'Good' ? 'default' : rating.rating === 'Needs Improvement' ? 'secondary' : 'destructive'}
                                >
                                  {rating.rating}
                                </Badge>
                              </CardTitle>
                              <CardDescription>
                                Avg: {Math.round(metric.avgValue)}ms
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-green-600">Good: {metric.goodCount}</span>
                                  <span className="text-yellow-600">Needs Improvement: {metric.needsImprovementCount}</span>
                                  <span className="text-red-600">Poor: {metric.poorCount}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-green-500 h-2 rounded-l-full"
                                    style={{ width: `${(metric.goodCount / metric.totalCount) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="realtime" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Current Top Pages */}
                    {realtimeData && (
                      <Card className="bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Activity className="mr-2 h-5 w-5 text-green-500" />
                            Active Pages (Last 30 min)
                          </CardTitle>
                          <CardDescription>
                            Last updated: {new Date(realtimeData.lastUpdated).toLocaleTimeString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {realtimeData.currentTopPages.map((page) => (
                              <div key={page.path} className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{page.title || page.path}</p>
                                  <p className="text-xs text-muted-foreground truncate">{page.path}</p>
                                </div>
                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                  {page.views}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Recent Events */}
                    {realtimeData && (
                      <Card className="bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                            Recent Events
                          </CardTitle>
                          <CardDescription>Latest user interactions</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {realtimeData.recentEvents.slice(0, 8).map((event, index) => (
                              <div key={index} className="flex items-center text-sm">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                                <div className="flex-1">
                                  <span className="font-medium">{event.eventName}</span>
                                  <span className="text-muted-foreground ml-2">on {event.path}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(event.timestamp).toLocaleTimeString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                  </div>
                </TabsContent>

              </Tabs>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}