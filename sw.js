/**
 * NationOS Service Worker
 * Enables offline functionality and caching for the Outer Court PWA
 * Version: 2.0.0
 */

const CACHE_NAME = 'nationos-v2';
const OFFLINE_URL = '/index.html';

// Core assets to cache immediately on install
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/constitution.html',
  '/declaration.html',
  '/pillars.html',
  '/join.html',
  '/resources.html',
  '/links.html',
  '/css/style.css',
  '/css/unified-design.css',
  '/js/pwa-install.js',
  '/manifest.json',
  '/favicon.ico'
];

// Images to cache (loaded on demand)
const IMAGE_ASSETS = [
  '/images/nationos_logo_new.png',
  '/images/sentinel_simple_final.png',
  '/images/nationos_logo_concept.png',
  '/images/nationos_emblem_header.png',
  '/images/apple-touch-icon.png',
  '/images/digital_ark_hero.png'
];

// Install event - cache core resources
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing NationOS PWA v2...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        console.log('[ServiceWorker] Core assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[ServiceWorker] Cache installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating NationOS PWA v2...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[ServiceWorker] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests (fonts, external APIs, etc.)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if available
        if (cachedResponse) {
          // Fetch fresh version in background (stale-while-revalidate)
          event.waitUntil(
            fetch(event.request)
              .then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                  caches.open(CACHE_NAME)
                    .then((cache) => {
                      cache.put(event.request, networkResponse.clone());
                    });
                }
              })
              .catch(() => {
                // Network failed, but we have cache - that's fine
              })
          );
          return cachedResponse;
        }

        // No cache - fetch from network
        return fetch(event.request)
          .then((networkResponse) => {
            // Check if valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone and cache the response
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch((error) => {
            console.log('[ServiceWorker] Fetch failed:', error);
            
            // Return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            
            // For other requests, just fail
            throw error;
          });
      })
  );
});

// Background sync for future offline form submissions
self.addEventListener('sync', (event) => {
  console.log('[ServiceWorker] Background sync event:', event.tag);
  // Future: Handle offline form submissions here
});

// Push notifications for future covenant alerts
self.addEventListener('push', (event) => {
  console.log('[ServiceWorker] Push notification received');
  // Future: Handle push notifications here
});

console.log('[ServiceWorker] NationOS Service Worker loaded');
