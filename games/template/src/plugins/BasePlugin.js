export default class BasePlugin extends Phaser.Plugins.BasePlugin {
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
      key: 'BasePlugin', 
      plugin: BasePlugin, 
      start: true,
      mapping: 'base',
    }
  }
}
