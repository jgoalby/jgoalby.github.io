import Constants from '../constants.js';
import { getEventPlugin } from '../plugins/PluginsHelpers.js'


// TODO:
//       When click label move to the next button

export default class RangeButton extends Phaser.GameObjects.Container {
  /**
   * Make this button by passing the parent scene and some options.
   * 
   * @param {Phaser.Scene} scene 
   * @param {CheckBoxButtonOptions} options 
   */
  constructor(scene, options) {
    super(scene);
    this.scene = scene;
    this.x = 0;
    this.y = 0;

    // The checkbox can be used on the options scene, so we need to know about the setting.
    if (options.setting) {
      this.setting = options.setting;
      this.getState = options.setting.getFn;
      this.setState = options.setting.setFn;
      this.label = options.setting.description;
    } else {
      this.currentState = false;
      this.setting = undefined;
      this.getState = () => { return this.currentState; };
      this.setState = (newState) => { this.currentState = newState; }
      this.label = options.label;
    }

    this.checked = 'checkedBox';
    this.unchecked = 'uncheckedBox';

    // If this is a setting, then we need to know when it changes.
    if (this.setting) {
      // Get the dependent plugin.
      this.customevent = getEventPlugin();

      if (this.customevent) {
        // We would like to know when the settings have changed so we can do stuff.
        this.customevent.on(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
      }
    }

    const numButtons = 3;
    this.buttonList = [];
    let curXPos = 0;

    for (let i = 0; i < numButtons; i++) {
      const button = this.scene.add.image(curXPos, 0, this.getState() ? this.checked : this.unchecked);
      curXPos += button.width + Constants.STYLES.CHECKBOX_INSIDE_SPACE;
      button.setOrigin(0, 0);
      this.add(button);
      this.buttonList.push(button);
    }

    const firstButton = this.buttonList[0];

    // The text label that goes to the side of the button. The y position is set to the middle of the button.
    this.text = this.scene.add.text(0, 0, this.label, Constants.STYLES.CHECKBOX_LABEL);
    this.text.setOrigin(0, 0.5);
    this.text.setPosition(curXPos, firstButton.y + (firstButton.height / 2));

    // Don't want to use specific padding numbers. We know that the button is leftmost and the text is rightmost.
    // So we can calculate the width by subtracting the x position of the button from the x position of the text
    // and then add the width of the text.
    this.width = (this.text.x - firstButton.x) + this.text.width;
    this.height = Math.max(firstButton.height, this.text.height);

    // Rather than using the width and height of the button, we use the width and height of the whole container.
    this.hitZone = this.scene.add.zone(0, 0, this.width, this.height);
    this.hitZone.setOrigin(0, 0);
    this.hitZone.setInteractive();

    // Add the button, text, and hit zone to the container.
    //this.add(this.button1);
    //this.add(this.button2);
    //this.add(this.button3);
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
    // Check that we have the event plugin.
    if (this.customevent) {
      // We are no longer interested in getting events.
      this.customevent.off(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
      this.customevent = undefined;
    }

    // MUST call the super destructor.
    super.destroy();
  }

  onSettingChanged(newSetting) {
    // Should never be called if no setting, but worth checking.
    if (this.setting) {
      // We want to make an immediate change when the setting changes.
      if ((newSetting.category === this.setting.category) && (newSetting.name === this.setting.name)) {
        // Set the new state.
        this.setState(newSetting.value);

        // Update the button texture to reflect the new state.      
        this.updateCheckbox();
      }
    }
  }

  checkboxClicked() {
    // Only can do this if we have the functions to get and set the state.
    if (this.getState && this.setState) {
      // New state is the opposite of the current state. Setting change event will happen.
      this.setState(!this.getState());
    }
  }

  updateCheckbox() {
    // Only can do this if we have the function to get the state.
    if (this.getState) {
      // Update the button texture to reflect the new state.      
      this.buttonList[0].setTexture(this.getState() ? this.checked : this.unchecked);
    }
  }
}
