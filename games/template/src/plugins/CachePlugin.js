import Constants from '../constants.js';
import { getSettingsPlugin, getEventPlugin } from './PluginsHelpers.js'

// Constants that only this plugin uses.
const CATEGORY       = 'developer';
const LOG_CACHE_HIT  = 'logCacheHitOption';
const LOG_CACHE_MISS = 'logCacheMissOption';
const CLEAR_CACHE    = 'clearCacheOption';

const cacheSettings = {
  LOG_CACHE_HIT:{
    category: CATEGORY,
    name: LOG_CACHE_HIT,
    description: 'Log Cache Hits',
    value: true,
    type: Constants.SETTINGS_TYPES.boolean
  },
  LOG_CACHE_MISS: {
    category: CATEGORY,
    name: LOG_CACHE_MISS,
    description: 'Log Cache Misses',
    value: true,
    type: Constants.SETTINGS_TYPES.boolean
  },
  CLEAR_CACHE: {
    category: CATEGORY,
    name: CLEAR_CACHE,
    description: 'Clear Cache',
    value: undefined,
    type: Constants.SETTINGS_TYPES.function
  }
}

export default class CachePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // If there is no service worker then we cannot do anything.
    if (! ('serviceWorker' in navigator)) { return; }

    // Get the dependent plugins.
    this.settings = getSettingsPlugin();
    this.customevent = getEventPlugin();

    // If we can access the settings plugin.
    if (this.settings) {
      // Register all of the settings.
      Object.keys(cacheSettings).forEach((key) => {
        this.settings.registerSettingnew(cacheSettings[key]);
      });
    }

    // If we can access the event plugin.
    if (this.customevent) {
      // We would like to know when the actions have changed so we can do stuff.
      this.customevent.on(Constants.EVENTS.ACTION, this.onAction, this);      
    }
  }

  destroy() {
    // We might not have the plugin, so check this first.
    if (this.customevent) {
      // Remove the listener.
      this.customevent.off(Constants.EVENTS.ACTION, this.onAction, this);
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
   * Simple helper to get setting values.
   * 
   * @param {string} settingName The name of the setting to get.
   * @returns {any} the setting value.
   */
  getSettingValue(settingName) {
    return this.settings.getSetting(CATEGORY, settingName);
  }

  /**
   * Log the passed in cache message.
   * 
   * @param {boolean} hit Whether this is a cache hit (true) or a miss (false).
   * @param {string} url The request url that was hit or missed.
   */
  logCacheMessage(hit, url) {
    // Sanity check that we got a url to log.
    if (url) {
      // If a hit...
      if (hit) {
        // ..check that we want to log hits...
        if (this.getSettingValue(LOG_CACHE_HIT)) {
          console.log(`Cache hit: ${url}`);
        }
      } else {
        // ..check that we want to log misses...
        if (this.getSettingValue(LOG_CACHE_MISS)) {
          console.warn(`Cache miss: ${url}`);
        }
      }
    }
  }

  onAction(setting) {
    // We want to make an immediate change when the setting changes.
    if ((setting.category === CATEGORY) && (setting.name === CLEAR_CACHE)) {
      navigator.serviceWorker.ready.then(registration => {
        console.log("here is where we clear the cache!! Woohoo!! Yeehaw!");
        registration.active.postMessage({ type: Constants.SW_EVENTS.CLEAR_CACHE });
      });
    }
  }

  static get options() {
    return { 
      key: 'CachePlugin', 
      plugin: CachePlugin, 
      start: true,
      mapping: 'cache',
    }
  }
}
