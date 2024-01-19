// @ts-nocheck

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open('static').then(function(cache) {
      cache.addAll(['./index.html', './src/manifest.json', './src/lib/pathfinding-browser.js']);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      } else {
        if (event.request.url.startsWith('http')) {
          return fetch(event.request).then(function(res) {
            return caches.open('dynamic').then(function(cache) {
              console.log('Adding ', event.request.url, ' to cache');
              cache.put(event.request.url, res.clone());
              return res;
            });
          });
        }
      }
    })
  );
});
