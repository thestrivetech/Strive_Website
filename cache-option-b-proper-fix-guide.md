# Option B: Proper Service Worker Fix - Complete Implementation Guide

## 🚨 CRITICAL SESSION START INSTRUCTIONS FOR CLAUDE CODE 🚨

**STOP AND READ THIS FIRST**: You are about to implement a critical fix for browser caching issues that are preventing users from seeing updated content without manually clearing their cache. This is a complex, multi-phase implementation that requires careful attention to detail.

### Your Mission
Fix the severe browser caching issue where users must manually clear cache (Ctrl+Shift+R) to see updates. The root cause is THREE competing cache layers, with an old service worker being the primary culprit.

### Session Setup Requirements

1. **CREATE A COMPREHENSIVE TODO LIST IMMEDIATELY** using the TodoWrite tool with ALL phases broken down into specific tasks. Each phase should have multiple subtasks. This is MANDATORY - do not proceed without it.

2. **Verify Prerequisites Before Starting**:
   - Confirm Node.js 22.x is installed
   - Ensure you're on the main branch with a clean working directory
   - Check that you have ~3-4 hours for implementation
   - Verify Vercel deployment access

3. **Critical Context**:
   - There's an existing `chatbot-sw.js` that MUST be preserved but scoped properly
   - Old service workers are aggressively caching HTML and serving stale content
   - Multiple conflicting cache layers are causing the issue
   - Users are experiencing business-critical problems due to stale content

4. **Implementation Approach**:
   - Follow EVERY step in sequence - no skipping
   - Test thoroughly at each phase before proceeding
   - Document any deviations or issues encountered
   - Use verbose logging during testing phases
   - Create backups before removing any files

5. **Success Criteria**:
   - ✅ Users see updates within 60 seconds of deployment
   - ✅ No manual cache clearing required
   - ✅ Chatbot functionality preserved
   - ✅ Performance maintained or improved
   - ✅ Works across all major browsers

### Required Todo List Structure
Your todo list MUST include at minimum:
- Phase 0: Environment Preparation (4-5 tasks)
- Phase 1: Clean Up Old Implementation (5-6 tasks)
- Phase 2: Implement Service Worker Architecture (4-5 tasks)
- Phase 3: Configure Vite PWA (3-4 tasks)
- Phase 4: Client-Side Registration (2-3 tasks)
- Phase 5: Configure Headers (2 tasks)
- Phase 6: Testing Strategy (6-7 tasks)
- Phase 7: Production Deployment (3-4 tasks)
- Phase 8: Migration Management (3 tasks)
- Final verification tasks

**DO NOT PROCEED** past Phase 0 until you have verified ALL prerequisites and created the complete todo list. Each task should be marked as completed before moving to the next.

### Emergency Contacts
If you encounter blocking issues:
1. The old service worker at `/sw.js` is the primary culprit
2. Check for multiple worker registrations in browser DevTools
3. The `chatbot-sw.js` must remain functional but scoped
4. Version detection is critical for auto-updates

**Remember**: This is a production website with active users. Take backups, test thoroughly, and follow the rollback plan if issues arise.

---

## Overview
This guide implements a production-ready caching solution that ensures users always see fresh content while maintaining optimal performance. This comprehensive guide includes all prerequisites, edge cases, and verification steps to ensure successful implementation.

## Pre-Implementation Checklist
- [ ] Have Git repository backed up
- [ ] Access to Vercel deployment  
- [ ] 3-4 hours of uninterrupted time
- [ ] Testing browsers ready (Chrome, Firefox, Safari, Edge)
- [ ] Understanding of service worker lifecycle
- [ ] Team notified of implementation
- [ ] Verify Node.js 22.x is installed (`node --version`)
- [ ] Ensure clean working directory (`git status`)

## Phase 0: Environment Preparation (15 minutes)

### Step 0.1: Verify Project State
```bash
# Check current branch
git branch --show-current
# Should be on main or create a feature branch

# Ensure clean state
git status
# Commit or stash any changes

# Pull latest changes
git pull origin main
```

### Step 0.2: Create Required Directories
```bash
# Create build plugins directory
mkdir -p build-plugins

# Create types directory if not exists
mkdir -p client/src/types
```

### Step 0.3: Update package.json Scripts
Verify these scripts exist in `package.json`:
```json
{
  "scripts": {
    "dev": "tsx scripts/dev.ts",
    "build": "npm run check && tsx scripts/build.ts", 
    "preview": "vite preview --port 5000",
    "check": "tsc --noEmit",
    "start": "NODE_ENV=production node dist/server.js"
  }
}
```

### Step 0.4: Update TypeScript Configuration
**File: `tsconfig.json`**

Add WebWorker types and ensure proper configuration:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable", "WebWorker"],
    "types": ["vite/client", "vite-plugin-pwa/client", "node"],
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "client/src/**/*",
    "server/**/*",
    "shared/**/*",
    "build-plugins/**/*",
    "scripts/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

## Phase 1: Clean Up Old Implementation (30 minutes)

### Step 1.1: Identify and Document Existing Service Workers
```bash
# List all service worker related files
echo "=== Service Worker Files Found ==="
find . -name "*sw*.js" -o -name "*service-worker*" -o -name "*workbox*" | grep -v node_modules

# Document what we found for rollback purposes
find . -name "*sw*.js" -o -name "*service-worker*" -o -name "*workbox*" | grep -v node_modules > sw-files-backup.txt
```

