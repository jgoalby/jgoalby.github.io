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
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      let fetchPromise = fetch(event.request).then(function(res) {
        return caches.open('dynamic').then(function(cache) {
          console.log('Adding ', event.request.url, ' to cache');
          cache.put(event.request.url, res.clone());
          return res;
        });
      }).catch(function(error) {
        console.log('Error fetching ', event.request.url, ': ', error);
      });
      event.waitUntil(fetchPromise);
      return response;
    })
  );
});
