// @ts-nocheck

// A place we can keep the cache name so we can change it in one place in case we need a new version.
const cacheName = "cache-v1";

/**
 * Install the service worker and cache the base resources we need.
 */
self.addEventListener('install', function(event) {
  event.waitUntil(
    // Open the cache and put some files in it.
    caches.open(cacheName).then(function(cache) {
      // We are caching in fetch below, so not sure these are even needed.
      cache.addAll(['./index.html',
                    './src/manifest.json',
                    './src/lib/phaser.js']);
    })
  );
});

/**
 * Cache space is limited, so clean up old caches (versions).
 */
self.addEventListener('activate', function(event) {
  event.waitUntil(
    // Get all of the keys in the cache.
    caches.keys().then((keyList) => {
      return Promise.all(
        // Go through all of the keys in the cache, deleting what is a different cache name (version).
        keyList.map((key) => {
          if (key === cacheName) { return; }
          return caches.delete(key);
        }),
      );
    }),
  );
});

// TODO: Can I make this self.client?
// TODO: Make a function for posting the message.
// TODO: Send an object as the message.
// TODO: Need to see if I can make the messages go both ways for cache thing.
// TODO: What is the point of the install event and the cache additions?

self.addEventListener('message', event => {
  // Make sure we have an event source.
  if (event.source && event.data) {
    if (event.data.type === "initialize") {
      // Save the caller event source for later messages to send back.
      self.clientObject = event.source;
    }
  }
});

self.sendMessage = function(message) {
  if (self.clientObject) {
    self.clientObject.postMessage(message);
  }
}

/**
 * Fetch handler for the service worker. The goal is to get out of the way when
 * online and to be fully functional when offline.
 */
self.addEventListener('fetch', function(event) {
  // Prevent requests such as chrome plugins.
  if (!event.request.url.startsWith('http')) { return; }

  // Only deal with GET requests.
  if (event.request.method != 'GET') { return; }

  self.sendMessage({ type: "cache", message: "I got a cache message!" });

  event.respondWith((async () => {
    let response = undefined;
    let cachedResponse = undefined;

    try {
      // Get the cached response up front so we can return it if the network fails.
      cachedResponse = await caches.match(event.request);
    } catch (error) {
      // Oh dear, there was an issue.
      cachedResponse = undefined;
    }

    try {
      // Fetch the resource from the network if we can.
      response = await fetch(event.request);
  
      // There was a problem so use the cached response if we have one. Otherwise return what we got.
      if (!response || (response.status !== 200)) {
        if (cachedResponse) {
          return cachedResponse;
        } else {
          return response;
        }
      } else {
        // The response was ok, so cache it for future generations.
        const cache = await caches.open(cacheName);
        await cache.put(event.request, response.clone());    
      }
    } catch (error) {
      // Make sure response is undefined as we cannot use it.
      response = undefined;
    }

    // If the network worked, return the response.
    if (response) { return response; }

    // If the network failed, we can try returning the cached response.
    if (cachedResponse) { return cachedResponse; }
  })());
});
