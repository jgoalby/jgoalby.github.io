export default class CheckBoxButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, normal, checked, text, initialValue, callback) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.currentValue = initialValue;

    this.button = this.scene.add.image(0, 0, this.currentValue ? checked : normal);
    this.text = this.scene.add.text(this.button.x + 50, this.button.y, text, {
      fontSize: 24,
    });
    this.button.setInteractive();

    this.height = (this.text.y + this.text.height) - this.button.y;
    this.width = Math.max(this.button.width, this.text.width);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', () => {
      this.currentValue = !this.currentValue;
      this.button.setTexture(this.currentValue ? checked : normal);
      callback(this.currentValue);
    });

    this.scene.add.existing(this);
  }
}
