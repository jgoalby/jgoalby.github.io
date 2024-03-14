import Constants from '../constants.js';
import { getPlugin, getPluginProxy } from './PluginsHelpers.js'

export default class BasePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Get the dependent plugins (can be overridden).

    // Some derived classes may not want the settings plugin.
    if (this.isSettingsPluginWanted()) {
      /** @type {SettingsPlugin} */
      this._settings = getPlugin(Constants.PLUGIN_INFO.SETTINGS_KEY);
    }

    // This can be used in place of the plugin so clients do not have to check if it exists.
    this._settingsProxy = getPluginProxy();

    // Some derived classes may not want the event plugin.
    if (this.isEventPluginWanted()) {
      /** @type {EventPlugin} */
      this._customevent = getPlugin(Constants.PLUGIN_INFO.EVENT_KEY);
    }

    // This can be used in place of the plugin so clients do not have to check if it exists.
    this._customeventProxy = getPluginProxy();

    // If we can access the settings plugin.
    if (this._settings) {
      // Get the plugin settings from derived classes if implemented.
      const pluginSettings = this.getPluginSettings();

      // Make sure there are plugin settings before doing anything with them.
      if (pluginSettings) {
        // Register all of the settings.
        Object.keys(pluginSettings).forEach((key) => {
          this._settings.registerSetting(pluginSettings[key]);
        });
      }
    }

    // If we can access the event plugin.
    if (this._customevent) {
      // If the derived class has implemented the method, then setup the event handler. By doing this
      // we can avoid having events sent to us when the derived class does not override the method.

      if (BasePlugin.prototype.onNotification !== this.onNotification) {
        // We would like to know when notification events happen so we can do stuff.
        this._customevent.on(Constants.EVENTS.NOTIFICATION, this.onNotification, this);    
      }

      if (BasePlugin.prototype.onSettingChanged !== this.onSettingChanged) {
        // We would like to know when the settings have changed so we can do stuff.
        this._customevent.on(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
      }

      if (BasePlugin.prototype.onSettingAction !== this.onSettingAction) {
        // We would like to know when the actions have changed so we can do stuff. Note that we
        // do not care about the setting changes as we do not need to take immediate action on them.
        this._customevent.on(Constants.EVENTS.SETTING_ACTION, this.onSettingAction, this);
      }

      if (BasePlugin.prototype.onCacheEvent !== this.onCacheEvent) {
        // We also are interested in cache events please.
        this._customevent.on(Constants.EVENTS.CACHE_EVENT, this.onCacheEvent, this);
      }

      if (BasePlugin.prototype.onKeyboard !== this.onKeyboard) {
        // This time we would like to have keyboard events.
        this._customevent.on(Constants.EVENTS.KEYBOARD, this.onKeyboard, this);
      }

      if (BasePlugin.prototype.onAddShortcut !== this.onAddShortcut) {
        // This time we would like to have add shortcut events.
        this._customevent.on(Constants.EVENTS.ADD_SHORTCUT, this.onAddShortcut, this);
      }

      if (BasePlugin.prototype.onRemoveShortcut !== this.onRemoveShortcut) {
        // This time we would like to have remove shortcut events.
        this._customevent.on(Constants.EVENTS.REMOVE_SHORTCUT, this.onRemoveShortcut, this);
      }

      if (BasePlugin.prototype.onClearCache !== this.onClearCache) {
        // We want to know when anyone wants the cache to be cleared as it is handled by the service worker.
        // This means we can keep all of the service worker code in this plugin, separating the concerns.
        this._customevent.on(Constants.EVENTS.CLEAR_CACHE, this.onClearCache, this);
      }
    }
  }

  /**
   * Destroy the plugin and clean up after ourselves.
   */
  destroy() {
    // We might not have the event plugin, so check this first.
    if (this._customevent) {
      // Remove the listeners. Do not want to remove them unless we set them up in the first place.

      if (BasePlugin.prototype.onNotification !== this.onNotification) {
        this._customevent.off(Constants.EVENTS.NOTIFICATION, this.onNotification, this);
      }
      if (BasePlugin.prototype.onSettingChanged !== this.onSettingChanged) {
        this._customevent.off(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
      }
      if (BasePlugin.prototype.onSettingAction !== this.onSettingAction) {
        this._customevent.off(Constants.EVENTS.SETTING_ACTION, this.onSettingAction, this);
      }
      if (BasePlugin.prototype.onCacheEvent !== this.onCacheEvent) {
        this._customevent.off(Constants.EVENTS.CACHE_EVENT, this.onCacheEvent, this);
      }
      if (BasePlugin.prototype.onKeyboard !== this.onKeyboard) {
        this._customevent.off(Constants.EVENTS.KEYBOARD, this.onKeyboard, this);
      }
      if (BasePlugin.prototype.onAddShortcut !== this.onAddShortcut) {
        this._customevent.off(Constants.EVENTS.ADD_SHORTCUT, this.onAddShortcut, this);
      }
      if (BasePlugin.prototype.onRemoveShortcut !== this.onRemoveShortcut) {
        this._customevent.off(Constants.EVENTS.REMOVE_SHORTCUT, this.onRemoveShortcut, this);
      }
      if (BasePlugin.prototype.onClearCache !== this.onClearCache) {
        this._customevent.off(Constants.EVENTS.CLEAR_CACHE, this.onClearCache, this);
      }
      this._customevent = undefined;
    }

    // MUST do this.
    super.destroy();
  }

  /**
   * Get a plugin instance using the plugin name.
   *
   * @param {string} pluginName The plugin name to get the instance of.
   * @returns {BasePlugin | undefined} The plugin or undefined if not found.
   */
  static getInstance(pluginName) {
    // Use the plugin helper function to get the plugin for us.
    return getPlugin(pluginName);
  }

  /**
   * Simple helper to get a setting value.
   * 
   * @param {string} category The category for the setting.
   * @param {string} settingName The name of the setting to get.
   * @returns {any | undefined} the setting value or undefined.
   */
  getSettingValue(category, settingName) {
    if (this.settings) {
      // Get the setting object, and then the value from that object.
      return this.settings.getSetting(category, settingName).value;
    } else {
      return undefined;
    }
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
   * There are some plugins that do not want the settings plugin. For example the settings plugin
   * might get into a pickle if it tries to use the settings plugin. Derived classes can return false
   * if they do not want the plugin created.
   * 
   * @returns {boolean} True if the settings plugin is wanted.
   */
  isSettingsPluginWanted() { return true; }

  /**
   * There are some plugins that do not want the custom event plugin. For example the event plugin
   * might get into a pickle if it tries to use the event plugin. Derived classes can return false
   * if they do not want the plugin created.
   * 
   * @returns {boolean} True if the custom event plugin is wanted.
   */
  isEventPluginWanted() { return true; }

  /**
   * Get the settings plugin.
   * 
   * @returns {SettingsPlugin} The settings plugin or a proxy so you do not have to check if undefined.
   */
  get settings() { return this._settings ? this._settings : this._settingsProxy; }

  /**
   * Get the event plugin.
   * 
   * @returns {EventPlugin} The event plugin or a proxy so you do not have to check if undefined.
   */
  get customevent() { return this._customevent ? this._customevent : this._customeventProxy; }

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

  /**
   * A custom key event happened. We want to listen for keys as we want to toggle the console.
   * 
   * @param {any} keyEvent The keyboard event.
   */
  onKeyboard(keyEvent) { }

  /**
   * An add shortcut event happened.
   * 
   * @param {any} shortcutInfo The shortcut information.
   */
  onAddShortcut(shortcutInfo) { }

  /**
   * A remove shortcut event happened.
   * 
   * @param {any} shortcutInfo The shortcut information.
   */
  onRemoveShortcut(shortcutInfo) { }

  /**
   * Event requesting to clear the cache.
   */
  onClearCache() { }
}
