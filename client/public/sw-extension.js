/**
 * Service Worker Extension for Cache-Busting
 * This file extends the Workbox-generated service worker with custom cache invalidation
 */

// Listen for skip waiting message from the update manager
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('Service Worker: Received SKIP_WAITING message');
    self.skipWaiting();
  }
});

// Force immediate activation and claim all clients
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate event');
  
  event.waitUntil(
    (async () => {
      // Clear all caches to ensure fresh content
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(async (cacheName) => {
          console.log(`Service Worker: Deleting cache ${cacheName}`);
          return caches.delete(cacheName);
        })
      );
      
      // Claim all clients immediately
      await self.clients.claim();
      
      // Notify all clients that update is available
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({
          type: 'SW_UPDATE_AVAILABLE',
          timestamp: Date.now()
        });
      });
      
      console.log('Service Worker: Activation complete, all caches cleared');
    })()
  );
});

// Aggressive cache invalidation for HTML requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // For HTML requests, always go to network first
  if (
    event.request.mode === 'navigate' ||
    (event.request.method === 'GET' && 
     event.request.headers.get('accept') && 
     event.request.headers.get('accept').includes('text/html'))
  ) {
    event.respondWith(
      fetch(event.request.url + '?t=' + Date.now())
        .then(response => {
          // Clone the response and add no-cache headers
          const responseClone = response.clone();
          const headers = new Headers(responseClone.headers);
          headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
          headers.set('Pragma', 'no-cache');
          headers.set('Expires', '0');
          
          return new Response(responseClone.body, {
            status: responseClone.status,
            statusText: responseClone.statusText,
            headers: headers
          });
        })
        .catch(() => {
          // Return a fallback response if network fails
          return new Response('App is offline. Please try again when connected.', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/html' }
          });
        })
    );
  }
});

console.log('Service Worker Extension: Loaded');