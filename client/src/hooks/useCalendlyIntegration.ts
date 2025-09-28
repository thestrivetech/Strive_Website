import { useState, useEffect, useCallback, useRef } from 'react';
import { getCalendlyConfig } from '@/lib/browser-detection';

export type CalendlyStatus = 'loading' | 'loaded' | 'error' | 'timeout' | 'network-error' | 'blocked';

export interface CalendlyIntegrationState {
  status: CalendlyStatus;
  error: string;
  retryCount: number;
  isNetworkOnline: boolean;
  canRetry: boolean;
}

export interface CalendlyIntegrationActions {
  retry: () => void;
  forceReload: () => void;
  cleanup: () => void;
}

export interface UseCalendlyIntegrationReturn extends CalendlyIntegrationState, CalendlyIntegrationActions {}

/**
 * Custom hook for robust Calendly integration with retry mechanism,
 * network detection, progressive timeouts, and proper cleanup
 */
export function useCalendlyIntegration(): UseCalendlyIntegrationReturn {
  const [status, setStatus] = useState<CalendlyStatus>('loading');
  const [error, setError] = useState<string>('');
  const [retryCount, setRetryCount] = useState(0);
  const [isNetworkOnline, setIsNetworkOnline] = useState(navigator?.onLine ?? true);

  // Refs for cleanup
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUnmountedRef = useRef(false);

  // Network connectivity check
  const checkNetworkConnectivity = useCallback(() => {
    return navigator.onLine && window.fetch !== undefined;
  }, []);

  // Progressive timeout calculation (exponential backoff)
  const getTimeout = useCallback((attempt: number) => {
    const baseTimeout = 10000; // 10 seconds
    const maxTimeout = 30000; // 30 seconds
    const calculatedTimeout = baseTimeout + (attempt * 5000); // Add 5s per attempt
    return Math.min(calculatedTimeout, maxTimeout);
  }, []);

  // Progressive retry delay (exponential backoff)
  const getRetryDelay = useCallback((attempt: number) => {
    const baseDelay = 1000; // 1 second
    const maxDelay = 8000; // 8 seconds
    const calculatedDelay = baseDelay * Math.pow(2, attempt); // Exponential backoff
    return Math.min(calculatedDelay, maxDelay);
  }, []);

  // Enhanced error message generation
  const getErrorMessage = useCallback((errorType: string, details?: string) => {
    if (!checkNetworkConnectivity()) {
      return "You appear to be offline. Please check your internet connection and try again.";
    }

    switch (errorType) {
      case 'timeout':
        return `The calendar is taking longer than expected to load. This might be due to a slow internet connection or high server load.`;
      case 'script-error':
        return "Failed to load the calendar widget. This may be due to network issues, ad blockers, or browser security settings.";
      case 'network-error':
        return "Network error while loading the calendar. Please check your connection and try again.";
      case 'blocked':
        return "Your ad blocker or browser settings may be preventing the calendar from loading. Try disabling ad blockers for this site.";
      case 'browser-compatibility':
        return "Your browser may have limited support for embedded calendars. Please try the direct calendar link instead.";
      default:
        return details || "We're having trouble loading the calendar widget. Please try the alternative options below.";
    }
  }, [checkNetworkConnectivity]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    if (scriptRef.current && document.body.contains(scriptRef.current)) {
      try {
        document.body.removeChild(scriptRef.current);
      } catch (e) {
        console.warn('[Calendly] Script cleanup failed:', e);
      }
      scriptRef.current = null;
    }
  }, []);

  // Main Calendly script loading function
  const loadCalendlyScript = useCallback(async (attempt: number = 0) => {
    if (isUnmountedRef.current) return;

    // Check browser compatibility first
    const calendlyConfig = getCalendlyConfig();
    calendlyConfig.logBrowserInfo();
    
    console.log(`[Calendly] Loading attempt ${attempt + 1}, retry count: ${retryCount}`);
    
    // If browser has compatibility issues, skip to fallback
    if (calendlyConfig.shouldUseFallback) {
      console.log('[Calendly] Browser compatibility issues detected, using fallback');
      setStatus('error');
      setError(getErrorMessage('browser-compatibility'));
      return;
    }

    // Check network connectivity
    if (!checkNetworkConnectivity()) {
      console.log('[Calendly] Network connectivity issues detected');
      setStatus('network-error');
      setError(getErrorMessage('network-error'));
      setIsNetworkOnline(false);
      return;
    }

    setIsNetworkOnline(true);
    setStatus('loading');
    setError('');

    // Clean up previous script if exists
    cleanup();

    // Check if script already exists and is loaded
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (existingScript && (window as any).Calendly) {
      console.log('[Calendly] Script already exists and Calendly object is available');
      setStatus('loaded');
      return;
    }

    // Create and configure script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    scriptRef.current = script;

    // Success handler
    script.onload = () => {
      if (isUnmountedRef.current) return;
      
      console.log('[Calendly] Script loaded successfully');
      setStatus('loaded');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    // Error handler
    script.onerror = (event) => {
      if (isUnmountedRef.current) return;
      
      console.error('[Calendly] Script failed to load:', event);
      
      // Determine error type based on the failure
      let errorType = 'script-error';
      if (!checkNetworkConnectivity()) {
        errorType = 'network-error';
      } else if (typeof event === 'object' && event !== null) {
        // Could be blocked by ad blocker or security policy
        errorType = 'blocked';
      }
      
      setStatus('error');
      setError(getErrorMessage(errorType));
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    // Progressive timeout handler
    const currentTimeout = getTimeout(attempt);
    timeoutRef.current = setTimeout(() => {
      if (isUnmountedRef.current) return;
      
      console.warn(`[Calendly] Script loading timed out after ${currentTimeout}ms`);
      setStatus('timeout');
      setError(getErrorMessage('timeout'));
    }, currentTimeout);

    // Add script to DOM
    try {
      document.body.appendChild(script);
    } catch (e) {
      console.error('[Calendly] Failed to add script to DOM:', e);
      setStatus('error');
      setError(getErrorMessage('script-error'));
    }
  }, [retryCount, checkNetworkConnectivity, getErrorMessage, getTimeout, cleanup]);

  // Retry function with exponential backoff
  const retry = useCallback(() => {
    if (retryCount >= 3 || isUnmountedRef.current) return;

    const newRetryCount = retryCount + 1;
    setRetryCount(newRetryCount);
    
    const retryDelay = getRetryDelay(retryCount);
    console.log(`[Calendly] Retrying in ${retryDelay}ms (attempt ${newRetryCount})`);

    retryTimeoutRef.current = setTimeout(() => {
      if (!isUnmountedRef.current) {
        loadCalendlyScript(newRetryCount - 1);
      }
    }, retryDelay);
  }, [retryCount, getRetryDelay, loadCalendlyScript]);

  // Force reload function (resets retry count)
  const forceReload = useCallback(() => {
    setRetryCount(0);
    setStatus('loading');
    setError('');
    loadCalendlyScript(0);
  }, [loadCalendlyScript]);

  // Network status listener
  useEffect(() => {
    const handleOnline = () => {
      setIsNetworkOnline(true);
      if (status === 'network-error' && !isUnmountedRef.current) {
        console.log('[Calendly] Network back online, retrying...');
        retry();
      }
    };

    const handleOffline = () => {
      setIsNetworkOnline(false);
      if (!isUnmountedRef.current) {
        setStatus('network-error');
        setError(getErrorMessage('network-error'));
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [status, retry, getErrorMessage]);

  // Initial load effect
  useEffect(() => {
    loadCalendlyScript(0);

    return () => {
      isUnmountedRef.current = true;
      cleanup();
    };
  }, [loadCalendlyScript, cleanup]);

  const canRetry = retryCount < 3 && isNetworkOnline && status !== 'loaded';

  return {
    status,
    error,
    retryCount,
    isNetworkOnline,
    canRetry,
    retry,
    forceReload,
    cleanup
  };
}