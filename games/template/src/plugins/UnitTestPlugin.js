import Constants from '../constants.js';
import BasePlugin from './BasePlugin.js'
import { testModule as testCommon } from '../common.js';

export default class UnitTestPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
  }

  test() {
    try {
      // Run the tests.
      testCommon();

      // Announce the winners!
      this.customevent.emit(Constants.EVENTS.NOTIFICATION, { notificationText: 'All tests passed.' });
    } catch (e) {
      // Announce the winners!
      this.customevent.emit(Constants.EVENTS.NOTIFICATION, { notificationText: `Test failed: ${e.message}` });
    }
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.UNIT_TEST_KEY, 
      plugin: this, 
      start: true,
      mapping: Constants.PLUGIN_INFO.UNIT_TEST_PLUGIN,
    }
  }
}
