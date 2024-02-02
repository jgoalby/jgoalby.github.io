import { EVENTS, EventDispatcher } from '../components/Events.js';

// Settings we support. Make sure the names match the values.
const SETTINGS = {
  musicOption: 'musicOption',
  soundOption: 'soundOption',
};

// Default values for the settings. Make sure names match above.
const DEFAULTS = {
  musicOption: true,
  soundOption: true,
};

class SettingsPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
    console.log("In Settings plugin constructor");

    // Holder for the settings values.
    this._values = {};
  }

  getVersion() {
    return undefined;
  }

  setValue(name, value) {
    // Set the value. We do not care if it is there before.
    this._values[name] = value;

    // Emit an event to let everyone know the setting has changed.
    EventDispatcher.instance.emit(EVENTS.SETTING_CHANGED, { name: name, value: value});
  }

  getValue(name) {
    // If the value is not set...
    if (this._values[name] === undefined) {
      // ...return the default value.
      return DEFAULTS[name];
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

export {
  SETTINGS,
  SettingsPlugin
};
