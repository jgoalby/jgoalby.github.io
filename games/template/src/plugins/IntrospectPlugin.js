import { EVENTS, EventDispatcher } from '../components/Events.js';
import { SETTINGS } from '../plugins/SettingsPlugin.js';

export default class IntrospectPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
    console.log("In Introspect plugin constructor");

    // Lazy create the GUI.
    this._gui = undefined;

    // Get the settings plugin.
    this.settings = pluginManager.get('SettingsPlugin');

    // We would like to know when the settings have changed so we can do stuff.
    EventDispatcher.instance.on(EVENTS.SETTING_CHANGED, this.onSettingChanged.bind(this));
  }

  getVersion() {
    return undefined;
  }

  onSettingChanged(setting) {
    // We want to make an immediate change when the setting changes.
    if (setting.name === SETTINGS.introspectOption) {
      // True means setting is set and we want to play music, otherwise silence.
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
