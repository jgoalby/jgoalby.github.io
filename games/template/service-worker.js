// @ts-nocheck

self.addEventListener('fetch', (event) => {
  const version = 'version1';
  
  event.respondWith(
    caches.open(version).then((cache) => {
      alert("2");
      return cache.match(event.request).then((response) => {
        alert("3");
        let fetchPromise = fetch(event.request).then((networkResponse) => {
          alert("4");
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        alert("5");
        event.waitUntil(fetchPromise);
        return response;
      })
    })
  );
});
