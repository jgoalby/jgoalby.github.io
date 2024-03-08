import Constants from '../constants.js';
import { getActiveScene } from '../common.js';
import BasePlugin from './BasePlugin.js'
import Notification from '../components/Notification.js';

/**
 * Show a notification on the active scene. We are a plugin and called via an event,
 * so that means we are not directly called from a scene. We have to determine the
 * currently active scene ourselves.
 * 
 * The Notification class handles displaying the notification.
 */
export default class NotificationPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
  }

  /**
   * Called when a notification event occurs.
   * 
   * @param {NotificationEvent} notification The notification event object.
   */
  onNotification(notification) {
    // Get the currently active scene, could be undefined.
    const activeScene = getActiveScene();

    // Check just in case.
    if (activeScene) {
      // Various options we need to send.
      const notifcationOptions = { 
        notificationText: notification.notificationText,
        level: notification.level,
        onCompleteFn: (notificationDetails) => { this.onNotificationComplete(notificationDetails)
      }}

      // Create the notification on the scene. Right now it is fire and forget.
      const notificationObj = new Notification(activeScene, notifcationOptions);
    }
  }

  /**
   * The notification is no longer being shown.
   * 
   * We do not currently do anything here.
   * 
   * @param {any} notificationDetails 
   */
  onNotificationComplete(notificationDetails) {
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.NOTIFICATION_KEY,
      plugin: NotificationPlugin,
      start: true,
      mapping: Constants.PLUGIN_INFO.NOTIFICATION_MAPPING,
    }
  }
}