### Step 1.2: Remove Conflicting Service Workers (Keep chatbot-sw.js)
```bash
# Remove old generated service workers
rm -f dist/public/sw.js
rm -f dist/public/workbox-*.js
rm -f client/public/sw.js
rm -f client/public/sw-extension.js

# IMPORTANT: Keep chatbot-sw.js but we'll modify it later
echo "Keeping chatbot-sw.js for modification"
```

### Step 1.3: Clean Previous PWA Attempts
**File: `vite.config.ts`**

Remove any previous PWA configurations:
```typescript
// Remove these imports if they exist
// import { VitePWA } from "vite-plugin-pwa";

// Remove from plugins array
// Remove any VitePWA({ ... }) configurations

// The config should be clean of PWA references for now
```

### Step 1.4: Remove Broken Version Scripts
```bash
# Remove non-functional version scripts
rm -f scripts/build-version.js
rm -f client/src/lib/sw-update.ts
rm -f client/src/lib/vite-plugin-version.ts

# Create backup of removal
echo "Removed files:" >> sw-files-backup.txt
echo "scripts/build-version.js" >> sw-files-backup.txt
echo "client/src/lib/sw-update.ts" >> sw-files-backup.txt
```

### Step 1.5: Handle Chatbot Service Worker Scope
**File: `client/public/chatbot-sw.js`**

Modify the chatbot service worker to have limited scope:
```javascript
// At the top of chatbot-sw.js, add version and scope
const CHATBOT_VERSION = 'chatbot-v1';
const CHATBOT_SCOPE = '/chatbot/';

// Update all cache names to be prefixed
const CACHE_NAME = `${CHATBOT_VERSION}-assets`;

// Add scope check to fetch handler
self.addEventListener('fetch', (event) => {
  // Only handle requests within chatbot scope
  if (!event.request.url.includes(CHATBOT_SCOPE)) {
    return; // Let main SW handle it
  }
  
  // Existing chatbot fetch logic here...
});

// Add cleanup on activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name.startsWith('chatbot-') && name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});
```

## Phase 2: Implement Robust Service Worker Architecture (60 minutes)

### Step 2.1: Create Service Worker Type Definitions
**File: `client/src/types/sw.d.ts`**

```typescript
/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;
declare const __WB_MANIFEST: Array<{url: string; revision?: string} | string>;

// Add any custom types for your service worker
interface BuildInfo {
  version: string;
  timestamp: string;
  buildTime: string;
}
```

### Step 2.2: Create Custom Service Worker with Versioning
**File: `client/src/sw.ts`**

```typescript
/// <reference lib="webworker" />
/// <reference types="../types/sw" />

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { skipWaiting, clientsClaim } from 'workbox-core';

declare let self: ServiceWorkerGlobalScope;

// Version management - CRITICAL FOR UPDATES
const CACHE_VERSION = 'v1';
const BUILD_TIMESTAMP = '__BUILD_TIMESTAMP__';  // Will be replaced at build time

// Force immediate activation
skipWaiting();
clientsClaim();

// Clean up old versions
cleanupOutdatedCaches();

// Log version for debugging
console.log(`[SW] Installing Service Worker Version: ${CACHE_VERSION}-${BUILD_TIMESTAMP}`);

// Handle chatbot SW coexistence
self.addEventListener('install', (event) => {
  console.log('[SW] Service Worker installing...');
  
  // Ensure we don't conflict with chatbot SW
  event.waitUntil(
    caches.keys().then(names => {
      // Only delete non-chatbot caches from old versions
      const oldCaches = names.filter(name => 
        !name.startsWith('chatbot-') && 
        !name.startsWith(CACHE_VERSION)
      );
      return Promise.all(oldCaches.map(name => caches.delete(name)));
    })
  );
});

// Get precache manifest but EXCLUDE HTML
const manifest = self.__WB_MANIFEST.filter(entry => {
  const url = typeof entry === 'string' ? entry : entry.url;
  // Exclude HTML files and chatbot resources
  return !url.endsWith('.html') && 
         url !== '/' && 
         !url.includes('/chatbot/');
});

// Precache static assets only (NOT HTML)
precacheAndRoute(manifest);

// CRITICAL: HTML Strategy - Network First with proper fallback
registerRoute(
  ({ request, url }) => {
    // Only handle navigation requests not in chatbot scope
    return request.mode === 'navigate' && !url.pathname.startsWith('/chatbot/');
  },
  new NetworkFirst({
    cacheName: `${CACHE_VERSION}-html`,
    networkTimeoutSeconds: 3,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      {
        // Custom plugin to ensure HTML is always fresh
        requestWillFetch: async ({ request }) => {
          // Add cache-busting parameter
          const url = new URL(request.url);
          url.searchParams.set('sw-cache', BUILD_TIMESTAMP);
          return new Request(url.href, request);
        },
        fetchDidSucceed: async ({ response }) => {
          // Clone response to read body
          const clonedResponse = response.clone();
          
          // Never cache HTML responses
          const headers = new Headers(clonedResponse.headers);
          headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
          headers.set('X-SW-Version', `${CACHE_VERSION}-${BUILD_TIMESTAMP}`);
          
          return new Response(clonedResponse.body, {
            status: clonedResponse.status,
            statusText: clonedResponse.statusText,
            headers,
          });
        },
      },
    ],
  })
);

// JavaScript and CSS - Cache with version awareness
registerRoute(
  ({ request, url }) => {
    // Skip chatbot resources
    return /\.(js|css)$/.test(url.pathname) && !url.pathname.includes('/chatbot/');
  },
  new CacheFirst({
    cacheName: `${CACHE_VERSION}-static`,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// Images - Cache with expiration
registerRoute(
  ({ url }) => /\.(png|jpg|jpeg|svg|gif|webp|avif|ico)$/.test(url.pathname),
  new CacheFirst({
    cacheName: `${CACHE_VERSION}-images`,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// API calls - Network first with cache fallback
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: `${CACHE_VERSION}-api`,
    networkTimeoutSeconds: 5,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 minutes
      }),
    ],
  })
);

// Version check endpoint
self.addEventListener('message', (event) => {
  if (event.data?.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: CACHE_VERSION,
      timestamp: BUILD_TIMESTAMP,
    });
  }
  
  if (event.data?.type === 'SKIP_WAITING') {
    skipWaiting();
  }
  
  if (event.data?.type === 'CLEAR_CACHE') {
    caches.keys().then(names => {
      names.forEach(name => {
        // Don't delete chatbot caches
        if (name.startsWith(CACHE_VERSION) && !name.startsWith('chatbot-')) {
          caches.delete(name);
        }
      });
    });
  }
});

// Clean up old caches on activation
self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker activating...');
  
  event.waitUntil(
    (async () => {
      // Delete all caches that don't match current version or chatbot
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => !name.startsWith(CACHE_VERSION) && !name.startsWith('chatbot-'))
          .map(name => {
            console.log(`[SW] Deleting old cache: ${name}`);
            return caches.delete(name);
          })
      );
      
      // Claim all clients
      await clients.claim();
      
      console.log(`[SW] Service Worker activated: ${CACHE_VERSION}-${BUILD_TIMESTAMP}`);
    })()
  );
});

// Add error handling
self.addEventListener('error', (event) => {
  console.error('[SW] Service Worker error:', event.error);
});

// Log fetch errors for debugging
self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      try {
        // Let workbox handle it through registered routes
        return await fetch(event.request);
      } catch (error) {
        console.error('[SW] Fetch error:', error);
        throw error;
      }
    })()
  );
});
```

