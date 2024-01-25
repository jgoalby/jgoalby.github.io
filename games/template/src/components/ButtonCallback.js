export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, normal, hover, text, callback, scaleButton = null) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, normal).setInteractive();
    this.height = this.button.height;
    this.width = this.button.width;

    if (scaleButton) {
      this.button.setScale(scaleButton.x, scaleButton.y);
    }

    this.text = this.scene.add.text(0, 0, text, { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', callback);

    this.button.on('pointerover', () => {
      this.button.setTexture(hover);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(normal);
    });

    this.scene.add.existing(this);
  }
}
