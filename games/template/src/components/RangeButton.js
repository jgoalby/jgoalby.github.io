import Constants from '../constants.js';
import { getEventPlugin } from '../plugins/PluginsHelpers.js'

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
    this.buttonList = [];

    // The checkbox can be used on the options scene, so we need to know about the setting.
    if (options.setting) {
      this.setting = options.setting;
      this.getState = options.setting.getFn;
      this.setState = options.setting.setFn;
      this.label = options.setting.description;
      this.numButtons = options.setting.numvalues;
    } else {
      this.currentState = false;
      this.setting = undefined;
      this.getState = () => { return this.currentState; };
      this.setState = (newState) => { this.currentState = newState; }
      this.label = options.label || "";
      this.numButtons = options.numvalues || 1;
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

    // These buttons go next to each other, so this allows us to space them.
    let curXPos = 0;

    // The state does not change yet, so just get it once before hte loop.
    const curState = this.getState();

    // For the number of buttons that has been requested, create them.
    for (let i = 0; i < this.numButtons; i++) {
      const button = this.scene.add.image(curXPos, 0, (curState == i) ? this.checked : this.unchecked);
      curXPos += button.width + Constants.STYLES.CHECKBOX_INSIDE_SPACE;
      button.setOrigin(0, 0);
      button.setInteractive();
      button.on(Phaser.Input.Events.POINTER_DOWN, () => { this.checkboxClicked(i); });
      this.add(button);
      this.buttonList.push(button);
    }

    // A sample button for measuring.
    const firstButton = this.buttonList[0];

    // The text label that goes to the side of the button. The y position is set to the middle of the button.
    this.text = this.scene.add.text(0, 0, this.label, Constants.STYLES.CHECKBOX_LABEL);
    this.text.setOrigin(0, 0.5);
    this.text.setPosition(curXPos, firstButton.y + (firstButton.height / 2));
    this.text.setInteractive();

    // Don't want to use specific padding numbers. We know that the button is leftmost and the text is rightmost.
    // So we can calculate the width by subtracting the x position of the button from the x position of the text
    // and then add the width of the text.
    this.width = (this.text.x - firstButton.x) + this.text.width;
    this.height = Math.max(firstButton.height, this.text.height);

    // Add the text to the container.
    this.add(this.text);

    // When the text is clicked, call the checkboxClicked method.
    this.text.on(Phaser.Input.Events.POINTER_DOWN, () => { this.checkboxClicked("+"); });

    // Show when the user hovers over the text.
    this.text.on(Phaser.Input.Events.POINTER_OVER, () => { this.text.setStyle(Constants.STYLES.CHECKBOX_LABEL_HIGHLIGHT); });
    this.text.on(Phaser.Input.Events.POINTER_OUT, () => { this.text.setStyle(Constants.STYLES.CHECKBOX_LABEL); });

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
        this.updateCheckboxes();
      }
    }
  }

  checkboxClicked(index) {
    // Only can do this if we have the function to set the state.
    if (this.setState) {
      // Do not presume to use what is passed.
      let newState = undefined;

      // We support numeric indexes as well as strings for relative changes.
      if (typeof index === "number") {
        // The index passed in can be used directly.
        newState = index;
      } else {
        // Increment the value.
        if (index === "+") {
          // Do the increment.
          newState = this.getState() + 1;

          // Check that the new state is not out of range.
          if (newState > (this.buttonList.length - 1)) {
            newState = 0;
          }
        }
        // Decrement the value.
        if (index === "-") {
          // Do the decrement.
          newState = this.getState() - 1;

          // Check that the new state is not out of range.
          if (newState < 0) {
            newState = (this.buttonList.length - 1);
          }
        }
      }

      // If we got a new state, then set it.
      if (newState !== undefined) {
        // New state is the index passed in or the new state we calculated.
        this.setState(newState);
      }
    }
  }

  updateCheckboxes() {
    // Only can do this if we have the function to get the state.
    if (this.getState) {
      const curState = this.getState();

      for (let i = 0; i < this.buttonList.length; i++) {
        // Update the button texture to reflect the new state.      
        this.buttonList[i].setTexture((curState == i) ? this.checked : this.unchecked);
      }
    }
  }
}
