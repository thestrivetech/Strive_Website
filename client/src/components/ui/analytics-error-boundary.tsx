import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class AnalyticsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log analytics errors for debugging
    console.group('📊 Analytics Error Boundary Caught Error');
    console.error('Component:', this.props.componentName || 'Analytics Component');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);

    // Log specific analytics error details
    if (error.message.includes('analytics') || error.message.includes('tracking')) {
      console.error('🔍 Analytics-specific error detected');
      console.error('This is likely related to tracking initialization or consent management');
    }

    if (error.message.includes('localStorage') || error.message.includes('sessionStorage')) {
      console.error('🔍 Storage error detected');
      console.error('This might be related to privacy settings or browser restrictions');
    }

    if (error.message.includes('gtag') || error.message.includes('ga')) {
      console.error('🔍 Google Analytics error detected');
      console.error('This might be related to Google Analytics configuration');
    }

    console.groupEnd();

    // Track the error itself (if tracking is available and not what caused the error)
    try {
      if (typeof window !== 'undefined' && (window as any).gtag && !error.message.includes('gtag')) {
        (window as any).gtag('event', 'analytics_error', {
          event_category: 'error',
          event_label: this.props.componentName || 'analytics',
          value: 1
        });
      }
    } catch (e) {
      // Silently ignore - don't want to create error loops
    }
  }

  render() {
    if (this.state.hasError) {
      // Provide a fallback or render nothing for analytics components
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // For development, show a minimal error indicator
      if (process.env.NODE_ENV === 'development') {
        return (
          <div className="text-xs text-red-500 p-2 border border-red-200 bg-red-50 rounded">
            Analytics Error ({this.props.componentName || 'Unknown'})
            <details className="mt-1">
              <summary className="cursor-pointer">Details</summary>
              <pre className="mt-1 text-xs">{this.state.error?.message}</pre>
            </details>
          </div>
        );
      }

      // In production, render nothing - analytics failures should be invisible to users
      return null;
    }

    return this.props.children;
  }
}

export default AnalyticsErrorBoundary;