import Constants from '../constants.js';
import { getSettingsPlugin, getEventPlugin } from './PluginsHelpers.js'

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

export default class IntrospectPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Lazy create the GUI.
    this._gui = undefined;

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
    this.reset();

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
      key: 'IntrospectPlugin', 
      plugin: IntrospectPlugin, 
      start: true,
      mapping: 'introspect',
    }
  }
}
