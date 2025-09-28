/// <reference lib="webworker" />
/// <reference types="./types/sw" />

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { skipWaiting, clientsClaim } from 'workbox-core';

declare let self: ServiceWorkerGlobalScope;

// Version management - CRITICAL FOR UPDATES
const BUILD_TIMESTAMP = '__BUILD_TIMESTAMP__';  // Will be replaced at build time
const CACHE_VERSION = `v2-${BUILD_TIMESTAMP}`;  // Dynamic version with timestamp

// Force immediate activation
skipWaiting();
clientsClaim();

// Clean up old versions
cleanupOutdatedCaches();

// Log version for debugging
console.log(`[SW] Installing Service Worker Version: ${CACHE_VERSION}-${BUILD_TIMESTAMP}`);

// Handle chatbot SW coexistence (if it ever exists)
self.addEventListener('install', (event) => {
  console.log('[SW] Service Worker installing...');
  
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

// Get precache manifest but EXCLUDE HTML (original approach was correct)
const manifest = self.__WB_MANIFEST.filter(entry => {
  const url = typeof entry === 'string' ? entry : entry.url;
  // Exclude HTML files AND chatbot resources - HTML should come from server with no-cache headers
  return !url.endsWith('.html') &&
         url !== '/' &&
         !url.includes('/chatbot/');
});

// Precache static assets only (HTML excluded - served fresh from server)
precacheAndRoute(manifest);

// HTML Strategy - NetworkFirst to always get fresh HTML from server
registerRoute(
  ({ request, url }) => {
    // Only handle navigation requests not in chatbot scope
    return request.mode === 'navigate' && !url.pathname.startsWith('/chatbot/');
  },
  new NetworkFirst({
    cacheName: `${CACHE_VERSION}-html-fallback`,
    networkTimeoutSeconds: 3,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60, // Cache HTML for max 1 minute as emergency fallback only
        maxEntries: 10,
      }),
      {
        // Custom plugin to ensure HTML always tries network first
        requestWillFetch: async ({ request }) => {
          // Add cache-busting parameters to ensure fresh HTML
          const url = new URL(request.url);
          url.searchParams.set('v', BUILD_TIMESTAMP);
          url.searchParams.set('t', Date.now().toString());

          const headers = new Headers(request.headers);
          headers.set('Cache-Control', 'no-cache');
          headers.set('X-SW-Version', CACHE_VERSION);

          return new Request(url.href, {
            ...request,
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

// Version check endpoint and forced update system
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
        if (!name.startsWith('chatbot-')) {
          caches.delete(name);
        }
      });
    });
  }

  if (event.data?.type === 'CHECK_UPDATE') {
    // Force check for updates and reload if needed
    fetch('/api/version', { cache: 'no-cache' })
      .then(response => response.json())
      .then(serverVersion => {
        const currentVersion = CACHE_VERSION;
        if (serverVersion.version !== currentVersion) {
          // Clear all caches and force reload
          caches.keys().then(names => {
            Promise.all(
              names.filter(name => !name.startsWith('chatbot-'))
                   .map(name => caches.delete(name))
            ).then(() => {
              // Notify all clients to reload
              self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                  client.postMessage({
                    type: 'FORCE_RELOAD',
                    oldVersion: currentVersion,
                    newVersion: serverVersion.version,
                  });
                });
              });
            });
          });
        }
      })
      .catch(error => {
        console.error('[SW] Version check failed:', error);
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
      await self.clients.claim();
      
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