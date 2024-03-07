import Constants from '../constants.js';

export default class InitSetupPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    if (window) {
      // Set the plugin manager available to other plugins and functions used by them.
      window.pluginManager = pluginManager;
    }
  }

  /**
   * Local plugin so we do not provide a version.
   * 
   * @returns {string | undefined} The version of the plugin.
   */
  getVersion() { return undefined; }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.INIT_SETUP_KEY,
      plugin: InitSetupPlugin,
      start: true,
      mapping: Constants.PLUGIN_INFO.INIT_SETUP_MAPPING,
    }
  }
}
