import Constants from '../constants.js';

export default class SettingsPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // We need access to the event emitter.
    this.customevent = pluginManager.get('EventPlugin');

    // Holder for the settings values.
    this._values = {};
  }

  // Local plugin so we do not provide a version.
  getVersion() { return undefined; }

  // Settings we support. Make sure the names match the values.
  static SETTINGS = {
    musicOption: 'musicOption',
    soundOption: 'soundOption',
    introspectOption: 'introspectOption',
  };

  // Default values for the settings. Make sure names match above.
  static DEFAULTS = {
    musicOption: true,
    soundOption: true,
    introspectOption: false,
  };

  setValue(name, value) {
    // Set the value. We do not care if it is there before.
    this._values[name] = value;

    // Emit an event to let everyone know the setting has changed.
    this.customevent.emit(Constants.EVENTS.SETTING_CHANGED, { name: name, value: value});
  }

  getValue(name) {
    // If the value is not set...
    if (this._values[name] === undefined) {
      // ...return the default value.
      return SettingsPlugin.DEFAULTS[name];
    }
    // Return the value.
    return this._values[name];
  }

  static get options() {
    return { 
      key: 'SettingsPlugin', 
      plugin: SettingsPlugin, 
      start: true,
      mapping: 'settings',
    }
  }
}
