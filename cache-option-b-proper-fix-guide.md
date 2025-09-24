# Option B: Proper Service Worker Fix - Complete Implementation Guide

## Overview
This guide implements a production-ready caching solution that ensures users always see fresh content while maintaining optimal performance.

## Pre-Implementation Checklist
- [ ] Have Git repository backed up
- [ ] Access to Vercel deployment
- [ ] 3-4 hours of uninterrupted time
- [ ] Testing browsers ready (Chrome, Firefox, Safari, Edge)
- [ ] Understanding of service worker lifecycle
- [ ] Team notified of implementation

## Phase 1: Clean Up Old Implementation (30 minutes)

### Step 1.1: Remove Conflicting Service Workers
**First, identify what needs removal:**

Check for existing service worker files:
```bash
# List all service worker related files
find . -name "*sw*.js" -o -name "*service-worker*" -o -name "*workbox*"
```

Remove old/conflicting files:
```bash
# Remove old generated service workers
rm -f dist/public/sw.js
rm -f dist/public/workbox-*.js
rm -f client/public/sw.js
rm -f client/public/sw-extension.js

# Keep chatbot-sw.js if needed for chatbot functionality
# But we'll modify it to not conflict
```

### Step 1.2: Clean Previous Attempts
**File: `vite.config.ts`**

Remove any previous PWA configurations:
```typescript
// Remove old imports if they exist
// import { VitePWA } from "vite-plugin-pwa";

// Remove from plugins array
// Remove any VitePWA({ ... }) configurations
```

### Step 1.3: Remove Broken Version Scripts
```bash
# Remove non-functional version scripts
rm -f scripts/build-version.js
rm -f client/src/lib/sw-update.ts
rm -f client/src/lib/vite-plugin-version.ts  # If it exists and doesn't work
```

## Phase 2: Implement Robust Service Worker Architecture (60 minutes)

### Step 2.1: Create Custom Service Worker with Versioning
**File: `client/src/sw.ts`**

Create a new, properly architected service worker:
```typescript
/// <reference lib="webworker" />
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute, NavigationRoute, Route } from 'workbox-routing';
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
console.log(`Service Worker Version: ${CACHE_VERSION}-${BUILD_TIMESTAMP}`);

// Get precache manifest but EXCLUDE HTML
const manifest = self.__WB_MANIFEST.filter(entry => {
  const url = typeof entry === 'string' ? entry : entry.url;
  return !url.endsWith('.html') && url !== '/';
});

// Precache static assets only (NOT HTML)
precacheAndRoute(manifest);

// CRITICAL: HTML Strategy - Network First with proper fallback
registerRoute(
  ({ request }) => request.mode === 'navigate',
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
          // Never cache HTML responses
          const headers = new Headers(response.headers);
          headers.set('Cache-Control', 'no-cache, no-store');
          headers.set('X-SW-Version', `${CACHE_VERSION}-${BUILD_TIMESTAMP}`);
          
          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers,
          });
        },
      },
    ],
  })
);

// JavaScript and CSS - Cache with version awareness
registerRoute(
  ({ url }) => /\.(js|css)$/.test(url.pathname),
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
        if (name.startsWith(CACHE_VERSION)) {
          caches.delete(name);
        }
      });
    });
  }
});

// Clean up old caches on activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Delete all caches that don't match current version
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => !name.startsWith(CACHE_VERSION))
          .map(name => caches.delete(name))
      );
      
      // Claim all clients
      await clients.claim();
      
      console.log(`Service Worker activated: ${CACHE_VERSION}-${BUILD_TIMESTAMP}`);
    })()
  );
});
```

### Step 2.2: Create Version Manager
**File: `client/src/lib/version-manager.ts`**

