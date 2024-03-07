import Constants from '../constants.js';
import { getPlugin } from './PluginsHelpers.js'

export default class SettingsPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // We need access to the event emitter.

    /** @type {EventPlugin} */
    this.customevent = getPlugin(Constants.PLUGIN_INFO.EVENT_KEY);

    // Holder for the settings. Stored by category. Each category contains a dictionary of settings.
    // Each setting has a name, value, description, and type.
    this._settingsByCategory = {};
  }

  /**
   * Local plugin so we do not provide a version.
   * 
   * @returns {string | undefined} The version of the plugin.
   */
  getVersion() { return undefined; }

  getSetting(category, name) {
    // If the category does not exist, create it.
    if (this._settingsByCategory[category] === undefined) {
      this._settingsByCategory[category] = {};
    }

    // Get the settings for the specified category that we now know exists.
    const categoryValues = this._settingsByCategory[category];

    // If the setting name is not present in this category, create it. This will always
    // happen the first time a setting is accessed. These are defaults we can assume.
    if (categoryValues[name] === undefined) {
      categoryValues[name] = {};
      categoryValues[name].name = name;
      categoryValues[name].category = category;
      categoryValues[name].description = name;
      categoryValues[name].getFn = () => { return this.getValue(category, name) };
      categoryValues[name].setFn = (newValue) => { this.setValue(category, name, newValue) };
      categoryValues[name].actionFn = () => { this.action(category, name) };
    }

    // Return the setting object.
    return categoryValues[name];
  }

  registerSetting(setting) {
    // Get it or create it and set the values.
    const categoryValue = this.getSetting(setting.category, setting.name);

    // Go through all of the properties of setting and set on categoryValue, this means we do not
    // have to set them all individually, and when a client adds a new value, we do not have to change.
    for (const key in setting) {
      categoryValue[key] = setting[key];
    }
  }

  action(category, name) {
    // If we have the event plugin, we can emit an event.
    if (this.customevent) {
      // Emit that a setting action happened.
      this.customevent.emit(Constants.EVENTS.SETTING_ACTION, { category: category, name: name});
    }
  }

  setValue(category, name, newValue) {
    // Get it or create it.
    const categoryValue = this.getSetting(category, name);

    // Set the value. We do not care if it is there before, but only set it if changed.
    if (categoryValue.value !== newValue) {
      // Set the new value, and then emit an event to let everyone know the setting has changed.
      categoryValue.value = newValue;
      if (this.customevent) {
        this.customevent.emit(Constants.EVENTS.SETTING_CHANGED, { category: category, name: name, value: newValue});


        // TODO: Temp
        this.customevent.emit(Constants.EVENTS.NOTIFICATION, { notificationText: "Setting changed: " + name, level: Constants.NOTIFICATION_LEVELS.WARN });



      }
    }
  }

  getValue(category, name) {
    const categoryValue = this.getSetting(category, name);
    return categoryValue.value
  }

  getAllSettingsByCategory() {
    return this._settingsByCategory;
  }

  getCategories() {
    return Object.keys(this._settingsByCategory);
  }

  getSettingsForCategory(category) {
    return this._settingsByCategory[category];
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.SETTINGS_KEY,
      plugin: SettingsPlugin,
      start: true,
      mapping: Constants.PLUGIN_INFO.SETTINGS_MAPPING,
    }
  }
}
