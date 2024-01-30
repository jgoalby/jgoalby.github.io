import AudioStatus from './utils/AudioStatus.js';

export default class Globals {
  static create() {
    const audioStatus = new AudioStatus();
    let globals = {
      audioStatus,
      bgMusic: null,
      player: '',
      score: 0,
    };
    return globals;
  }
}
