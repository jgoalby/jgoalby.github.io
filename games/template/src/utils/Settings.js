import { EVENTS, EventDispatcher } from '../components/Events.js';

const SETTINGS = {
  MUSIC_OPTION: 'musicOption',
  SOUND_OPTION: 'soundOption',
};

const DEFAULTS = {
  MUSIC_OPTION: true,
  SOUND_OPTION: true,
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
    console.log("getValue: ", name, this._values[name]);
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
