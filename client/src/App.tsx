import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import FloatingChat from "@/components/ui/floating-chat";
import Home from "@/pages/home";
import Portfolio from "@/pages/portfolio";
import Solutions from "@/pages/solutions";
import Resources from "@/pages/resources";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import GetStarted from "@/pages/get-started";
import Demo from "@/pages/demo";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Cookies from "@/pages/cookies";
import Healthcare from "@/pages/solutions/healthcare";
import Financial from "@/pages/solutions/financial";
import Manufacturing from "@/pages/solutions/manufacturing";
import Retail from "@/pages/solutions/retail";
import Technology from "@/pages/solutions/technology";
import Education from "@/pages/solutions/education";
import AIAutomation from "@/pages/solutions/ai-automation";
import DataAnalytics from "@/pages/solutions/data-analytics";
import Blockchain from "@/pages/solutions/blockchain";
import SmartBusiness from "@/pages/solutions/smart-business";
import ComputerVision from "@/pages/solutions/computer-vision";
import SecurityCompliance from "@/pages/solutions/security-compliance";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/solutions" component={Solutions} />
          <Route path="/resources" component={Resources} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/get-started" component={GetStarted} />
          <Route path="/demo" component={Demo} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/cookies" component={Cookies} />
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
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
