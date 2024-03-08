import Constants from '../constants.js';
import { getPlugin } from './PluginsHelpers.js'

export default class BasePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Get the dependent plugins.

    /** @type {EventPlugin} */
    this.customevent = getPlugin(Constants.PLUGIN_INFO.EVENT_KEY);

    // If we can access the event plugin.
    if (this.customevent) {
      // We would like to know when notification events happen so we can do stuff.
      this.customevent.on(Constants.EVENTS.NOTIFICATION, this.onNotification, this);      
    }
  }

  destroy() {
    // We might not have the event plugin, so check this first.
    if (this.customevent) {
      // Remove the listener.
      this.customevent.off(Constants.EVENTS.NOTIFICATION, this.onNotification, this);
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
   * Called when a notification event occurs.
   * 
   * @param {NotificationEvent} notification The notification event object.
   */
  onNotification(notification) {
  }
}
