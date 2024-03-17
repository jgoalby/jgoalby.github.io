import Constants from '../constants.js';
import BaseScene from './BaseScene.js';

export default class BootScene extends BaseScene {
  constructor(config) {
    if (!config) { config = {} }
    config.key = config.key || Constants.SCENES.BOOT_SCENE;
    super(config);
  }

  preload() {
    this.load.image('splash_landscape', Constants.GENERAL.ASSETS_PATH + 'misc/splash_landscape.png');
    this.load.image('splash_portrait', Constants.GENERAL.ASSETS_PATH + 'misc/splash_portrait.png');
  }

  create() {
    this.scene.start(Constants.SCENES.PRELOADER_SCENE);
  }
}
