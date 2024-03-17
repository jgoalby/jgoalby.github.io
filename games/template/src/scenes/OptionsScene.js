import Constants from '../constants.js';
import Button from '../components/Button.js';
import CheckBoxButton from '../components/CheckBoxButton.js';
import FormButton from '../components/FormButton.js';
import PasteButton from '../components/PasteButton.js';
import NumberInput from '../components/NumberInput.js';
import TextInput from '../components/TextInput.js';
import RangeButton from '../components/RangeButton.js';
import BaseScene from './BaseScene.js';

export default class OptionsScene extends BaseScene {
  constructor(config) {
    if (!config) { config = {} }
    config.key = config.key || Constants.SCENES.OPTIONS_SCENE;
    super(config);

    this.heading = undefined;
    this.mainMenuButton = undefined;

    // TODO: Just a list to start with, we need to do better when we use categories
    // TODO: Make "tabs" for categories.
    this.currentSettings = undefined;
  }

  createScene() {
    this.heading = this.add.text(0, 0, 'Options', Constants.STYLES.HEADING_TEXT);
    this.heading.setOrigin(Constants.STYLES.HEADING_X_ORIGIN, Constants.STYLES.HEADING_Y_ORIGIN);
    this.heading.setY(Constants.STYLES.HEADING_Y_POS);

    // We need to recreate the current settings every time we create the scene because they could have changed.
    // Also, the values could have changed. And the controls that we display need to be created again.
    this.currentSettings = [];

    // Make sure we have the settings plugin.
    if (this.settings) {
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
              ctrl = new CheckBoxButton(this, { setting: setting });
              break;
            case Constants.SETTINGS_TYPES.number:
              ctrl = new NumberInput(this, { setting: setting });
              break;
            case Constants.SETTINGS_TYPES.range:
              ctrl = new RangeButton(this, { setting: setting });
              break;
            case Constants.SETTINGS_TYPES.string:
              ctrl = new TextInput(this, { setting: setting });
              break;
            case Constants.SETTINGS_TYPES.function:
              ctrl = new FormButton(this, { setting: setting });
              break;
            case Constants.SETTINGS_TYPES.paste:
              ctrl = new PasteButton(this, { setting: setting });
              break;
          }
  
          if (ctrl !== undefined) {
            this.currentSettings.push(ctrl);
          } else {
            console.error(`Unknown setting type: ${setting.type}`);
          }
        }
      }
    }

    this.mainMenuButton = new Button(this, { shortcut: 'X', label: 'Menu', actionFn: () => { this.gotoScene(Constants.SCENES.MENU_SCENE) } });
  }

  resize() {
    const halfWidth = this.cameras.main.width / 2;
    this.heading.setX(halfWidth);

    // TODO: This needs to change based on the categories.

    const quarterWidth = this.cameras.main.width / 4;

    for (let i = 0; i < this.currentSettings.length; i++) {
      const setting = this.currentSettings[i];
      setting.setPosition(quarterWidth, this.heading.y + 50 + (i * 80));
    }

    this.mainMenuButton.setPosition(halfWidth, this.cameras.main.height - ((this.mainMenuButton.height / 2) + 10));
  }
}