```typescript
/**
 * Version Manager - Handles app versioning and updates
 */

interface VersionInfo {
  version: string;
  timestamp: string;
  buildTime: string;
}

export class VersionManager {
  private currentVersion: VersionInfo | null = null;
  private checkInterval = 60000; // 1 minute
  private intervalId?: number;
  
  constructor() {
    this.initialize();
  }
  
  private async initialize() {
    // Get initial version from meta tag or SW
    this.currentVersion = await this.getCurrentVersion();
    
    // Start periodic checks
    this.startVersionChecking();
    
    // Check on visibility change
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.checkForUpdate();
      }
    });
    
    // Listen for SW updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service Worker updated - reloading...');
        window.location.reload();
      });
    }
  }
  
  private async getCurrentVersion(): Promise<VersionInfo | null> {
    // Try to get from service worker
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      return new Promise((resolve) => {
        const channel = new MessageChannel();
        channel.port1.onmessage = (event) => {
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
      });
    }
    
    // Fallback to meta tag
    const meta = document.querySelector('meta[name="build-version"]');
    if (meta) {
      const content = meta.getAttribute('content') || '';
      return {
        version: content,
        timestamp: Date.now().toString(),
        buildTime: new Date().toISOString(),
      };
    }
    
    return null;
  }
  
  private async checkForUpdate() {
    try {
      // Fetch version manifest with cache bypass
      const response = await fetch(`/version.json?t=${Date.now()}`, {
        cache: 'no-cache',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      const remoteVersion: VersionInfo = await response.json();
      
      if (this.currentVersion && remoteVersion.timestamp !== this.currentVersion.timestamp) {
        console.log('New version detected:', remoteVersion);
        this.handleUpdate();
      }
    } catch (error) {
      // Silently fail - don't break the app
      console.debug('Version check failed:', error);
    }
  }
  
  private async handleUpdate() {
    // Show update notification (optional)
    const shouldUpdate = await this.promptForUpdate();
    
    if (shouldUpdate) {
      // Clear caches
      await this.clearCaches();
      
      // Update service worker
      await this.updateServiceWorker();
      
      // Reload
      window.location.reload();
    }
  }
  
  private async promptForUpdate(): Promise<boolean> {
    // For now, auto-update. You can add a UI prompt here
    console.log('Auto-updating to new version...');
    return true;
  }
  
  private async clearCaches() {
    if ('caches' in window) {
      const names = await caches.keys();
      await Promise.all(names.map(name => caches.delete(name)));
    }
  }
  
  private async updateServiceWorker() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await registration.update();
      
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    }
  }
  
  private startVersionChecking() {
    // Initial check after 30 seconds
    setTimeout(() => this.checkForUpdate(), 30000);
    
    // Then check every minute
    this.intervalId = window.setInterval(() => {
      this.checkForUpdate();
    }, this.checkInterval);
  }
  
  public destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

// Export singleton instance
export const versionManager = new VersionManager();
```

### Step 2.3: Create Build-Time Version Plugin
**File: `build-plugins/version-plugin.ts`**

```typescript
import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

export function versionPlugin(): Plugin {
  const timestamp = Date.now().toString();
  const version = `${process.env.npm_package_version || '1.0.0'}-${timestamp}`;
  
  return {
    name: 'version-plugin',
    
    // Replace timestamp in SW
    transform(code, id) {
      if (id.includes('sw.ts') || id.includes('sw.js')) {
        return code.replace(/__BUILD_TIMESTAMP__/g, timestamp);
      }
      return code;
    },
    
    // Add version meta to HTML
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
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
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify({
          version,
          timestamp,
          buildTime: new Date().toISOString(),
          commit: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
        }, null, 2),
      });
    },
  };
}
```

## Phase 3: Configure Vite for Proper PWA (30 minutes)

### Step 3.1: Install Required Dependencies
```bash
npm install -D vite-plugin-pwa workbox-window
npm install -D @types/workbox-window
```

