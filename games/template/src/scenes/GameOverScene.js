import Constants from '../constants.js';
import Button from '../components/Button.js';
import BaseScene from './BaseScene.js';

export default class GameOverScene extends BaseScene {
  constructor(config) {
    if (!config) { config = {} }
    config.key = config.key || Constants.SCENES.GAMEOVER_SCENE;
    super(config);

    this.restartButton = null;
    this.mainMenuButton = null;
    this.ripText = null;
    this.endText = null;
    this.tombstone = null;
  }

  createScene() {
    const score = this.DATA_PLUGIN.score;
    const player = this.DATA_PLUGIN.player;

    this.tombstone = this.add.image(0, 0, 'tombstone').setOrigin(0.5, 0);

    this.ripText = this.add.text(0, 0, 'RIP', {
      font: '36px',
      color: '#000000',
    });
    this.ripText.setStroke('#000', 4);
    this.ripText.setShadow(2, 2, '#333333', 2, true, true);
    this.ripText.setOrigin(0.5, 0);

    this.endText = this.add.text(0, 0, '', {
      font: '22px',
      color: '#000000',
    });
    this.endText.setStroke('#000', 2);
    this.endText.setShadow(1, 1, '#333333', 1, true, true);
    this.endText.setOrigin(0.5, 0);
    this.endText.setText([
      `\nHere lies our great \nsoldier ${player} who died \nfighting the enemy.\n\n${player} got ${score} points.`,
    ]);

    this.restartButton = this.button = new Button(this, { label: 'Restart', actionFn: () => { this.gotoScene(Constants.SCENES.GAME_SCENE) } });
    this.mainMenuButton = this.button = new Button(this, { label: 'Rest In Peace', actionFn: () => { this.gotoScene(Constants.SCENES.MENU_SCENE) } });
  }

  resize() {
    this.tombstone.setPosition(this.cameras.main.width / 2, 60);
    this.ripText.setPosition(this.cameras.main.width / 2, 140);
    this.endText.setPosition(this.cameras.main.width / 2, 185);
    this.restartButton.setPosition(this.cameras.main.width / 3, 510);
    this.mainMenuButton.setPosition((this.cameras.main.width / 3) * 2, 510);
  }
}
