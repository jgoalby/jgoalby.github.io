import Constants from '../constants.js';
import BasePlugin from './BasePlugin.js'

// Constants that only this plugin uses.
const CATEGORY                   = 'developer';
const LOG_CACHE_HIT_OPTION       = 'logCacheHitOption';
const LOG_CACHE_HIT_OPTION_DESC  = 'Log Cache Hits';
const LOG_CACHE_MISS_OPTION      = 'logCacheMissOption';
const LOG_CACHE_MISS_OPTION_DESC = 'Log Cache Misses';
const CLEAR_CACHE_OPTION         = 'clearCacheOption';
const CLEAR_CACHE_OPTION_DESC    = 'Clear Cache';

const pluginSettings = {
  LOG_CACHE_HIT:{
    category: CATEGORY,
    name: LOG_CACHE_HIT_OPTION,
    description: LOG_CACHE_HIT_OPTION_DESC,
    value: false,
    type: Constants.SETTINGS_TYPES.boolean
  },
  LOG_CACHE_MISS: {
    category: CATEGORY,
    name: LOG_CACHE_MISS_OPTION,
    description: LOG_CACHE_MISS_OPTION_DESC,
    value: true,
    type: Constants.SETTINGS_TYPES.boolean
  },
  CLEAR_CACHE: {
    category: CATEGORY,
    name: CLEAR_CACHE_OPTION,
    description: CLEAR_CACHE_OPTION_DESC,
    value: undefined,
    type: Constants.SETTINGS_TYPES.function
  }
}

