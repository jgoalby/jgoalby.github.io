import Constants from '../constants.js';
import Button from '../components/ButtonCallback.js';
import CheckBoxButton from '../components/CheckBoxButton.js';
import Scenes from './Scenes.js';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
    this.heading = null;
    this.mainMenuButton = null;

    // TODO: Just a list to start with, we need to do better when we use categories
    // TODO: Make "tabs" for categories.
    this.currentSettings = [];
  }

  create() {
    this.heading = this.add.text(0, 0, 'Options', Constants.STYLES.HEADING_TEXT);
    this.heading.setOrigin(0.5, 0);
    this.heading.setY(50);

    const categories = this.settings.getCategories();

    for (let i = 0; i < categories.length; i++) {
      const settings = this.settings.getSettingsForCategory(categories[i]);

      // Settings is a dictionary, so we need to iterate over the keys.
      for (let key in settings) {
        // Get the current setting object.
        const setting = settings[key];

        // TODO: Need to do this based on type of setting.

        let ctrl = undefined;

        switch (setting.type) {
          case Constants.SETTINGS_TYPES.boolean:
            ctrl = new CheckBoxButton(this, 0, 0, 'checkedBox', 'box', setting.description, setting.getFn, setting.setFn);
            break;
          case Constants.SETTINGS_TYPES.number:
            break;
          case Constants.SETTINGS_TYPES.string:
            break;
        }

        if (ctrl !== undefined) {
          this.currentSettings.push(ctrl);
        } else {
          console.error(`Unknown setting type: ${setting.type}`);
        }
      }
    }

    this.mainMenuButton = new Button(this, 0, 0, 'normalButton', 'hoverButton', 'Menu', () => { this.gotoMainMenu() });

    this.scale.on('resize', this.resize, this);
    this.resize();
  }

  gotoMainMenu() {
    this.scale.off('resize', this.resize, this);
    this.scene.start(Scenes.MENU_SCENE);
  }

  resize() {
    this.heading.setX(this.cameras.main.width / 2);

    // TODO: This needs to change based on the categories.

    for (let i = 0; i < this.currentSettings.length; i++) {
      const setting = this.currentSettings[i];
      console.warn(this.heading.y + 50 + (i * 80));
      setting.setPosition(this.cameras.main.width / 4, this.heading.y + 50 + (i * 80));
    }

    this.mainMenuButton.setPosition(this.cameras.main.width / 2, this.cameras.main.height - ((this.mainMenuButton.height / 2) + 10));
  }
}
