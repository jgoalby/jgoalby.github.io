import Constants from '../constants.js';

export default class Notification extends Phaser.GameObjects.Container {
  /**
   * Make this notification by passing the parent scene and some options.
   * 
   * @param {Phaser.Scene} scene The parent scene.
   */
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.x = 0;
    this.y = 0;

    const { height, width } = this.scene.scale;
    this.panel = this.scene.add.nineslice(width * 2, height - 20, "panel", 0, 400, 100, 32, 32, 32, 32);
    this.panel.setOrigin(0.5, 1);

    this.scene.tweens.add({targets: this.panel, x: width / 2, ease: 'quart.out', duration: 1000, hold: 1500, yoyo: true, completeDelay: 5000, oncomplete: () => { console.log("WAAAAAA!!!!!"); this.destroy() }});
    
    this.scene.add.existing(this);
  }

  destroy() {
    console.log("DESTROYING NOTIFICATION");
    super.destroy();
  }
}
