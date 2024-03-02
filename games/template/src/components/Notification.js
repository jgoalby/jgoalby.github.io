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

    //this.startX = 50
    //this.startY = 70
    //this.stopX = 450
    //this.stopY = 270
    //const width = this.stopX - this.startX
    //const height = this.stopY - this.startY

    const { height, width } = this.scene.scale;
    this.scene.add.image(width / 2, height / 2, "panel", 0);
    this.scene.add.nineslice(width / 2, height / 2, "panel", 0, 600, 400, 32, 32, 32, 32);

    /*this.dlg = this.scene.add.nineslice(
      this.startX,
      this.startY,
      width,
      height,
      'kenny',
      [35, 15, 15]
    )*/
    
    this.scene.add.existing(this);
  }

  destroy() {
    console.log("DESTROYING NOTIFICATION");
    super.destroy();
  }
}
