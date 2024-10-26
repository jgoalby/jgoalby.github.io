import Constants from '../constants.js';
import BasePlugin from './BasePlugin.js'

// Various constants for the audio plugin. These are not global as the only thing that needs to know about them is this plugin.
const CATEGORY           = 'sound';
const MUSIC_OPTION       = 'musicOption';
const MUSIC_OPTION_DESC  = 'Music Enabled';
const VOLUME_OPTION      = 'volumeOption';
const VOLUME_OPTION_DESC = 'Music Volume';
const SOUND_OPTION       = 'soundOption';
const SOUND_OPTION_DESC  = 'Sound Effects Enabled';

const pluginSettings = {
  MUSIC_OPTION:{
    category: CATEGORY,
    name: MUSIC_OPTION,
    description: MUSIC_OPTION_DESC,
    value: false,
    type: Constants.SETTINGS_TYPES.boolean
  },
  VOLUME_OPTION: {
    category: CATEGORY,
    name: VOLUME_OPTION,
    description: VOLUME_OPTION_DESC,
    value: 2,
    numvalues: 5,
    type: Constants.SETTINGS_TYPES.range
  },
  SOUND_OPTION: {
    category: CATEGORY,
    name: SOUND_OPTION,
    description: SOUND_OPTION_DESC,
    value: true,
    type: Constants.SETTINGS_TYPES.boolean
  }
}

export default class AudioPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // The background music object.
    this._music = null;
  }

  /**
   * Get the plugin settings.
   * 
   * @returns {Object} The plugin settings.
   */
  getPluginSettings() { return pluginSettings; }

  /**
   * Add music.
   * 
   * @param {any} sound The sound to add as the music.
   */
  addMusic(sound) {
    // Set the music.
    this._music = sound;

    // We always want to loop the music.
    this._music.setLoop(true);

    // Set the volume for the music based on the volume setting.
    const volumeSetting = this.settings.getValue(CATEGORY, VOLUME_OPTION);
    this.setVolume(volumeSetting);
  }

  /**
   * Set the volume.
   * 
   * @param {number} volume The volume from 0 to 1.
   */
  setVolume(volume) {
    if (this._music) {
      // The volume is zero-based, so add 1 as disabling music already provides the ability to turn off music (0).
      let volume0to1 = (volume + 1) / pluginSettings.VOLUME_OPTION.numvalues;
      this._music.setVolume(volume0to1);
    }
  }

  /**
   * Set whether to loop the music.
   * 
   * @param {boolean} loop Whether to loop the music.
   */
  setLoop(loop) {
    if (this._music) {
      this._music.setLoop(loop);
    }
  }

  /**
   * Called when a setting is changed.
   * 
   * @param {any} setting The changed setting.
   */
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

    // We want to make an immediate change when the volume  setting changes.
    if ((setting.category === CATEGORY) && (setting.name === VOLUME_OPTION)) {
      this.setVolume(setting.value);
    }
  }

  /**
   * Pause the music.
   */
  pauseMusic() {
    // Mmake sure the variable contains an object.
    if (this._music) {
      if (this._music.isPlaying) {
        this._music.pause();
      }
    }
  }

  /**
   * Play the music.
   */
  playMusic() {
    // If there are settings, check them, and if not, ignore them.
    if (this.settings) {
      // We can only play/resume the music if the user wants it.
      if (! (this.settings.getValue(CATEGORY, MUSIC_OPTION))) {
        return;
      }
    }

    // Make sure we have a music object to play first.
    if (this._music) {
      // You can only play music if it is not already playing.
      if (this._music.isPaused) {
        this._music.resume();
      } else if (!this._music.isPlaying) {
        this._music.play();
      }
    }
  }

  /**
   * Play the specified sound.
   * 
   * @param {any} sound The sound to play.
   */
  playSound(sound) {
    // If there are settings, check them, and if not, ignore them.
    if (this.settings) {
      // We can only play the sound if the user wants it.
      if (! (this.settings.getValue(CATEGORY, SOUND_OPTION))) {
        // User said no.
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
      key: Constants.PLUGIN_INFO.AUDIO_KEY,
      plugin: this,
      start: true,
      mapping: Constants.PLUGIN_INFO.AUDIO_PLUGIN,
    }
  }
}
