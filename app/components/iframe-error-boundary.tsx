import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  iframeSrc?: string;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
}

class IframeErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Detailed logging for debugging
    console.group('🚨 Iframe Error Boundary Caught Error');
    console.error('Component:', this.props.componentName || 'Unknown');
    console.error('Iframe URL:', this.props.iframeSrc || 'Unknown');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Component Stack:', errorInfo.componentStack);
    console.error('Error Stack:', error.stack);
    console.groupEnd();

    // Track error for analytics (if available)
    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'iframe_error', {
          event_category: 'error',
          event_label: this.props.componentName || 'iframe',
          value: 1
        });
      }
    } catch (e) {
      console.warn('Failed to send error analytics:', e);
    }
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleExternalLink = () => {
    if (this.props.iframeSrc) {
      window.open(this.props.iframeSrc, '_blank', 'noopener,noreferrer');
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />

              <div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  {this.props.fallbackTitle || "Content Loading Error"}
                </h3>
                <p className="text-red-600 text-sm mb-4">
                  We're having trouble loading this content. This might be due to network issues or security restrictions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={this.handleRetry}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-100"
                  disabled={this.state.retryCount >= 3}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {this.state.retryCount >= 3 ? 'Max Retries Reached' : 'Try Again'}
                </Button>

                {this.props.iframeSrc && (
                  <Button
                    onClick={this.handleExternalLink}
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in New Tab
                  </Button>
                )}
              </div>

              {process.env.NODE_ENV === 'development' && (
                <details className="mt-4 w-full">
                  <summary className="text-xs text-red-500 cursor-pointer hover:text-red-700">
                    Debug Information (Development Only)
                  </summary>
                  <div className="mt-2 p-3 bg-red-100 rounded text-left text-xs text-red-800 max-h-40 overflow-auto">
                    <div><strong>Component:</strong> {this.props.componentName}</div>
                    <div><strong>Iframe URL:</strong> {this.props.iframeSrc}</div>
                    <div><strong>Retry Count:</strong> {this.state.retryCount}</div>
                    {this.state.error && (
                      <div>
                        <strong>Error:</strong> {this.state.error.message}
                        <pre className="mt-1 text-xs">{this.state.error.stack}</pre>
                      </div>
                    )}
                    {this.state.errorInfo && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="mt-1 text-xs">{this.state.errorInfo.componentStack}</pre>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default IframeErrorBoundary;