import Constants from '../constants.js';

export default class NumberTextInput extends Phaser.GameObjects.Container {
  /**
   * Make this control by passing the parent scene and some options.
   * 
   * @param {Phaser.Scene} scene The parent scene.
   * @param {NumberTextInputOptions} options The options for the control.
   */
  constructor(scene, options) {
    super(scene);
    this.scene = scene;
    this.x = 0;
    this.y = 0;

    if (options.setting) {
      this.setting = options.setting;
      this.label = options.setting.description;
    } else {
      this.setting = undefined;
      this.label = options.label;
    }

    const containerDiv = document.createElement('div');
    const input = document.createElement('input');
    input.name = 'inputField';
    input.placeholder = '0-1';
    input.style.width = '25px';

    containerDiv.append(input);

    this.nameInputElement = this.scene.add.dom(0, 0, containerDiv);

    this.add(this.nameInputElement);

    if (this.label) {
      this.text = this.scene.add.text(0, 0, this.label, Constants.STYLES.LABEL);
      this.text.setOrigin(0, 0.5);
      this.text.setPosition(this.nameInputElement.x + this.nameInputElement.width + Constants.STYLES.CHECKBOX_INSIDE_SPACE, this.nameInputElement.y + (this.nameInputElement.height / 2));
      //Phaser.Display.Align.In.Center(this.text, this.button);
    }

    if (this.text) {
      this.add(this.text);
    }

    this.scene.add.existing(this);
  }
}
