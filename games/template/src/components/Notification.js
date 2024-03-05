import Constants from '../constants.js';

// The tweening constants for the notification animation.
const NOTIFICATION_TWEEN_EASE = 'Sine.out';
const NOTIFICATION_TWEEN_IN_DURATION_MS = 3000;

// In the margins.
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

    // Capture the notification text and level.
    this.notificationText = options.notificationText;
    this.notificationLevel = options.level || Constants.NOTIFICATION_LEVELS.INFO;

    // Determine the text color based on the level.
    this.notificationTextColor = this.getNotificationTextColor(this.notificationLevel);

    // Scene dimensions help us position the notification nicely.
    const sceneWidth = this.scene.cameras.main.width;
    const sceneHeight = this.scene.cameras.main.height;

    // Create a text object to display the notification.
    this.text = this.scene.add.text(0, 0, this.notificationText, this.notificationTextColor);
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
    this.panel.setPosition(sceneWidth - ((this.panel.width / 2) + MARGIN_PANEL), sceneHeight);
    this.text.setPosition(this.panel.x, this.panel.y);

    // We can animate (tween) more than one game object at a time with the same animation.
    this.objs = [this.panel, this.text];

    // This creates the animation of the text and panel.
    this.tween = this.scene.tweens.add({targets: this.objs,
                                        y: sceneHeight / 2,
                                        alpha: 0,
                                        ease: NOTIFICATION_TWEEN_EASE,
                                        duration: NOTIFICATION_TWEEN_IN_DURATION_MS,
                                        yoyo: false,
                                        completeDelay: 0 });

    // When the tween completes, do some stuff.
    this.tween.on('complete', () => {
      // The notification is complete so destroy it.
      this.destroy();

      // If a function was passed in the options, call it.
      if (options.onCompleteFn) {
        // We can pass information that may be useful to the caller.
        options.onCompleteFn( { } );
      } 
    });

    this.scene.add.existing(this);

    console.log("Func: " + this.getNotificationTextColor);
    console.log("Funcs: " + this.getFuncs(this));
    console.log("All funcs: " + this.getFuncs(this, true));
    console.log("Desc: " + this.getFuncs['description']);

    console.log("Methods coming:");
    console.log(this.getAllMethodNames(this));

    console.log("Own prop names: " + Object.getOwnPropertyNames(this))

    const funks = this.getFuncs(this);

    funks.map((e) => {
      console.log("Func: " + e + " type: " + (typeof this[e]));
    })
  }

  getAllMethodNames(obj) {
    let methods = new Set();
    while (obj = Reflect.getPrototypeOf(obj)) {
      let keys = Reflect.ownKeys(obj)
      console.log("keys");
      console.log(keys);
      keys.forEach((k) => methods.add(k));
      console.log("Set");
      console.log(methods);
    }
    return methods;
  }

  getFuncs(theObject, all=false) {
    this.getFuncs['description'] = "This is a function I made";

    const props = [];
    let curObj = theObject;

    props.push(...Object.getOwnPropertyNames(curObj));

    if (all) {
      while (curObj = Object.getPrototypeOf(curObj)) {
        props.push(...Object.getOwnPropertyNames(curObj));
      }
    }

    return props.sort();
    /*return props.sort().filter((e, i, arr) => { 
      if (e!=arr[i+1] && typeof theObject[e] == 'function') return true;
    })*/
  }

  getNotificationTextColor(level) {
    switch (level) {
      case Constants.NOTIFICATION_LEVELS.INFO:
        return Constants.STYLES.NOTIFICATION_TEXT_INFO;
      case Constants.NOTIFICATION_LEVELS.WARN:
        return Constants.STYLES.NOTIFICATION_TEXT_WARN;
      case Constants.NOTIFICATION_LEVELS.ERROR:
        return Constants.STYLES.NOTIFICATION_TEXT_ERROR;
      case Constants.NOTIFICATION_LEVELS.EXCEPTION:
        return Constants.STYLES.NOTIFICATION_TEXT_EXCEPTION;
      default:
        return Constants.STYLES.NOTIFICATION_TEXT_INFO;
    }
  }

  /**
   * Destroy the notification.
   */
  destroy() {
    super.destroy();
  }
}
