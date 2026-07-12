const CACHE_NAME = 'schedule-v30';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './icon.svg',
  './manifest.json',
  './widget-template.json',
  './widget-data.json',
  './html2canvas.min.js'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First with Cache Fallback (2-second timeout)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    new Promise((resolve) => {
      let timeoutId;
      let networkFetchResolved = false;

      // Start the network timeout to fallback to cache if network is slow
      timeoutId = setTimeout(() => {
        caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse && !networkFetchResolved) {
            resolve(cachedResponse);
          }
        });
      }, 2000);

      // Attempt network fetch
      fetch(event.request)
        .then((networkResponse) => {
          networkFetchResolved = true;
          clearTimeout(timeoutId);

          // Cache successful responses (including cross-origin opaque responses)
          if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            resolve(networkResponse);
          } else {
            // Non-200 responses (e.g. 404, 500), try fallback to cache
            caches.match(event.request).then((cachedResponse) => {
              resolve(cachedResponse || networkResponse);
            });
          }
        })
        .catch((error) => {
          networkFetchResolved = true;
          clearTimeout(timeoutId);

          // Network failure (offline), fallback to cache
          caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              resolve(cachedResponse);
            } else {
              // Return a generic error if no cached version is available
              resolve(new Response('Network connection failed and no cached data is available.', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({ 'Content-Type': 'text/plain' })
              }));
            }
          });
        });
    })
  );
});
