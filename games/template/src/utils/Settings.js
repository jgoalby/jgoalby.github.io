import { EVENTS, EventDispatcher } from '../components/Events.js';

const SETTINGS = {
  MUSIC_OPTION: 'musicOption',
  SOUND_OPTION: 'soundOption',
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
    return this._values[name];
  }
}

export {
  SETTINGS,
  Settings
};
