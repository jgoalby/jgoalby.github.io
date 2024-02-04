import Constants from '../constants.js';

export default class IntrospectPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // Lazy create the GUI.
    this._gui = undefined;

    // Get the event plugin.
    this.customevent = pluginManager.get('EventPlugin');

    // We would like to know when the settings have changed so we can do stuff.
    this.customevent.on(Constants.EVENTS.SETTING_CHANGED, this.onSettingChanged.bind(this));
  }

  destroy() {
    console.log("In Introspect plugin destructor");
    this.reset();
    this.customevent.off(Constants.EVENTS.SETTING_CHANGED);
  }

  // Local plugin so we do not provide a version.
  getVersion() { return undefined; }

  onSettingChanged(setting) {
    // We want to make an immediate change when the setting changes.
    if (setting.name === Constants.SETTINGS.introspectOption) {
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
