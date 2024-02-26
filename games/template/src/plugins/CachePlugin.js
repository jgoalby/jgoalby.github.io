import Constants from '../constants.js';
import { getSettingsPlugin, getEventPlugin } from './PluginsHelpers.js'

// Constants that only this plugin uses.
const CATEGORY = 'developer';

const CACHE_OPTION = 'cacheOption';
const CACHE_OPTION_DESC = 'Cache Enabled';
const DEFAULT_CACHE_OPTION = true;
const CACHE_OPTION_TYPE = Constants.SETTINGS_TYPES.boolean;

const CLEAR_CACHE_OPTION = 'clearCacheOption';
const CLEAR_CACHE_OPTION_DESC = 'Clear Cache';
const DEFAULT_CLEAR_CACHE_OPTION = undefined;
const CLEAR_CACHE_OPTION_TYPE = Constants.SETTINGS_TYPES.function;

export default class CachePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Get the dependent plugins.
    this.settings = getSettingsPlugin();
    this.customevent = getEventPlugin();

    if (this.settings) {
      // Register the settings we need.
      this.settings.registerSetting(CATEGORY, CACHE_OPTION, DEFAULT_CACHE_OPTION, CACHE_OPTION_DESC, CACHE_OPTION_TYPE);
      this.settings.registerSetting(CATEGORY, CLEAR_CACHE_OPTION, DEFAULT_CLEAR_CACHE_OPTION, CLEAR_CACHE_OPTION_DESC, CLEAR_CACHE_OPTION_TYPE, () => { this.onClearCache() });
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
    if ((setting.category === CATEGORY) && (setting.name === CACHE_OPTION)) {
      // True means setting is set and we want to show the gui otherwise hide.
      if (setting.value) {
        console.log("here is where we turn on cache");
      } else {
        console.log("here is where we turn off cache");
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
