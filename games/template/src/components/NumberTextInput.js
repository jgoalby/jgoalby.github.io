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
    } else {
      this.setting = undefined;
    }

    const dom = document.createElement('div');
    const input = document.createElement('input');
    input.name = 'inputField';
    input.placeholder = 'Enter number';

    dom.append(input);

    this.nameInputElement = this.scene.add.dom(0, 0, dom);

    this.scene.add.existing(this);
  }
}
