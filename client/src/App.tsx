import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import Login from "@/pages/login";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Cookies from "@/pages/cookies";
import Healthcare from "@/pages/solutions/healthcare";
import Financial from "@/pages/solutions/financial";
import Manufacturing from "@/pages/solutions/manufacturing";
import Retail from "@/pages/solutions/retail";
import Technology from "@/pages/solutions/technology";
import Education from "@/pages/solutions/education";
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
          <Route path="/login" component={Login} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/cookies" component={Cookies} />
          <Route path="/solutions/healthcare" component={Healthcare} />
          <Route path="/solutions/financial" component={Financial} />
          <Route path="/solutions/manufacturing" component={Manufacturing} />
          <Route path="/solutions/retail" component={Retail} />
          <Route path="/solutions/technology" component={Technology} />
          <Route path="/solutions/education" component={Education} />
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
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
