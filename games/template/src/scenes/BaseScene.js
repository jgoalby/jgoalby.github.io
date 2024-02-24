export default class BaseScene extends Phaser.Scene {
  constructor(config) {
    super(config);
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
  }
}
