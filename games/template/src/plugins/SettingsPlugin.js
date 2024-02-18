import Constants from '../constants.js';

export default class SettingsPlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    // We need access to the event emitter.
    this.customevent = pluginManager.get('EventPlugin');

    // Holder for the settings. Stored by category. Each category contains a dictionary of settings.
    // Each setting has a name, value, description, and type.
    this._settingsByCategory = {};
  }

  // Local plugin so we do not provide a version.
  getVersion() { return undefined; }

  getSetting(category, name) {
    // If the category does not exist, create it.
    if (this._settingsByCategory[category] === undefined) {
      this._settingsByCategory[category] = {};
    }

    // Get the settings for the specified category that we know exists.
    const categoryValues = this._settingsByCategory[category];

    // If the setting name is not present in this category, create it. This will always
    // happen the first time a setting is accessed.
    if (categoryValues[name] === undefined) {
      categoryValues[name] = {};
      categoryValues[name].name = name;
      categoryValues[name].value = undefined;
      categoryValues[name].category = category;
      categoryValues[name].description = name;
      categoryValues[name].type = undefined;
      categoryValues[name].getFn = () => { return this.getValue(category, name) };
      categoryValues[name].setFn = (newValue) => { this.setValue(category, name, newValue) };
    }

    // Return the setting object.
    return categoryValues[name];
  }

  registerSetting(category, name, value, description, type) {
    // Get it or create it and set the values.
    const categoryValue = this.getSetting(category, name);
    categoryValue.name = name;
    categoryValue.value = value;
    categoryValue.category = category;
    categoryValue.description = description;
    categoryValue.type = type;
  }

  setValue(category, name, value) {
    // Get it or create it.
    const categoryValue = this.getSetting(category, name);

    // Set the value. We do not care if it is there before.
    categoryValue.value = value;

    // Emit an event to let everyone know the setting has changed.
    this.customevent.emit(Constants.EVENTS.SETTING_CHANGED, { category: category, name: name, value: value});
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
      key: 'SettingsPlugin', 
      plugin: SettingsPlugin, 
      start: true,
      mapping: 'settings',
    }
  }
}
