import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Shield, BarChart3, Eye } from "lucide-react";
import { analytics } from "@/lib/analytics-tracker";

interface ConsentBannerProps {
  onConsentChange?: (consent: boolean) => void;
}

export function ConsentBanner({ onConsentChange }: ConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a consent decision
    const hasDecided = localStorage.getItem('analytics_consent') !== null;
    setShowBanner(!hasDecided);
  }, []);

  const handleAccept = () => {
    analytics.setConsent(true);
    setShowBanner(false);
    onConsentChange?.(true);
    
    // Initialize analytics with consent
    analytics.init({
      enableAutoTracking: true,
      requireConsent: false, // We just got consent
    });
  };

  const handleDecline = () => {
    analytics.setConsent(false);
    setShowBanner(false);
    onConsentChange?.(false);
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="mx-auto max-w-4xl bg-white border border-gray-200 shadow-2xl">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <h3 className="text-lg font-semibold text-gray-900">
                Privacy & Analytics
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBanner(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-3">
              We use analytics to improve your experience on our website. This helps us understand how visitors interact with our content and services.
            </p>
            
            {showDetails && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
                <div className="flex items-start space-x-3">
                  <BarChart3 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Performance Analytics</h4>
                    <p className="text-sm text-gray-600">
                      We track page load times, user interactions, and technical performance to optimize our website.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Eye className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Usage Analytics</h4>
                    <p className="text-sm text-gray-600">
                      We analyze which pages are visited, how long users stay, and which features are most popular.
                    </p>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded p-3 mt-3">
                  <h5 className="font-medium text-blue-900 text-sm mb-1">Your Privacy</h5>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• No personal information is collected without consent</li>
                    <li>• All data is anonymized and aggregated</li>
                    <li>• You can opt out at any time in your browser settings</li>
                    <li>• Data is stored securely and never sold to third parties</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAccept}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              Accept Analytics
            </Button>
            
            <Button
              onClick={handleDecline}
              variant="outline"
              className="px-6"
            >
              Decline
            </Button>
            
            <Button
              onClick={handleCustomize}
              variant="ghost"
              className="text-gray-600 px-4"
            >
              {showDetails ? 'Hide Details' : 'Learn More'}
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            By accepting, you agree to our use of analytics cookies. You can change your preferences at any time.
            <a href="/privacy" className="text-blue-600 hover:underline ml-1">
              View Privacy Policy
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}

// Privacy settings component for user dashboard
export function PrivacySettings() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    setAnalyticsEnabled(analytics.hasConsent());
  }, []);

  const handleToggleAnalytics = (enabled: boolean) => {
    analytics.setConsent(enabled);
    setAnalyticsEnabled(enabled);
    
    if (enabled) {
      analytics.init({
        enableAutoTracking: true,
        requireConsent: false,
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Shield className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Privacy Settings</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Analytics Tracking</h4>
            <p className="text-sm text-gray-600">
              Help us improve our website by sharing anonymous usage data
            </p>
          </div>
          <Button
            variant={analyticsEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => handleToggleAnalytics(!analyticsEnabled)}
          >
            {analyticsEnabled ? "Enabled" : "Disabled"}
          </Button>
        </div>

        <div className="text-xs text-gray-500">
          <p>Current session ID: {analytics.getSessionId() || 'Not tracking'}</p>
          <p>Analytics consent: {analyticsEnabled ? 'Given' : 'Not given'}</p>
        </div>
      </div>
    </Card>
  );
}