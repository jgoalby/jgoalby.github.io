import Constants from '../constants.js';

export default class BootScene extends Phaser.Scene {
  constructor(deps) {
    super('Boot');
    this.deps = deps;
  }

  preload() {
    this.load.image('logo', Constants.ASSETS_PATH + 'misc/logo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
