import Constants from '../constants.js';

export default class BootScene extends Phaser.Scene {
  constructor(deps) {
    super('Boot');
    this.deps = deps;
  }

  preload() {
    this.load.image('splash_landscape', Constants.ASSETS_PATH + 'misc/splash_landscape.png');
    this.load.image('splash_portrait', Constants.ASSETS_PATH + 'misc/splash_portrait.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
