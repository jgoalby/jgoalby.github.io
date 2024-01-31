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

    this.button = this.scene.add.image(0, 0, getState() ? checked : unchecked);
    this.button.setOrigin(0, 0);

    this.text = this.scene.add.text(0, 0, label, {
      fontSize: 24,
    });
    this.text.setOrigin(0, 0.5);
    this.text.setPosition(this.button.x + this.button.width + 10, this.button.y + (this.button.height / 2));

    this.width = this.button.width + 10 + this.text.width;
    this.height = Math.max(this.button.height, this.text.height);

    this.hitZone = this.scene.add.zone(0, 0, this.width, this.height);
    this.hitZone.setInteractive();

    this.add(this.button);
    this.add(this.text);
    this.add(this.hitZone);

    this.hitZone.on('pointerdown', () => { this.checkboxClicked(); });

    this.scene.add.existing(this);
  }

  checkboxClicked() {
    // New state is the opposite of the current state
    this.setState(!this.getState());

    // Update the button texture to reflect the new state.      
    this.button.setTexture(this.getState() ? this.checked : this.unchecked);
  }
}
