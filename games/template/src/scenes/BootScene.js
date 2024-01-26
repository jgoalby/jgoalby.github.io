import Constants from '../constants.js';

export default class BootScene extends Phaser.Scene {
  constructor(deps) {
    super('Boot');
    this.deps = deps;
  }

  preload() {
    this.load.image('logo_landscape', Constants.ASSETS_PATH + 'misc/logo_landscape.png');
    this.load.image('logo_portrait', Constants.ASSETS_PATH + 'misc/logo_portrait.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
