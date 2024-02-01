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

class Settings {
  constructor() {
    // Holder for the settings values.
    this._values = {};
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
}

export {
  SETTINGS,
  Settings
};
