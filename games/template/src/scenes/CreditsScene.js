import Constants from '../constants.js';
import Button from '../components/ButtonCallback.js';
import Scenes from './Scenes.js';

export default class CreditsScene extends Phaser.Scene {
  constructor(deps) {
    super('Credits');
    this.deps = deps;
    this.heading = null;
    this.creditsText = null;
  }

  create() {
    this.heading = this.add.text(0, 0, 'Credits', {
      fontSize: '32px',
      color: '#fff',
    });
    this.heading.setOrigin(0.5);
    this.heading.setY(this.cameras.main.height / 2 - 50);

    this.creditsText = this.add.text(0, 0, Constants.CREDITS, {
      fontSize: '26px',
      color: '#fff',
    });
    this.creditsText.setOrigin(0.5);
    this.creditsText.setY(this.cameras.main.height / 2 + 50);

    this.tweens.add({
      targets: this.heading,
      y: -100,
      ease: 'Power1',
      duration: 5000,
      delay: 1000,
    });

    /*const gotoMainMenu = function() {
      this.scale.off('resize', this.resize, this);
      this.scene.start('Menu');
    }.bind(this);*/
  
    this.tweens.add({
      targets: this.creditsText,
      y: -200,
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
