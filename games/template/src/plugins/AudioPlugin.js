import Constants from '../constants.js';
import { getSettingsPlugin, getEventPlugin } from './PluginsHelpers.js'

// Various constants for the audio plugin. These are not global as the only thing that needs to know about them is this plugin.
const CATEGORY = 'sound';

// Music option settings.
const MUSIC_OPTION = 'musicOption';
const MUSIC_OPTION_DESC = 'Music Enabled';
const MUSIC_DEFAULT_OPTION = false;
const MUSIC_OPTION_TYPE = Constants.SETTINGS_TYPES.boolean;

const VOLUME_OPTION = 'volumeOption';
const VOLUME_OPTION_DESC = 'Music Volume';
const VOLUME_DEFAULT_OPTION = 0.5;
const VOLUME_OPTION_TYPE = Constants.SETTINGS_TYPES.range;

// Sound option settings.
const SOUND_OPTION = 'soundOption';
const SOUND_OPTION_DESC = 'Sound Effects Enabled';
const SOUND_DEFAULT_OPTION = true;
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
      this.settings.registerSetting(CATEGORY, MUSIC_OPTION, MUSIC_DEFAULT_OPTION, MUSIC_OPTION_DESC, MUSIC_OPTION_TYPE);
      this.settings.registerSetting(CATEGORY, VOLUME_OPTION, VOLUME_DEFAULT_OPTION, VOLUME_OPTION_DESC, VOLUME_OPTION_TYPE);
      this.settings.registerSetting(CATEGORY, SOUND_OPTION, SOUND_DEFAULT_OPTION, SOUND_OPTION_DESC, SOUND_OPTION_TYPE);
    }

    // Make sure we have the event plugin.
    if (this.customevent) {
      // We would like to know when the settings have changed so we can do stuff.
      this.customevent.on(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
    }
  }

  destroy() {
    // We might not have the plugin, so check this first.
    if (this.customevent) {
      // Remove the listener.
      this.customevent.off(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
      this.customevent = undefined;
    }

    // MUST do this.
    super.destroy();
  }

  /**
   * Local plugin so we do not provide a version.
   * 
   * @returns {string | undefined} The version of the plugin.
   */
  getVersion() { return undefined; }

  set music(value)          { this._music = value; }
  get music()               { return this._music; }

  /**
   * Set the volume.
   * 
   * @param {number} volume The volume from 0 to 1.
   */
  setVolume(volume) {
    if (this.music) {
      this.music.setVolume(volume);
    }
  }

  /**
   * Set whether to loop the music.
   * 
   * @param {boolean} loop Whether to loop the music.
   */
  setLoop(loop) {
    if (this.music) {
      this.music.setLoop(loop);
    }
  }

  onSettingChanged(setting) {
    // We want to make an immediate change when the music setting changes.
    if ((setting.category === CATEGORY) && (setting.name === MUSIC_OPTION)) {
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
