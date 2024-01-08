import AudioModel from './utils/audio-status.js';

export default class Globals {
  static create() {
    const model = new AudioModel();
    let globals = {
      model,
      bgMusic: null,
      player: '',
      score: 0,
    };
    return globals;
  }
}
