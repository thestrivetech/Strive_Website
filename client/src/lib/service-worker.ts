/**
 * Phase 3: Advanced Service Worker Management
 * Handles PWA registration, updates, and offline functionality
 */

import { Workbox } from 'workbox-window';
import { VersionManager } from './version-manager';

interface ServiceWorkerOptions {
  onNeedRefresh?: () => void;
  onOfflineReady?: () => void;
  onRegistered?: (registration: ServiceWorkerRegistration) => void;
  onRegisterError?: (error: any) => void;
}

class ServiceWorkerManager {
  private workbox: Workbox | null = null;
  private registration: ServiceWorkerRegistration | null = null;
  private updateAvailable = false;

  async initialize(options: ServiceWorkerOptions = {}) {
    if ('serviceWorker' in navigator) {
      try {
        // Clean up old service workers first
        await this.cleanupOldServiceWorkers();

        this.workbox = new Workbox('/sw.js');

        // Handle service worker lifecycle events
        this.setupEventListeners(options);

        // Register the service worker
        this.registration = await this.workbox.register() || null;

        console.log('✅ Service Worker registered successfully');
        if (this.registration) {
          options.onRegistered?.(this.registration);
        }

        // Initialize version manager
        VersionManager.initialize();

        // Check for updates every 60 seconds
        this.setupUpdateCheck();

      } catch (error) {
        console.error('❌ Service Worker registration failed:', error);
        options.onRegisterError?.(error);
      }
    } else {
      console.warn('⚠️ Service Workers are not supported in this browser');
    }
  }

  private setupEventListeners(options: ServiceWorkerOptions) {
    if (!this.workbox) return;

    // Service worker is waiting to activate
    this.workbox.addEventListener('waiting', (event) => {
      console.log('🔄 Service Worker update available');
      this.updateAvailable = true;
      options.onNeedRefresh?.();
    });

    // Service worker has been activated
    this.workbox.addEventListener('controlling', (event) => {
      console.log('🎯 Service Worker is controlling the page');
      window.location.reload();
    });

    // App is ready to work offline
    this.workbox.addEventListener('installed', (event) => {
      if (!event.isUpdate) {
        console.log('📴 App is ready to work offline');
        options.onOfflineReady?.();
      }
    });

    // Handle runtime errors
    this.workbox.addEventListener('redundant', (event) => {
      console.warn('⚠️ Service Worker became redundant');
    });
  }

  private setupUpdateCheck() {
    // Check for updates every 60 seconds
    setInterval(async () => {
      if (this.registration) {
        await this.registration.update();
      }
    }, 60000);

    // Also check when the page becomes visible
    document.addEventListener('visibilitychange', async () => {
      if (!document.hidden && this.registration) {
        await this.registration.update();
      }
    });
  }

  /**
   * Clean up any old service workers that might be registered
   */
  private async cleanupOldServiceWorkers() {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      
      for (const registration of registrations) {
        // Unregister any service workers that are not our main SW
        if (registration.active && !registration.active.scriptURL.endsWith('/sw.js')) {
          await registration.unregister();
          console.log('🧹 Cleaned up old service worker:', registration.active.scriptURL);
        }
      }
    }
  }

  /**
   * Manually trigger service worker update
   */
  async update() {
    if (this.workbox && this.updateAvailable) {
      // Tell the waiting service worker to skip waiting and become active
      await this.workbox.messageSkipWaiting();
    }
  }

  /**
   * Get cache information
   */
  async getCacheInfo() {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      const cacheInfo = await Promise.all(
        cacheNames.map(async (name) => {
          const cache = await caches.open(name);
          const keys = await cache.keys();
          return {
            name,
            size: keys.length
          };
        })
      );

      return cacheInfo;
    }
    return [];
  }

  /**
   * Clear all caches (useful for debugging)
   */
  async clearCaches() {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(name => caches.delete(name))
      );
      console.log('🗑️ All caches cleared');
    }
  }

  /**
   * Check if the app is running offline
   */
  get isOffline() {
    return !navigator.onLine;
  }

  /**
   * Get service worker registration
   */
  get serviceWorker() {
    return this.registration;
  }
}

// Global service worker manager instance
export const serviceWorkerManager = new ServiceWorkerManager();

// Convenience function to initialize service worker
export async function initializeServiceWorker(options?: ServiceWorkerOptions) {
  return await serviceWorkerManager.initialize(options);
}

// Hook for React components
export function useServiceWorker() {
  return {
    manager: serviceWorkerManager,
    update: () => serviceWorkerManager.update(),
    isOffline: serviceWorkerManager.isOffline,
    getCacheInfo: () => serviceWorkerManager.getCacheInfo(),
    clearCaches: () => serviceWorkerManager.clearCaches()
  };
}

// Offline/Online event handlers
export function setupNetworkHandlers() {
  window.addEventListener('online', () => {
    console.log('🌐 Network: Online');
    document.body.classList.remove('offline');
    document.body.classList.add('online');
  });

  window.addEventListener('offline', () => {
    console.log('📴 Network: Offline');
    document.body.classList.remove('online');
    document.body.classList.add('offline');
  });

  // Set initial state
  if (navigator.onLine) {
    document.body.classList.add('online');
  } else {
    document.body.classList.add('offline');
  }
}

// PWA install prompt handler
export class PWAInstallPrompt {
  private deferredPrompt: any = null;
  private installed = false;

  constructor() {
    this.setupInstallPrompt();
  }

  private setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('💾 PWA install prompt available');
      e.preventDefault();
      this.deferredPrompt = e;
    });

    window.addEventListener('appinstalled', () => {
      console.log('📱 PWA installed successfully');
      this.installed = true;
      this.deferredPrompt = null;
    });
  }

  async showInstallPrompt() {
    if (!this.deferredPrompt) {
      console.warn('⚠️ PWA install prompt not available');
      return false;
    }

    try {
      await this.deferredPrompt.prompt();
      const choiceResult = await this.deferredPrompt.userChoice;

      console.log('PWA install choice:', choiceResult.outcome);

      this.deferredPrompt = null;
      return choiceResult.outcome === 'accepted';
    } catch (error) {
      console.error('❌ PWA install prompt error:', error);
      return false;
    }
  }

  get canInstall() {
    return !!this.deferredPrompt && !this.installed;
  }

  get isInstalled() {
    return this.installed || window.matchMedia('(display-mode: standalone)').matches;
  }
}

export const pwaInstallPrompt = new PWAInstallPrompt();

// Export types
export type { ServiceWorkerOptions };