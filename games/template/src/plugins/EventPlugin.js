export default class EventPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Create an instance of an event emitter.
    this._eventDispatcher = new Phaser.Events.EventEmitter();
  }

  // Local plugin so we do not provide a version.
  getVersion() { return undefined; }

  emit(event, data) {
    return this._eventDispatcher.emit(event, data);
  }

  on(event, callback, context) {
    return this._eventDispatcher.on(event, callback, context);
  }

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
