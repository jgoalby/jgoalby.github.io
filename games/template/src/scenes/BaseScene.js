import { getScene, getActiveScene } from '../common.js'

export default class BaseScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }

  /**
   * Called by Phaser when the scene is created. Derived scens can override this
   * method to perform their own creation if they wish. If you do that you will lose
   * the added functionality offered by this class such as resize handling.
   * 
   * Dervied classes can do their creation in the createScene method.
   */
  create() {
    // Let the scene do its creation.
    this.createScene();

    // Listen out for these one-time events allowing derived classes to handle them.
    // Make sure to use the fat arrow functions to get the right 'this'.
    this.events.once('destroy', () => { this.destroy() });
    this.events.once('shutdown', () => { this.shutdown() });

    // Provide resize functionality for all derived scenes.
    this.scale.on('resize', this.resize, this);
    this.resize();
  }

  destroy() {
    // Call a method so the derived class can handle it.
    this.destroyScene();
  }

  shutdown() {
    // Let the scene do any cleanup.
    this.shutdownScene();

    // This scale is usually gone by now, but just in case.
    if (this.scale) {
      // Remove the resize handler.
      this.scale.off('resize', this.resize, this);
    }
  }

  /**
   * Get a scene instance using the scene name.
   *
   * @param {string} sceneName The scene name to get the instance of.
   * @returns {BaseScene | undefined} The scene or undefined if not found.
   */
  static getInstance(sceneName) {
    if (sceneName) {
      // Return the specified scene if we can.
      return getScene(sceneName);
    } else {
      // Get the active scene as a scene name was not specified.
      return getActiveScene();
    }
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
  createScene() {
    console.warn('BaseScene.createScene() not implemented');
  }

  /**
   * Override in derived scenes to destroy resources in the scene.
   */
  destroyScene() {
    // Do nothing. No warning needed as not all scenes will need to do this.
  }

  /**
   * Override in derived scenes to clean up resources in the scene. Anything created
   * in the createScene function is a candidate for cleaning up here. For instance, any
   * event handlers.
   */
  shutdownScene() {
    // Do nothing. No warning needed as not all scenes will need to do this.
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
