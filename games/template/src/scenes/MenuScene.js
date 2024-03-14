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

    this.mainMenuData = this.sys.game.globals.data.getMainMenu();

    for (let curIndex = 0; curIndex < this.mainMenuData.length; curIndex++) {
      const curMenu = this.mainMenuData[curIndex];
      this.menuButtons.push(new Button(this, { shortcut: curMenu.shortcut, label: curMenu.label, actionFn: () => { this.gotoScene(curMenu.scene) } }));
    }

    /*this.menuButtons.push(new Button(this, { shortcut: 'I', label: 'Play',        actionFn: () => { this.gotoScene(Constants.SCENES.INSTRUCTIONS_SCENE) } }));
    this.menuButtons.push(new Button(this, { shortcut: 'O', label: 'Options',     actionFn: () => { this.gotoScene(Constants.SCENES.OPTIONS_SCENE) } }));
    this.menuButtons.push(new Button(this, { shortcut: 'C', label: 'Credits',     actionFn: () => { this.gotoScene(Constants.SCENES.CREDITS_SCENE) } }));
    this.menuButtons.push(new Button(this, { shortcut: 'L', label: 'Leaderboard', actionFn: () => { this.gotoScene(Constants.SCENES.LEADERBOARD_SCENE) } }));*/
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
