import Button from '../components/ButtonCallback.js';
import BaseScene from './BaseScene.js';
import Scenes from './Scenes.js';

export default class MenuScene extends BaseScene {
  constructor() {
    super('Menu');
    this.menuButtons = undefined;
  }

  create() {
    // Make sure we have the audio plugin.
    if (this.audio) {
      this.audio.playMusic();
    }

    this.menuButtons = [];

    this.menuButtons.push(new Button(this, 0, 0, 'Play', () => { this.gotoScene(Scenes.INSTRUCTIONS_SCENE) }));
    this.menuButtons.push(new Button(this, 0, 0, 'Options', () => { this.gotoScene(Scenes.OPTIONS_SCENE) }));
    this.menuButtons.push(new Button(this, 0, 0, 'Credits', () => { this.gotoScene(Scenes.CREDITS_SCENE) }));
    this.menuButtons.push(new Button(this, 0, 0, 'Leaderboard', () => { this.gotoScene(Scenes.LEADERBOARD_SCENE) }));

    this.scale.on('resize', this.resize, this);
    this.resize();
  }

  resize() {
    const halfWidth = this.cameras.main.width / 2;
    const fractionHeight = this.cameras.main.height / (this.menuButtons.length + 1);

    for (let i = 0; i < this.menuButtons.length; i++) {
      this.menuButtons[i].setPosition(halfWidth, fractionHeight * (i + 1));
    }
  }
}
