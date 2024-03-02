import Constants from '../constants.js';

export default class Notification extends Phaser.GameObjects.Container {
  /**
   * Make this notification by passing the parent scene and some options.
   * 
   * @param {Phaser.Scene} scene The parent scene.
   * @param {object} options The options.
   */
  constructor(scene, options) {
    super(scene);
    this.scene = scene;
    this.x = 0;
    this.y = 0;

    this.notification = options.notification;

    // TODO: Not the way I typically get the width and height I don't think
    const { height, width } = this.scene.scale;

    // Create some text
    this.text = this.scene.add.text(0, 0, this.notification, { fontFamily: 'Arial', fontSize: 24, color: '#0000FF' });
    this.add(this.text);

    this.panel = this.scene.add.nineslice(width * 2, height - 20, "panel", 0, 400, 100, 32, 32, 32, 32);
    this.panel.setOrigin(0.5, 1);

    //this.tween = this.scene.tweens.add({targets: this.panel, x: width / 2, ease: 'quart.out', duration: 1000, hold: 1200, yoyo: true, completeDelay: 5000, oncomplete: () => { console.log("WAAAAAA!!!!!"); this.destroy() }});
    this.tween = this.scene.tweens.add({targets: this.panel, x: width / 2, ease: 'quart.out', duration: 1000, hold: 1200, yoyo: true, completeDelay: 500 });
    // The oncomplete on the tween itself always seemed to execute immdiately, so I added a listener to the tween instead.
    this.tween.on('complete', () => { this.listener() });

    //this.add(this.panel);

    this.scene.add.existing(this);
  }

  listener() {
    console.log("WAAAAAA!!!!! LISTENER");
    this.destroy();
  }

  destroy() {
    console.log("DESTROYING NOTIFICATION");
    super.destroy();
  }
}
