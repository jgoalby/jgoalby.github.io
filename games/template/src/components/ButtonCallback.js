import Constants from '../constants.js';

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, callback) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.normal = 'normalButton';
    this.hover = 'hoverButton';

    this.button = this.scene.add.sprite(0, 0, this.normal).setInteractive();
    this.height = this.button.height;
    this.width = this.button.width;

    this.text = this.scene.add.text(0, 0, text, Constants.STYLES.BUTTON_TEXT);
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', callback);

    this.button.on('pointerover', () => {
      this.button.setTexture(this.hover);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(this.normal);
    });

    this.scene.add.existing(this);
  }
}
