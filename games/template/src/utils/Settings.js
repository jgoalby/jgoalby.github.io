import { EVENTS, EventDispatcher } from '../components/Events.js';

const SETTINGS = {
  musicOption: 'musicOption',
  soundOption: 'soundOption',
};

// TODO: is this the issue?

const DEFAULTS = {
  musicOption: true,
  soundOption: true,
};

class Settings {
  constructor() {
    this._values = {};
  }

  setValue(name, value) {
    this._values[name] = value;
    EventDispatcher.instance.emit(EVENTS.SETTING_CHANGED, { name: name, value: value});
  }

  getValue(name) {
    if (this._values[name] === undefined) {
      return DEFAULTS[name];
    }
    return this._values[name];
  }
}

export {
  SETTINGS,
  Settings
};
