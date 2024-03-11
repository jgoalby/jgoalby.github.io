// Put this here as a placeholder for the solution that would have been ideal.
// This does not work in some browsers that support service workers but do not support
// es module import within service workers. Inspect browser on iPad appears to be one.
//import Constants from './src/constants.js';

// Duplicate the constants for service worker events. If you change these then you need
// to also change them in constants.js.
const ServiceWorkerEvents = {
  INIT:           'INIT',
  CONFIG:         'CONFIG',
  CLEAR_CACHE:    'CLEAR_CACHE',
  CACHE_EVENT:    'CACHE_EVENT',
  CACHE_CLEARED:  'CACHE_CLEARED',
  CACHE_MESSAGE:  'CACHE_MESSAGE',
};

// A place we can keep the cache name so we can change it in one place in case we need a new version.
// Also defined in constants.js, so, if you change it here, change it there also.
const SW_CACHE_NAME = "cache-v1";

// The exported class that contains all of the constants.
class Constants {
  static get SW_EVENTS() { return ServiceWorkerEvents; }
  static get CACHE_NAME() { return SW_CACHE_NAME };
}

//----------------------------------------------------------------------------------------------------------
// GOAL: Work offline by utilizing a cache. Fill the cache as resources are requested. Communicate
//       with the main thread both ways. We can send update messages and get requests to perform accions.
//----------------------------------------------------------------------------------------------------------

/**
 * Install the service worker and cache the base resources we need.
 * 
 * @param {ExtendableEvent} event 
 */
function installEventHandler(event) {
  event.waitUntil(
    // Open the cache and put some files in it.
    caches.open(Constants.CACHE_NAME).then(function(cache) {
      // We are caching in fetch below, so not sure these are even needed. Prefer to avoid putting
      // hardcoded filesnames here because what if they change? Leaving like this for now so that
      // it is a placeholder for future explorers.
      cache.addAll(['./index.html']);
    })
  );
}

/**
 * Cache space is limited, so clean up old caches (versions).
 * 
 * @param {ExtendableEvent} event 
 */
function activateEventHandler(event) {
  event.waitUntil(
    // Get all of the keys in the cache.
    caches.keys().then((keyList) => {
      return Promise.all(
        // Go through all of the keys in the cache, deleting what is a different cache name (version).
        keyList.map((key) => {
          if (key === Constants.CACHE_NAME) { return; }
          return caches.delete(key);
        }),
      );
    }),
  );
}

/**
 * Message from the main thread.
 * 
 * @param {any} event
 */
async function messageEventHandler(event) {
  // Make sure we have an event source.
  if (event.source && event.data) {
    // We want to do this only once, and we know the client will send this message.
    if (event.data.type === Constants.SW_EVENTS.INIT) {
      // Save the caller event source for later messages to send back.
      self.clientObject = event.source;
    }

    // If the client sent a configuration message.
    if (event.data.type === Constants.SW_EVENTS.CONFIG) {
      // The client controls whether to send cache messages.
      if (event.data.sendCacheMessages) {
        // Control whether to send the main thread messages about cache hits and misses.
        self.sendCacheMessages = true;
      } else {
        self.sendCacheMessages = false;
      }
    } else if (event.data.type === Constants.SW_EVENTS.CLEAR_CACHE) {
      // Clear the cache.
      const ret = await caches.delete(Constants.CACHE_NAME);

      // Send the message indicating we have cleared the cache.
      self.sendMessage({ type: Constants.SW_EVENTS.CACHE_EVENT, message: Constants.SW_EVENTS.CACHE_CLEARED, success: ret });
    }
  }
}

/**
 * Send a message back to the main thread.
 * 
 * @param {any} message Any kind of message that we want to send the main thread.
 */
self.sendMessage = function(message) {
  // Send the message to the client if we have one.
  if (self.clientObject) { self.clientObject.postMessage(message); }
}

/**
 * Fetch handler for the service worker. The goal is to get out of the way when
 * online and to be fully functional when offline.
 * 
 * @param {FetchEvent} event 
 * @returns response.
 */
function fetchEventHandler(event) {
  // Prevent requests such as chrome plugins.
  if (!event.request.url.startsWith('http')) { return; }

  // Only deal with GET requests.
  if (event.request.method != 'GET') { return; }

  event.respondWith((async () => {
    // Holders for possible responses.
    let response = undefined;
    let cachedResponse = undefined;

    try {
      // Get the cached response up front so we can return it if the network fails.
      const cache = await caches.open(Constants.CACHE_NAME);
      cachedResponse = await cache.match(event.request);

      // If we actually got the cached response.
      if (cachedResponse) {
        // Clone here to make sure it is actually done rather than trying to be clever later.
        cachedResponse = cachedResponse.clone();
      }
    } catch (error) {
      // Oh dear, there was an issue.
      cachedResponse = undefined;
    }

    // Configured at start of file.
    if (self.sendCacheMessages) {
      // Send the message indicating hit or miss and what the request was.
      self.sendMessage({ type: Constants.SW_EVENTS.CACHE_EVENT, message: Constants.SW_EVENTS.CACHE_MESSAGE, cacheHit: (cachedResponse ? true : false), requestURL: event.request.url });
    }

    try {
      // Fetch the resource from the network if we can.
      response = await fetch(event.request);
  
      // There was a problem so use the cached response if we have one. Otherwise we will return what we got.
      if (!response || (response.status !== 200)) {
        if (cachedResponse) {
          response = cachedResponse;
        }
      } else {
        // The response was ok, so cache it for future generations.
        const cache = await caches.open(Constants.CACHE_NAME);
        await cache.put(event.request, response.clone());    
      }
    } catch (error) {
      // Make sure response is undefined as we cannot use it.
      response = undefined;
    }

    // If the network worked, return the response. If the network failed, we can try returning the cached response.
    return response || cachedResponse;
  })());
}

// Add the event listeners for the functions above.
self.addEventListener('install', installEventHandler);
self.addEventListener('activate', activateEventHandler);
self.addEventListener('message', messageEventHandler);
self.addEventListener('fetch', fetchEventHandler);
