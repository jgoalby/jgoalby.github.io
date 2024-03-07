import Constants from '../constants.js';
import { initLog2Div, isLog2DivVisible, showLog2Div, hideLog2Div } from '../lib/log2div.js';
import { getPlugin } from './PluginsHelpers.js'

// Constants that only this plugin uses.
const CATEGORY = 'developer';
const CONSOLE_OPTION = 'consoleOption';

const pluginSettings = {
  CONSOLE_OPTION:{
    category: CATEGORY,
    name: CONSOLE_OPTION,
    description: 'Console Enabled',
    value: false,
    type: Constants.SETTINGS_TYPES.boolean
  }
}

export default class ConsolePlugin extends Phaser.Plugins.BasePlugin {
  static initialize() {
    initLog2Div();
  }

  constructor(pluginManager) {
    super(pluginManager);

    // Get the dependent plugins.

    /** @type {SettingsPlugin} */
    this.settings = getPlugin(Constants.PLUGIN_INFO.SETTINGS_KEY);

    /** @type {EventPlugin} */
    this.customevent = getPlugin(Constants.PLUGIN_INFO.EVENT_KEY);

    // If we can access the settings plugin.
    if (this.settings) {
      // Register all of the settings.
      Object.keys(pluginSettings).forEach((key) => {
        this.settings.registerSetting(pluginSettings[key]);
      });
    }

    if (this.customevent) {
      // We would like to know when events occur so we can do stuff.
      this.customevent.on(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
      this.customevent.on(Constants.EVENTS.KEYBOARD, this.onKeyboard, this);
    }
  }

  destroy() {
    // We might not have the plugin, so check this first.
    if (this.customevent) {
      // Remove the listeners.
      this.customevent.off(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
      this.customevent.off(Constants.EVENTS.KEYBOARD, this.onKeyboard, this);
      this.customevent = undefined;
    }

    // MUST do this.
    super.destroy();
  }

  /**
   * Local plugin so we do not provide a version.
   * 
   * @returns {string | undefined} The version of the plugin.
   */
  getVersion() { return undefined; }

  onKeyboard(keyEvent) {
    if ((keyEvent.code == "KeyD") && (keyEvent.ctrlKey)) {
      this.toggle();
    }
  }

  onSettingChanged(setting) {
    // We want to make an immediate change when the setting changes.
    if ((setting.category === CATEGORY) && (setting.name === CONSOLE_OPTION)) {
      // True means setting is set and we want to show the gui otherwise hide.
      if (setting.value) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  show() {
    // Each of these check to make sure there is a change before doing anything.
    // This method can be called from the options menu or directly.
    showLog2Div();
    if (this.settings) {
      this.settings.setValue(CATEGORY, CONSOLE_OPTION, true);
    }
  }

  hide() {
    // Each of these check to make sure there is a change before doing anything.
    // This method can be called from the options menu or directly.
    hideLog2Div();
    if (this.settings) {
      this.settings.setValue(CATEGORY, CONSOLE_OPTION, false);
    }
  }

  toggle() {
    // Call appropriate function internally so we get the setting changed event.
    if (isLog2DivVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.CONSOLE_KEY,
      plugin: ConsolePlugin,
      start: true,
      mapping: Constants.PLUGIN_INFO.CONSOLE_MAPPING,
    }
  }
}
