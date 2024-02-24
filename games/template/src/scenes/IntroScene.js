import Button from '../components/ButtonCallback.js';
import Scenes from './Scenes.js';

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('Intro');
    this.text = undefined;
    this.mainMenuButton = undefined;
    this.gameButton = undefined;
  }

  create() {
    this.text = this.add.text(0, 0, '', {
      font: '24px',
      color: '#ffffff',
    });
    this.text.setOrigin(0.5, 0);
    this.text.setY(10);

    this.text.setText([
      'Objectives\n',
      '1. Kill As many enemies as you can',
      '2. Keep your distance from the enemy',
      '\nControls\n',
      '- Use the mouse pointer to point to an enemy tank',
      '- Use left click or Space button to fire',
      '- Use W, S, A and D buttons to move around',
      '- Use E to boost speed',
      '- Rotate the tank turret around with the mouse',
      '\nTips\n',
      '- Your health will fill back up every two seconds',
      '- The enemy tanks will detect you faster \nas your score increases',
      '\n\nGood Luck!',
    ]);

    this.mainMenuButton = new Button(this, 0, 0, 'normalButton', 'hoverButton', 'Chicken Out', () => { this.gotoMainMenu() });
    this.gameButton = new Button(this, 0, 0, 'normalButton', 'hoverButton', 'Lets Go!', () => { this.gotoGame() });

    this.scale.on('resize', this.resize, this);
    this.resize();
  }

  gotoMainMenu() {
    this.scale.off('resize', this.resize, this);
    this.scene.start(Scenes.MENU_SCENE);
  }

  gotoGame() {
    this.scale.off('resize', this.resize, this);
    this.scene.start(Scenes.GAME_SCENE);
  }

  resize() {
    this.text.setX(this.cameras.main.width / 2);

    this.mainMenuButton.setPosition(this.cameras.main.width / 3, this.cameras.main.height - ((this.mainMenuButton.height / 2) + 10));
    this.gameButton.setPosition((this.cameras.main.width / 3) * 2, this.cameras.main.height - ((this.mainMenuButton.height / 2) + 10));
  }
}
