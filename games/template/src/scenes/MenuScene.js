import Button from '../components/ButtonCallback.js';
import BaseScene from './BaseScene.js';
import Scenes from './Scenes.js';

export default class MenuScene extends BaseScene {
  constructor() {
    super('Menu');
    this.gameButton = undefined;
    this.optionsButton = undefined;
    this.creditsButton = undefined;
    this.leaderboardButton = undefined;
  }

  create() {
    // Make sure we have the audio plugin.
    if (this.audio) {
      this.audio.playMusic();
    }

    this.gameButton = new Button(this, 0, 100, 'normalButton', 'hoverButton', 'Play', this.gotoScene(Scenes.INSTRUCTIONS_SCENE));
    this.optionsButton = new Button(this, 0, 200, 'normalButton', 'hoverButton', 'Options', this.gotoScene(Scenes.OPTIONS_SCENE));
    this.creditsButton = new Button(this, 0, 300, 'normalButton', 'hoverButton', 'Credits', this.gotoScene(Scenes.CREDITS_SCENE));
    this.leaderboardButton = new Button(this, 0, 400, 'normalButton', 'hoverButton', 'Top 10 Players', this.gotoScene(Scenes.LEADERBOARD_SCENE));

    this.scale.on('resize', this.resize, this);
    this.resize();
  }

  resize() {
    const halfWidth = this.cameras.main.width / 2;
    this.gameButton.setX(halfWidth);
    this.optionsButton.setX(halfWidth);
    this.creditsButton.setX(halfWidth);
    this.leaderboardButton.setX(halfWidth);
  }
}
