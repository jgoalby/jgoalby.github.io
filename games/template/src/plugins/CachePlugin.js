import Constants from '../constants.js';
import { getSettingsPlugin, getEventPlugin } from './PluginsHelpers.js'

// Constants that only this plugin uses.
const CATEGORY = 'developer';

const cache = {
  category: CATEGORY,
  name: 'cacheOption',
  description: 'Cache Enabled',
  default: true,
  type: Constants.SETTINGS_TYPES.boolean
}

const logCacheHit = {
  category: CATEGORY,
  name: 'logCacheHitOption',
  description: 'Log Cache Hits',
  default: true,
  type: Constants.SETTINGS_TYPES.boolean
}

const logCacheMiss = {
  category: CATEGORY,
  name: 'logCacheMissOption',
  description: 'Log Cache Misses',
  default: true,
  type: Constants.SETTINGS_TYPES.boolean
}

const clearCache = {
  category: CATEGORY,
  name: 'clearCacheOption',
  description: 'Clear Cache',
  default: undefined,
  type: Constants.SETTINGS_TYPES.function
}

export default class CachePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Get the dependent plugins.
    this.settings = getSettingsPlugin();
    this.customevent = getEventPlugin();

    if (this.settings) {
      // Register the settings we need.
      this.settings.registerSettingnew(cache);
      this.settings.registerSettingnew(logCacheHit);
      this.settings.registerSettingnew(logCacheMiss);
      this.settings.registerSettingnew(clearCache, () => { this.onClearCache() });
    }

    if (this.customevent) {
      // We would like to know when the settings have changed so we can do stuff.
      this.customevent.on(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
    }
  }

  destroy() {
    // We might not have the plugin, so check this first.
    if (this.customevent) {
      // Remove the listener.
      this.customevent.off(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
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
    if ((setting.category === CATEGORY) && (setting.name === cache.name)) {
      // True means setting is set and we want to show the gui otherwise hide.
      if (setting.value) {
        console.log("here is where we turn on cache");
      } else {
        console.log("here is where we turn off cache");
      }
    }

    // We want to make an immediate change when the setting changes.
    if ((setting.category === CATEGORY) && (setting.name === logCacheHit.name)) {
      // True means setting is set and we want to show the gui otherwise hide.
      if (setting.value) {
        console.log("here is where we turn on log cache hits");
      } else {
        console.log("here is where we turn off log cache hits");
      }
    }

    // We want to make an immediate change when the setting changes.
    if ((setting.category === CATEGORY) && (setting.name === logCacheMiss.name)) {
      // True means setting is set and we want to show the gui otherwise hide.
      if (setting.value) {
        console.log("here is where we turn on log cache misses");
      } else {
        console.log("here is where we turn off log cache misses");
      }
    }
  }

  onClearCache() {
    console.log("here is where we clear the cache!! Woohoo!!");
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
