// @ts-nocheck

const cacheName = "cache-v1";

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
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
  console.log('Activating Service Worker...', e);
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


self.addEventListener("fetch", (e) => {
  // Prevent requests such as chrome plugins.
  if (!e.request.url.startsWith('http')) {
    return;
  }

  console.log("Fetching: " + e.request.url);

  e.respondWith(
    (async () => {
      console.log("Actual fetch: " + e.request.url);
      let fetchPromise = fetch(e.request).then(function(res) {
        console.log("Putting in cache: " + e.request.url)
        return caches.open(cacheName).then(function(cache) {
          console.log("Putting in cache real: " + e.request.url)
          cache.put(e.request.url, res.clone());
          return res;
        });
      }).catch(function(error) {
        // Do nothing as likely not connected to the internet.
        console.log("Error fetching: " + e.request.url + " " + error);
      });

      console.log("Waiting for fetch: " + e.request.url);
      e.waitUntil(fetchPromise);
      console.log("Done with fetch: " + e.request.url);

      const r = await caches.match(e.request);

      if (r) {
        console.log("Getting from cache: " + e.request.url);
        return r;
      } else {
        console.log("Not in cache: " + e.request.url);
      }
    })(),
  );
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