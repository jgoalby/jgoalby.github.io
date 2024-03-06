import Constants from '../constants.js';


// TODO: Fix references to checkboxes etc.


export default class FormButton extends Phaser.GameObjects.Container {
  /**
   * Make this button by passing the parent scene and some options.
   * 
   * @param {Phaser.Scene} scene 
   * @param {ButtonOptions} options 
   */
  constructor(scene, options) {
    super(scene);
    this.scene = scene;
    this.x = 0;
    this.y = 0;

    if (options.setting) {
      this.setting = options.setting;
      this.label = options.setting.description;
      this.actionFn = options.setting.actionFn;
    } else {
      this.setting = undefined;
      this.label = options.label;
      this.actionFn = options.actionFn;
    }

    this.normal = 'uncheckedBox';
    this.hover = 'checkedBox';

    // The check button that changes state when the whole button is clicked.
    this.button = this.scene.add.image(0, 0, this.normal);
    this.button.setOrigin(0, 0);

    // The text label that goes to the side of the button. The y position is set to the middle of the button.
    this.text = this.scene.add.text(0, 0, this.label, Constants.STYLES.CHECKBOX_LABEL);
    this.text.setOrigin(0, 0.5);
    this.text.setPosition(this.button.x + this.button.width + Constants.STYLES.CHECKBOX_INSIDE_SPACE, this.button.y + (this.button.height / 2));

    // Don't want to use specific padding numbers. We know that the button is leftmost and the text is rightmost.
    // So we can calculate the width by subtracting the x position of the button from the x position of the text
    // and then add the width of the text.
    this.width = (this.text.x - this.button.x) + this.text.width;
    this.height = Math.max(this.button.height, this.text.height);

    // Rather than using the width and height of the button, we use the width and height of the whole container.
    this.hitZone = this.scene.add.zone(0, 0, this.width, this.height);
    this.hitZone.setOrigin(0, 0);
    this.hitZone.setInteractive();

    // Add the button, text, and hit zone to the container.
    this.add(this.button);
    this.add(this.text);
    this.add(this.hitZone);

    // When the hit zone is clicked, call the checkboxClicked method.
    this.hitZone.on(Phaser.Input.Events.POINTER_DOWN, () => { this.actionFn(); });

    // Show when the user hovers over the hit zone.
    this.hitZone.on(Phaser.Input.Events.POINTER_OVER, () => { this.text.setStyle(Constants.STYLES.CHECKBOX_LABEL_HIGHLIGHT); });
    this.hitZone.on(Phaser.Input.Events.POINTER_OUT, () => { this.text.setStyle(Constants.STYLES.CHECKBOX_LABEL); });

    // Add the container to the scene.
    this.scene.add.existing(this);
  }

  destroy() {
    // MUST call the super destructor.
    super.destroy();
  }
}