### Step 3.2: Configure Vite PWA Plugin
**File: `vite.config.ts`**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { versionPlugin } from './build-plugins/version-plugin';

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
        maximumFileSizeToCacheInBytes: 3000000,
      },
      
      manifest: {
        name: 'Your App Name',
        short_name: 'AppName',
        description: 'Your app description',
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
  
  build: {
    sourcemap: true, // Enable for debugging
    rollupOptions: {
      output: {
        // Ensure consistent hashing
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['wouter'],
        },
        // Use content hash for cache busting
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
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

class ServiceWorkerRegistration {
  private wb: Workbox | null = null;
  private registration: ServiceWorkerRegistration | null = null;
  
  async register(config: SWConfig = {}) {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Workers not supported');
      return;
    }
    
    try {
      // First, clean up any old registrations
      await this.cleanupOldWorkers();
      
      // Create new Workbox instance
      this.wb = new Workbox('/sw.js', {
        scope: '/',
        type: 'module',
      });
      
      // Set up event listeners
      this.setupEventListeners(config);
      
      // Register the service worker
      this.registration = await this.wb.register();
      
      console.log('Service Worker registered successfully');
      config.onRegistered?.(this.registration);
      
      // Start update checks
      this.startUpdateChecks();
      
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      config.onRegisterError?.(error as Error);
    }
  }
  
  private async cleanupOldWorkers() {
    const registrations = await navigator.serviceWorker.getRegistrations();
    
    // Unregister any workers not at root scope
    for (const reg of registrations) {
      if (reg.scope !== new URL('/', location.href).href) {
        await reg.unregister();
        console.log('Unregistered old worker:', reg.scope);
      }
    }
  }
  
  private setupEventListeners(config: SWConfig) {
    if (!this.wb) return;
    
    let refreshing = false;
    
    // New content available
    this.wb.addEventListener('waiting', () => {
      console.log('New content available - prompting for refresh');
      config.onNeedRefresh?.();
    });
    
    // Service worker activated
    this.wb.addEventListener('controlling', () => {
      if (!refreshing) {
        console.log('Service Worker controlling - reloading');
        window.location.reload();
        refreshing = true;
      }
    });
    
    // First install
    this.wb.addEventListener('activated', (event) => {
      if (!event.isUpdate) {
        console.log('App ready for offline use');
        config.onOfflineReady?.();
      }
    });
  }
  
  private startUpdateChecks() {
    // Check for updates every 60 seconds when visible
    setInterval(async () => {
      if (!document.hidden && this.registration) {
        await this.registration.update();
      }
    }, 60000);
    
    // Check on visibility change
    document.addEventListener('visibilitychange', async () => {
      if (!document.hidden && this.registration) {
        await this.registration.update();
      }
    });
  }
  
  async update() {
    if (this.wb) {
      // Skip waiting and activate new SW
      this.wb.addEventListener('waiting', () => {
        this.wb?.messageSkipWaiting();
      });
      
      await this.registration?.update();
    }
  }
}

export const swRegistration = new ServiceWorkerRegistration();
```

### Step 4.2: Update Main App Entry
**File: `client/src/main.tsx`**

```typescript
import { createRoot } from 'react-dom/client';
import App from './App';
import { swRegistration } from './lib/sw-registration';
import { versionManager } from './lib/version-manager';

// Register service worker with update prompts
swRegistration.register({
  onNeedRefresh: () => {
    // You can show a toast here
    console.log('Update available - refresh to get latest version');
    
    // Auto-refresh after 5 seconds
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  },
  
  onOfflineReady: () => {
    console.log('App ready to work offline');
  },
  
  onRegistered: (registration) => {
    console.log('SW registered:', registration);
  },
  
  onRegisterError: (error) => {
    console.error('SW registration failed:', error);
  }
});

// Initialize version manager
// This is already done in the VersionManager constructor

// Mount React app
createRoot(document.getElementById('root')!).render(<App />);
```

## Phase 5: Configure Server and CDN Headers (30 minutes)

### Step 5.1: Configure Vercel Headers
**File: `vercel.json`**

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  
  "rewrites": [
    {
      "source": "/((?!api|_next|favicon.ico|sw.js|workbox-).*)",
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
      "source": "/index.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
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
          "value": "public, max-age=0, must-revalidate"
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
**File: `server/vite.ts`**

```typescript
import express from 'express';
import crypto from 'crypto';

app.use(express.static(distPath, {
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath);
    
    // HTML files - no cache
    if (ext === '.html') {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      return;
    }
    
    // Service worker - special handling
    if (filePath.includes('sw.js') || filePath.includes('workbox')) {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      res.setHeader('Service-Worker-Allowed', '/');
      return;
    }
    
    // Hashed assets - cache forever
    if (filePath.includes('.') && /\.[a-f0-9]{8}\./.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return;
    }
    
    // Default - short cache
    res.setHeader('Cache-Control', 'public, max-age=3600');
  }
}));
```

## Phase 6: Testing Strategy (45 minutes)

### Step 6.1: Local Testing
```bash
# Clean build
rm -rf dist
npm run build

# Start local server
npm run preview  # or npm start

# Test in browser
open http://localhost:5000
```

### Step 6.2: Browser DevTools Testing

**Chrome/Edge Testing:**
1. Open DevTools → Application
2. Service Workers:
   - Should show one SW for your domain
   - Status should be "activated and running"
   - Update on reload should be checked
3. Cache Storage:
   - Should see versioned caches (v1-html, v1-static, etc.)
   - HTML cache should be empty or minimal
4. Network Tab:
   - HTML requests should show "(from ServiceWorker)"
   - Assets should show "(from cache)"

### Step 6.3: Update Testing Protocol

1. **Make a visible change:**
```bash
# Change something obvious in your homepage
echo "<!-- Test Update ${date} -->" >> client/src/pages/Home.tsx
```

2. **Build and deploy locally:**
```bash
npm run build
npm run preview
```

3. **Test update detection:**
- Open site in browser
- Wait 60 seconds (or trigger manual check)
- Should see console message about update
- Page should reload automatically
- New content should be visible

### Step 6.4: Multi-Browser Testing Checklist
- [ ] Chrome: Service worker active, updates work
- [ ] Firefox: Service worker active, updates work  
- [ ] Safari: Service worker active, updates work
- [ ] Edge: Service worker active, updates work
- [ ] Mobile Chrome: Updates work
- [ ] Mobile Safari: Updates work

## Phase 7: Production Deployment (30 minutes)

### Step 7.1: Pre-Deployment Checks
```bash
# Run type checking
npm run check

