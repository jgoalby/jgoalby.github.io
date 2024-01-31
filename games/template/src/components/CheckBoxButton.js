import Constants from '../constants.js';

export default class CheckBoxButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, checked, unchecked, label, getState, setState) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.getState = getState;
    this.setState = setState;
    this.checked = checked;
    this.unchecked = unchecked;
    this.label = label;

    // The check button that changes state when the whole button is clicked.
    this.button = this.scene.add.image(0, 0, getState() ? checked : unchecked);
    this.button.setOrigin(0, 0);

    // The text label that goes to the side of the button. The y position is set to the middle of the button.
    this.text = this.scene.add.text(0, 0, label, Constants.STYLES.CHECKBOX_LABEL);
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
    this.hitZone.on('pointerdown', () => { this.checkboxClicked(); });

    // Add the container to the scene.
    this.scene.add.existing(this);
  }

  checkboxClicked() {
    // New state is the opposite of the current state.
    this.setState(!this.getState());

    // Update the button texture to reflect the new state.      
    this.button.setTexture(this.getState() ? this.checked : this.unchecked);
  }
}
