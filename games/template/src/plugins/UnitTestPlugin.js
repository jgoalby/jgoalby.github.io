import Constants from '../constants.js';
import BasePlugin from './BasePlugin.js'
import { testModule } from '../common.js';

export default class UnitTestPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
  }

  test() {
    const testRet = testModule();

    if (this.customevent) {
      this.customevent.emit(Constants.EVENTS.NOTIFICATION, { notificationText: `Test status: ${testRet}` });
    }
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.UNIT_TEST_KEY, 
      plugin: UnitTestPlugin, 
      start: true,
      mapping: Constants.PLUGIN_INFO.UNIT_TEST_MAPPING,
    }
  }
}
