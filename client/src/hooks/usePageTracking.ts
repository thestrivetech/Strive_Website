import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { analytics } from '@/lib/analytics-tracker';

/**
 * Hook to automatically track page views when location changes
 */
export function usePageTracking() {
  const [location] = useLocation();

  useEffect(() => {
    // Initialize analytics if not already done
    if (analytics.hasConsent()) {
      analytics.init({
        enableAutoTracking: true,
        enableWebVitals: true,
        enableErrorTracking: true,
      });
    }
  }, []);

  useEffect(() => {
    // Track page view when location changes
    if (analytics.hasConsent()) {
      analytics.trackPageView({
        path: location,
        title: document.title,
        referrer: document.referrer,
      });
    }
  }, [location]);
}