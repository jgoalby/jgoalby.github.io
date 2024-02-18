import Constants from '../constants.js';
import { showLog2Div, hideLog2Div } from '../lib/log2div.js';

// Constants that only this plugin uses.
const CATEGORY = 'developer';
const CONSOLE_OPTION = 'consoleOption';
const DEFAULT_CONSOLE_OPTION = false;
const CONSOLE_OPTION_TYPE = Constants.SETTINGS_TYPES.boolean;

export default class ConsolePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Get the dependent plugins.
    this.settings = pluginManager.get('SettingsPlugin');
    this.customevent = pluginManager.get('EventPlugin');

    // Register the settings we need.
    this.settings.registerSetting(CATEGORY, CONSOLE_OPTION, DEFAULT_CONSOLE_OPTION, CONSOLE_OPTION_TYPE);

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
    showLog2Div();
  }

  hide() {
    hideLog2Div();
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
