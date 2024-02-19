import Constants from '../constants.js';
import { getSettingsPlugin, getEventPlugin } from './pluginshelpers.js'

// Various constants for the audio plugin. These are not global as the only thing that needs to know about them is this plugin.
const CATEGORY = 'sound';

// Music option settings.
const MUSIC_OPTION = 'musicOption';
const MUSIC_OPTION_DESC = 'Music Enabled';
const DEFAULT_MUSIC_OPTION = false;
const MUSIC_OPTION_TYPE = Constants.SETTINGS_TYPES.boolean;

// Sound option settings.
const SOUND_OPTION = 'soundOption';
const SOUND_OPTION_DESC = 'Sound Effects Enabled';
const DEFAULT_SOUND_OPTION = true;
const SOUND_OPTION_TYPE = Constants.SETTINGS_TYPES.boolean;

export default class AudioPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // The background music object.
    this._music = null;
    
    // Get the dependent plugins.
    this.settings = getSettingsPlugin();
    this.customevent = getEventPlugin();

    // Make sure we have the settings plugin.
    if (this.settings) {
      // Register the settings we need.
      this.settings.registerSetting(CATEGORY, MUSIC_OPTION, DEFAULT_MUSIC_OPTION, MUSIC_OPTION_DESC, MUSIC_OPTION_TYPE);
      this.settings.registerSetting(CATEGORY, SOUND_OPTION, DEFAULT_SOUND_OPTION, SOUND_OPTION_DESC, SOUND_OPTION_TYPE);
    }

    // Make sure we have the event plugin.
    if (this.customevent) {
      // We would like to know when the settings have changed so we can do stuff.
      this.customevent.on(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged.bind(this));
    }
  }

  // Local plugin so we do not provide a version.
  getVersion() { return undefined; }

  // We get the music object from the scene.
  set music(value)          { this._music = value; }
  get music()               { return this._music; }

  onSettingChanged(setting) {
    // We want to make an immediate change when the music setting changes.
    if (setting.name === MUSIC_OPTION) {
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
    // If there are settings, check them, and if not, ignore them.
    if (this.settings) {
      // We can only play/resume the music if the user wants it.
      if (! (this.settings.getValue(CATEGORY, MUSIC_OPTION))) {
        return;
      }
    }

    // Make sure we have a music object to play first.
    if (this.music) {
      // You can only play music if it is not already playing.
      if (this.music.isPaused) {
        this.music.resume();
      } else if (!this.music.isPlaying) {
        this.music.play();
      }
    }
  }

  playSound(sound) {
    // If there are settings, check them, and if not, ignore them.
    if (this.settings) {
      // We can only play the sound if the user wants it.
      if (! (this.settings.getValue(CATEGORY, SOUND_OPTION))) {
        return;
      }
    }

    // Make sure a sound was passed in, and if so, play it.
    if (sound) {
      sound.play();
    }
  }

  static get options() {
    return { 
      key: 'AudioPlugin', 
      plugin: AudioPlugin, 
      start: true,
      mapping: 'audio',
    }
  }
}
