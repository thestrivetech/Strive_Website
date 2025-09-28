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
    try {
      if (analytics.hasConsent()) {
        analytics.init({
          enableAutoTracking: true,
          requireConsent: false,
        });
        console.log('📊 Analytics initialized via page tracking');
      }
    } catch (error) {
      console.error('❌ Analytics initialization failed in page tracking:', error);
      // Continue execution - analytics failure shouldn't break page navigation
    }
  }, []);

  useEffect(() => {
    // Track page view when location changes
    try {
      if (analytics.hasConsent()) {
        analytics.trackPageView({
          path: location,
          title: document.title,
          referrer: document.referrer,
        });
        console.log('📊 Page view tracked:', location);
      }
    } catch (error) {
      console.error('❌ Page view tracking failed:', error, { location });
      // Continue execution - tracking failure shouldn't break page navigation
    }
  }, [location]);
}