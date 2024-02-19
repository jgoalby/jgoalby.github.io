import Constants from '../constants.js';
import { getEventPlugin } from '../plugins/pluginshelpers.js'

export default class CheckBoxButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, setting) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.setting = setting;
    this.getState = setting.getFn;
    this.setState = setting.setFn;
    this.checked = 'checkedBox';
    this.unchecked = 'uncheckedBox';
    this.label = setting.description;

    // Get the dependent plugin.
    this.customevent = getEventPlugin();

    if (this.customevent) {
      // We would like to know when the settings have changed so we can do stuff.
      this.customevent.on(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);

      scene.sys.events.once('shutdown', () => {
        if (this.customevent) {
          this.customevent.off(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
        }
      });
    }

    // The check button that changes state when the whole button is clicked.
    this.button = this.scene.add.image(0, 0, this.getState() ? this.checked : this.unchecked);
    this.button.setOrigin(0, 0);

    // The text label that goes to the side of the button. The y position is set to the middle of the button.
    this.text = this.scene.add.text(0, 0, this.label, Constants.STYLES.CHECKBOX_LABEL);
    this.text.setOrigin(0, 0.5);
    this.text.setPosition(this.button.x + this.button.width + Constants.STYLES.CHECKBOX_INSIDE_SPACE, this.button.y + (this.button.height / 2));

    // Don't want to use specific padding numbers. We know that the button is leftmost and the text is rightmost.
    // So we can calculate the width by subtracting the x position of the button from the x position of the text
    // and then add the width of the text.
    this.width = (this.text.x - this.button.x) + this.text.width;
    this.height = Math.max(this.button.height, this.text.height);

    // Rather than using the width and height of the button, we use the width and height of the whole container.
    this.hitZone = this.scene.add.zone(0, 0, this.width, this.height);
    this.hitZone.setOrigin(0, 0);
    this.hitZone.setInteractive();

    // Add the button, text, and hit zone to the container.
    this.add(this.button);
    this.add(this.text);
    this.add(this.hitZone);

    // When the hit zone is clicked, call the checkboxClicked method.
    this.hitZone.on('pointerdown', () => { this.checkboxClicked(); });

    // Show when the user hovers over the hit zone.
    this.hitZone.on('pointerover', () => { this.text.setStyle(Constants.STYLES.CHECKBOX_LABEL_HIGHLIGHT); });
    this.hitZone.on('pointerout', () => { this.text.setStyle(Constants.STYLES.CHECKBOX_LABEL); });

    // Add the container to the scene.
    this.scene.add.existing(this);
  }

  destroy() {
    // TODO: Make sure I do this for all components and that it works

    console.log("In Checkbox button destructor");
    if (this.customevent) {
      this.customevent.off(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
    }
  }

  onSettingChanged(setting) {
    // We want to make an immediate change when the setting changes.
    if ((setting.category === this.setting.category) && (setting.name === this.setting.name)) {
      // Set the new state.
      this.setState(setting.value);

      // Update the button texture to reflect the new state.      
      this.updateCheckbox();
    }
  }

  checkboxClicked() {
    // New state is the opposite of the current state.
    this.setState(!this.getState());

    // Update the button texture to reflect the new state.      
    // TODO : Remove once verified this.updateCheckbox();
  }

  updateCheckbox() {
    console.log(this.setting.name);
    console.log(this.scene ? "scene exists" : "scene does not exist");
    console.log(this.button ? "button exists" : "button does not exist");

    // Update the button texture to reflect the new state.      
    this.button.setTexture(this.getState() ? this.checked : this.unchecked);
  }
}
