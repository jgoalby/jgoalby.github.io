import Constants from '../constants.js';
import Button from '../components/ButtonCallback.js';
import Scenes from './Scenes.js';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
    this.heading = null;
    this.creditsText = null;
    this.button = null;
  }

  create() {
    this.heading = this.add.text(0, 0, 'Credits', Constants.STYLES.HEADING_TEXT);
    this.heading.setOrigin(0.5, 0);
    this.heading.setY(50);

    this.creditsText = this.add.text(0, 0, Constants.getCredits(this.game), {
      fontSize: '26px',
      color: '#fff',
    });
    this.creditsText.setOrigin(0.5, 0);
    this.creditsText.setY(this.heading.y + this.heading.height + 50);

    this.tweens.add({
      targets: this.heading,
      y: -500,
      ease: 'Power1',
      duration: 5000,
      delay: 1000,
    });

    this.tweens.add({
      targets: this.creditsText,
      y: -500,
      ease: 'Power1',
      duration: 10000,
      delay: 1000,
      onComplete: () => { this.gotoMainMenu() },
    });

    this.button = new Button(this, 0, 0, 'normalButton', 'hoverButton', 'Menu', () => { this.gotoMainMenu() });

    this.scale.on('resize', this.resize, this);
    this.resize();
  }

  gotoMainMenu() {
    this.scale.off('resize', this.resize, this);
    this.scene.start(Scenes.MENU_SCENE);
  }

  resize() {
    this.heading.setX(this.cameras.main.width / 2);
    this.creditsText.setX(this.cameras.main.width / 2);
    this.button.setPosition(this.cameras.main.width / 2, this.cameras.main.height - ((this.button.height / 2) + 10));
  }
}
