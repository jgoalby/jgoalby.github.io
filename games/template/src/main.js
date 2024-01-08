import config from './config/config.js';
import Globals from './globals.js';
import Scenes from './scenes/Scenes.js';

export default class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.globals = Globals.create();
    Scenes.create(this);
  }
}

// @ts-ignore
window.game = new Game();