### Step 2.3: Create Version Manager
**File: `client/src/lib/version-manager.ts`**

```typescript
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
  private currentVersion: VersionInfo | null = null;
  private checkInterval = 60000; // 1 minute
  private intervalId?: number;
  private updateCheckInProgress = false;
  
  constructor() {
    this.initialize();
  }
  
  private async initialize() {
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
        return new Promise((resolve, reject) => {
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
          
          navigator.serviceWorker.controller.postMessage(
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
```

### Step 2.4: Create Build-Time Version Plugin
**File: `build-plugins/version-plugin.ts`**

```typescript
import { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

export function versionPlugin(): Plugin {
  const timestamp = Date.now().toString();
  const version = `${process.env.npm_package_version || '1.0.0'}-${timestamp}`;
  
  return {
    name: 'version-plugin',
    
    // Replace timestamp in SW
    transform(code, id) {
      if (id.includes('sw.ts') || id.includes('sw.js')) {
        console.log(`[Version Plugin] Replacing timestamp in ${id}`);
        return code.replace(/__BUILD_TIMESTAMP__/g, timestamp);
      }
      return code;
    },
    
    // Add version meta to HTML
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        console.log('[Version Plugin] Adding version meta tags to HTML');
        return html.replace(
          '</head>',
          `  <meta name="build-version" content="${version}">
  <meta name="build-timestamp" content="${timestamp}">
</head>`
        );
      },
    },
    
    // Generate version.json
    generateBundle() {
      const versionInfo = {
        version,
        timestamp,
        buildTime: new Date().toISOString(),
        commit: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
      };
      
      console.log('[Version Plugin] Generating version.json:', versionInfo);
      
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify(versionInfo, null, 2),
      });
    },
  };
}
```

## Phase 3: Configure Vite for Proper PWA (30 minutes)

### Step 3.1: Install Required Dependencies
```bash
# Install PWA and Workbox dependencies
npm install -D vite-plugin-pwa@^0.17.0 workbox-window@^7.0.0
npm install -D @types/workbox-window

# Ensure all workbox runtime dependencies are installed
npm install workbox-precaching@^7.0.0 workbox-routing@^7.0.0 workbox-strategies@^7.0.0 workbox-cacheable-response@^7.0.0 workbox-expiration@^7.0.0 workbox-core@^7.0.0
```

### Step 3.2: Create PWA Assets
```bash
# Create required PWA icons if they don't exist
# If you have a logo, generate proper sizes, otherwise create placeholders

# Create public directory for PWA assets
mkdir -p client/public

# If you have ImageMagick installed:
# convert your-logo.png -resize 192x192 client/public/pwa-192x192.png
# convert your-logo.png -resize 512x512 client/public/pwa-512x512.png

# Otherwise, create placeholder files (replace these with real icons later)
if [ ! -f "client/public/pwa-192x192.png" ]; then
  echo "Creating placeholder PWA icons..."
  cp client/public/favicon.ico client/public/pwa-192x192.png 2>/dev/null || echo "Add pwa-192x192.png"
fi

if [ ! -f "client/public/pwa-512x512.png" ]; then
  cp client/public/favicon.ico client/public/pwa-512x512.png 2>/dev/null || echo "Add pwa-512x512.png"
fi
```

