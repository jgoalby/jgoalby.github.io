import Constants from '../constants.js';
import Button from '../components/Button.js';
import BaseScene from './BaseScene.js';

export default class BasicScene extends BaseScene {
  constructor(config) {
    if (!config) { config = {} }
    config.key = Constants.SCENES.BASIC_SCENE;
    super(config);

    this.heading = undefined;
    this.button = undefined;
  }

  createScene() {
    this.heading = this.add.text(0, 0, 'Basic Scene', Constants.STYLES.HEADING_TEXT);
    this.heading.setOrigin(0.5, 0);
    this.heading.setY(50);

    this.button = new Button(this, { shortcut: 'esc', label: 'Menu', actionFn: () => { this.gotoScene(Constants.SCENES.MENU_SCENE) } });
  }

  resize() {
    this.heading.setX(this.cameras.main.width / 2);
    this.button.setPosition(this.cameras.main.width / 2, this.cameras.main.height - ((this.button.height / 2) + 10));
  }
}
