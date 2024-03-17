import Constants from '../constants.js';
import BasePlugin from './BasePlugin.js'

// Constants that only this plugin uses.
const CATEGORY = 'developer';
const INTROSPECTION_OPTION = 'introspectOption';

const pluginSettings = {
  INTROSPECTION_OPTION:{
    category: CATEGORY,
    name: INTROSPECTION_OPTION,
    description: 'Introspection Enabled',
    value: false,
    type: Constants.SETTINGS_TYPES.boolean
  }
}

export default class IntrospectPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Lazy create the GUI.
    this._gui = undefined;
  }

  destroy() {
    this.reset();

    // MUST do this.
    super.destroy();
  }

  /**
   * Get the plugin settings.
   * 
   * @returns {Object} The plugin settings.
   */
  getPluginSettings() { return pluginSettings; }

  onSettingChanged(setting) {
    // We want to make an immediate change when the setting changes.
    if ((setting.category === CATEGORY) && (setting.name === INTROSPECTION_OPTION)) {
      // True means setting is set and we want to show the gui otherwise hide.
      if (setting.value) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  // Get property for gui
  get gui() {
    if (this._gui === undefined) {
      this._gui = new window.dat.GUI();
    }

    return this._gui;
  }

  show() {
    this.gui.show();
  }

  hide() {
    // We do not want to create the GUI just to hide it.
    if (this._gui !== undefined) {
      this.gui.hide();
    }
  }

  reset() {
    // We do not want to create the GUI just to reset it.
    if (this._gui !== undefined) {
      this.gui.destroy();
      this._gui = undefined;
    }
  }

  add(object, property, min, max, step) {
    this.gui.add(object, property, min, max, step);
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.INTROSPECT_KEY,
      plugin: this,
      start: true,
      mapping: Constants.PLUGIN_INFO.INTROSPECT_PLUGIN,
    }
  }
}