# Run tests if available
npm test

# Build production
npm run build

# Verify SW exists
ls -la dist/public/sw.js

# Check version.json
cat dist/public/version.json
```

### Step 7.2: Deploy to Vercel
```bash
# Commit changes
git add .
git commit -m "feat: Implement proper service worker with versioning

- Add custom service worker with version management
- Implement smart caching strategy (HTML always fresh)
- Add automatic update detection and reload
- Configure proper cache headers for all assets
- Add build-time version injection
- Ensure users always see latest content

Fixes #[issue-number]"

# Push to repository
git push origin main

# Deploy to production
vercel --prod
```

### Step 7.3: Post-Deployment Verification

1. **Check response headers:**
```bash
# HTML should have no-cache
curl -I https://yourdomain.com
# Should show: Cache-Control: public, max-age=0, must-revalidate

# Assets should have immutable
curl -I https://yourdomain.com/assets/main.[hash].js
# Should show: Cache-Control: public, max-age=31536000, immutable

# Service worker should have no-cache
curl -I https://yourdomain.com/sw.js
# Should show: Cache-Control: public, max-age=0, must-revalidate
```

2. **Check service worker registration:**
- Visit site in browser
- Open DevTools → Application → Service Workers
- Should see active worker with correct scope

3. **Test update flow:**
- Make a small change
- Deploy
- Wait up to 60 seconds
- Should see automatic refresh

## Phase 8: Migration Period Management (24-48 hours)

### Step 8.1: Monitor Old Service Workers
Create monitoring endpoint:

**File: `api/sw-status.js`**
```javascript
export default function handler(req, res) {
  res.json({
    message: 'Service Worker Status Endpoint',
    timestamp: Date.now(),
    version: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown'
  });
}
```

### Step 8.2: Force Update for Stuck Users
If some users still have old SW after 48 hours, add aggressive cleanup:

**File: `client/index.html`**
```html
<!-- Temporary: Remove after 1 week -->
<script>
(async function cleanupOldSW() {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const reg of registrations) {
      // Check if it's an old worker
      if (reg.active && !reg.active.scriptURL.includes('?v=')) {
        console.log('Found old SW, unregistering:', reg.scope);
        await reg.unregister();
        window.location.reload();
      }
    }
  }
})();
</script>
```

## Phase 9: Performance Monitoring (Ongoing)

### Step 9.1: Add Analytics
Track cache performance:

```javascript
// In your analytics code
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    // Track SW status
    analytics.track('sw_status', {
      active: !!registration.active,
      waiting: !!registration.waiting,
      installing: !!registration.installing
    });
  });
}
```

### Step 9.2: Monitor Core Web Vitals
The caching should improve:
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

## Troubleshooting Guide

### Issue: Old service worker won't update
**Solution:**
1. Add more aggressive unregistration
2. Use Clear-Site-Data header
3. Wait 24-48 hours for natural expiry

### Issue: HTML still cached
**Solution:**
1. Check SW is excluding HTML from precache
2. Verify NetworkFirst strategy for navigation
3. Check CDN isn't caching HTML

### Issue: Updates not detected
**Solution:**
1. Verify version.json is generated
2. Check version manager is running
3. Ensure SW update checks are working

### Issue: Performance degraded
**Solution:**
1. Check cache hit rates
2. Verify assets are being cached
3. Ensure SW isn't over-fetching

### Issue: Service worker not registering
**Solution:**
1. Check HTTPS is enabled
2. Verify SW file is accessible
3. Check for console errors
4. Ensure scope is correct

## Rollback Plan

If critical issues occur:

```bash
# Quick disable
git revert HEAD
git push origin main
vercel --prod

# Or switch to Option A temporarily
```

## Success Metrics

After 48 hours, verify:
- ✅ Zero cache-related support tickets
- ✅ All users see updates within 60 seconds
- ✅ Core Web Vitals maintained or improved
- ✅ Cache hit rate > 80% for assets
- ✅ No manual cache clearing required

## Long-term Maintenance

### Weekly:
- Check version.json is updating
- Verify SW registration count
- Monitor cache sizes

### Monthly:
- Review cache strategy effectiveness
- Update expiration times if needed
- Clean up old version code

### Quarterly:
- Audit service worker performance
- Update Workbox dependencies
- Review caching strategy

## Final Notes

This solution:
- ✅ Ensures users always see fresh content
- ✅ Maintains optimal performance
- ✅ Provides automatic updates
- ✅ Works across all browsers
- ✅ Scales with your application

Remember to remove any temporary cleanup code after the migration period!