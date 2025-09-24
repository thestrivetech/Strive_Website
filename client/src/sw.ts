/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope;

// Force immediate activation and claim all clients
self.skipWaiting();
clientsClaim();

// Clean up old caches
cleanupOutdatedCaches();

// Inject build timestamp for cache busting
const BUILD_TIMESTAMP = '__BUILD_TIMESTAMP__';
console.log(`Service Worker: Build timestamp ${BUILD_TIMESTAMP}`);

// Get manifest entries but EXCLUDE HTML files
const manifest = self.__WB_MANIFEST.filter(entry => {
  if (typeof entry === 'string') {
    return !entry.endsWith('.html');
  }
  return entry.url && !entry.url.endsWith('.html');
});

// Precache all static assets EXCEPT HTML
precacheAndRoute(manifest);

// CRITICAL: HTML Navigation - ALWAYS go to network, NEVER cache
registerRoute(
  ({ request, url }) => {
    return request.mode === 'navigate' || 
           request.destination === 'document' ||
           (request.headers.get('accept') && request.headers.get('accept')!.includes('text/html'));
  },
  new NetworkFirst({
    cacheName: 'html-cache',
    networkTimeoutSeconds: 3,
    plugins: [
      {
        cacheWillUpdate: async () => {
          // NEVER cache HTML responses
          return null;
        },
        fetchDidSucceed: async ({ response }) => {
          // Clone response and add no-cache headers
          const clonedResponse = response.clone();
          const headers = new Headers(clonedResponse.headers);
          headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
          headers.set('X-SW-Timestamp', BUILD_TIMESTAMP);
          
          return new Response(clonedResponse.body, {
            status: clonedResponse.status,
            statusText: clonedResponse.statusText,
            headers: headers
          });
        }
      }
    ]
  })
);

// JavaScript and CSS files - cache with content hash
registerRoute(
  ({ url }) => url.pathname.match(/\.(js|css)$/),
  new CacheFirst({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        purgeOnQuotaError: true
      })
    ]
  })
);

// Images - cache first
registerRoute(
  ({ url }) => url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|avif|ico)$/),
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 90 * 24 * 60 * 60, // 90 days
        purgeOnQuotaError: true
      })
    ]
  })
);

// Fonts - cache first
registerRoute(
  ({ url }) => url.pathname.match(/\.(woff|woff2|ttf|otf)$/),
  new CacheFirst({
    cacheName: 'fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        purgeOnQuotaError: true
      })
    ]
  })
);

// API calls - network first with fallback
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 5,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60 // 5 minutes
      })
    ]
  })
);

// Google Fonts
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
      })
    ]
  })
);

// Listen for version check messages
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data?.type === 'CHECK_VERSION') {
    event.ports[0].postMessage({
      type: 'VERSION',
      timestamp: BUILD_TIMESTAMP
    });
  }
  
  if (event.data?.type === 'CLEAR_ALL_CACHE') {
    caches.keys().then(names => {
      Promise.all(names.map(name => caches.delete(name)));
    });
  }
});

// On activation, clear ALL caches to ensure fresh start
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Get all cache names
      const cacheNames = await caches.keys();
      
      // Delete HTML cache specifically to ensure fresh content
      const htmlCache = cacheNames.find(name => name.includes('html'));
      if (htmlCache) {
        await caches.delete(htmlCache);
        console.log('Service Worker: Deleted HTML cache');
      }
      
      // Clean up any outdated caches
      await cleanupOutdatedCaches();
      
      // Claim all clients
      await self.clients.claim();
      
      console.log('Service Worker: Activated and claimed all clients');
    })()
  );
});

console.log('Service Worker: Custom SW loaded with HTML exclusion');