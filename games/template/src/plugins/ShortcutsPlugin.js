import Constants from '../constants.js';
import { keyEventToString, stringToKeyEvent, withClass, callMemberFunction } from '../common.js'
import BasePlugin from './BasePlugin.js'

// Constants that only this plugin uses.
const CATEGORY                        = 'developer';
const LOG_KEYBOARD_EVENTS_OPTION      = 'logKeyboardEventsOption';
const LOG_KEYBOARD_EVENTS_OPTION_DESC = 'Log Keyboard Events';

const pluginSettings = {
  LOG_KEYBOARD_EVENTS:{
    category: CATEGORY,
    name: LOG_KEYBOARD_EVENTS_OPTION,
    description: LOG_KEYBOARD_EVENTS_OPTION_DESC,
    value: false,
    type: Constants.SETTINGS_TYPES.boolean
  }
}

export default class ShortcutsPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    this.shortcuts = [];

    // TODO: These are not going to stay here.

    // Make sure that classes used for class name are in common : getClassesWithGetInstanceFn

    this.onAddShortcut({
                    getInstanceClassName: 'BasePlugin',
                    getInstanceArgs:      [Constants.PLUGIN_INFO.CONSOLE_KEY],
                    memberName:           'toggle',
                    memberArgs:           [],
                    shortcut:             'CTRL SHIFT D'
                  });

    this.onAddShortcut({
                    getInstanceClassName: 'BaseScene',
                    getInstanceArgs:      [],
                    memberName:           'gotoScene',
                    memberArgs:           [Constants.SCENES.MENU_SCENE],
                    shortcut:             'CTRL SHIFT E'
                  });

    this.onAddShortcut({
                    getInstanceClassName: 'BasePlugin',
                    getInstanceArgs:      [Constants.PLUGIN_INFO.UNIT_TEST_KEY],
                    memberName:           'test',
                    memberArgs:           [],
                    shortcut:             'CTRL SHIFT T'
                  });

    this.onAddShortcut({
                    getInstanceClassName: 'BasePlugin',
                    getInstanceArgs:      [Constants.PLUGIN_INFO.GENAI_KEY],
                    memberName:           'test',
                    memberArgs:           [],
                    shortcut:             'CTRL SHIFT O'
                  });

    this.onAddShortcut({
                    getInstanceClassName: 'BasePlugin',
                    getInstanceArgs:      [Constants.PLUGIN_INFO.SHORTCUTS_KEY],
                    memberName:           'test',
                    memberArgs:           [],
                    shortcut:             'CTRL SHIFT Y'
                  });

    this.onAddShortcut({
                    getInstanceClassName: 'Globals',
                    getInstanceArgs:      ['data'],
                    memberName:           'test',
                    memberArgs:           [],
                    shortcut:             'CTRL SHIFT G'
                  });

    this.onAddShortcut({
                    getInstanceClassName: 'BasePlugin',
                    getInstanceArgs:      [Constants.PLUGIN_INFO.SHORTCUTS_KEY],
                    memberName:           'logShortcuts',
                    memberArgs:           [],
                    shortcut:             'CTRL SHIFT J'
                  });

    this.onAddShortcut({
                    getInstanceClassName: 'BasePlugin',
                    getInstanceArgs:      [Constants.PLUGIN_INFO.CACHE_KEY],
                    memberName:           'getCachedFile',
                    memberArgs:           [],
                    shortcut:             'CTRL SHIFT K'
                  });

    this.onAddShortcut({
                    actionFn:             () => { console.log("This is the life!") },
                    actionFnArgs:         [],
                    shortcut:             'CTRL SHIFT W'
                  });
  }

  test() {
    // See what I can do with proxy.

    const blankHandler = {
      get(target, prop, receiver) {
        // Just return a blank function. This also works as a value. A value though does not
        // work as a function, so we need to return this. This is because we would be using a
        // class vs object. And as we do cannot use the class, we don't need to pass it in.
        return function() { };
      },
    };

    const proxy2 = new Proxy({}, blankHandler);

    console.log("in test");
    proxy2.isEventPluginWanted();
    proxy2._eventDispatcher;
    proxy2._eventDispatcher = undefined;
    proxy2.emit(Constants.EVENTS.SETTING_ACTION, { category: 'category', name: 'name', value: 'args' });
    console.log("out test");
  }

  /**
   * Get the plugin settings.
   * 
   * @returns {Object} The plugin settings.
   */
  getPluginSettings() { return pluginSettings; }

  /**
   * A custom key event happened. We want to listen for keys and then do something.
   * 
   * @param {KeyboardEvent} keyEvent The keyboard event.
   */
  onKeyboard(keyEvent) {
    // This can be turned on and off in options.
    if (this.getSettingValue(CATEGORY, LOG_KEYBOARD_EVENTS_OPTION)) {
      const str = keyEventToString(keyEvent);
      console.log(str);
      const key = stringToKeyEvent(str);
      console.log(key);
    }

    // This list could be dynamic depending on which scene you are in.
    // I can see a case where say buttons in a scene will register their own hotkeys and shortcuts.
    // Need to make it configurable.

    // We also need the statemachine set up for the scenes as this might interact with that?

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

  expandShortcutInfo(shortcutInfo) {
    // If the shortcut info uses shortcut to define the key information, expand to make future
    // comparisons easier.
    if (shortcutInfo.shortcut) {
      const keyEvent = stringToKeyEvent(shortcutInfo.shortcut);
      shortcutInfo.keyEventCode     = keyEvent.keyCode;
      shortcutInfo.keyEventCtrlKey  = keyEvent.ctrlKey;
      shortcutInfo.keyEventAltKey   = keyEvent.altKey;
      shortcutInfo.keyEventMetaKey  = keyEvent.metaKey;
      shortcutInfo.keyEventShiftKey = keyEvent.shiftKey;
    }
  }

  /**
   * An add shortcut event happened.
   * 
   * @param {any} shortcutInfo The shortcut information.
   */
  onAddShortcut(shortcutInfo) {
    // TODO: This just adds, we need something better. To check for existence? Do we care?

    // Expand shortcut info to make future comparisons easier.
    this.expandShortcutInfo(shortcutInfo);

    this.shortcuts.push(shortcutInfo);
  }

  getCanonicalShortcutInfo(shortcutInfo) {
    let canonical = {};
    canonical.keyEventCode     = shortcutInfo.keyCode  || shortcutInfo.keyEventCode;
    canonical.keyEventCtrlKey  = shortcutInfo.ctrlKey  || shortcutInfo.keyEventCtrlKey  || false;
    canonical.keyEventAltKey   = shortcutInfo.altKey   || shortcutInfo.keyEventAltKey   || false;
    canonical.keyEventMetaKey  = shortcutInfo.metaKey  || shortcutInfo.keyEventMetaKey  || false;
    canonical.keyEventShiftKey = shortcutInfo.shiftKey || shortcutInfo.keyEventShiftKey || false;
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

    // Expand shortcut info to make removal easier.
    this.expandShortcutInfo(shortcutInfo);

    this.shortcuts = this.shortcuts.filter((value) => { return !this.isSameShortcut(shortcutInfo, value) });

  }

  logShortcuts() {
    console.log(this.shortcuts);
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
