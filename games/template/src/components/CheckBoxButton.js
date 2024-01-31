export default class CheckBoxButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, checked, unchecked, text, getState, setState) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.image(0, 0, getState() ? checked : unchecked);
    this.button.setOrigin(0.5, 0.5);
    this.button.setInteractive();

    this.text = this.scene.add.text(0, 0, text, {
      fontSize: 24,
    });
    this.text.setOrigin(0.5, 0.5);
    this.text.setPosition(this.button.x + this.button.width + 10, this.button.y + (this.button.height / 2));

    this.height = (this.text.y + this.text.height) - this.button.y;
    this.width = Math.max(this.button.width, this.text.width);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', () => {
      // New state is the opposite of the current state
      setState(!getState());

      // Update the button texture to reflect the new state.      
      this.button.setTexture(getState() ? checked : unchecked);
    });

    this.scene.add.existing(this);
  }
}
