import { EVENTS, EventDispatcher } from '../components/Events.js';
import { SETTINGS } from '../utils/Settings.js';

export default class Audio {
  constructor() {
    // The background music object.
    this._music = null;

    // We would like to know when the settings have changed so we can do stuff.
    EventDispatcher.instance.on(EVENTS.SETTING_CHANGED, this.onSettingChanged.bind(this));
  }

  // Expose the music option to the outside world.
  set musicOption(value)    { window.game.globals.settings.setValue(SETTINGS.musicOption, value); }
  get musicOption()         { return window.game.globals.settings.getValue(SETTINGS.musicOption); }

  // We get the music object from the scene.
  set music(value)          { this._music = value; }
  get music()               { return this._music; }

  onSettingChanged(setting) {
    // We want to make an immediate change when the music setting changes.
    if (setting.name === SETTINGS.musicOption) {
      // True means setting is set and we want to play music, otherwise silence.
      if (setting.value) {
        this.playMusic();
      } else {
        this.pauseMusic();
      }
    }
  }

  pauseMusic() {
    // Mmake sure the variable contains an object.
    if (this.music) {
      if (this.music.isPlaying) {
        this.music.pause();
      }
    }
  }

  playMusic() {
    // We can only play/resume the music if the user wants it and there is a valid music object.
    if ((this.musicOption) && (this.music)) {
      // You can only play music if it is not already playing.
      if (this.music.isPaused) {
        this.music.resume();
      } else if (!this.music.isPlaying) {
        this.music.play();
      }
    }
  }
}
