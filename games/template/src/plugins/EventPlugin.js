export default class EventPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Create an instance of an event emitter.
    this._eventDispatcher = new Phaser.Events.EventEmitter();
  }

  /**
   * Local plugin so we do not provide a version.
   * 
   * @returns {string | undefined} The version of the plugin.
   */
  getVersion() { return undefined; }

  /**
   * Calls each of the listeners registered for a given event.
   * 
   * @param {string | symbol} event The event name.
   * @param {any} data additional arguments that will be passed to the event listener.
   * @returns {boolean}
   */
  emit(event, data) {
    return this._eventDispatcher.emit(event, data);
  }

  /**
   * Add a listener for a given event.
   * 
   * @param {string | symbol} event The event name.
   * @param {Function} callback The callback to invoke when the event is emitted.
   * @param {any} [context] The context to invoke the callback with, default this.
   * @returns {Phaser.Events.EventEmitter}
   */
  on(event, callback, context) {
    return this._eventDispatcher.on(event, callback, context);
  }

  /**
   * Remove the listeners of a given event.
   * 
   * @param {string | symbol} event The event name.
   * @param {Function} [callback] Only remove listeners that have this callback.
   * @param {any} [context] Only remove listeners that have this context.
   * @param {boolean} [once] Only remove one time listeners.
   * @returns {Phaser.Events.EventEmitter}
   */
  off(event, callback, context, once) {
    return this._eventDispatcher.off(event, callback, context, once);
  }

  static get options() {
    return { 
      key: 'EventPlugin', 
      plugin: EventPlugin, 
      start: true,
      mapping: 'customevent',
    }
  }
}
