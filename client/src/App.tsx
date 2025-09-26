import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import ScrollToTop from "@/components/scroll-to-top";
import PageSkeleton from "@/components/ui/page-skeleton";
import ErrorBoundary from "@/components/ui/error-boundary";
import AnalyticsErrorBoundary from "@/components/ui/analytics-error-boundary";
import { usePageTracking } from "@/hooks/usePageTracking";

// Lazy load layout components for better performance
const Navigation = lazy(() => import("@/components/layout/navigation"));
const Footer = lazy(() => import("@/components/layout/footer"));
const FloatingChat = lazy(() => import("@/components/ui/floating-chat"));
const ConsentBanner = lazy(() => import("@/components/analytics/consent-banner").then(module => ({ default: module.ConsentBanner })));

// Keep home page loaded immediately for best UX
import Home from "@/pages/home";

// Lazy load all other pages for optimal performance
const Portfolio = lazy(() => import("@/pages/portfolio"));
const Solutions = lazy(() => import("@/pages/solutions"));
const Resources = lazy(() => import("@/pages/resources"));
const Company = lazy(() => import("@/pages/company"));
const Contact = lazy(() => import("@/pages/contact"));
const Assessment = lazy(() => import("@/pages/assessment"));
const Onboarding = lazy(() => import("@/pages/onboarding"));
const Request = lazy(() => import("@/pages/request"));
const Login = lazy(() => import("@/pages/login"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Terms = lazy(() => import("@/pages/terms"));
const Cookies = lazy(() => import("@/pages/cookies"));
const ChatBotSai = lazy(() => import("@/pages/chatbot-sai"));

// Lazy load solution pages (most likely to be large)
const Healthcare = lazy(() => import("@/pages/solutions/healthcare"));
const Financial = lazy(() => import("@/pages/solutions/financial"));
const Manufacturing = lazy(() => import("@/pages/solutions/manufacturing"));
const Retail = lazy(() => import("@/pages/solutions/retail"));
const Technology = lazy(() => import("@/pages/solutions/technology"));
const Education = lazy(() => import("@/pages/solutions/education"));
const AIAutomation = lazy(() => import("@/pages/solutions/ai-automation"));
const DataAnalytics = lazy(() => import("@/pages/solutions/data-analytics"));
const Blockchain = lazy(() => import("@/pages/solutions/blockchain"));
const SmartBusiness = lazy(() => import("@/pages/solutions/smart-business"));
const ComputerVision = lazy(() => import("@/pages/solutions/computer-vision"));
const SecurityCompliance = lazy(() => import("@/pages/solutions/security-compliance"));
const NotFound = lazy(() => import("@/pages/not-found"));
const PerformanceDashboard = lazy(() => import("@/pages/performance-dashboard"));
const AnalyticsDashboard = lazy(() => import("@/pages/analytics-dashboard"));

function Router() {
  const [location] = useLocation();
  const hideChatWidget = location === '/chatbot-sai' || location === '/';

  // Enable automatic page tracking with error handling
  try {
    usePageTracking();
  } catch (error) {
    console.error('📊 Page tracking initialization failed:', error);
    // Continue app execution - analytics failure shouldn't break the app
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <Suspense fallback={<div className="h-16 w-full bg-background border-b animate-pulse" />}>
        <Navigation />
      </Suspense>
      <main>
        <Suspense fallback={<PageSkeleton />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/solutions" component={Solutions} />
            <Route path="/resources" component={Resources} />
            <Route path="/about" component={Company} />
            <Route path="/contact" component={Contact} />
            <Route path="/assessment" component={Assessment} />
            <Route path="/onboarding" component={Onboarding} />
            <Route path="/request" component={Request} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route path="/cookies" component={Cookies} />
            <Route path="/chatbot-sai" component={ChatBotSai} />
            <Route path="/solutions/healthcare" component={Healthcare} />
            <Route path="/solutions/financial" component={Financial} />
            <Route path="/solutions/manufacturing" component={Manufacturing} />
            <Route path="/solutions/retail" component={Retail} />
            <Route path="/solutions/technology" component={Technology} />
            <Route path="/solutions/education" component={Education} />
            <Route path="/solutions/ai-automation" component={AIAutomation} />
            <Route path="/solutions/data-analytics" component={DataAnalytics} />
            <Route path="/solutions/blockchain" component={Blockchain} />
            <Route path="/solutions/smart-business" component={SmartBusiness} />
            <Route path="/solutions/computer-vision" component={ComputerVision} />
            <Route path="/solutions/security-compliance" component={SecurityCompliance} />
            <Route path="/performance" component={PerformanceDashboard} />
            <Route path="/analytics-dashboard" component={AnalyticsDashboard} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-20 w-full bg-muted/10 animate-pulse" />}>
        <Footer />
      </Suspense>
      {!hideChatWidget && (
        <Suspense fallback={null}>
          <FloatingChat />
        </Suspense>
      )}
      <Suspense fallback={null}>
        <AnalyticsErrorBoundary componentName="ConsentBanner">
          <ConsentBanner />
        </AnalyticsErrorBoundary>
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
