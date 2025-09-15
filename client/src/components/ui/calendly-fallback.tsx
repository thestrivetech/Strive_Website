import { AlertCircle, RefreshCw, Calendar, Phone, Mail } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";

interface CalendlyFallbackProps {
  status: 'loading' | 'error' | 'timeout';
  error?: string;
  onRetry: () => void;
  retryCount: number;
}

export function CalendlyFallback({ status, error, onRetry, retryCount }: CalendlyFallbackProps) {
  if (status === 'loading') {
    return (
      <div className="w-full h-[500px] md:h-[630px] rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        {/* Error Message */}
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {status === 'timeout' ? 'Calendar Loading Slowly' : 'Calendar Temporarily Unavailable'}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {error || "We're having trouble loading the calendar widget. This can happen due to network issues or browser settings."}
            </p>
            
            {retryCount < 3 && (
              <Button 
                onClick={onRetry}
                variant="outline" 
                size="sm"
                className="mb-4"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again {retryCount > 0 && `(${retryCount + 1}/3)`}
              </Button>
            )}
          </div>
        </div>

        {/* Alternative Contact Methods */}
        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            Alternative Scheduling Options
          </h4>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-blue-900 mb-2">Direct Calendar Link</h5>
              <p className="text-sm text-blue-700 mb-3">
                Visit our calendar directly to schedule your meeting:
              </p>
              <a 
                href="https://calendly.com/strivetech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Calendar className="w-4 h-4 mr-1" />
                Open Calendar in New Tab
              </a>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h5 className="font-medium text-orange-900 mb-2">Contact Us Directly</h5>
              <div className="space-y-2">
                <a 
                  href="mailto:contact@strivetech.io" 
                  className="flex items-center text-sm text-orange-700 hover:text-orange-900 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  contact@strivetech.io
                </a>
                <a 
                  href="tel:+17314312320" 
                  className="flex items-center text-sm text-orange-700 hover:text-orange-900 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  (731) 431-2320
                </a>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <strong>We'll contact you within 24 hours</strong> to schedule your personalized showcase 
                based on the information you've provided in this form.
              </p>
            </div>
          </div>
        </div>

        {/* Troubleshooting Tips */}
        {retryCount >= 2 && (
          <div className="border-t pt-6">
            <h5 className="font-medium text-gray-900 mb-3">Troubleshooting Tips</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Try refreshing the page</li>
              <li>• Check if you have an ad blocker that might be blocking Calendly</li>
              <li>• Ensure you have a stable internet connection</li>
              <li>• Try using a different browser or incognito mode</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}