import Button from '../components/Button.js';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    const creditsText = this.add.text(0, 0, 'Credits', {
      fontSize: '32px',
      //fill: '#000',
      color: '#fff',
    });
    const madeByText = this.add.text(0, 0, 'Created By: John Goalby \nMade With: Phaser 3.70, Javascript ES6', {
      fontSize: '26px',
      //fill: '#000',
      color: '#fff',
    });

    const zone = this.add.zone(this.cameras.main.width / 2, this.cameras.main.height / 2, this.cameras.main.width, this.cameras.main.height);
    Phaser.Display.Align.In.Center(
      creditsText,
      zone,
    );

    Phaser.Display.Align.In.Center(
      madeByText,
      zone,
    );

    madeByText.setY(1000);

    this.tweens.add({
      targets: creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
    });

    this.tweens.add({
      targets: madeByText,
      y: -200,
      ease: 'Power1',
      duration: 15000,
      delay: 1000,
      onComplete: function () {
        this.scene.start('Menu');
      }.bind(this),
    });

    new Button(this, 180, 510, 'normalButton', 'hoverButton', 'Menu', 'Menu', {
      x: 0.7,
      y: 0.7,
    });
  }
}
