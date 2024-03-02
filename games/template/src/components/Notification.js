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
    this.panel = this.scene.add.nineslice(width * 2, height / 2, "panel", 0, 600, 400, 32, 32, 32, 32);
    this.panel.setOrigin(0.5, 1);

    this.scene.tweens.add({targets: this.panel, x: width / 2, ease: 'quart.out', duration: 2000, hold: 5000, yoyo: true});
    // this.scene.tweens.add({targets: this.panel, y: -500, ease: 'Power1', duration: 10000, delay: 1000});
    // this.scene.tweens.add({targets: this.panel, x: height / 2, ease: 'Power1', duration: 3000, delay: 100, onComplete: () => { this.gotoScene(Scenes.MENU_SCENE) }});

    /*const chain = this.scene.tweens.chain({
      targets: this.panel,
      tweens: [
        {
          x: width /2,
          ease: 'quart.out',
          duration: 2000
        },
        {
          x: width * 2,
          hold: 15000,
          ease: 'quart.in',
          duration: 2000
        }
      ]
    });*/

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

  create() {
    console.log("CREATING NOTIFICATION");
  }

  destroy() {
    console.log("DESTROYING NOTIFICATION");
    super.destroy();
  }
}
