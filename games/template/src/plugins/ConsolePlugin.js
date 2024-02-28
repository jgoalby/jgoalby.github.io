import Constants from '../constants.js';
import { initLog2Div, isLog2DivVisible, showLog2Div, hideLog2Div } from '../lib/log2div.js';
import { getSettingsPlugin, getEventPlugin } from './PluginsHelpers.js'

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
    this.settings = getSettingsPlugin();
    this.customevent = getEventPlugin();

    // If we can access the settings plugin.
    if (this.settings) {
      // Register all of the settings.
      Object.keys(pluginSettings).forEach((key) => {
        this.settings.registerSetting(pluginSettings[key]);
      });
    }

    if (this.customevent) {
      // We would like to know when the settings have changed so we can do stuff.
      this.customevent.on(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
    }
  }

  destroy() {
    // We might not have the plugin, so check this first.
    if (this.customevent) {
      // Remove the listener.
      this.customevent.off(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged, this);
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
      key: 'ConsolePlugin', 
      plugin: ConsolePlugin, 
      start: true,
      mapping: 'console',
    }
  }
}
