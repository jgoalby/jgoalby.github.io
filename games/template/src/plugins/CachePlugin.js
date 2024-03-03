import Constants from '../constants.js';
import { getSettingsPlugin, getEventPlugin } from './PluginsHelpers.js'

// Constants that only this plugin uses.
const CATEGORY       = 'developer';
const LOG_CACHE_HIT  = 'logCacheHitOption';
const LOG_CACHE_MISS = 'logCacheMissOption';
const CLEAR_CACHE    = 'clearCacheOption';

const pluginSettings = {
  LOG_CACHE_HIT:{
    category: CATEGORY,
    name: LOG_CACHE_HIT,
    description: 'Log Cache Hits',
    value: false,
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
      Object.keys(pluginSettings).forEach((key) => {
        this.settings.registerSetting(pluginSettings[key]);
      });
    }

    // If we can access the event plugin.
    if (this.customevent) {
      // We would like to know when the actions have changed so we can do stuff. Note that we
      // do not care about the setting changes as we do not need to take immediate action on them.
      this.customevent.on(Constants.EVENTS.SETTING_ACTION, this.onAction, this);      
    }
  }

  destroy() {
    // We might not have the plugin, so check this first.
    if (this.customevent) {
      // Remove the listener.
      this.customevent.off(Constants.EVENTS.SETTING_ACTION, this.onAction, this);
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

  /**
   * Action happened in settings.
   * 
   * @param {any} setting The setting that has changed.
   */
  onAction(setting) {
    // We want to make an immediate change when the setting changes.
    if ((setting.category === CATEGORY) && (setting.name === CLEAR_CACHE)) {
      navigator.serviceWorker.ready.then(registration => {
        registration.active.postMessage({ type: Constants.SW_EVENTS.CLEAR_CACHE });
        this.customevent.emit(Constants.EVENTS.NOTIFICATION, { notificationText: "Cache Cleared" });
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
