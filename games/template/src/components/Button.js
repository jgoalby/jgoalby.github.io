import Constants from '../constants.js';

export default class Button extends Phaser.GameObjects.Container {
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
    } else {
      this.setting = undefined;
      this.label = options.label;
      this.actionFn = options.actionFn;
    }

    this.normal = 'normalButton';
    this.hover = 'hoverButton';

    this.button = this.scene.add.sprite(0, 0, this.normal).setInteractive();
    this.height = this.button.height;
    this.width = this.button.width;

    this.text = this.scene.add.text(0, 0, this.label, Constants.STYLES.BUTTON_TEXT);
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', this.actionFn);

    this.button.on('pointerover', () => {
      this.button.setTexture(this.hover);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(this.normal);
    });

    this.scene.add.existing(this);
  }
}
