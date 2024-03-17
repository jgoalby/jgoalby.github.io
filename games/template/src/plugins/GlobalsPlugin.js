import Constants from '../constants.js';
import BasePlugin from './BasePlugin.js'

export default class GlobalsPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.GLOBALS_KEY, 
      plugin: GlobalsPlugin, 
      start: true,
      mapping: Constants.PLUGIN_INFO.GLOBALS_MAPPING,
    }
  }
}
