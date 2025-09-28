import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import { initWebVitals } from "./lib/web-vitals";
import { initializeServiceWorker, setupNetworkHandlers } from "./lib/service-worker";

// Initialize Web Vitals monitoring with error handling
try {
  initWebVitals();
  console.log('✅ Web Vitals monitoring initialized');
} catch (error) {
  console.error('❌ Web Vitals initialization failed:', error);
  // Continue app execution - analytics failure shouldn't break the app
}

// Initialize Service Worker and PWA functionality with error handling
try {
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
  console.log('✅ Service Worker initialization started');
} catch (error) {
  console.error('❌ Service Worker initialization failed:', error);
  // Continue app execution - service worker failure shouldn't break the app
}

// Version manager is now initialized automatically by the service worker
// This ensures proper coordination between SW updates and version checks

// Setup network status handlers with error handling
try {
  setupNetworkHandlers();
  console.log('✅ Network handlers initialized');
} catch (error) {
  console.error('❌ Network handlers setup failed:', error);
  // Continue app execution
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);