export default class BaseScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }

  /**
   * Called by Phaser when the scene is created. Derived scens can override this
   * method to perform their own creation if they wish. If you do that you will lose
   * the added functionality offered by this class such as resize handling.
   * 
   * Dervied classes can do their creation in the create_scene method.
   */
  create() {
    // Let the scene do its creation.
    this.create_scene();

    // Provide resize functionality for all derived scenes.
    this.scale.on('resize', this.resize, this);
    this.resize();
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

  /**
   * Override in derived scenes to create the scene.
   */
  create_scene() {
    console.warn('BaseScene.create_scene() not implemented');
  }

  /**
   * Override in derived scenes to handle resize events.
   */
  resize() {
    console.warn('BaseScene.resize() not implemented');
  }

  /**
   * Simple helper to determine if the device is in landscape mode.
   * 
   * @returns {boolean} True if the device is in landscape mode.
   */
  isLandscape() {
    return (window.innerWidth > window.innerHeight);
  }
}
