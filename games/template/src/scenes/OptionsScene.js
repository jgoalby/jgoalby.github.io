import Constants from '../constants.js';
import Button from '../components/ButtonCallback.js';
import CheckBoxButton from '../components/CheckBoxButton.js';
import Scenes from './Scenes.js';
import { SETTINGS } from '../utils/Settings.js';

export default class OptionsScene extends Phaser.Scene {
  constructor(deps) {
    super('Options');
    this.deps = deps;
    this.heading = null;
    this.button = null;
    this.musicCheckBox = null;
    this.soundCheckBox = null;
  }

  create() {
    this.heading = this.add.text(0, 0, 'Options', Constants.STYLES.HEADING_TEXT);
    this.heading.setOrigin(0.5, 0);
    this.heading.setY(50);

    this.musicCheckBox = new CheckBoxButton(this, 0, 0, 'checkedBox', 'box', 'Music Enabled',
                                            () => { return this.getState(SETTINGS.musicOption) },
                                            (checked) => { this.setState(SETTINGS.musicOption, checked) });

    this.soundCheckBox = new CheckBoxButton(this, 0, 0, 'checkedBox', 'box', 'Sound Enabled',
      () => { return this.getState(SETTINGS.soundOption) },
      (checked) => { this.setState(SETTINGS.soundOption, checked) });

    this.button = new Button(this, 0, 0, 'normalButton', 'hoverButton', 'Menu', () => { this.gotoMainMenu() });

    this.scale.on('resize', this.resize, this);
    this.resize();
  }

  getState(name) {
    return this.sys.game.globals.settings.getValue(name);
  }

  setState(name, checked) {
    this.sys.game.globals.settings.setValue(name, checked);
  }

  gotoMainMenu() {
    this.scale.off('resize', this.resize, this);
    this.scene.start(Scenes.MENU_SCENE);
  }

  resize() {
    this.heading.setX(this.cameras.main.width / 2);
    this.musicCheckBox.setPosition(this.cameras.main.width / 4, this.heading.y + 50);
    this.soundCheckBox.setPosition(this.cameras.main.width / 4, this.heading.y + 150);
    this.button.setPosition(this.cameras.main.width / 2, this.cameras.main.height - ((this.button.height / 2) + 10));
  }
}
