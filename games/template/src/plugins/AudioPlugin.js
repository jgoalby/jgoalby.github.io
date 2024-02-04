import Constants from '../constants.js';

export default class AudioPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // The background music object.
    this._music = null;
    
    // Get the dependent plugins.
    this.settings = pluginManager.get('SettingsPlugin');
    this.customevent = pluginManager.get('EventPlugin');

    // We would like to know when the settings have changed so we can do stuff.
    this.customevent.on(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged.bind(this));
  }

  // Local plugin so we do not provide a version.
  getVersion() { return undefined; }

  // We get the music object from the scene.
  set music(value)          { this._music = value; }
  get music()               { return this._music; }

  onSettingChanged(setting) {
    // We want to make an immediate change when the music setting changes.
    if (setting.name === Constants.SETTINGS.musicOption) {
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
    if ((this.settings.getValue(Constants.SETTINGS.musicOption)) && (this.music)) {
      // You can only play music if it is not already playing.
      if (this.music.isPaused) {
        this.music.resume();
      } else if (!this.music.isPlaying) {
        this.music.play();
      }
    }
  }

  playSound(sound) {
    // We can only play the sound if the user wants it, and we have a sound passed in.
    if ((this.settings.getValue(Constants.SETTINGS.soundOption)) && (sound)) {
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
