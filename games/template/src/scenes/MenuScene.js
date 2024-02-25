import Button from '../components/Button.js';
import BaseScene from './BaseScene.js';
import Scenes from './Scenes.js';

export default class MenuScene extends BaseScene {
  constructor() {
    super('Menu');
    this.menuButtons = undefined;
  }

  create_scene() {
    // Make sure we have the audio plugin.
    if (this.audio) {
      this.audio.playMusic();
    }

    this.menuButtons = [];

    this.menuButtons.push(new Button(this, 'Play', () => { this.gotoScene(Scenes.INSTRUCTIONS_SCENE) }));
    this.menuButtons.push(new Button(this, 'Options', () => { this.gotoScene(Scenes.OPTIONS_SCENE) }));
    this.menuButtons.push(new Button(this, 'Credits', () => { this.gotoScene(Scenes.CREDITS_SCENE) }));
    this.menuButtons.push(new Button(this, 'Leaderboard', () => { this.gotoScene(Scenes.LEADERBOARD_SCENE) }));
  }

  resize() {
    const halfWidth = this.cameras.main.width / 2;
    const fractionHeight = this.cameras.main.height / (this.menuButtons.length + 1);

    for (let i = 0; i < this.menuButtons.length; i++) {
      this.menuButtons[i].setPosition(halfWidth, fractionHeight * (i + 1));
    }
  }
}
