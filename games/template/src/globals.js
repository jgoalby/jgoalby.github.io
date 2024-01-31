import Audio from './utils/Audio.js';

export default class Globals {
  static create() {
    const audio = new Audio();
    let globals = {
      audio,
      player: '',
      score: 0,
    };
    return globals;
  }
}
