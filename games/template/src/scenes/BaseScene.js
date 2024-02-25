export default class BaseScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }

  create() {
    console.log("In base scene create() method.");
    this.scale.on('resize', this.resize, this);
    this.resize();
    console.log("Base scene create() method finished.");
  }

  /**
   * Go to the specified scene and clean up this scene.
   * 
   * @param {string} scene The scene to go to.
   */
  gotoScene(scene) {
    this.scale.off('resize', this.resize, this);
    this.scene.start(scene);
  }

  resize() {
    console.warn('BaseScene.resize() not implemented');
  }
}
