import Constants from '../constants.js';

const NOTIFICATION_TWEEN_EASE = 'quart.out';
const NOTIFICATION_TWEEN_IN_DURATION_MS = 1000;
const NOTIFICATION_TWEEN_HOLD_DURATION_MS = 1000;

const MARGIN_TEXT = 20;
const MARGIN_PANEL = 20;

export default class Notification extends Phaser.GameObjects.Container {
  /**
   * Make this notification by passing the parent scene and some options.
   * 
   * @param {Phaser.Scene} scene The parent scene.
   * @param {NotificationOptions} options The options.
   */
  constructor(scene, options) {
    super(scene);
    this.scene = scene;
    this.x = 0;
    this.y = 0;

    this.currentHeight = options.currentHeight || 0;

    // Capture the notification text.
    this.notificationText = options.notificationText;

    // Scene dimensions help us position the notification nicely.
    const sceneWidth = this.scene.cameras.main.width;
    const sceneHeight = this.scene.cameras.main.height;

    // Create a text object to display the notification.
    this.text = this.scene.add.text(0, 0, this.notificationText, Constants.STYLES.NOTIFICATION_TEXT);
    this.text.setOrigin(0.5, 0.5);
    this.add(this.text);

    // Get the dimensions of the text so we can create an enclosing panel.
    const textWidth = this.text.width;
    const textHeight = this.text.height;

    // Create the dimensions of the panel giving a small margin around the text on all sides.
    const panelWidth = textWidth + (MARGIN_TEXT * 2);
    const panelHeight = textHeight + (MARGIN_TEXT * 2);

    // Create a nineslice panel so that we can size it without issues.
    this.panel = this.scene.add.nineslice(0, 0, "panel", 0, panelWidth, panelHeight, 32, 32, 32, 32);
    this.panel.setOrigin(0.5, 0.5);
    this.add(this.panel);

    // Set the position of the panel. As text is centered in the panel, its position is identical.
    this.panel.setPosition(sceneWidth * 2, sceneHeight - ((panelHeight / 2) + MARGIN_PANEL + this.currentHeight));
    this.text.setPosition(this.panel.x, this.panel.y);

    // We can animate (tween) more than one game object at a time with the same animation.
    this.objs = [this.panel, this.text];

    // This creates the animation of the text and panel moving in from the right to the middle of the screen.
    this.tween = this.scene.tweens.add({targets: this.objs,
                                        x: sceneWidth / 2,
                                        ease: NOTIFICATION_TWEEN_EASE,
                                        duration: NOTIFICATION_TWEEN_IN_DURATION_MS,
                                        hold: NOTIFICATION_TWEEN_HOLD_DURATION_MS,
                                        yoyo: true,
                                        completeDelay: 0 });

    // The oncomplete on the tween itself always seemed to execute immdiately, so I added a listener to the tween instead.
    this.tween.on('complete', () => { this.destroy(); if (options.onCompleteFn) { options.onCompleteFn({ height: this.panel.height }); } });

    this.scene.add.existing(this);
  }

  getPanelHeight() {
    return this.panel.height;
  }

  getPanelWidth() {
    return this.panel.width;
  }

  destroy() {
    super.destroy();
  }
}
