// @ts-nocheck

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open('static').then(function(cache) {
      cache.addAll(['/', '/index.html', '/app.js', '/manifest.json']);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
});

self.addEventListener('fetch', (event) => {
  const version = 'version1';
  
  event.respondWith(
    caches.open(version).then((cache) => {
      console.log("2");
      return cache.match(event.request).then((response) => {
        console.log("3");
        let fetchPromise = fetch(event.request).then((networkResponse) => {
          console.log("4");
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        console.log("5");
        event.waitUntil(fetchPromise);
        return response;
      })
    })
  );
});
