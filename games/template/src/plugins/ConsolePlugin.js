import Constants from '../constants.js';
import {  } from '../lib/log2div.js';

export default class ConsolePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Get the event plugin.
    this.customevent = pluginManager.get('EventPlugin');

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
    if (setting.name === Constants.SETTINGS.consoleOption) {
      // True means setting is set and we want to show the gui otherwise hide.
      if (setting.value) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  show() {
    
  }

  hide() {
    
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