### Step 3.3: Configure Vite PWA Plugin
**File: `vite.config.ts`**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { versionPlugin } from './build-plugins/version-plugin';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    versionPlugin(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'prompt', // Show update prompt
      includeAssets: ['favicon.ico', 'robots.txt', 'sitemap.xml'],
      
      injectManifest: {
        globPatterns: ['**/*.{js,css,ico,png,svg,webp,woff2}'],
        // CRITICAL: Don't cache HTML
        globIgnores: ['**/index.html', '**/*.html'],
        swDest: 'dist/public/sw.js',
        maximumFileSizeToCacheInBytes: 3000000, // 3MB
        
        // Ensure chatbot resources are excluded
        manifestTransforms: [
          (manifestEntries) => {
            const manifest = manifestEntries.filter(entry => {
              return !entry.url.includes('/chatbot/');
            });
            return { manifest };
          }
        ],
      },
      
      manifest: {
        name: 'Strive Tech Solutions',
        short_name: 'Strive Tech',
        description: 'AI-powered business solutions',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: false, // Don't skip - let version manager handle
        clientsClaim: true,
        sourcemap: true
      },
      
      devOptions: {
        enabled: false, // Don't run in dev
        type: 'module',
      }
    }),
  ],
  
  // Path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
  
  build: {
    sourcemap: true, // Enable for debugging
    rollupOptions: {
      output: {
        // Ensure consistent hashing
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['wouter'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
        // Use content hash for cache busting
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  
  server: {
    port: 5000,
    strictPort: false,
  },
  
  preview: {
    port: 5000,
  }
});
```

## Phase 4: Implement Smart Client-Side Registration (30 minutes)

### Step 4.1: Create Service Worker Registration Manager
**File: `client/src/lib/sw-registration.ts`**

```typescript
import { Workbox } from 'workbox-window';

export interface SWConfig {
  onNeedRefresh?: () => void;
  onOfflineReady?: () => void;
  onRegistered?: (registration: ServiceWorkerRegistration) => void;
  onRegisterError?: (error: Error) => void;
}

class ServiceWorkerManager {
  private wb: Workbox | null = null;
  private registration: ServiceWorkerRegistration | null = null;
  private registrationPromise: Promise<void> | null = null;
  
  async register(config: SWConfig = {}) {
    // Prevent multiple registrations
    if (this.registrationPromise) {
      console.log('[SW Manager] Registration already in progress');
      return this.registrationPromise;
    }
    
    this.registrationPromise = this.performRegistration(config);
    return this.registrationPromise;
  }
  
  private async performRegistration(config: SWConfig) {
    if (!('serviceWorker' in navigator)) {
      console.log('[SW Manager] Service Workers not supported');
      return;
    }
    
    try {
      // First, clean up any old registrations
      await this.cleanupOldWorkers();
      
      // Check for module worker support
      const supportsModuleWorker = await this.checkModuleWorkerSupport();
      
      // Create new Workbox instance
      this.wb = new Workbox('/sw.js', {
        scope: '/',
        type: supportsModuleWorker ? 'module' : 'classic',
      });
      
      // Set up event listeners
      this.setupEventListeners(config);
      
      // Register the service worker
      this.registration = await this.wb.register();
      
      console.log('[SW Manager] Service Worker registered successfully');
      config.onRegistered?.(this.registration);
      
      // Start update checks
      this.startUpdateChecks();
      
    } catch (error) {
      console.error('[SW Manager] Service Worker registration failed:', error);
      config.onRegisterError?.(error as Error);
      
      // Fallback: Try to work without service worker
      console.log('[SW Manager] Falling back to no service worker mode');
    }
  }
  
  private async checkModuleWorkerSupport(): Promise<boolean> {
    try {
      // Try to check if module workers are supported
      if (!CSS.supports) return false;
      
      // Modern browser check
      return 'serviceWorker' in navigator && 
             'type' in ServiceWorkerRegistration.prototype;
    } catch {
      return false;
    }
  }
  
  private async cleanupOldWorkers() {
    console.log('[SW Manager] Cleaning up old workers...');
    const registrations = await navigator.serviceWorker.getRegistrations();
    
    // Log all found registrations
    console.log(`[SW Manager] Found ${registrations.length} service worker(s)`);
    registrations.forEach((reg, index) => {
      console.log(`[SW Manager] Registration ${index + 1}:`, {
        scope: reg.scope,
        scriptURL: reg.active?.scriptURL || 'none',
        state: reg.active?.state || 'none'
      });
    });
    
    // Unregister problematic workers
    const problematicPatterns = [
      '/sw.js',
      '/public/sw.js', 
      '/dist/sw.js',
      'workbox-',
      'sw-extension.js'
    ];
    
    for (const reg of registrations) {
      const scriptURL = reg.active?.scriptURL || '';
      
      // Keep chatbot SW
      if (scriptURL.includes('chatbot-sw.js')) {
        console.log('[SW Manager] Keeping chatbot service worker');
        continue;
      }
      
      // Check if it's an old/problematic worker
      const shouldUnregister = 
        reg.scope !== new URL('/', location.href).href ||
        problematicPatterns.some(pattern => scriptURL.includes(pattern));
      
      if (shouldUnregister) {
        console.log('[SW Manager] Unregistering old worker:', scriptURL);
        await reg.unregister();
      }
    }
  }
  
  private setupEventListeners(config: SWConfig) {
    if (!this.wb) return;
    
    let refreshing = false;
    
    // New content available
    this.wb.addEventListener('waiting', () => {
      console.log('[SW Manager] New content available - prompting for refresh');
      config.onNeedRefresh?.();
    });
    
    // Service worker activated
    this.wb.addEventListener('controlling', () => {
      if (!refreshing) {
        console.log('[SW Manager] Service Worker controlling - reloading');
        window.location.reload();
        refreshing = true;
      }
    });
    
    // First install
    this.wb.addEventListener('activated', (event) => {
      if (!event.isUpdate) {
        console.log('[SW Manager] App ready for offline use');
        config.onOfflineReady?.();
      } else {
        console.log('[SW Manager] Service Worker updated');
      }
    });
    
    // Handle messages from SW
    this.wb.addEventListener('message', (event) => {
      console.log('[SW Manager] Message from SW:', event.data);
    });
  }
  
  private startUpdateChecks() {
    // Check for updates every 60 seconds when visible
    setInterval(async () => {
      if (!document.hidden && this.registration) {
        console.log('[SW Manager] Checking for updates...');
        await this.registration.update();
      }
    }, 60000);
    
    // Check on visibility change
    document.addEventListener('visibilitychange', async () => {
      if (!document.hidden && this.registration) {
        console.log('[SW Manager] Page visible, checking for updates...');
        await this.registration.update();
      }
    });
    
    // Check on focus
    window.addEventListener('focus', async () => {
      if (this.registration) {
        console.log('[SW Manager] Window focused, checking for updates...');
        await this.registration.update();
      }
    });
  }
  
  async update() {
    if (this.wb && this.registration) {
      console.log('[SW Manager] Manual update triggered');
      
      // Skip waiting and activate new SW
      this.wb.addEventListener('waiting', () => {
        this.wb?.messageSkipWaiting();
      });
      
      await this.registration.update();
    }
  }
  
  async unregister() {
    if (this.registration) {
      console.log('[SW Manager] Unregistering service worker');
      await this.registration.unregister();
      this.registration = null;
      this.wb = null;
    }
  }
}

export const swRegistration = new ServiceWorkerManager();
```

### Step 4.2: Update Main App Entry
**File: `client/src/main.tsx`**

```typescript
import { createRoot } from 'react-dom/client';
import App from './App';
import { swRegistration } from './lib/sw-registration';
import { versionManager } from './lib/version-manager';

// Only register SW in production
if (import.meta.env.PROD) {
  // Register service worker with update prompts
  swRegistration.register({
    onNeedRefresh: () => {
      // You can show a toast here
      console.log('[Main] Update available - refresh to get latest version');
      
      // Create update notification
      const notification = document.createElement('div');
      notification.id = 'update-notification';
      notification.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: #2563eb; color: white; padding: 16px 20px; border-radius: 8px; z-index: 9999; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-family: system-ui, sans-serif; font-size: 14px; display: flex; align-items: center; gap: 12px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2v6m0 0l3-3m-3 3l-3-3m9 3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>New version available! Refreshing in 5 seconds...</span>
        </div>
      `;
      document.body.appendChild(notification);
      
      // Auto-refresh after 5 seconds
      setTimeout(() => {
        notification.remove();
        window.location.reload();
      }, 5000);
    },
    
    onOfflineReady: () => {
      console.log('[Main] App ready to work offline');
    },
    
    onRegistered: (registration) => {
      console.log('[Main] SW registered:', registration);
    },
    
    onRegisterError: (error) => {
      console.error('[Main] SW registration failed:', error);
      // App continues to work without SW
    }
  });
} else {
  console.log('[Main] Skipping SW registration in development');
}

// Add global error handler for SW issues
window.addEventListener('error', (event) => {
  if (event.error?.message?.includes('Service Worker')) {
    console.error('[Main] Service Worker error:', event.error);
    event.preventDefault(); // Prevent breaking the app
  }
});

// Mount React app
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

createRoot(container).render(<App />);

// Debug info in development
if (import.meta.env.DEV) {
  console.log('[Main] Running in development mode');
  console.log('[Main] Vite env:', import.meta.env);
}
```

## Phase 5: Configure Server and CDN Headers (30 minutes)

### Step 5.1: Configure Vercel Headers
**File: `vercel.json`**

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "framework": null,
  
  "rewrites": [
    {
      "source": "/((?!api|_next|favicon.ico|sw.js|workbox-|chatbot-sw.js|pwa-|manifest.json|version.json).*)",
      "destination": "/index.html"
    }
  ],
  
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        },
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        }
      ]
    },
    {
      "source": "/chatbot-sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        },
        {
          "key": "Service-Worker-Allowed",
          "value": "/chatbot/"
        }
      ]
    },
    {
      "source": "/version.json",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        },
        {
          "key": "Pragma",
          "value": "no-cache"
        },
        {
          "key": "Expires",
          "value": "0"
        }
      ]
    },
    {
      "source": "/(index.html|/)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        },
        {
          "key": "Pragma",
          "value": "no-cache"
        },
        {
          "key": "X-Robots-Tag",
          "value": "index, follow"
        }
      ]
    },
    {
      "source": "/(.*).html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "ALLOWALL"
        },
        {
          "key": "Content-Security-Policy",
          "value": "frame-ancestors 'self' https://chatbot.strivetech.ai https://strivetech.ai https://www.strivetech.ai http://localhost:* http://127.0.0.1:*;"
        }
      ]
    }
  ]
}
```

### Step 5.2: Configure Express Server Headers
**File: `server/vite.ts` (or wherever your Express static middleware is configured)**

```typescript
import express from 'express';
import path from 'path';

