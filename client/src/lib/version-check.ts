/**
 * Version Check System
 * Monitors for app updates and forces reload when new version is detected
 */

declare global {
  interface Window {
    __BUILD_VERSION__?: string;
    __BUILD_TIMESTAMP__?: string;
  }
}

export class VersionChecker {
  private currentVersion: string | null = null;
  private checkInterval: number = 30000; // 30 seconds
  private intervalId?: NodeJS.Timeout;
  
  constructor() {
    this.currentVersion = this.getLocalVersion();
    this.init();
  }
  
  private init() {
    // Start periodic version checks
    this.startVersionChecking();
    
    // Check on visibility change
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.checkForUpdate();
      }
    });
    
    // Check on focus
    window.addEventListener('focus', () => {
      this.checkForUpdate();
    });
    
    // Check on online
    window.addEventListener('online', () => {
      setTimeout(() => this.checkForUpdate(), 1000);
    });
  }
  
  private getLocalVersion(): string | null {
    // Try to get version from window object (injected by Vite plugin)
    if (window.__BUILD_VERSION__) {
      return window.__BUILD_VERSION__;
    }
    
    // Try to get from meta tag
    const versionMeta = document.querySelector('meta[name="build-version"]');
    if (versionMeta) {
      return versionMeta.getAttribute('content');
    }
    
    return null;
  }
  
  private async getRemoteVersion(): Promise<string | null> {
    try {
      // Fetch index.html with cache-busting
      const response = await fetch(`/?t=${Date.now()}`, {
        method: 'HEAD',
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      
      // Check for version header
      const versionHeader = response.headers.get('X-Build-Version');
      if (versionHeader) {
        return versionHeader;
      }
      
      // Fetch and parse HTML to get version from meta tag
      const htmlResponse = await fetch(`/?t=${Date.now()}`, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });
      
      const html = await htmlResponse.text();
      const match = html.match(/<meta name="build-version" content="([^"]+)">/);
      if (match) {
        return match[1];
      }
    } catch (error) {
      console.error('Failed to check remote version:', error);
    }
    
    return null;
  }
  
  private async checkForUpdate() {
    const remoteVersion = await this.getRemoteVersion();
    
    if (!remoteVersion || !this.currentVersion) {
      console.log('Version check: Unable to determine versions');
      return;
    }
    
    if (remoteVersion !== this.currentVersion) {
      console.log(`New version available: ${remoteVersion} (current: ${this.currentVersion})`);
      this.handleUpdateAvailable();
    } else {
      console.log('Version check: Up to date');
    }
  }
  
  private handleUpdateAvailable() {
    // Clear all caches
    this.clearAllCaches();
    
    // Unregister service workers
    this.unregisterServiceWorkers();
    
    // Force reload after a short delay
    console.log('Update detected - reloading in 2 seconds...');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  
  private async clearAllCaches() {
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(name => caches.delete(name))
        );
        console.log('All caches cleared for update');
      }
    } catch (error) {
      console.error('Failed to clear caches:', error);
    }
  }
  
  private async unregisterServiceWorkers() {
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(
          registrations.map(reg => reg.unregister())
        );
        console.log('Service workers unregistered for update');
      }
    } catch (error) {
      console.error('Failed to unregister service workers:', error);
    }
  }
  
  private startVersionChecking() {
    // Initial check after 5 seconds
    setTimeout(() => this.checkForUpdate(), 5000);
    
    // Periodic checks
    this.intervalId = setInterval(() => {
      if (!document.hidden) {
        this.checkForUpdate();
      }
    }, this.checkInterval);
  }
  
  public destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  
  public forceCheck() {
    return this.checkForUpdate();
  }
}

// Initialize version checker
let versionChecker: VersionChecker | null = null;

export function initVersionChecker() {
  if (!versionChecker) {
    versionChecker = new VersionChecker();
    console.log('Version checker initialized');
  }
  return versionChecker;
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVersionChecker);
  } else {
    initVersionChecker();
  }
}