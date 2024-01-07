export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('madeBy', './src/Assets/misc/me-min.png');
    this.load.image('gameLogo', './src/Assets/misc/tanklogo.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
