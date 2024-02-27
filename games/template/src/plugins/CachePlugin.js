import Constants from '../constants.js';
import { getSettingsPlugin, getEventPlugin } from './PluginsHelpers.js'

// Constants that only this plugin uses.
const CATEGORY       = 'developer';
const CACHE          = 'cacheOption';
const LOG_CACHE_HIT  = 'logCacheHitOption';
const LOG_CACHE_MISS = 'logCacheMissOption';
const CLEAR_CACHE    = 'clearCacheOption';

const cacheSettings = [
  {
    category: CATEGORY,
    name: CACHE,
    description: 'Cache Enabled',
    default: true,
    type: Constants.SETTINGS_TYPES.boolean
  }, {
    category: CATEGORY,
    name: LOG_CACHE_HIT,
    description: 'Log Cache Hits',
    default: true,
    type: Constants.SETTINGS_TYPES.boolean
  }, {
    category: CATEGORY,
    name: LOG_CACHE_MISS,
    description: 'Log Cache Misses',
    default: true,
    type: Constants.SETTINGS_TYPES.boolean
  }, {
    category: CATEGORY,
    name: CLEAR_CACHE,
    description: 'Clear Cache',
    default: undefined,
    type: Constants.SETTINGS_TYPES.function
  }
]

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
      // Register the settings.
      for (let i = 0; i < cacheSettings.length; i++) {
        this.settings.registerSettingnew(cacheSettings[i]);
      }
    }

    // If we can access the event plugin.
    if (this.customevent) {
      // We would like to know when the actions or setting changes have changed so we can do stuff.
      this.customevent.on(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
      this.customevent.on(Constants.EVENTS.ACTION, this.onAction, this);      
    }
  }

  destroy() {
    // We might not have the plugin, so check this first.
    if (this.customevent) {
      // Remove the listeners.
      this.customevent.off(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
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

  onSettingChanged(setting) {
    // We want to make an immediate change when the setting changes.
    if ((setting.category === CATEGORY) && (setting.name === CACHE)) {
      // True means setting is set and we want to show the gui otherwise hide.
      if (setting.value) {
        console.log("here is where we turn on cache");
      } else {
        console.log("here is where we turn off cache");
      }
    }

    // We want to make an immediate change when the setting changes.
    if ((setting.category === CATEGORY) && (setting.name === LOG_CACHE_HIT)) {
      // True means setting is set and we want to show the gui otherwise hide.
      if (setting.value) {
        console.log("here is where we turn on log cache hits");
      } else {
        console.log("here is where we turn off log cache hits");
      }
    }

    // We want to make an immediate change when the setting changes.
    if ((setting.category === CATEGORY) && (setting.name === LOG_CACHE_MISS)) {
      // True means setting is set and we want to show the gui otherwise hide.
      if (setting.value) {
        console.log("here is where we turn on log cache misses");
      } else {
        console.log("here is where we turn off log cache misses");
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
