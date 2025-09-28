// Chatbot Performance Monitor Utility
// Monitor iframe loading performance as specified in Team 2 requirements

export class ChatbotPerformanceMonitor {
  private metrics: Map<string, {
    startTime: number;
    events: Array<{
      name: string;
      time: number;
      data: any;
    }>;
    endTime?: number;
    totalTime?: number;
  }> = new Map();

  private observers: Map<string, IntersectionObserver> = new Map();

  startTracking(id: string) {
    this.metrics.set(id, {
      startTime: performance.now(),
      events: []
    });
  }

  trackEvent(id: string, eventName: string, data: any = {}) {
    const metric = this.metrics.get(id);
    if (!metric) return;

    metric.events.push({
      name: eventName,
      time: performance.now() - metric.startTime,
      data
    });
  }

  endTracking(id: string) {
    const metric = this.metrics.get(id);
    if (!metric) return;

    metric.endTime = performance.now();
    metric.totalTime = metric.endTime - metric.startTime;

    return {
      id,
      totalTime: metric.totalTime,
      events: metric.events
    };
  }

  observeIframe(iframe: HTMLIFrameElement, id: string) {
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.trackEvent(id, 'visibility', {
          isVisible: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio
        });
      });
    });

    observer.observe(iframe);
    this.observers.set(id, observer);
  }

  cleanup(id: string) {
    const observer = this.observers.get(id);
    if (observer) {
      observer.disconnect();
      this.observers.delete(id);
    }
    this.metrics.delete(id);
  }

  getReport(id: string) {
    const metric = this.metrics.get(id);
    if (!metric) return null;

    return {
      id,
      startTime: metric.startTime,
      endTime: metric.endTime,
      totalTime: metric.totalTime || (performance.now() - metric.startTime),
      events: metric.events
    };
  }

  getAllReports() {
    const reports: any[] = [];
    this.metrics.forEach((metric, id) => {
      reports.push(this.getReport(id));
    });
    return reports;
  }
}

// Create singleton instance
const performanceMonitor = new ChatbotPerformanceMonitor();
export default performanceMonitor;