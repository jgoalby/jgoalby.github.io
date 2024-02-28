import Constants from '../constants.js';
import { getSettingsPlugin, getEventPlugin } from './PluginsHelpers.js'

// Various constants for the audio plugin. These are not global as the only thing that needs to know about them is this plugin.
const CATEGORY = 'sound';
const MUSIC_OPTION  = 'musicOption';
const VOLUME_OPTION = 'volumeOption';
const SOUND_OPTION    = 'soundOption';

const pluginSettings = {
  MUSIC_OPTION:{
    category: CATEGORY,
    name: MUSIC_OPTION,
    description: 'Music Enabled',
    value: false,
    type: Constants.SETTINGS_TYPES.boolean
  },
  VOLUME_OPTION: {
    category: CATEGORY,
    name: VOLUME_OPTION,
    description: 'Music Volume',
    value: 2,
    numvalues: 5,
    type: Constants.SETTINGS_TYPES.range
  },
  SOUND_OPTION: {
    category: CATEGORY,
    name: SOUND_OPTION,
    description: 'Sound Effects Enabled',
    value: true,
    type: Constants.SETTINGS_TYPES.boolean
  }
}

export default class AudioPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // The background music object.
    this._music = null;
    
    // Get the dependent plugins.
    this.settings = getSettingsPlugin();
    this.customevent = getEventPlugin();

    // If we can access the settings plugin.
    if (this.settings) {
      // Register all of the settings.
      Object.keys(pluginSettings).forEach((key) => {
        this.settings.registerSetting(pluginSettings[key]);
      });
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
    if (this.music) {
      // The volume is zero-based, so add 1 as disabling music already provides the ability to turn off music (0).
      let volume0to1 = (volume + 1) / pluginSettings.VOLUME_OPTION.numvalues;
      this.music.setVolume(volume0to1);
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

    // We want to make an immediate change when the volume  setting changes.
    if ((setting.category === CATEGORY) && (setting.name === VOLUME_OPTION)) {
      this.setVolume(setting.value);
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
