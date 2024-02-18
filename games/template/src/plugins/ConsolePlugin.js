import Constants from '../constants.js';
import { initLog2Div, isLog2DivVisible, showLog2Div, hideLog2Div } from '../lib/log2div.js';

// Constants that only this plugin uses.
const CATEGORY = 'developer';
const CONSOLE_OPTION = 'consoleOption';
const CONSOLE_OPTION_DESC = 'Console Enabled';
const DEFAULT_CONSOLE_OPTION = false;
const CONSOLE_OPTION_TYPE = Constants.SETTINGS_TYPES.boolean;

export default class ConsolePlugin extends Phaser.Plugins.BasePlugin {
  static initialize() {
    initLog2Div();
  }

  constructor(pluginManager) {
    super(pluginManager);

    // Get the dependent plugins.
    this.settings = pluginManager.get('SettingsPlugin');
    this.customevent = pluginManager.get('EventPlugin');

    // Register the settings we need.
    this.settings.registerSetting(CATEGORY, CONSOLE_OPTION, DEFAULT_CONSOLE_OPTION, CONSOLE_OPTION_DESC, CONSOLE_OPTION_TYPE);

    // We would like to know when the settings have changed so we can do stuff.
    this.customevent.on(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged.bind(this));
  }

  destroy() {
    console.log("In Console plugin destructor");
    this.customevent.off(Constants.EVENTS.SETTING_CHANGED);
  }

  // Local plugin so we do not provide a version.
  getVersion() { return undefined; }

  onSettingChanged(setting) {
    // We want to make an immediate change when the setting changes.
    if (setting.name === CONSOLE_OPTION) {
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
    this.settings.setValue(CATEGORY, CONSOLE_OPTION, true);
  }

  hide() {
    // Each of these check to make sure there is a change before doing anything.
    // This method can be called from the options menu or directly.
    hideLog2Div();
    this.settings.setValue(CATEGORY, CONSOLE_OPTION, false);
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
