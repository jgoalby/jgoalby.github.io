import Constants from '../constants.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super(Constants.SCENES.BOOT_SCENE);
  }

  preload() {
    this.load.image('splash_landscape', Constants.GENERAL.ASSETS_PATH + 'misc/splash_landscape.png');
    this.load.image('splash_portrait', Constants.GENERAL.ASSETS_PATH + 'misc/splash_portrait.png');
  }

  create() {
    this.scene.start(Constants.SCENES.PRELOADER_SCENE);
  }
}
