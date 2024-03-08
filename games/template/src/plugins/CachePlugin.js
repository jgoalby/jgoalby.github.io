import Constants from '../constants.js';
import { getPlugin } from './PluginsHelpers.js'

// Constants that only this plugin uses.
const CATEGORY              = 'developer';
const LOG_CACHE_HIT_OPTION  = 'logCacheHitOption';
const LOG_CACHE_MISS_OPTION = 'logCacheMissOption';
const CLEAR_CACHE_OPTION    = 'clearCacheOption';

const pluginSettings = {
  LOG_CACHE_HIT:{
    category: CATEGORY,
    name: LOG_CACHE_HIT_OPTION,
    description: 'Log Cache Hits',
    value: false,
    type: Constants.SETTINGS_TYPES.boolean
  },
  LOG_CACHE_MISS: {
    category: CATEGORY,
    name: LOG_CACHE_MISS_OPTION,
    description: 'Log Cache Misses',
    value: true,
    type: Constants.SETTINGS_TYPES.boolean
  },
  CLEAR_CACHE: {
    category: CATEGORY,
    name: CLEAR_CACHE_OPTION,
    description: 'Clear Cache',
    value: undefined,
    type: Constants.SETTINGS_TYPES.function
  }
}

export default class CachePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Get the dependent plugins.

    /** @type {SettingsPlugin} */
    this.settings = getPlugin(Constants.PLUGIN_INFO.SETTINGS_KEY);

    /** @type {EventPlugin} */
    this.customevent = getPlugin(Constants.PLUGIN_INFO.EVENT_KEY);

    // If we can access the settings plugin.
    if (this.settings) {
      // Register all of the settings.
      Object.keys(pluginSettings).forEach((key) => {
        this.settings.registerSetting(pluginSettings[key]);
      });
    }

    // If we can access the event plugin.
    if (this.customevent) {
      // We would like to know when the actions have changed so we can do stuff. Note that we
      // do not care about the setting changes as we do not need to take immediate action on them.
      this.customevent.on(Constants.EVENTS.SETTING_ACTION, this.onAction, this);

      // We also are interested in cache events please.
      this.customevent.on(Constants.EVENTS.CACHE_EVENT, this.onCacheEvent, this);
    }
  }

  /**
   * Destroy the plugin and clean up after ourselves.
   */
  destroy() {
    // We might not have the plugin, so check this first.
    if (this.customevent) {
      // Remove the listener.
      this.customevent.off(Constants.EVENTS.SETTING_ACTION, this.onAction, this);
      this.customevent.off(Constants.EVENTS.CACHE_EVENT, this.onCacheEvent, this);
      this.customevent = undefined;
    }

    // MUST do this.
    super.destroy();
  }

  /**
   * Local plugin so we do not provide a version.
   * 
   * @returns {string | undefined} The version of the plugin.
   */
  getVersion() { return undefined; }

  /**
   * Simple helper to get a setting value.
   * 
   * @param {string} settingName The name of the setting to get.
   * @returns {any} the setting value.
   */
  getSettingValue(settingName) {
    // Get the setting object, and then the value from that object.
    return this.settings.getSetting(CATEGORY, settingName).value;
  }

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
        if (this.getSettingValue(LOG_CACHE_HIT_OPTION)) {
          console.log(`Cache hit: ${url}`);
        }
      } else {
        // ..check that we want to log misses as it is configurable.
        if (this.getSettingValue(LOG_CACHE_MISS_OPTION)) {
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
  onAction(setting) {
    // We want to make an immediate change when the setting changes.
    if ((setting.category === CATEGORY) && (setting.name === CLEAR_CACHE_OPTION)) {
      // Emit an event to ask anyone listening to clear the cache.
      this.customevent.emit(Constants.EVENTS.CLEAR_CACHE, { });
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

/**
 * Handle the keydown event.
 * @param {KeyboardEvent} event The event.
 */
async function handleKeydown(event) {
  // TODO: Somehow we will need to know the base URL. Can we get it from window?

  console.log("FFS 1");

  // TODO: Put in constants.
  const cacheName = "cache-v1";

  let cachedResponse = undefined;
  let cacheKeyStr = "";

  try {
    const cache = await window.caches.open(cacheName);
    cachedResponse = await cache.match('https://www.goalby.org/games/template/src/common.js');
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
    const text = await cachedResponse.text();
    console.log("MAIN 5: " + text);
  } else {
    console.log("MAIN NOT FOUND 2!!!");
  }
}