// In your Express setup
export function configureStaticAssets(app: express.Application, distPath: string) {
  app.use(express.static(distPath, {
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      const ext = path.extname(filePath);
      const filename = path.basename(filePath);
      
      // HTML files - no cache
      if (ext === '.html' || filePath.endsWith('/')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        return;
      }
      
      // Service workers - special handling
      if (filename === 'sw.js' || filename === 'chatbot-sw.js' || filename.includes('workbox')) {
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        
        if (filename === 'sw.js') {
          res.setHeader('Service-Worker-Allowed', '/');
        } else if (filename === 'chatbot-sw.js') {
          res.setHeader('Service-Worker-Allowed', '/chatbot/');
        }
        return;
      }
      
      // Version file - no cache
      if (filename === 'version.json') {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        return;
      }
      
      // Manifest - short cache
      if (filename === 'manifest.json') {
        res.setHeader('Cache-Control', 'public, max-age=3600');
        return;
      }
      
      // Hashed assets - cache forever
      if (filePath.includes('.') && /\.[a-f0-9]{8}\./.test(filePath)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        return;
      }
      
      // PWA icons - long cache
      if (filename.startsWith('pwa-')) {
        res.setHeader('Cache-Control', 'public, max-age=2592000'); // 30 days
        return;
      }
      
      // Default - short cache
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  }));
}
```

## Phase 6: Comprehensive Testing Strategy (45 minutes)

### Step 6.1: Local Testing Setup
```bash
# Clean everything first
rm -rf dist
rm -rf node_modules/.vite
npm run clean 2>/dev/null || true

