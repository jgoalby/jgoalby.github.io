import Constants from '../constants.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('madeBy', Constants.ASSETS_PATH + 'misc/me-min.png');
    this.load.image('gameLogo', Constants.ASSETS_PATH + 'misc/tanklogo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
