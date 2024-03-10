import Constants from '../constants.js';
import { withClass, callMemberFunction } from '../common.js'
import BasePlugin from './BasePlugin.js'

export default class ShortcutsPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    this.shortcuts = [];
  }

  /**
   * A custom key event happened. We want to listen for keys and then do something.
   * 
   * @param {KeyboardEvent} keyEvent The keyboard event.
   */
  onKeyboard(keyEvent) {

    // This list could be dynamic depending on which scene you are in.
    // I can see a case where say buttons in a scene will register their own hotkeys and shortcuts.
    // Need to make it configurable.

    // We also need the statemachine set up for the scenes as this might interact with that?

    const infoList = [{
                    getInstanceClassName: 'BasePlugin',
                    getInstanceArgs:      [Constants.PLUGIN_INFO.CONSOLE_KEY],
                    memberName:           'toggle',
                    memberArgs:           [],
                    keyEventCode:         'KeyD',
                    keyEventCtrlKey:      true,
                    keyEventAltKey:       false,
                    keyEventMetaKey:      false,
                    keyEventShiftKey:     true
                  }, {
                    getInstanceClassName: 'BaseScene',
                    getInstanceArgs:      [],
                    memberName:           'gotoScene',
                    memberArgs:           [Constants.SCENES.MENU_SCENE],
                    keyEventCode:         'KeyE',
                    keyEventCtrlKey:      true,
                    keyEventAltKey:       false,
                    keyEventMetaKey:      false,
                    keyEventShiftKey:     true
                  }];

    // Go through them all.
    for (const info of infoList) {
      // Check the code and modifier keys all match.
      if ((keyEvent.code     == info.keyEventCode)    &&
          (keyEvent.ctrlKey  == info.keyEventCtrlKey) &&
          (keyEvent.altKey   == info.keyEventAltKey)  &&
          (keyEvent.metaKey  == info.keyEventMetaKey) &&
          (keyEvent.shiftKey == info.keyEventShiftKey)) {
        // Call the member on the specific instance of the class.
        withClass(info.getInstanceClassName, info.getInstanceArgs, callMemberFunction(info.memberName, ...info.memberArgs));

        // Assume one shortcut for each action.
        break;
      }
    }

    // TODO:

    for (const info of this.shortcuts) {
      // Check the code and modifier keys all match.
      if ((keyEvent.code     == info.keyEventCode)    &&
          (keyEvent.ctrlKey  == info.keyEventCtrlKey) &&
          (keyEvent.altKey   == info.keyEventAltKey)  &&
          (keyEvent.metaKey  == info.keyEventMetaKey) &&
          (keyEvent.shiftKey == info.keyEventShiftKey)) {
        // Call the member on the specific instance of the class.
        withClass(info.getInstanceClassName, info.getInstanceArgs, callMemberFunction(info.memberName, ...info.memberArgs));

        // Assume one shortcut for each action.
        break;
      }
    }
  }

  /**
   * An add shortcut event happened.
   * 
   * @param {any} shortcutInfo The shortcut information.
   */
  onAddShortcut(shortcutInfo) {
    // TODO: This just adds, we need something better.

    this.shortcuts.push(shortcutInfo);

    console.log(this.shortcuts);
  }

  isSameShortcut(shortcut1, shortcut2) {
    if (shortcut1.keyEventCode !== shortcut2.keyEventCode) {
      return false;
    }
    if (shortcut1.keyEventCtrlKey !== shortcut2.keyEventCtrlKey) {
      return false;
    }
    if (shortcut1.keyEventAltKey !== shortcut2.keyEventAltKey) {
      return false;
    }
    if (shortcut1.keyEventMetaKey !== shortcut2.keyEventMetaKey) {
      return false;
    }
    if (shortcut1.keyEventShiftKey !== shortcut2.keyEventShiftKey) {
      return false;
    }

    return true;
  }

  /**
   * A remove shortcut event happened.
   * 
   * @param {any} shortcutInfo The shortcut information.
   */
  onRemoveShortcut(shortcutInfo) {

    console.log("remove here");

    this.shortcuts = this.shortcuts.filter((value) => { return !this.isSameShortcut(shortcutInfo, value) });

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
