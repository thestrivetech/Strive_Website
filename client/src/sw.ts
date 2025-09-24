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
const CACHE_VERSION = 'v1';
const BUILD_TIMESTAMP = '__BUILD_TIMESTAMP__';  // Will be replaced at build time

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