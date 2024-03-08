import Constants from '../constants.js';
import { getPlugin } from './PluginsHelpers.js'

export default class BasePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Get the dependent plugins.

    /** @type {SettingsPlugin} */
    this._settings = getPlugin(Constants.PLUGIN_INFO.SETTINGS_KEY);

    /** @type {EventPlugin} */
    this._customevent = getPlugin(Constants.PLUGIN_INFO.EVENT_KEY);

    // If we can access the settings plugin.
    if (this._settings) {
      // Get the plugin settings from derived classes if implemented.
      const pluginSettings = this.getPluginSettings();

      // Make sure there are any plugin settings before doing anything with them.
      if (pluginSettings) {
        // Register all of the settings.
        Object.keys(pluginSettings).forEach((key) => {
          this._settings.registerSetting(pluginSettings[key]);
        });
      }
    }

    // If we can access the event plugin.
    if (this._customevent) {
      // We would like to know when notification events happen so we can do stuff.
      this._customevent.on(Constants.EVENTS.NOTIFICATION, this.onNotification, this);      

      // We would like to know when the settings have changed so we can do stuff.
      this._customevent.on(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);

      // We would like to know when the actions have changed so we can do stuff. Note that we
      // do not care about the setting changes as we do not need to take immediate action on them.
      this._customevent.on(Constants.EVENTS.SETTING_ACTION, this.onSettingAction, this);

      // We also are interested in cache events please.
      this._customevent.on(Constants.EVENTS.CACHE_EVENT, this.onCacheEvent, this);
    }
  }

  destroy() {
    // We might not have the event plugin, so check this first.
    if (this._customevent) {
      // Remove the listener.
      this._customevent.off(Constants.EVENTS.NOTIFICATION, this.onNotification, this);
      this._customevent.off(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
      this._customevent.off(Constants.EVENTS.SETTING_ACTION, this.onSettingAction, this);
      this._customevent.off(Constants.EVENTS.CACHE_EVENT, this.onCacheEvent, this);
      this._customevent = undefined;
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
   * Get the plugin settings.
   * 
   * @returns {Object} The plugin settings.
   */
  getPluginSettings() { return undefined; }

  get settings() { return this._settings; }
  
  get customevent() { return this._customevent; }

  /**
   * Called when a notification event occurs.
   * 
   * @param {NotificationEvent} notification The notification event object.
   */
  onNotification(notification) { }

  /**
   * Called when a setting change event occurs.
   * 
   * @param {any} setting The setting that changed.
   */
  onSettingChanged(setting) { }

  /**
   * Action happened in settings.
   * 
   * @param {any} setting The setting that has changed.
   */
  onSettingAction(setting) { }

  /**
   * Called in response to messages.
   * 
   * @param {any} eventData The event data sent.
   */
  onCacheEvent(eventData) { }
}
