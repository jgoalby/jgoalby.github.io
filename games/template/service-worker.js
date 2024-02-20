// @ts-nocheck

const cacheName = "cache-v1";

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      cache.addAll(['./index.html',
                    './src/manifest.json',
                    './src/lib/phaser.js',
                    './src/lib/pathfinding-browser.js']);
    })
  );
});

/* Cache space is limited, so clean up old caches. */
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        }),
      );
    }),
  );
});


self.addEventListener('fetch', function(event) {
  // Prevent requests such as chrome plugins.
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // Only deal with GET requests.
  if (event.request.method != 'GET') {
    return;
  }

  event.respondWith((async () => {
    const response = await fetch(event.request);
  
    if (!response || (response.status !== 200)) {
      const cachedResponse = await caches.match(event.request);

      if (cachedResponse) {
        return cachedResponse;
      } else {
        return response;
      }
    }
  
    const cache = await caches.open(cacheName);
    await cache.put(event.request, response.clone());  

    return response;
  })());
});

/*self.addEventListener('fetch', function(event) {
  // Prevent requests such as chrome plugins.
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      let fetchPromise = fetch(event.request).then(function(res) {
        return caches.open('dynamic').then(function(cache) {
          cache.put(event.request.url, res.clone());
          return res;
        });
      }).catch(function(error) {
        // Do nothing as likely not connected to the internet.
      });
      
      event.waitUntil(fetchPromise);
      return response;
    })
  );
});
*/