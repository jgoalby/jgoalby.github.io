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
      key: 'InitSetupPlugin', 
      plugin: InitSetupPlugin, 
      start: true,
      mapping: 'initsetup',
    }
  }
}