import { EVENTS, EventDispatcher } from '../components/Events.js';
import { SETTINGS } from '../utils/Settings.js';

export default class Audio {
  constructor() {
    // Whether the music is currently playing.
    this._musicPlaying = false;

    // The background music object.
    this._music = null;

    EventDispatcher.instance.on(EVENTS.SETTING_CHANGED, this.onSettingChanged.bind(this));
  }

  // TODO: Have a way to set the music volume
  // TODO: Fix globals somehow.

  set musicOption(value)    { window.game.globals.settings.musicOption = value; }
  get musicOption()         { return window.game.globals.settings.musicOption; }

  set musicPlaying(value)   { this._musicPlaying = value; }
  get musicPlaying()        { return this._musicPlaying; }

  set music(value)          { this._music = value; }
  get music()               { return this._music; }

  onSettingChanged(setting) {
    if (setting.name === SETTINGS.MUSIC_OPTION) {
      if (setting.value) {
        this.playMusic();
      } else {
        this.pauseMusic();
      }
    }
  }

  pauseMusic() {
    if (this.musicPlaying) {
      // Mmake sure the variable contains an object.
      if (this.music) {
        if (this.music.isPlaying) {
          this.music.pause();
        }
      }
      // Make sure the music is not playing even if no music specified.
      this.musicPlaying = false;
    }
  }

  playMusic() {
    if ((this.musicOption) && (!this.musicPlaying)) {
      // We can only resume the music if there is a valid music object.
      if (this.music) {
        if (this.music.isPaused) {
          this.music.resume();
        } else {
          this.music.play();
        }

        // Music is only playing if we could play/resume the music.
        this.musicPlaying = true;
      }
    }
  }
}
