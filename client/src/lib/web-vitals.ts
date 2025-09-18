import { onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';
// FID is deprecated in favor of INP, but we'll still track it if available
let onFID: any;
try {
  onFID = require('web-vitals').onFID;
} catch (e) {
  // FID not available, use fallback
  onFID = null;
}

// Types for Web Vitals metrics
export interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  entries: PerformanceEntry[];
}

// Store metrics for reporting
const metrics: { [key: string]: WebVitalsMetric } = {};

/**
 * Report metric to analytics or console
 */
function reportMetric(metric: WebVitalsMetric) {
  // Store metric
  metrics[metric.name] = metric;

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vital:', {
      name: metric.name,
      value: Math.round(metric.value * 100) / 100,
      rating: metric.rating,
      delta: Math.round(metric.delta * 100) / 100,
    });
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Send to our analytics system
    import('./analytics-tracker').then(({ trackWebVitals }) => {
      trackWebVitals(metric);
    }).catch(() => {
      // Silently fail - analytics shouldn't break the app
    });

    // Example: Google Analytics 4 (if enabled)
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.value),
        metric_rating: metric.rating,
        custom_map: { metric_id: 'dimension1' },
        metric_id: metric.id,
      });
    }
  }
}

/**
 * Initialize Web Vitals monitoring
 */
export function initWebVitals() {
  // Monitor all Core Web Vitals
  onCLS(reportMetric);
  onFCP(reportMetric);
  if (onFID) {
    onFID(reportMetric);
  }
  onLCP(reportMetric);
  onTTFB(reportMetric);

  // Also measure INP if supported (newer metric replacing FID)
  if ('requestIdleCallback' in window) {
    // INP monitoring logic would go here
    // For now, FID provides similar insights
  }
}

/**
 * Get current Web Vitals metrics
 */
export function getCurrentMetrics(): { [key: string]: WebVitalsMetric } {
  return { ...metrics };
}

/**
 * Get performance scores based on thresholds
 */
export function getPerformanceScore(): {
  overall: number;
  scores: { [key: string]: number };
  ratings: { [key: string]: string };
} {
  const scores: { [key: string]: number } = {};
  const ratings: { [key: string]: string } = {};

  // Score mapping: good = 100, needs-improvement = 75, poor = 50
  const ratingScores = { good: 100, 'needs-improvement': 75, poor: 50 };

  Object.entries(metrics).forEach(([name, metric]) => {
    scores[name] = ratingScores[metric.rating];
    ratings[name] = metric.rating;
  });

  // Calculate overall score (weighted average)
  const weights = { LCP: 0.25, FID: 0.25, CLS: 0.25, FCP: 0.15, TTFB: 0.10 };
  let overall = 0;
  let totalWeight = 0;

  Object.entries(weights).forEach(([metric, weight]) => {
    if (scores[metric] !== undefined) {
      overall += scores[metric] * weight;
      totalWeight += weight;
    }
  });

  overall = totalWeight > 0 ? Math.round(overall / totalWeight) : 0;

  return { overall, scores, ratings };
}

/**
 * Get detailed performance insights
 */
export function getPerformanceInsights(): {
  insights: string[];
  recommendations: string[];
} {
  const insights: string[] = [];
  const recommendations: string[] = [];

  Object.entries(metrics).forEach(([name, metric]) => {
    switch (name) {
      case 'LCP':
        if (metric.rating === 'poor') {
          insights.push(`Large Contentful Paint is slow (${Math.round(metric.value)}ms)`);
          recommendations.push('Optimize images, preload critical resources, improve server response times');
        } else if (metric.rating === 'needs-improvement') {
          insights.push(`Large Contentful Paint needs improvement (${Math.round(metric.value)}ms)`);
          recommendations.push('Consider image optimization and resource preloading');
        }
        break;

      case 'FID':
      case 'INP':
        if (metric.rating === 'poor') {
          insights.push(`User interaction responsiveness is slow (${Math.round(metric.value)}ms)`);
          recommendations.push('Reduce JavaScript execution time, use code splitting, defer non-critical scripts');
        }
        break;

      case 'CLS':
        if (metric.rating === 'poor') {
          insights.push(`Layout shifts detected (${metric.value.toFixed(3)})`);
          recommendations.push('Add dimensions to images, reserve space for dynamic content, avoid inserting content above existing elements');
        }
        break;

      case 'FCP':
        if (metric.rating === 'poor') {
          insights.push(`First Contentful Paint is slow (${Math.round(metric.value)}ms)`);
          recommendations.push('Optimize critical rendering path, inline critical CSS, preload key resources');
        }
        break;

      case 'TTFB':
        if (metric.rating === 'poor') {
          insights.push(`Server response time is slow (${Math.round(metric.value)}ms)`);
          recommendations.push('Optimize server performance, use CDN, implement caching');
        }
        break;
    }
  });

  return { insights, recommendations };
}