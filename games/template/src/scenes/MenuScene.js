import Constants from '../constants.js';
import Button from '../components/Button.js';
import BaseScene from './BaseScene.js';

export default class MenuScene extends BaseScene {
  constructor() {
    super(Constants.SCENES.MENU_SCENE);

    this.menuButtons = undefined;
  }

  createScene() {
    // Make sure we have the audio plugin.
    if (this.audio) {
      this.audio.playMusic();
    }

    this.menuButtons = [];

    this.menuButtons.push(new Button(this, { keyEventCode: 'KeyI', scene: Constants.SCENES.INSTRUCTIONS_SCENE, label: 'Play', actionFn: () => { this.gotoScene(Constants.SCENES.INSTRUCTIONS_SCENE) } }));
    this.menuButtons.push(new Button(this, { keyEventCode: 'KeyO', scene: Constants.SCENES.OPTIONS_SCENE, label: 'Options', actionFn: () => { this.gotoScene(Constants.SCENES.OPTIONS_SCENE) } }));
    this.menuButtons.push(new Button(this, { keyEventCode: 'KeyC', scene: Constants.SCENES.CREDITS_SCENE, label: 'Credits', actionFn: () => { this.gotoScene(Constants.SCENES.CREDITS_SCENE) } }));
    this.menuButtons.push(new Button(this, { keyEventCode: 'KeyL', scene: Constants.SCENES.LEADERBOARD_SCENE, label: 'Leaderboard', actionFn: () => { this.gotoScene(Constants.SCENES.LEADERBOARD_SCENE) } }));
  }

  resize() {
    if (this.menuButtons) {
      const halfWidth = this.cameras.main.width / 2;
      const fractionHeight = this.cameras.main.height / (this.menuButtons.length + 1);
  
      for (let i = 0; i < this.menuButtons.length; i++) {
        this.menuButtons[i].setPosition(halfWidth, fractionHeight * (i + 1));
      }
    }
  }
}
