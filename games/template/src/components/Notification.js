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

    this.notificationText = options.notification;

    const sceneWidth = this.scene.cameras.main.width;
    const sceneHeight = this.scene.cameras.main.height;

    // Create some text
    this.text = this.scene.add.text(0, 0, this.notificationText, Constants.STYLES.NOTIFICATION_TEXT);
    this.text.setOrigin(0.5, 0.5);
    //this.add(this.text);

    const marginText = 20;
    const textWidth = this.text.width;
    const textHeight = this.text.height;
    const panelWidth = textWidth + (marginText * 2);
    const panelHeight = textHeight + (marginText * 2);
    const panelButtonMargin = 20;

    this.text.setPosition(sceneWidth * 2, sceneHeight - ((panelHeight / 2) + panelButtonMargin));

    this.panel = this.scene.add.nineslice(0, 0, "panel", 0, panelWidth, panelHeight, 32, 32, 32, 32);
    this.panel.setOrigin(0.5, 0.5);
    //this.add(this.panel);

    this.panel.setPosition(sceneWidth * 2, sceneHeight - ((panelHeight / 2) + panelButtonMargin));

    this.objs = [this.panel, this.text];

    this.tween = this.scene.tweens.add({targets: this.objs, x: sceneWidth / 2, ease: 'quart.out', duration: 1000, hold: 1000, yoyo: true, completeDelay: 500 });
    // The oncomplete on the tween itself always seemed to execute immdiately, so I added a listener to the tween instead.
    this.tween.on('complete', () => { this.destroy() });

    this.scene.add.existing(this);
  }

  destroy() {
    super.destroy();
  }
}
