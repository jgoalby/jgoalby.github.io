import Button from '../components/ButtonCallback.js';

export default class CreditsScene extends Phaser.Scene {
  constructor(deps) {
    super('Credits');
    this.deps = deps;
    this.creditsText = null;
    this.madeByText = null;
  }

  create() {
    this.creditsText = this.add.text(0, 0, 'Credits', {
      fontSize: '32px',
      color: '#fff',
    });
    this.creditsText.setOrigin(0.5);

    // TODO: Put values in constants file
    const author = 'John Goalby';
    const madeByString = `Created By: ${author} \nMade With: Phaser ${Phaser.VERSION}, Javascript ES6\n\n\nLibraries Used...`;
    this.madeByText = this.add.text(0, 0, madeByString, {
      fontSize: '26px',
      color: '#fff',
    });
    this.madeByText.setOrigin(0.5);

    this.creditsText.setY(this.cameras.main.height / 2 - 50);
    this.madeByText.setY(this.cameras.main.height / 2 + 50);

    this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 5000,
      delay: 1000,
    });

    const gotoMainMenu = function() {
      this.scale.off('resize', this.resize, this);
      this.scene.start('Menu');
    }.bind(this);
  
  
    this.tweens.add({
      targets: this.madeByText,
      y: -200,
      ease: 'Power1',
      duration: 15000,
      delay: 1000,
      onComplete: gotoMainMenu,
    });

    new Button(this, 180, 510, 'normalButton', 'hoverButton', 'Menu', gotoMainMenu, {
      x: 0.7,
      y: 0.7,
    });

    this.scale.on('resize', this.resize, this);
    this.resize();
  }

  resize() {
    this.creditsText.setX(this.cameras.main.width / 2);
    this.madeByText.setX(this.cameras.main.width / 2);
  }
}
