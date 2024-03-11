import Constants from '../constants.js';
import Button from '../components/Button.js';
import BaseScene from './BaseScene.js';
import { getPluginListAsString } from '../plugins/PluginsHelpers.js'

export default class CreditsScene extends BaseScene {
  constructor() {
    super(Constants.SCENES.CREDITS_SCENE);

    this.heading = undefined;
    this.creditsText = undefined;
    this.pluginsText = undefined;
    this.button = undefined;
  }

  createScene() {
    // TODO: Put the controls into a container so we can tween the whole thing.

    this.heading = this.add.text(0, 0, 'Credits', Constants.STYLES.HEADING_TEXT);
    this.heading.setOrigin(0.5, 0);
    this.heading.setY(50);

    this.creditsText = this.add.text(0, 0, Constants.CREDITS, {
      fontSize: '26px',
      color: '#fff',
    });
    this.creditsText.setOrigin(0.5, 0);
    this.creditsText.setY(this.heading.y + this.heading.height + 50);

    this.pluginsText = this.add.text(0, 0, getPluginListAsString(), {
      fontSize: '26px',
      color: '#fff',
    });
    this.pluginsText.setOrigin(0.5, 0);
    this.pluginsText.setY(this.creditsText.y + this.creditsText.height + 50);

    this.tweens.add({targets: this.heading, y: -500, ease: 'Power1', duration: 5000, delay: 1000});
    this.tweens.add({targets: this.creditsText, y: -500, ease: 'Power1', duration: 10000, delay: 1000});
    this.tweens.add({targets: this.pluginsText, y: -500 - this.creditsText.height, ease: 'Power1', duration: 10000, delay: 1000, onComplete: () => { this.gotoScene(Constants.SCENES.MENU_SCENE) }});

    this.button = new Button(this, { shortcut: 'esc', label: 'Menu', actionFn: () => { this.gotoScene(Constants.SCENES.MENU_SCENE) } });
  }

  resize() {
    this.heading.setX(this.cameras.main.width / 2);
    this.creditsText.setX(this.cameras.main.width / 2);
    this.pluginsText.setX(this.cameras.main.width / 2);
    this.button.setPosition(this.cameras.main.width / 2, this.cameras.main.height - ((this.button.height / 2) + 10));
  }
}
