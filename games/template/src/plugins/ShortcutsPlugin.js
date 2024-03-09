import Constants from '../constants.js';
import { getActiveScene } from '../common.js'
import BasePlugin from './BasePlugin.js'
import { getPlugin } from './PluginsHelpers.js'

export default class ShortcutsPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
  }

  // TODO:
  //
  // We need a list of available functions we can make shortcuts for.
  // Do these functions need to be no parameter functions?
  // Stand alone or static functions are simpler.
  // Member functions are more difficult. How do we call methods on plugins, scenes, etc?
  //   And how to do that generically so we can do it for other classes in the future?
  //   Maybe we can do composition where we have a function that takes a function?
  // And then we need a list of shortcuts assigned to one of these functions.
  //   These need to be multiple key combinations with ctrl etc.

  withPlugin(pluginName, fn) {
    const plugin = getPlugin(pluginName);
    if (plugin) {
      fn(plugin);
    }
  }

  withActiveScene(fn) {
    const activeScene = getActiveScene();
    if (activeScene) {
      fn(activeScene);
    }
  }

  callMemberFunction(functionName, ...args) {
    return function(obj) {
      obj[functionName](...args);
    }
  }

  /**
   * A custom key event happened. We want to listen for keys and then do something.
   * 
   * @param {any} keyEvent The keyboard event.
   */
  onKeyboard(keyEvent) {
    // Right now this is hardcoded. It would be nice to make it configurable.
    if ((keyEvent.code == "KeyD") && (keyEvent.ctrlKey)) {
      this.withPlugin(Constants.PLUGIN_INFO.CONSOLE_KEY, this.callMemberFunction('toggle'));
    }

    if ((keyEvent.code == "KeyE") && (keyEvent.ctrlKey)) {
      this.withActiveScene(this.callMemberFunction('gotoScene', Constants.SCENES.MENU_SCENE));
    }
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.SHORTCUTS_KEY, 
      plugin: ShortcutsPlugin,
      start: true,
      mapping: Constants.PLUGIN_INFO.SHORTCUTS_MAPPING,
    }
  }
}
