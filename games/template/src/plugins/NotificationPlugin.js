import Constants from '../constants.js';
import { getActiveScene } from '../common.js';
import { getEventPlugin } from './PluginsHelpers.js'
import Notification from '../components/Notification.js';

/**
 * Show a notification on the active scene. We are a plugin and called via an event,
 * so that means we are not directly called from a scene. So, we have to determine the
 * currently active scene ourselves.
 * 
 * We show the notification at the bottom of the scene, and if there are other existing
 * notification being shown, we try to not overlap them by increasing a height value
 * based on the height the previous notifications say they were. This means that if
 * notifications keep happening, they will climb to the top of the scene and never
 * go back to the bottom. This is a simple way to avoid overlapping notifications.
 * 
 * In the future we have a few options:
 *  1) add a queue of notifications.
 *  2) reuse slots on the scene after a notification has completed.
 *     but that means that it will not be obvious order the notifications are in.
 *  3) have a way to shunt notifications down the screen as others complete.
 * 
 * Number 3 is how other systems work, but it is more complex to implement. Especially
 * when the notification and the management of them are separate. I guess at that
 * point we would have this plugin keep a representation of where all of the notifications
 * are and have it control their positions.
 * 
 * I think it is worth waiting for the problem of too many notificaitons to occur before
 * implementing a more complex solution.
 */
export default class NotificationPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Get the dependent plugins.
    this.customevent = getEventPlugin();

    // Start off with no current notifications or added height.
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
      // Various options we need to send.
      const notifcationOptions = { 
        currentHeight: this.currentHeight, 
        notificationText: notification.notificationText, 
        onCompleteFn: (notificationDetails) => { this.onNotificationComplete(notificationDetails) 
      }}

      // Create the notification on the scene.
      const notificationObj = new Notification(activeScene, notifcationOptions);

      // Add to the number of notifications and increase the height so they don't overlap.
      this.currentNotifications += 1;
      this.currentHeight += notificationObj.getPanelHeight();
    }
  }

  /**
   * The notification is no longer being shown.
   * 
   * We do not currently use the notificationDetails, but we could use it to determine the height of the notification.
   * Right now we simply reset the current height when all current notifications have completed.
   * 
   * @param {any} notificationDetails 
   */
  onNotificationComplete(notificationDetails) {
    // One less to worry about.
    this.currentNotifications -= 1;

    // If there are no current notifications, we can reset the height.
    if (this.currentNotifications <= 0) {
      // Make sure the current number is actually zero, and reset the height for new notifications.
      this.currentNotifications = 0;
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