# Fresh build
npm run build

# Verify critical files exist
echo "=== Verifying build output ==="
ls -la dist/public/sw.js || echo "ERROR: sw.js not found!"
ls -la dist/public/version.json || echo "ERROR: version.json not found!"
cat dist/public/version.json

# Start local server
npm run preview  # or npm start
```

### Step 6.2: Browser DevTools Testing

**Chrome/Edge Testing Checklist:**
1. Open Chrome DevTools (F12)
2. Go to Application tab
3. **Service Workers section:**
   - [ ] Should show ONE SW for localhost:5000
   - [ ] Status: "activated and is running"
   - [ ] NO old workers from previous paths
   - [ ] Chatbot SW (if any) has different scope
4. **Cache Storage section:**
   - [ ] Should see versioned caches (v1-html, v1-static, v1-images, v1-api)
   - [ ] HTML cache should be empty or have network-fetched entries only
   - [ ] Static assets should be cached
5. **Network Tab testing:**
   - [ ] First load: All from network
   - [ ] Second load: HTML from ServiceWorker, assets from cache
   - [ ] Force refresh (Ctrl+F5): All from network again

### Step 6.3: Multiple Service Worker Verification
```javascript
// Run this in browser console
(async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();
  console.log('=== Service Worker Registrations ===');
  console.log(`Total registrations: ${registrations.length}`);
  
  registrations.forEach((reg, index) => {
    console.log(`\nRegistration ${index + 1}:`);
    console.log('  Scope:', reg.scope);
    console.log('  Active SW:', reg.active?.scriptURL || 'none');
    console.log('  State:', reg.active?.state || 'none');
    console.log('  Update state:', reg.updateViaCache);
  });
  
  // Check for problematic registrations
  const problems = registrations.filter(reg => {
    const url = reg.active?.scriptURL || '';
    return !url.includes('sw.js') && !url.includes('chatbot-sw.js');
  });
  
  if (problems.length > 0) {
    console.warn('\n⚠️ Found problematic registrations:', problems);
  } else {
    console.log('\n✅ All registrations look good!');
  }
  
  // Check cache storage
  const caches = await window.caches.keys();
  console.log('\n=== Cache Storage ===');
  console.log('Active caches:', caches);
  
  // Check for old caches
  const oldCaches = caches.filter(name => !name.startsWith('v1-') && !name.startsWith('chatbot-'));
  if (oldCaches.length > 0) {
    console.warn('⚠️ Found old caches:', oldCaches);
  }
})();
```

### Step 6.4: Update Testing Protocol

1. **Make a visible change:**
```bash
# Add a test banner to home page
echo "console.log('TEST UPDATE:', new Date().toISOString());" >> client/src/pages/Home.tsx
```

2. **Build and test locally:**
```bash
npm run build
npm run preview
```

3. **Test update flow:**
- Open site in regular browser window (not incognito)
- Open DevTools Console
- Note the current version in console logs
- Make another visible change
- Build again
- Wait 60 seconds OR refresh page
- Should see:
  - Console message about new version
  - Auto-refresh notification
  - New console.log with updated timestamp

### Step 6.5: Chatbot Functionality Test
If you have a chatbot:
1. Navigate to chatbot page
2. Verify chatbot loads correctly
3. Check DevTools > Application > Service Workers
   - Should see chatbot-sw.js with scope `/chatbot/`
4. Test chatbot functionality
5. Verify no cache conflicts

### Step 6.6: Cross-Browser Testing Matrix
Test in each browser:

**Desktop Browsers:**
- [ ] Chrome: Latest version
- [ ] Firefox: Latest version  
- [ ] Safari: Latest version (macOS)
- [ ] Edge: Latest version

**Mobile Browsers:**
- [ ] iOS Safari: Latest version
- [ ] Chrome Android: Latest version

**For each browser, verify:**
1. Service worker registers successfully
2. Updates are detected within 60 seconds
3. No console errors
4. Chatbot works (if applicable)
5. Cache headers are respected

## Phase 7: Production Deployment (30 minutes)

### Step 7.1: Pre-Deployment Verification
```bash
# 1. Run type checking
npm run check

