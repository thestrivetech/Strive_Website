import { AlertCircle, RefreshCw, Calendar, Phone, Mail } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";

interface CalendlyFallbackProps {
  status: 'loading' | 'error' | 'timeout' | 'network-error' | 'blocked';
  error?: string;
  onRetry: () => void;
  retryCount: number;
}

export function CalendlyFallback({ status, error, onRetry, retryCount }: CalendlyFallbackProps) {
  // Network connectivity check
  const checkNetworkConnectivity = () => {
    return navigator.onLine && window.fetch !== undefined;
  };

  const handlePopupFallback = () => {
    const calendlyUrl = "https://calendly.com/strivetech";
    const popupWindow = window.open(
      calendlyUrl,
      'calendly-popup',
      'width=800,height=700,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no'
    );
    
    if (!popupWindow) {
      // Popup blocked, fallback to direct navigation
      window.open(calendlyUrl, '_blank');
    }
  };

  if (status === 'loading') {
    return (
      <div className="w-full h-[500px] md:h-[630px] rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Loading calendar...</p>
          {!checkNetworkConnectivity() && (
            <p className="text-xs text-gray-500">Please check your internet connection</p>
          )}
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
              {(() => {
                if (!checkNetworkConnectivity()) {
                  return "It looks like you're offline or have a weak internet connection. Please check your connection and try again.";
                }
                
                if (status === 'timeout') {
                  return "The calendar is taking longer than expected to load. This might be due to a slow internet connection or high server load.";
                }
                
                if (error?.includes('ad blocker') || error?.includes('blocked')) {
                  return "Your ad blocker or browser settings may be preventing the calendar from loading. Try disabling ad blockers for this site or use the alternative options below.";
                }
                
                return error || "We're having trouble loading the calendar widget. This can happen due to network issues, browser settings, or temporary server issues.";
              })()}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              {retryCount < 3 && checkNetworkConnectivity() && (
                <Button 
                  onClick={onRetry}
                  variant="outline" 
                  size="sm"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again {retryCount > 0 && `(${retryCount + 1}/3)`}
                </Button>
              )}
              
              <Button 
                onClick={handlePopupFallback}
                variant="default" 
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Open Calendar Popup
              </Button>
            </div>
          </div>
        </div>

        {/* Primary Fallback Options */}
        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            Scheduling Options
          </h4>
          
          <div className="space-y-4">
            {/* Popup Option */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-blue-900 mb-1">Calendar Popup</h5>
                  <p className="text-sm text-blue-700">
                    Opens Calendly in a new popup window for easy scheduling
                  </p>
                </div>
                <Button 
                  onClick={handlePopupFallback}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white ml-4"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Open Popup
                </Button>
              </div>
            </div>

            {/* Direct Link Option */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-green-900 mb-1">Direct Calendar Link</h5>
                  <p className="text-sm text-green-700">
                    Visit our calendar page directly in a new tab
                  </p>
                </div>
                <a 
                  href="https://calendly.com/strivetech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-md hover:bg-green-200 hover:text-green-800 transition-colors ml-4"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Open Calendar
                </a>
              </div>
            </div>

            {/* Contact Options */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
              <h5 className="font-medium text-orange-900 mb-3">Contact Us Directly</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a 
                  href="mailto:contact@strivetech.io" 
                  className="flex items-center text-sm text-orange-700 hover:text-orange-900 transition-colors p-2 rounded bg-orange-100 hover:bg-orange-200"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  contact@strivetech.io
                </a>
                <a 
                  href="tel:+17314312320" 
                  className="flex items-center text-sm text-orange-700 hover:text-orange-900 transition-colors p-2 rounded bg-orange-100 hover:bg-orange-200"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  (731) 431-2320
                </a>
              </div>
            </div>

            {/* Guaranteed Response */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
              <div className="text-center">
                <h5 className="font-semibold text-purple-900 mb-2">
                  ✨ Guaranteed Response Within 24 Hours
                </h5>
                <p className="text-sm text-purple-700">
                  We'll contact you within 24 hours to schedule your personalized showcase 
                  based on the information you've provided in this form.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting Tips */}
        {retryCount >= 2 && (
          <div className="border-t pt-6">
            <h5 className="font-medium text-gray-900 mb-3 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-amber-500" />
              Troubleshooting Tips
            </h5>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span>Try refreshing the page or clearing your browser cache</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span>Disable ad blockers or privacy extensions that might be blocking Calendly</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span>Ensure you have a stable internet connection</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span>Try using a different browser or incognito/private mode</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span>Check if your company firewall is blocking external calendar widgets</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Browser Compatibility Notice */}
        {(() => {
          const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
          const isOldBrowser = userAgent.includes('trident') || userAgent.includes('msie') || 
                              (userAgent.includes('chrome') && parseInt(userAgent.match(/chrome\/(\d+)/)?.[1] || '0') < 80);
          
          if (isOldBrowser) {
            return (
              <div className="border-t pt-6">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-medium text-amber-900">Browser Compatibility Notice</h5>
                      <p className="text-sm text-amber-700 mt-1">
                        Your browser version may have limited support for embedded calendars. 
                        For the best experience, please use the direct calendar link above or update to a newer browser version.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })()}
      </CardContent>
    </Card>
  );
}