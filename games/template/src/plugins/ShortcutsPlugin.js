import Constants from '../constants.js';
import { keyEventToString, stringToKeyEvent, withClass, callMemberFunction } from '../common.js'
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
    const str1 = keyEventToString(keyEvent);
    console.log(str1);
    const key1 = stringToKeyEvent(str1);
    console.log(key1);

    // This list could be dynamic depending on which scene you are in.
    // I can see a case where say buttons in a scene will register their own hotkeys and shortcuts.
    // Need to make it configurable.

    // We also need the statemachine set up for the scenes as this might interact with that?

    const infoList = [{
                    getInstanceClassName: 'BasePlugin',
                    getInstanceArgs:      [Constants.PLUGIN_INFO.CONSOLE_KEY],
                    memberName:           'toggle',
                    memberArgs:           [],
                    shortcut:             'ctrl shift D'
                  }, {
                    getInstanceClassName: 'BaseScene',
                    getInstanceArgs:      [],
                    memberName:           'gotoScene',
                    memberArgs:           [Constants.SCENES.MENU_SCENE],
                    shortcut:             'ctrl shift E'
                  }, {
                    actionFn:             () => { console.log("This is the life!") },
                    actionFnArgs:         [],
                    shortcut:             'ctrl shift J'
                  }];

    // Go through them all.
    for (const info of infoList) {
      // Check the code and modifier keys all match.
      if (this.isSameShortcut(keyEvent, info)) {
        // Call the action in the info.
        this.callAction(info);

        // Assume one shortcut for each action.
        break;
      }
    }

    // TODO:

    for (const info of this.shortcuts) {
      if (this.isSameShortcut(keyEvent, info)) {
        // Call the action in the info.
        this.callAction(info);

        // Assume one shortcut for each action.
        break;
      }
    }
  }

  callAction(shortcutInfo) {
    // If an action function was defined, use that.
    if (shortcutInfo.actionFn !== undefined) {
      // We cannot use undefined as spread args, so make sure we have empty array in worst case.
      const fnArgs = shortcutInfo.actionFnArgs || [];
      // Call the function and pass the args.
      shortcutInfo.actionFn(...fnArgs);
    } else {
      // We are going to use this information to call the member, so make sure we have them first.
      if (shortcutInfo.getInstanceClassName && shortcutInfo.memberName) {
        // Make sure we have empty array at a minimum.
        const instanceArgs = shortcutInfo.getInstanceArgs || [];
        const memberArgs = shortcutInfo.memberArgs || [];

        // Call the member on the specific instance of the class.
        withClass(shortcutInfo.getInstanceClassName, instanceArgs, callMemberFunction(shortcutInfo.memberName, ...memberArgs));
      }
    } 
  }

  /**
   * An add shortcut event happened.
   * 
   * @param {any} shortcutInfo The shortcut information.
   */
  onAddShortcut(shortcutInfo) {
    // TODO: This just adds, we need something better. To check for existence? Do we care?

    this.shortcuts.push(shortcutInfo);

    console.log(this.shortcuts);
  }

  getCanonicalShortcutInfo(shortcutInfo) {
    let keyEvent = undefined;

    if (shortcutInfo.shortcut) {
      keyEvent = stringToKeyEvent(shortcutInfo.shortcut);
    } else {
      keyEvent = shortcutInfo;
    }

    let canonical = {};
    canonical.keyEventCode     = shortcutInfo.code     || keyEvent.keyEventCode;
    canonical.keyEventCtrlKey  = shortcutInfo.ctrlKey  || keyEvent.keyEventCtrlKey  || false;
    canonical.keyEventAltKey   = shortcutInfo.altKey   || keyEvent.keyEventAltKey   || false;
    canonical.keyEventMetaKey  = shortcutInfo.metaKey  || keyEvent.keyEventMetaKey  || false;
    canonical.keyEventShiftKey = shortcutInfo.shiftKey || keyEvent.keyEventShiftKey || false;
    return canonical;
  }

  isSameShortcut(shortcut1, shortcut2) {
    // Sometimes we get key events to compare with shortcuts, so we have to convert
    // them to have the same properties to make comparison simpler.
    let canonical1 = this.getCanonicalShortcutInfo(shortcut1);
    let canonical2 = this.getCanonicalShortcutInfo(shortcut2);

    // Check the code and modifier keys all match.
    if ((canonical1.keyEventCode     == canonical2.keyEventCode)    &&
        (canonical1.keyEventCtrlKey  == canonical2.keyEventCtrlKey) &&
        (canonical1.keyEventAltKey   == canonical2.keyEventAltKey)  &&
        (canonical1.keyEventMetaKey  == canonical2.keyEventMetaKey) &&
        (canonical1.keyEventShiftKey == canonical2.keyEventShiftKey)) {
      return true;
    }

    // Not a match.
    return false;
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
