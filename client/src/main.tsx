import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import { initWebVitals } from "./lib/web-vitals";
import { initializeServiceWorker, setupNetworkHandlers } from "./lib/service-worker";

// Initialize Web Vitals monitoring
initWebVitals();

// Initialize Service Worker and PWA functionality
initializeServiceWorker({
  onNeedRefresh: () => {
    console.log('🔄 App update available - refresh to apply');
    // Could show a toast notification here
  },
  onOfflineReady: () => {
    console.log('📴 App ready to work offline');
    // Could show a toast notification here
  },
  onRegistered: (registration) => {
    console.log('✅ Service Worker registered:', registration);
  },
  onRegisterError: (error) => {
    console.error('❌ Service Worker registration error:', error);
  }
});

// Setup network status handlers
setupNetworkHandlers();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);