# 2. Run any tests
npm test 2>/dev/null || echo "No tests configured"

# 3. Clean build one final time
rm -rf dist
npm run build

# 4. Verify critical files
echo "=== Pre-deployment checklist ==="
[ -f "dist/public/sw.js" ] && echo "✅ sw.js exists" || echo "❌ sw.js missing!"
[ -f "dist/public/version.json" ] && echo "✅ version.json exists" || echo "❌ version.json missing!"
[ -f "dist/public/index.html" ] && echo "✅ index.html exists" || echo "❌ index.html missing!"

# 5. Check version.json content
echo "\nVersion info:"
cat dist/public/version.json

# 6. Verify environment variables (if using Vercel)
echo "\nEnvironment check:"
echo "VERCEL_GIT_COMMIT_SHA: ${VERCEL_GIT_COMMIT_SHA:-not set}"
```

### Step 7.2: Deploy to Vercel
```bash
# 1. Stage all changes
git add .

# 2. Create detailed commit message
git commit -m "feat: Implement proper service worker with versioning system

- Add custom service worker with intelligent caching strategy
- Implement version management with auto-update detection
- Configure HTML to always fetch fresh (fixes stale content issue)
- Add build-time version injection for cache busting
- Separate main SW from chatbot SW to prevent conflicts
- Configure proper cache headers for all asset types
- Add automatic update notification with 5-second delay
- Implement comprehensive error handling and fallbacks
- Add monitoring for multiple SW registrations

BREAKING CHANGE: Old service workers will be unregistered automatically.
Users may see a brief update notification on first visit.

Fixes browser cache issues where users had to manually refresh"

# 3. Push to repository
git push origin main

# 4. Deploy to production (choose one):

# Option A: Auto-deploy via Git push (if configured)
echo "Deployment triggered via Git push"

# Option B: Manual Vercel CLI deployment
vercel --prod

# Option C: Deploy via Vercel dashboard
echo "Deploy via https://vercel.com/dashboard"
```

### Step 7.3: Post-Deployment Verification

1. **Check HTTP headers:**
```bash
# Wait for deployment to complete, then:
DOMAIN="your-domain.vercel.app"  # Replace with your domain

echo "=== Checking HTTP Headers ==="

# Check HTML headers (should be no-cache)
echo "\n1. HTML Headers:"
curl -I "https://${DOMAIN}/" | grep -i cache

# Check service worker headers  
echo "\n2. Service Worker Headers:"
curl -I "https://${DOMAIN}/sw.js" | grep -i cache

# Check version.json headers
echo "\n3. Version.json Headers:"
curl -I "https://${DOMAIN}/version.json" | grep -i cache

# Check asset headers (should be immutable)
echo "\n4. Asset Headers (need actual asset URL):"
echo "Check an asset URL from Network tab"
```

2. **Browser verification:**
```javascript
// Run in browser console on production site
(async () => {
  console.log('=== Production Verification ===');
  
  // Check service workers
  const regs = await navigator.serviceWorker.getRegistrations();
  console.log('Service Workers:', regs.length);
  regs.forEach(r => console.log(' -', r.active?.scriptURL));
  
  // Check version
  try {
    const v = await fetch('/version.json?t=' + Date.now());
    const version = await v.json();
    console.log('Current version:', version);
  } catch (e) {
    console.error('Version check failed:', e);
  }
  
  // Check caches
  const caches = await window.caches.keys();
  console.log('Active caches:', caches);
})();
```

## Phase 8: Migration Period Management (24-48 hours)

### Step 8.1: Add Temporary Aggressive Cleanup
**File: `client/index.html`**

Add this script temporarily (remove after 1 week):
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- existing head content -->
</head>
<body>
    <div id="root"></div>
    
    <!-- Temporary: Aggressive old SW cleanup (remove after 1 week) -->
    <script>
    (async function cleanupOldSW() {
      if ('serviceWorker' in navigator) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          let cleaned = false;
          
          for (const reg of registrations) {
            const scriptURL = reg.active?.scriptURL || '';
            
            // Skip chatbot SW
            if (scriptURL.includes('chatbot-sw.js')) {
              continue;
            }
            
            // Check if it's an old/problematic worker
            if (!scriptURL.endsWith('/sw.js') || 
                reg.scope !== new URL('/', location.href).href ||
                !reg.active) {
              console.log('[Cleanup] Removing old SW:', scriptURL);
              await reg.unregister();
              cleaned = true;
            }
          }
          
          if (cleaned) {
            // Clear all caches except chatbot
            const cacheNames = await caches.keys();
            await Promise.all(
              cacheNames
                .filter(name => !name.startsWith('chatbot-'))
                .map(name => caches.delete(name))
            );
            
            // Force reload
            setTimeout(() => window.location.reload(), 100);
          }
        } catch (e) {
          console.error('[Cleanup] Error:', e);
        }
      }
    })();
    </script>
    
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

### Step 8.2: Monitor Migration Progress
Create a simple monitoring endpoint:

**File: `api/sw-status.js` (Vercel serverless function)**
```javascript
export default function handler(req, res) {
  const info = {
    message: 'Service Worker Migration Status',
    timestamp: new Date().toISOString(),
    version: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
    deployment: process.env.VERCEL_DEPLOYMENT_ID || 'local',
    
    // Add any metrics you're tracking
    checkpoints: {
      deploymentTime: process.env.VERCEL_DEPLOYMENT_CREATED || 'unknown',
      environment: process.env.VERCEL_ENV || 'development'
    }
  };
  
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json(info);
}
```

### Step 8.3: Daily Migration Checklist
For the next 2-3 days, check:

**Day 1:**
- [ ] No user reports of cache issues
- [ ] Analytics show normal traffic patterns
- [ ] No console errors in production
- [ ] Version endpoint returning current version

**Day 2:**
- [ ] Check for any straggler users with old SWs
- [ ] Verify update mechanism working
- [ ] Monitor server load (should be normal)

**Day 3:**
- [ ] Remove aggressive cleanup script
- [ ] Final verification of all systems
- [ ] Document any edge cases found

## Phase 9: Troubleshooting Guide

### Common Issues and Solutions

#### Issue 1: "Service worker not registering"
```javascript
// Debug script
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered:', reg))
    .catch(err => console.error('SW registration failed:', err));
} else {
  console.log('Service Workers not supported');
}
```

**Solutions:**
- Check HTTPS (SW requires secure context)
- Verify sw.js is accessible at root
- Check console for specific errors
- Try incognito mode to rule out extensions

#### Issue 2: "Updates not detected"
**Diagnosis:**
1. Check version.json is updating: `curl https://yourdomain/version.json`
2. Check SW update checks in DevTools Network tab
3. Verify version manager is running

