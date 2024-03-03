import Constants from '../constants.js';
import { getActiveScene } from '../common.js';
import { getEventPlugin } from './PluginsHelpers.js'
import Notification from '../components/Notification.js';

export default class NotificationPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Get the dependent plugins.
    this.customevent = getEventPlugin();

    this.currentNotifications = 0;
    this.currentHeight = 0;

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
    const activeScene = getActiveScene();

    // Check just in case.
    if (activeScene) {
      const notifcationOptions = { 
        currentHeight: this.currentHeight, 
        notificationText: notification.notificationText, 
        onCompleteFn: (notificationDetails) => { this.onNotificationComplete(notificationDetails) 
      }}

      const notificationObj = new Notification(activeScene, notifcationOptions);

      this.currentNotifications += 1;
      this.currentHeight += notificationObj.getPanelHeight();
    }
  }

  onNotificationComplete(notificationDetails) {
    this.currentNotifications -= 1;

    if (this.currentNotifications <= 0) {
      this.currentHeight = 0;
    }
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
