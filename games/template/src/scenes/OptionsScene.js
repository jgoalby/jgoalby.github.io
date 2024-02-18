import Constants from '../constants.js';
import Button from '../components/ButtonCallback.js';
import CheckBoxButton from '../components/CheckBoxButton.js';
import Scenes from './Scenes.js';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
    this.heading = null;
    this.button = null;

    /*this.musicCheckBox = null;
    this.soundCheckBox = null;
    this.introspectCheckBox = null;
    this.consoleCheckBox = null;*/

    // Just a list to start with, we need to do better when we use categories
    this.currentSettings = [];
  }

  create() {
    this.heading = this.add.text(0, 0, 'Options', Constants.STYLES.HEADING_TEXT);
    this.heading.setOrigin(0.5, 0);
    this.heading.setY(50);

    const categories = this.settings.getCategories();

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const settings = this.settings.getSettingsForCategory(category);

      for (let key in settings) {
        const setting = settings[key];
        console.log(setting);

        const ctrl = new CheckBoxButton(this, 0, 0, 'checkedBox', 'box', setting.description,
        () => { return this.settings.getValue(setting.category, setting.name) },
        (checked) => { this.settings.setValue(setting.category, setting.name, checked) });  

        this.currentSettings.push(ctrl);
      }
    }

    /*this.musicCheckBox = new CheckBoxButton(this, 0, 0, 'checkedBox', 'box', 'Music Enabled',
      () => { return this.settings.getValue(Constants.SETTINGS_CATEGORIES.sound, Constants.SETTINGS.musicOption) },
      (checked) => { this.settings.setValue(Constants.SETTINGS_CATEGORIES.sound, Constants.SETTINGS.musicOption, checked) });

    this.soundCheckBox = new CheckBoxButton(this, 0, 0, 'checkedBox', 'box', 'Sound Effects Enabled',
      () => { return this.settings.getValue(Constants.SETTINGS_CATEGORIES.sound, Constants.SETTINGS.soundOption) },
      (checked) => { this.settings.setValue(Constants.SETTINGS_CATEGORIES.sound, Constants.SETTINGS.soundOption, checked) });

    this.introspectCheckBox = new CheckBoxButton(this, 0, 0, 'checkedBox', 'box', 'Introspect Enabled',
      () => { return this.settings.getValue(Constants.SETTINGS_CATEGORIES.developer, Constants.SETTINGS.introspectOption) },
      (checked) => { this.settings.setValue(Constants.SETTINGS_CATEGORIES.developer, Constants.SETTINGS.introspectOption, checked) });

    this.consoleCheckBox = new CheckBoxButton(this, 0, 0, 'checkedBox', 'box', 'Console Enabled',
      () => { return this.settings.getValue(Constants.SETTINGS_CATEGORIES.developer, Constants.SETTINGS.consoleOption) },
      (checked) => { this.settings.setValue(Constants.SETTINGS_CATEGORIES.developer, Constants.SETTINGS.consoleOption, checked) });*/

    this.button = new Button(this, 0, 0, 'normalButton', 'hoverButton', 'Menu', () => { this.gotoMainMenu() });

    this.scale.on('resize', this.resize, this);
    this.resize();
  }

  gotoMainMenu() {
    this.scale.off('resize', this.resize, this);
    this.scene.start(Scenes.MENU_SCENE);
  }

  resize() {
    this.heading.setX(this.cameras.main.width / 2);

    /*this.musicCheckBox.setPosition(this.cameras.main.width / 4, this.heading.y + 50);
    this.soundCheckBox.setPosition(this.cameras.main.width / 4, this.heading.y + 130);
    this.introspectCheckBox.setPosition(this.cameras.main.width / 4, this.heading.y + 210);
    this.consoleCheckBox.setPosition(this.cameras.main.width / 4, this.heading.y + 290);*/

    for (let i = 0; i < this.currentSettings.length; i++) {
      const setting = this.currentSettings[i];
      setting.setPosition(this.cameras.main.width / 4, this.heading.y + 50 + (i * 80));
    }

    this.button.setPosition(this.cameras.main.width / 2, this.cameras.main.height - ((this.button.height / 2) + 10));
  }
}