**Solutions:**
- Clear all caches manually once
- Check if SW is stuck in waiting state
- Force update: `registration.update()`

#### Issue 3: "Multiple service workers active"
```javascript
// Force cleanup script
(async () => {
  const regs = await navigator.serviceWorker.getRegistrations();
  for (const reg of regs) {
    if (!reg.active?.scriptURL.endsWith('/sw.js')) {
      await reg.unregister();
    }
  }
  window.location.reload();
})();
```

#### Issue 4: "Chatbot not working"
**Check:**
1. Chatbot SW still registered
2. Scope is `/chatbot/`
3. No cache conflicts

**Fix:**
- Re-register chatbot SW if needed
- Check chatbot-specific caches

#### Issue 5: "Performance degraded"
**Diagnosis:**
```javascript
// Check cache hit rates
const caches = await window.caches.keys();
for (const cacheName of caches) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  console.log(`Cache ${cacheName}: ${keys.length} entries`);
}
```

**Solutions:**
- Verify assets are being cached
- Check Network tab for proper cache headers
- Ensure SW isn't making unnecessary fetches

## Rollback Plan

If critical issues occur after deployment:

### Quick Rollback (< 5 minutes):
```bash
# 1. Revert the commit
git revert HEAD
git push origin main

# 2. Deploy immediately
vercel --prod

# 3. Add immediate SW unregistration to index.html:
<script>
navigator.serviceWorker?.getRegistrations().then(regs => {
  regs.forEach(reg => reg.unregister());
});
</script>
```

### Nuclear Option (Option A):
If rollback doesn't work, implement Option A immediately to disable all caching.

## Success Metrics

After 48-72 hours, verify:

✅ **Zero cache-related support tickets**
- No user complaints about stale content
- No reports of needing manual refresh

✅ **Update detection working**
- Version.json shows current deployment
- Updates visible within 60 seconds
- Auto-refresh happening smoothly

✅ **Performance maintained**
- Core Web Vitals unchanged or improved
- Asset cache hit rate > 80%
- HTML always fresh from network

✅ **Service worker stability**
- Single SW per domain (plus chatbot if applicable)
- No console errors in production
- Update mechanism functioning

✅ **Cross-browser compatibility**
- Working in all major browsers
- Mobile browsers updating correctly
- No browser-specific issues

## Long-term Maintenance

### Weekly Tasks:
1. Check version.json is updating with deployments
2. Monitor SW registration count in analytics
3. Review any user feedback about updates
4. Check cache storage usage

### Monthly Tasks:
1. Review cache strategy effectiveness
2. Update cache expiration if needed
3. Check for Workbox updates
4. Review and optimize cache sizes

### Quarterly Tasks:
1. Full audit of caching strategy
2. Update dependencies (Workbox, Vite PWA)
3. Review browser compatibility
4. Performance impact assessment

### After 1 Week:
**Remove temporary code:**
1. Remove aggressive cleanup script from index.html
2. Remove extra console.log statements
3. Clean up any debug code

## Final Checklist

Before considering this implementation complete:

- [ ] All old service workers unregistered
- [ ] Single main SW + chatbot SW (if applicable)  
- [ ] HTML never cached (always fresh)
- [ ] Assets properly cached with immutable headers
- [ ] Version detection working
- [ ] Auto-update mechanism functioning
- [ ] No console errors in production
- [ ] Tested on all major browsers
- [ ] Performance metrics acceptable
- [ ] Documentation updated
- [ ] Team trained on new system
- [ ] Monitoring in place

## Support Information

If issues arise:
1. Check browser console for errors
2. Review DevTools > Application > Service Workers
3. Test in incognito mode
4. Check version.json endpoint
5. Review Network tab for caching behavior

Remember: This solution ensures users always see fresh content while maintaining optimal performance. The slight complexity is worth the improved user experience and reduced support burden.