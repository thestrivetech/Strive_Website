/**
 * Service Worker Update Manager
 * Handles automatic service worker updates and cache invalidation
 */

export class ServiceWorkerUpdateManager {
  private updateAvailable = false;

  constructor() {
    this.init();
  }

  private async init() {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return;
    }

    try {
      // Check for service worker updates every 30 seconds when page is visible
      this.setupPeriodicUpdateCheck();
      
      // Listen for service worker state changes
      this.setupServiceWorkerListener();
      
      // Force update when tab becomes visible
      this.setupVisibilityChangeListener();
      
    } catch (error) {
      console.error('Failed to initialize ServiceWorker Update Manager:', error);
    }
  }

  private setupPeriodicUpdateCheck() {
    const checkInterval = 30000; // 30 seconds
    
    const checkForUpdates = async () => {
      if (document.hidden) return; // Don't check when tab is hidden
      
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.update();
        }
      } catch (error) {
        console.error('Failed to check for service worker updates:', error);
      }
    };

    setInterval(checkForUpdates, checkInterval);
  }

  private setupServiceWorkerListener() {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // Service worker has been updated, reload the page
      console.log('Service Worker updated, reloading page...');
      window.location.reload();
    });

    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SW_UPDATE_AVAILABLE') {
        this.updateAvailable = true;
        this.promptUserForUpdate();
      }
    });
  }

  private setupVisibilityChangeListener() {
    document.addEventListener('visibilitychange', async () => {
      if (!document.hidden && this.updateAvailable) {
        // Page became visible and update is available, force reload
        console.log('Page visible with update available, reloading...');
        window.location.reload();
      }
    });
  }

  private promptUserForUpdate() {
    // For now, just automatically update. Could show a toast/banner in the future
    console.log('New version available, updating...');
    
    // Skip the prompt and immediately update
    setTimeout(() => {
      window.location.reload();
    }, 1000); // Small delay to allow current operations to complete
  }

  public async forceUpdate() {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration && registration.waiting) {
        // Tell the waiting service worker to skip waiting
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    } catch (error) {
      console.error('Failed to force service worker update:', error);
    }
  }

  public async clearAllCaches() {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('All caches cleared');
    } catch (error) {
      console.error('Failed to clear caches:', error);
    }
  }

  public async checkForUpdates() {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to check for updates:', error);
      return false;
    }
  }
}

// Initialize the update manager when the module is loaded
let updateManager: ServiceWorkerUpdateManager | null = null;

export function initServiceWorkerUpdates() {
  if (!updateManager) {
    updateManager = new ServiceWorkerUpdateManager();
  }
  return updateManager;
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServiceWorkerUpdates);
  } else {
    initServiceWorkerUpdates();
  }
}