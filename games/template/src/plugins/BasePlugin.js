import Constants from '../constants.js';
import { getPlugin } from './PluginsHelpers.js'

export default class BasePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Get the dependent plugins.

    /** @type {SettingsPlugin} */
    this.settings = getPlugin(Constants.PLUGIN_INFO.SETTINGS_KEY);

    /** @type {EventPlugin} */
    this.customevent = getPlugin(Constants.PLUGIN_INFO.EVENT_KEY);

    // If we can access the settings plugin.
    if (this.settings) {
      // Get the plugin settings from derived classes if implemented.
      const pluginSettings = this.getPluginSettings();

      // Make sure there are any plugin settings before doing anything with them.
      if (pluginSettings) {
        // Register all of the settings.
        Object.keys(pluginSettings).forEach((key) => {
          this.settings.registerSetting(pluginSettings[key]);
        });
      }
    }

    // If we can access the event plugin.
    if (this.customevent) {
      // We would like to know when notification events happen so we can do stuff.
      this.customevent.on(Constants.EVENTS.NOTIFICATION, this.onNotification, this);      

      // We would like to know when the settings have changed so we can do stuff.
      this.customevent.on(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
    }
  }

  destroy() {
    // We might not have the event plugin, so check this first.
    if (this.customevent) {
      // Remove the listener.
      this.customevent.off(Constants.EVENTS.NOTIFICATION, this.onNotification, this);
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

  /**
   * Get the plugin settings.
   * 
   * @returns {Object} The plugin settings.
   */
  getPluginSettings() { return undefined; }

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
}
