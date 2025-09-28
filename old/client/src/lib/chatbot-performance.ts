// Chatbot Performance Optimization Utilities
// Handles preloading, caching, and performance monitoring for iframe chatbot

export interface PerformanceMetrics {
  loadStartTime: number;
  loadEndTime?: number;
  firstContentfulPaint?: number;
  timeToInteractive?: number;
  error?: string;
}

class ChatbotPerformanceManager {
  private metrics: Map<string, PerformanceMetrics> = new Map();
  private preloadedOrigins: Set<string> = new Set();

  // Start performance tracking for a chatbot instance
  public startTracking(instanceId: string): void {
    this.metrics.set(instanceId, {
      loadStartTime: performance.now()
    });
  }

  // Record load completion
  public recordLoadComplete(instanceId: string): void {
    const metrics = this.metrics.get(instanceId);
    if (metrics) {
      metrics.loadEndTime = performance.now();
    }
  }

  // Record error
  public recordError(instanceId: string, error: string): void {
    const metrics = this.metrics.get(instanceId);
    if (metrics) {
      metrics.error = error;
      metrics.loadEndTime = performance.now();
    }
  }

  // Get performance metrics
  public getMetrics(instanceId: string): PerformanceMetrics | undefined {
    return this.metrics.get(instanceId);
  }

  // Get load time in milliseconds
  public getLoadTime(instanceId: string): number | undefined {
    const metrics = this.metrics.get(instanceId);
    if (metrics?.loadStartTime && metrics?.loadEndTime) {
      return metrics.loadEndTime - metrics.loadStartTime;
    }
    return undefined;
  }

  // Clear metrics for an instance
  public clearMetrics(instanceId: string): void {
    this.metrics.delete(instanceId);
  }

  // Advanced preconnection with DNS prefetch and preload
  public preconnectAdvanced(origin: string): void {
    if (this.preloadedOrigins.has(origin)) {
      return; // Already preconnected
    }

    const head = document.head;

    // DNS prefetch
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = origin;
    head.appendChild(dnsPrefetch);

    // Preconnect
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = origin;
    preconnect.crossOrigin = 'anonymous';
    head.appendChild(preconnect);

    // Prefetch main resources (if we know they exist)
    const resourcePrefetch = document.createElement('link');
    resourcePrefetch.rel = 'prefetch';
    resourcePrefetch.href = `${origin}/widget`;
    resourcePrefetch.as = 'document';
    head.appendChild(resourcePrefetch);

    this.preloadedOrigins.add(origin);
  }

  // Preload chatbot with invisible iframe for instant loading
  public preloadChatbot(origin: string, onReady?: () => void): void {
    const preloadId = `preload-${Date.now()}`;
    this.startTracking(preloadId);

    const iframe = document.createElement('iframe');
    iframe.src = `${origin}/widget`;
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.width = '1px';
    iframe.style.height = '1px';
    iframe.style.visibility = 'hidden';
    iframe.sandbox.add('allow-scripts', 'allow-same-origin');

    const cleanup = () => {
      document.body.removeChild(iframe);
      this.clearMetrics(preloadId);
    };

    iframe.onload = () => {
      this.recordLoadComplete(preloadId);
      if (onReady) onReady();
      // Keep preloaded for a while, then cleanup
      setTimeout(cleanup, 30000); // Clean up after 30 seconds
    };

    iframe.onerror = () => {
      this.recordError(preloadId, 'Preload failed');
      cleanup();
    };

    document.body.appendChild(iframe);
  }

  // Service Worker registration for offline support
  public async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/chatbot-sw.js', {
          scope: '/chatbot-cache/'
        });

        console.log('Chatbot ServiceWorker registered:', registration);

        // Listen for updates
        registration.addEventListener('updatefound', () => {
          console.log('Chatbot ServiceWorker update available');
        });
      } catch (error) {
        console.error('Chatbot ServiceWorker registration failed:', error);
      }
    }
  }

  // Monitor iframe performance with Intersection Observer
  public observeIframePerformance(
    iframe: HTMLIFrameElement,
    callback: (isVisible: boolean, intersectionRatio: number) => void
  ): () => void {
    if (!('IntersectionObserver' in window)) {
      return () => {}; // No-op cleanup function
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        callback(entry.isIntersecting, entry.intersectionRatio);
      },
      {
        threshold: [0, 0.1, 0.5, 1.0], // Multiple thresholds for granular tracking
        rootMargin: '50px' // Start observing 50px before element comes into view
      }
    );

    observer.observe(iframe);

    // Return cleanup function
    return () => {
      observer.unobserve(iframe);
      observer.disconnect();
    };
  }

  // Generate performance report
  public generateReport(): string {
    const report = {
      totalInstances: this.metrics.size,
      preloadedOrigins: Array.from(this.preloadedOrigins),
      instances: {}
    };

    this.metrics.forEach((metrics, instanceId) => {
      const loadTime = this.getLoadTime(instanceId);
      (report.instances as any)[instanceId] = {
        loadTime: loadTime ? `${loadTime.toFixed(2)}ms` : 'In progress',
        hasError: Boolean(metrics.error),
        error: metrics.error
      };
    });

    return JSON.stringify(report, null, 2);
  }

  // Auto-cleanup old metrics (call periodically)
  public cleanup(): void {
    const now = performance.now();
    const maxAge = 5 * 60 * 1000; // 5 minutes

    this.metrics.forEach((metrics, instanceId) => {
      if (now - metrics.loadStartTime > maxAge) {
        this.metrics.delete(instanceId);
      }
    });
  }
}

// Utility functions for performance optimization

export const createOptimizedIframe = (
  src: string,
  options: {
    loading?: 'lazy' | 'eager';
    importance?: 'high' | 'low' | 'auto';
    className?: string;
  } = {}
): HTMLIFrameElement => {
  const iframe = document.createElement('iframe');

  iframe.src = src;
  iframe.loading = options.loading || 'lazy';

  // Set fetch priority if supported
  if ('importance' in HTMLIFrameElement.prototype) {
    (iframe as any).importance = options.importance || 'auto';
  }

  // Security and performance attributes
  iframe.sandbox.add(
    'allow-scripts',
    'allow-same-origin',
    'allow-forms',
    'allow-popups',
    'allow-popups-to-escape-sandbox'
  );
  iframe.allow = 'microphone; camera; clipboard-write';
  iframe.referrerPolicy = 'strict-origin';

  // Performance optimizations
  iframe.style.border = 'none';
  iframe.style.width = '100%';
  iframe.style.height = '100%';

  if (options.className) {
    iframe.className = options.className;
  }

  return iframe;
};

export const measureChatbotPerformance = (
  iframe: HTMLIFrameElement,
  callback: (metrics: { loadTime: number; size: string }) => void
): void => {
  const startTime = performance.now();

  const handleLoad = () => {
    const loadTime = performance.now() - startTime;
    const size = iframe.contentDocument?.documentElement.innerHTML?.length || 0;

    callback({
      loadTime,
      size: `${(size / 1024).toFixed(2)}KB`
    });

    iframe.removeEventListener('load', handleLoad);
  };

  iframe.addEventListener('load', handleLoad);
};

// Export singleton instance
export const performanceManager = new ChatbotPerformanceManager();

// Auto-cleanup every 5 minutes
setInterval(() => {
  performanceManager.cleanup();
}, 5 * 60 * 1000);