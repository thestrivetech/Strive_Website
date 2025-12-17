import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
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

// Critical layout components - loaded immediately (needed on every page)
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";

// Consent banner can be lazy-loaded since it appears after user interaction
const ConsentBanner = lazy(() => import("@/components/analytics/consent-banner").then(module => ({ default: module.ConsentBanner })));

// Keep home page loaded immediately for best UX
import Home from "@/pages/home";

// Lazy load all other pages for optimal performance
const Resources = lazy(() => import("@/pages/resources"));
const Company = lazy(() => import("@/pages/company"));
const Contact = lazy(() => import("@/pages/contact"));
const Onboarding = lazy(() => import("@/pages/onboarding"));
const Login = lazy(() => import("@/pages/login"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Terms = lazy(() => import("@/pages/terms"));
const Cookies = lazy(() => import("@/pages/cookies"));
const Pricing = lazy(() => import("@/pages/pricing"));
const NotFound = lazy(() => import("@/pages/not-found"));
const AnalyticsDashboard = lazy(() => import("@/pages/analytics-dashboard"));

// Import redirect component for deprecated routes
import { Redirect } from "@/components/Redirect";

function Router() {
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
      <Navigation />
      <main>
        <Suspense fallback={<PageSkeleton />}>
          <Switch>
            <Route path="/" component={Home} />

            {/* Redirect deprecated routes to consolidated homepage */}
            <Route path="/platform">{() => <Redirect to="/" />}</Route>
            <Route path="/solutions">{() => <Redirect to="/" />}</Route>
            <Route path="/assessment">{() => <Redirect to="/" />}</Route>

            <Route path="/resources" component={Resources} />
            <Route path="/about" component={Company} />
            <Route path="/contact" component={Contact} />
            <Route path="/onboarding" component={Onboarding} />
            <Route path="/login" component={Login} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/terms" component={Terms} />
            <Route path="/cookies" component={Cookies} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/analytics-dashboard" component={AnalyticsDashboard} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
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
