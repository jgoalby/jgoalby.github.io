// @ts-nocheck

self.addEventListener('fetch', (event) => {
  const version = 'version1';
  
  event.respondWith(
    console.log("1");
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
