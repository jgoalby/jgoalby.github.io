import Constants from '../constants.js';
import { getEventPlugin } from './PluginsHelpers.js'

export default class NotificationPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Get the dependent plugins.
    this.customevent = getEventPlugin();

    // If we can access the event plugin.
    if (this.customevent) {
      // We would like to know when notification events happen so we can do stuff.
      this.customevent.on(Constants.EVENTS.NOTIFICATION, this.onNotification, this);      
    }
  }

  destroy() {
    // We might not have the plugin, so check this first.
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
   * @param {string} notification The notification text.
   */
  onNotification(notification) {
    console.log("NOTIFICATION: " + notification);
  }

  static get options() {
    return { 
      key: 'NotificationPlugin', 
      plugin: NotificationPlugin, 
      start: true,
      mapping: 'notification',
    }
  }
}