import Audio from './utils/Audio.js';
import Settings from './utils/Settings.js';

export default class Globals {
  static create() {
    const audio = new Audio();
    const settings = new Settings();

    let globals = {
      audio,
      settings,
      player: '',
      score: 0,
    };
    return globals;
  }
}