export default class CachePlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
  }

  /**
   * Get the plugin settings.
   * 
   * @returns {Object} The plugin settings.
   */
  getPluginSettings() { return pluginSettings; }

  /**
   * Called in response to messages.
   * 
   * @param {any} eventData The event data sent.
   */
  onCacheEvent(eventData) {
    // Figure out which specific message this event is for.
    if (eventData.message === Constants.SW_EVENTS.CACHE_MESSAGE) {
      // Have the cache plugin log the cache hit or miss.
      this.onCacheMessage(eventData.cacheHit, eventData.requestURL);
    } else if (eventData.message === Constants.SW_EVENTS.CACHE_CLEARED) {
      // Let the cache plugin know that the cache was cleared.
      this.onCacheCleared(eventData.success);
    }
  }

  /**
   * Called when we are to log the passed in cache message.
   * 
   * @param {boolean} hit Whether this is a cache hit (true) or a miss (false).
   * @param {string} url The request url that was hit or missed.
   */
  onCacheMessage(hit, url) {
    // Sanity check that we got a url to log.
    if (url) {
      // If a hit...
      if (hit) {
        // ..check that we want to log hits as it is configurable.
        if (this.getSettingValue(CATEGORY, LOG_CACHE_HIT_OPTION)) {
          console.log(`Cache hit: ${url}`);
        }
      } else {
        // ..check that we want to log misses as it is configurable.
        if (this.getSettingValue(CATEGORY, LOG_CACHE_MISS_OPTION)) {
          console.warn(`Cache miss: ${url}`);
        }
      }
    }
  }

  /**
   * Called when the cache has been cleared.
   * 
   * @param {boolean} success Whether the cache was cleared successfully.
   */
  onCacheCleared(success) {
    // Notify the user that the cache has been cleared. The success value can be false if the cache is
    // cleared twice or more in a row for example.
    this.customevent.emit(Constants.EVENTS.NOTIFICATION, { notificationText: `Cache Cleared: ${success}` });
  }

  /**
   * Action happened in settings.
   * 
   * @param {any} setting The setting that has changed.
   */
  onSettingAction(setting) {
    // We want to make an immediate change when the setting changes.
    if ((setting.category === CATEGORY) && (setting.name === CLEAR_CACHE_OPTION)) {
      // Emit an event to ask anyone listening to clear the cache.
      this.customevent.emit(Constants.EVENTS.CLEAR_CACHE, { });
    }
  }

  // TODO: I could try to know when cache last updated? Serviceworked could add a value? Or is there one? I tried
  //       adding a property to the cache in service-worker but it didn't show up here.

  async getCacheURLs() {
    // Holder for the return value of each URL we found in the cache.
    let cacheURLs = [];

    try {
      // Get the cache.
      const cache = await window.caches.open(Constants.CACHE_NAME);

      // Get the cache keys.
      const cacheKeys = await cache.keys();

      // Go through each of the URLs we retrieved.
      for (let i = 0; i < cacheKeys.length; i++) {
        // Add the current URL to the array.
        cacheURLs.push(cacheKeys[i].url);
      }
    } catch (error) {
      // Oh dear, there was an issue. But nothing we can do, so ignore it.
    }

    // Return the array we made.
    return cacheURLs;
  }

  getNumSameElements(arr1, arr2) {
    // Sanity check.
    if (!arr1 || !arr2 || !arr1.length || !arr2.length) { return 0; }

    // Start at no elements being the same.
    let countSame = 0;

    // Can only compare up to the shortest array length.
    for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
      if (arr1[i] === arr2[i]) {
        // Add to the count of elements that are the same.
        countSame += 1;
      } else {
        // They are no longer the same so can stop comparing.
        break;
      }
    }

    // Return the count.
    return countSame;
  }

  async getAbsoluteURL(sourceURL) {
    // We get each part of the URL in reverse order so we can compare.
    const sourceURLArr = sourceURL.split('/').reverse();

    // Holders for the best match we have found so far.
    let curBestLen = 0;
    let curBestURL = undefined;

    // Get the URLs stored in the cache.
    let cacheURLs = await this.getCacheURLs();

    // Go through every URL in the cache, looking for the best match.
    for (let i = 0; i < cacheURLs.length; i++) {
      // We need to convert the current cache URL to same array as the sourceURL.
      const cacheURL = cacheURLs[i];
      const cacheURLArr = cacheURL.split('/').reverse();

      // Compare the 2 arrays and see how many consecutive elements are the same.
      let same = this.getNumSameElements(sourceURLArr, cacheURLArr);

      // If this one is better than the best so far, it is now the best.
      if (same > curBestLen) {
        curBestLen = same;
        curBestURL = cacheURL;
      }
    }

    // Return the best one we found.
    return curBestURL;
  }

  async getCachedFile() {
    // TODO: Make params for this. What should I be requesting? common.js? /src/common.js?
    // TODO: Somehow we will need to know the base URL. Can we get it from window?

    const pathname = window.location.pathname;
    const pathNameWithoutFile = pathname.substring(0, pathname.lastIndexOf("/"));
    const urlWithoutFile = window.location.origin + pathNameWithoutFile;

    console.log(urlWithoutFile);

    const requestedFile = '/src/common.js'

    const fullRequestedFile = urlWithoutFile + requestedFile;

    console.log(fullRequestedFile);

    let cachedResponse = undefined;
    let cacheKeyStr = "";

    try {
      const cache = await window.caches.open(Constants.CACHE_NAME);
      cachedResponse = await cache.match(fullRequestedFile);
      const cacheKeys = await cache.keys();
      for (let i = 0; i < cacheKeys.length; i++) {
        cacheKeyStr += cacheKeys[i].url + " | ";
      }
    } catch (error) {
      // Oh dear, there was an issue.
      cachedResponse = undefined;
    }

    console.log("MAIN NUM 3!!! " + cacheKeyStr);

    if (cachedResponse) {
      cachedResponse = cachedResponse.clone();

      console.log("MAIN 5 COMING UP *********");
      console.log(cachedResponse);
      try {
        let text = await cachedResponse.text();
        //text = await cachedResponse.text();
        console.log("MAIN 5: " + text);
      } catch(e) {
        console.log("EXCEPTION!!!! " + e.message);
      }
      console.log("MAIN 5");
    } else {
      console.log("MAIN NOT FOUND 2!!!");
    }
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.CACHE_KEY,
      plugin: CachePlugin,
      start: true,
      mapping: Constants.PLUGIN_INFO.CACHE_MAPPING,
    }
  }
}

