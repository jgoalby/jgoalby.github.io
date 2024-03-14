import Constants from '../constants.js';
import Button from '../components/Button.js';
import BaseScene from './BaseScene.js';

export default class InstructionsScene extends BaseScene {
  constructor(config) {
    if (!config) { config = {} }
    config.key = Constants.SCENES.INSTRUCTIONS_SCENE;
    super(config);

    this.heading = undefined;
    this.text = undefined;
    this.mainMenuButton = undefined;
    this.gameButton = undefined;
  }

  createScene() {
    this.heading = this.add.text(0, 0, 'Instructions', Constants.STYLES.HEADING_TEXT);
    this.heading.setOrigin(Constants.STYLES.HEADING_X_ORIGIN, Constants.STYLES.HEADING_Y_ORIGIN);
    this.heading.setY(Constants.STYLES.HEADING_Y_POS);

    this.text = this.add.text(0, 0, '', Constants.STYLES.INTRO_TEXT);
    this.text.setOrigin(0.5, 0);
    this.text.setY(Constants.STYLES.BODY_Y_POS);

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

    this.mainMenuButton = new Button(this, { shortcut: 'X', label: 'Chicken Out', actionFn: () => { this.gotoScene(Constants.SCENES.MENU_SCENE) } });
    this.gameButton = new Button(this, { label: 'Lets Go!', actionFn: () => { this.gotoScene(Constants.SCENES.GAME_SCENE) } });
  }

  resize() {
    const halfWidth = this.cameras.main.width / 2;
    this.heading.setX(halfWidth);
    this.text.setX(halfWidth);

    const thirdWidth = this.cameras.main.width / 3;
    this.mainMenuButton.setPosition(thirdWidth, this.cameras.main.height - ((this.mainMenuButton.height / 2) + 10));
    this.gameButton.setPosition(thirdWidth * 2, this.cameras.main.height - ((this.gameButton.height / 2) + 10));
  }
}
