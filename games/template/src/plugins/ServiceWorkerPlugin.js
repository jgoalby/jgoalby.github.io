import Constants from '../constants.js';

export default class ServiceWorkerPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // If there is no service worker then we cannot do anything.
    if (! ('serviceWorker' in navigator)) { return; }

  }

  /**
   * Destroy the plugin and clean up after ourselves.
   */
  destroy() {
    // MUST do this.
    super.destroy();
  }

  /**
   * Local plugin so we do not provide a version.
   * 
   * @returns {string | undefined} The version of the plugin.
   */
  getVersion() { return undefined; }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.SERVICE_WORKER_KEY, 
      plugin: ServiceWorkerPlugin, 
      start: true,
      mapping: Constants.PLUGIN_INFO.SERVICE_WORKER_MAPPING,
    }
  }
}
