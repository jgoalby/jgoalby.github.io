import Constants from '../constants.js';
import BasePlugin from './BasePlugin.js'

export default class EventPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Create an instance of an event emitter.
    this._eventDispatcher = new Phaser.Events.EventEmitter();
  }

  /**
   * We do not want the BasePlugin to create an instance of the setting plugin because we
   * are defined before the settings plugin has initialized.
   * 
   * @returns {boolean} False as the plugin is not wanted.
   */
  isSettingsPluginWanted() { return false; }

  /**
   * We do not want the BasePlugin to create an instance of the event plugin for quite
   * obvious reasons.
   * 
   * @returns {boolean} False as the plugin is not wanted.
   */
  isEventPluginWanted() { return false; }

  /**
   * Calls each of the listeners registered for a given event.
   * 
   * @param {string | symbol} event The event name.
   * @param {any} data additional arguments that will be passed to the event listener.
   * @returns {boolean} true if the event had listeners, false otherwise.
   */
  emit(event, data) {
    return this._eventDispatcher.emit(event, data);
  }

  /**
   * Add a listener for a given event.
   * 
   * @param {string | symbol} event The event name.
   * @param {Function} callback The callback to invoke when the event is emitted.
   * @param {any} context The context to invoke the callback with, need to specify your this.
   * @returns {Phaser.Events.EventEmitter}
   */
  on(event, callback, context) {
    return this._eventDispatcher.on(event, callback, context);
  }

  /**
   * Remove the listeners of a given event.
   * 
   * @param {string | symbol} event The event name.
   * @param {Function} callback Only remove listeners that have this callback.
   * @param {any} context Only remove listeners that have this context, specify your this.
   * @param {boolean} [once] Only remove one time listeners.
   * @returns {Phaser.Events.EventEmitter}
   */
  off(event, callback, context, once) {
    return this._eventDispatcher.off(event, callback, context, once);
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.EVENT_KEY,
      plugin: this,
      start: true,
      mapping: Constants.PLUGIN_INFO.EVENT_PLUGIN,
    }
  }
}
