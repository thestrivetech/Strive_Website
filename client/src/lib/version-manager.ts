/**
 * Version Manager - Handles app versioning and updates
 */

interface VersionInfo {
  version: string;
  timestamp: string;
  buildTime: string;
  commit?: string;
}

export class VersionManager {
  private static instance: VersionManager | null = null;
  private currentVersion: VersionInfo | null = null;
  private checkInterval = 60000; // 1 minute
  private intervalId?: number;
  private updateCheckInProgress = false;
  
  private constructor() {
    // Private constructor for singleton
  }
  
  static initialize() {
    if (!VersionManager.instance) {
      VersionManager.instance = new VersionManager();
      VersionManager.instance.init();
    }
    return VersionManager.instance;
  }
  
  private async init() {
    console.log('[Version Manager] Initializing...');
    
    // Get initial version from meta tag or SW
    this.currentVersion = await this.getCurrentVersion();
    console.log('[Version Manager] Current version:', this.currentVersion);
    
    // Start periodic checks
    this.startVersionChecking();
    
    // Check on visibility change
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && !this.updateCheckInProgress) {
        console.log('[Version Manager] Page visible, checking for updates...');
        this.checkForUpdate();
      }
    });
    
    // Listen for SW updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[Version Manager] Service Worker updated - reloading...');
        window.location.reload();
      });
      
      // Also listen for update found
      navigator.serviceWorker.ready.then(registration => {
        registration.addEventListener('updatefound', () => {
          console.log('[Version Manager] New service worker found');
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('[Version Manager] New content available');
                this.handleUpdate();
              }
            });
          }
        });
      });
    }
  }
  
  private async getCurrentVersion(): Promise<VersionInfo | null> {
    try {
      // Try to get from service worker first
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        return new Promise<VersionInfo | null>((resolve, reject) => {
          const channel = new MessageChannel();
          const timeout = setTimeout(() => {
            reject(new Error('Version request timeout'));
          }, 5000);
          
          channel.port1.onmessage = (event) => {
            clearTimeout(timeout);
            resolve({
              version: event.data.version,
              timestamp: event.data.timestamp,
              buildTime: new Date(parseInt(event.data.timestamp)).toISOString(),
            });
          };
          
          navigator.serviceWorker.controller?.postMessage(
            { type: 'GET_VERSION' },
            [channel.port2]
          );
        }).catch(() => null);
      }
    } catch (error) {
      console.error('[Version Manager] Failed to get version from SW:', error);
    }
    
    // Fallback to meta tag
    const meta = document.querySelector('meta[name="build-version"]');
    if (meta) {
      const content = meta.getAttribute('content') || '';
      const timestamp = document.querySelector('meta[name="build-timestamp"]')?.getAttribute('content') || Date.now().toString();
      return {
        version: content,
        timestamp: timestamp,
        buildTime: new Date(parseInt(timestamp)).toISOString(),
      };
    }
    
    return null;
  }
  
  private async checkForUpdate() {
    if (this.updateCheckInProgress) {
      console.log('[Version Manager] Update check already in progress');
      return;
    }
    
    this.updateCheckInProgress = true;
    
    try {
      // Fetch version manifest with cache bypass
      const response = await fetch(`/version.json?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Version check failed: ${response.status}`);
      }
      
      const remoteVersion: VersionInfo = await response.json();
      
      if (this.currentVersion && remoteVersion.timestamp !== this.currentVersion.timestamp) {
        console.log('[Version Manager] New version detected:', remoteVersion);
        console.log('[Version Manager] Current version:', this.currentVersion);
        await this.handleUpdate();
      } else {
        console.log('[Version Manager] Version check complete - no update needed');
      }
    } catch (error) {
      // Silently fail - don't break the app
      console.debug('[Version Manager] Version check failed:', error);
    } finally {
      this.updateCheckInProgress = false;
    }
  }
  
  private async handleUpdate() {
    console.log('[Version Manager] Handling update...');
    
    // Show update notification (optional)
    const shouldUpdate = await this.promptForUpdate();
    
    if (shouldUpdate) {
      // Clear caches
      await this.clearCaches();
      
      // Update service worker
      await this.updateServiceWorker();
      
      // Reload
      console.log('[Version Manager] Reloading page...');
      window.location.reload();
    }
  }
  
  private async promptForUpdate(): Promise<boolean> {
    // For now, auto-update after a short delay
    // You can replace this with a UI prompt
    console.log('[Version Manager] Auto-updating in 3 seconds...');
    
    // Optional: Show a notification
    if (typeof window !== 'undefined' && window.customElements) {
      const notification = document.createElement('div');
      notification.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: #4CAF50; color: white; padding: 16px; border-radius: 4px; z-index: 9999; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">
          New version available! Updating in 3 seconds...
        </div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => notification.remove(), 3000);
    }
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    return true;
  }
  
  private async clearCaches() {
    console.log('[Version Manager] Clearing caches...');
    
    if ('caches' in window) {
      const names = await caches.keys();
      const clearPromises = names
        .filter(name => !name.startsWith('chatbot-')) // Don't clear chatbot caches
        .map(name => {
          console.log(`[Version Manager] Deleting cache: ${name}`);
          return caches.delete(name);
        });
      
      await Promise.all(clearPromises);
    }
  }
  
  private async updateServiceWorker() {
    console.log('[Version Manager] Updating service worker...');
    
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await registration.update();
      
      if (registration.waiting) {
        console.log('[Version Manager] Sending skip waiting message...');
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    }
  }
  
  private startVersionChecking() {
    // Initial check after 30 seconds
    setTimeout(() => {
      if (!this.updateCheckInProgress) {
        this.checkForUpdate();
      }
    }, 30000);
    
    // Then check every minute
    this.intervalId = window.setInterval(() => {
      if (!this.updateCheckInProgress) {
        this.checkForUpdate();
      }
    }, this.checkInterval);
  }
  
  public destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  
  // Public method to manually check for updates
  public async checkNow() {
    await this.checkForUpdate();
  }
}

// Export singleton instance
export const versionManager = new VersionManager();