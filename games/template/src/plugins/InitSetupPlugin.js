import Constants from '../constants.js';
import BasePlugin from './BasePlugin.js'

export default class InitSetupPlugin extends BasePlugin {
  constructor(pluginManager) {
    // the plugin manager is available to us.
    super(pluginManager);

    // The window should always be present.
    if (window) {
      // Set the plugin manager available to other plugins and functions used by them.
      window.pluginManager = pluginManager;
    }
  }

  /**
   * We do not want the BasePlugin to create an instance of the setting plugin because we
   * are defined before the settings plugin has initialized.
   * 
   * @returns {boolean} False as the plugin is not wanted.
   */
  isSettingsPluginWanted() { return false; }

  /**
   * We do not want the BasePlugin to create an instance of the event plugin because we
   * are defined before the event plugin has initialized.
   * 
   * @returns {boolean} False as the plugin is not wanted.
   */
  isEventPluginWanted() { return false; }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.INIT_SETUP_KEY,
      plugin: this,
      start: true,
      mapping: Constants.PLUGIN_INFO.INIT_SETUP_PLUGIN,
    }
  }
}
