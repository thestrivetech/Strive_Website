import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Eye, 
  MousePointer, 
  ScrollText, 
  Thermometer,
  Play,
  Pause,
  RotateCcw,
  Settings
} from "lucide-react";

interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
  type: 'click' | 'hover' | 'scroll';
  timestamp: number;
}

interface HeatmapProps {
  isRecording?: boolean;
  showControls?: boolean;
  className?: string;
}

export function Heatmap({ isRecording = false, showControls = true, className = "" }: HeatmapProps) {
  const [heatmapData, setHeatmapData] = useState<HeatmapPoint[]>([]);
  const [isActive, setIsActive] = useState(isRecording);
  const [activeTab, setActiveTab] = useState<'click' | 'hover' | 'scroll'>('click');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate CSS gradient for heatmap visualization
  const generateHeatmapGradient = (points: HeatmapPoint[], type: string): string => {
    if (points.length === 0) return '';

    const filteredPoints = points.filter(p => p.type === type);
    if (filteredPoints.length === 0) return '';

    const gradientStops = filteredPoints.map(point => {
      const intensity = Math.min(point.intensity / 10, 1); // Normalize intensity
      const alpha = intensity * 0.7; // Max opacity of 70%
      const color = getHeatmapColor(intensity);
      
      return `radial-gradient(circle at ${point.x}px ${point.y}px, ${color}${alpha.toFixed(2)}) 0% 0%, transparent 40px)`;
    });

    return gradientStops.join(', ');
  };

  // Get heatmap color based on intensity
  const getHeatmapColor = (intensity: number): string => {
    if (intensity < 0.3) return 'rgba(0, 255, 0, '; // Green for low intensity
    if (intensity < 0.6) return 'rgba(255, 255, 0, '; // Yellow for medium
    if (intensity < 0.8) return 'rgba(255, 165, 0, '; // Orange for high
    return 'rgba(255, 0, 0, '; // Red for very high intensity
  };

  // Create CSS-based heatmap overlay
  const createHeatmapOverlay = (type: 'click' | 'hover' | 'scroll') => {
    const filteredPoints = heatmapData.filter(p => p.type === type);
    
    return filteredPoints.map((point, index) => {
      const intensity = Math.min(point.intensity / 10, 1);
      const size = 20 + (intensity * 30); // Size based on intensity
      const alpha = intensity * 0.6;
      
      let color = '';
      switch (type) {
        case 'click':
          color = `rgba(255, 0, 0, ${alpha})`;
          break;
        case 'hover':
          color = `rgba(0, 0, 255, ${alpha})`;
          break;
        case 'scroll':
          color = `rgba(0, 255, 0, ${alpha})`;
          break;
      }

      return (
        <div
          key={`${type}-${index}`}
          className="absolute rounded-full pointer-events-none transition-all duration-300"
          style={{
            left: point.x - size / 2,
            top: point.y - size / 2,
            width: size,
            height: size,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            transform: `scale(${0.5 + intensity * 0.5})`,
            zIndex: 1000 - index, // Layer by order
          }}
        />
      );
    });
  };

  // Track mouse events for heatmap data
  useEffect(() => {
    if (!isActive) return;

    let hoverTimeout: NodeJS.Timeout;
    let scrollTimeout: NodeJS.Timeout;

    const handleClick = (event: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      const point: HeatmapPoint = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top + window.scrollY,
        intensity: 1,
        type: 'click',
        timestamp: Date.now(),
      };

      setHeatmapData(prev => {
        // Merge nearby clicks to increase intensity
        const nearby = prev.find(p => 
          p.type === 'click' && 
          Math.abs(p.x - point.x) < 20 && 
          Math.abs(p.y - point.y) < 20
        );

        if (nearby) {
          return prev.map(p => 
            p === nearby 
              ? { ...p, intensity: Math.min(p.intensity + 1, 10) }
              : p
          );
        }

        return [...prev, point];
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        const rect = document.body.getBoundingClientRect();
        const point: HeatmapPoint = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top + window.scrollY,
          intensity: 0.5,
          type: 'hover',
          timestamp: Date.now(),
        };

        setHeatmapData(prev => {
          // Merge nearby hovers
          const nearby = prev.find(p => 
            p.type === 'hover' && 
            Math.abs(p.x - point.x) < 30 && 
            Math.abs(p.y - point.y) < 30
          );

          if (nearby) {
            return prev.map(p => 
              p === nearby 
                ? { ...p, intensity: Math.min(p.intensity + 0.3, 8) }
                : p
            );
          }

          return [...prev, point];
        });
      }, 200);
    };

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const point: HeatmapPoint = {
          x: window.innerWidth / 2,
          y: window.scrollY + window.innerHeight * scrollPercent,
          intensity: scrollPercent * 5,
          type: 'scroll',
          timestamp: Date.now(),
        };

        setHeatmapData(prev => [...prev, point]);
      }, 100);
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
      clearTimeout(hoverTimeout);
      clearTimeout(scrollTimeout);
    };
  }, [isActive]);

  const toggleRecording = () => {
    setIsActive(!isActive);
  };

  const clearHeatmap = () => {
    setHeatmapData([]);
  };

  const exportHeatmapData = () => {
    const data = {
      points: heatmapData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `heatmap-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStats = (type: 'click' | 'hover' | 'scroll') => {
    const points = heatmapData.filter(p => p.type === type);
    const totalIntensity = points.reduce((sum, p) => sum + p.intensity, 0);
    return {
      count: points.length,
      totalIntensity: Math.round(totalIntensity * 10) / 10,
      avgIntensity: points.length > 0 ? Math.round((totalIntensity / points.length) * 10) / 10 : 0,
    };
  };

  return (
    <div className={`relative ${className}`}>
      {/* Heatmap Overlay */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          mixBlendMode: 'multiply',
        }}
      >
        {createHeatmapOverlay(activeTab)}
      </div>

      {/* Controls Panel */}
      {showControls && (
        <Card className="fixed bottom-4 right-4 z-50 w-80">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-sm">
                <Thermometer className="h-4 w-4" />
                <span>Heatmap Tracker</span>
              </CardTitle>
              <Badge variant={isActive ? "default" : "secondary"}>
                {isActive ? "Recording" : "Paused"}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Tab Selection */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="click" className="text-xs">
                  <MousePointer className="h-3 w-3 mr-1" />
                  Clicks
                </TabsTrigger>
                <TabsTrigger value="hover" className="text-xs">
                  <Eye className="h-3 w-3 mr-1" />
                  Hovers
                </TabsTrigger>
                <TabsTrigger value="scroll" className="text-xs">
                  <ScrollText className="h-3 w-3 mr-1" />
                  Scroll
                </TabsTrigger>
              </TabsList>

              <TabsContent value="click" className="mt-3">
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Total Clicks:</span>
                    <span className="font-mono">{getStats('click').count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Intensity:</span>
                    <span className="font-mono">{getStats('click').avgIntensity}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="hover" className="mt-3">
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Hover Points:</span>
                    <span className="font-mono">{getStats('hover').count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Activity:</span>
                    <span className="font-mono">{getStats('hover').totalIntensity}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="scroll" className="mt-3">
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Scroll Events:</span>
                    <span className="font-mono">{getStats('scroll').count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Depth:</span>
                    <span className="font-mono">
                      {Math.round(Math.max(...heatmapData.filter(p => p.type === 'scroll').map(p => p.intensity), 0) * 20)}%
                    </span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant={isActive ? "destructive" : "default"}
                onClick={toggleRecording}
                className="text-xs"
              >
                {isActive ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
                {isActive ? "Pause" : "Start"}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={clearHeatmap}
                className="text-xs"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Clear
              </Button>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={exportHeatmapData}
              className="w-full text-xs"
              disabled={heatmapData.length === 0}
            >
              Export Data ({heatmapData.length} points)
            </Button>

            {/* Legend */}
            <div className="border-t pt-3">
              <div className="text-xs font-medium mb-2">Intensity Legend:</div>
              <div className="grid grid-cols-4 gap-1 text-xs">
                <div className="text-center">
                  <div className="w-4 h-4 mx-auto mb-1 rounded-full bg-gradient-to-r from-green-400 to-green-500"></div>
                  <span>Low</span>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 mx-auto mb-1 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
                  <span>Med</span>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 mx-auto mb-1 rounded-full bg-gradient-to-r from-orange-400 to-orange-500"></div>
                  <span>High</span>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 mx-auto mb-1 rounded-full bg-gradient-to-r from-red-400 to-red-500"></div>
                  <span>Max</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Standalone heatmap visualization component for analytics dashboard
export function HeatmapVisualization({ data }: { data: HeatmapPoint[] }) {
  const [activeType, setActiveType] = useState<'click' | 'hover' | 'scroll'>('click');

  const filteredData = data.filter(point => point.type === activeType);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Thermometer className="h-5 w-5" />
          <span>User Interaction Heatmap</span>
        </CardTitle>
        <CardDescription>Visual representation of user behavior</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeType} onValueChange={(value) => setActiveType(value as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="click">
              <MousePointer className="h-4 w-4 mr-2" />
              Clicks
            </TabsTrigger>
            <TabsTrigger value="hover">
              <Eye className="h-4 w-4 mr-2" />
              Hovers
            </TabsTrigger>
            <TabsTrigger value="scroll">
              <ScrollText className="h-4 w-4 mr-2" />
              Scroll
            </TabsTrigger>
          </TabsList>

          <div className="relative bg-gray-100 rounded-lg min-h-64 overflow-hidden">
            {/* Heatmap Points */}
            {filteredData.map((point, index) => {
              const intensity = Math.min(point.intensity / 10, 1);
              const size = 10 + (intensity * 20);
              const alpha = intensity * 0.8;
              
              let color = '';
              switch (activeType) {
                case 'click':
                  color = `rgba(255, 0, 0, ${alpha})`;
                  break;
                case 'hover':
                  color = `rgba(0, 0, 255, ${alpha})`;
                  break;
                case 'scroll':
                  color = `rgba(0, 255, 0, ${alpha})`;
                  break;
              }

              return (
                <div
                  key={index}
                  className="absolute rounded-full"
                  style={{
                    left: `${(point.x / window.innerWidth) * 100}%`,
                    top: `${(point.y / document.documentElement.scrollHeight) * 100}%`,
                    width: size,
                    height: size,
                    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              );
            })}

            {filteredData.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Thermometer className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No {activeType} data available</p>
                  <p className="text-sm">Start recording to see heatmap data</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold">{filteredData.length}</div>
              <div className="text-gray-500">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">
                {filteredData.length > 0 
                  ? Math.round((filteredData.reduce((sum, p) => sum + p.intensity, 0) / filteredData.length) * 10) / 10
                  : 0
                }
              </div>
              <div className="text-gray-500">Avg Intensity</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">
                {Math.round(Math.max(...filteredData.map(p => p.intensity), 0) * 10) / 10}
              </div>
              <div className="text-gray-500">Max Intensity</div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}