import Constants from '../constants.js';

export default class BootScene extends Phaser.Scene {
  constructor(deps) {
    super('Boot');
    this.deps = deps;
    console.log(this.deps);
  }

  preload() {
    this.load.image('gameLogo', Constants.ASSETS_PATH + 'misc/gamelogo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
