import Phaser from '../lib/phaser.js';
//import madeBy from '../Assets/misc/me-min.png';
//import gameLogo from '../Assets/misc/taklogo.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('madeBy', '../Assets/misc/me-min.png');
    this.load.image('gameLogo', '../Assets/misc/taklogo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
