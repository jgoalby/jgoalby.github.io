import BasePlugin from './plugins/BasePlugin.js'
import BaseScene from './scenes/BaseScene.js'

/**
 * Get the current active scene.
 * 
 * @param {Phaser.Scenes.SceneManager} [sceneManager=undefined] 
 * @returns {Phaser.Scene | undefined} The active scene.
 */
function getActiveScene(sceneManager = undefined) {
  // Figure out which scene manager to use based on if one was passed in or not.
  const sceneMgr = sceneManager ? sceneManager : window.game.scene;

  // No scene manager, no active scene.
  if (!sceneMgr) { return undefined; }

  // Get the active scenes in reverse.
  const allActiveScenes = sceneMgr.getScenes(true, true);

  // Check how many active scenes we have. Hopefully just one would be nice.
  if (allActiveScenes.length == 1) {
    // There's a chosen one.
    return allActiveScenes[0];
  } else if (allActiveScenes.length == 0) {
    // Nothing to choose.
    return undefined;
  } else {
    // Go through all of the active scenes.
    for (let i = 0; i < allActiveScenes.length; i++) {
      // If this one is visible, let's return it.
      if (allActiveScenes[i].scene.isVisible()) {
        return allActiveScenes[i];
      }
    }

    // Just return the first one (which is the last one because we reversed order) even though it isn't visible?
    return allActiveScenes[0];
  }
}

/**
 * Get the specified scene.
 * 
 * @param {string} sceneKey The scene key.
 * @param {Phaser.Scenes.SceneManager} [sceneManager=undefined] 
 * @returns {Phaser.Scene | undefined} The scene.
 */
function getScene(sceneKey, sceneManager = undefined) {
  // Figure out which scene manager to use based on if one was passed in or not.
  const sceneMgr = sceneManager ? sceneManager : window.game.scene;

  // No scene manager, no active scene.
  if (!sceneMgr) { return undefined; }

  // Get all of the scenes.
  const allScenes = sceneMgr.getScenes(false, false);

  // Go through all of the scenes.
  for (let i = 0; i < allScenes.length; i++) {
    // If this key matches we can return it.
    if (allScenes[i].scene.key === sceneKey) {
      return allScenes[i];
    }
  }

  // We did not find the requested scene.
  return undefined;
}

// TODO:
//
// We need a list of available functions we can make shortcuts for.
// Do these functions need to be no parameter functions?
// And then we need a list of shortcuts assigned to one of these functions.
//   These need to be multiple key combinations with ctrl etc.

// TODO: Should be dynmamic perhaps?

// Cannot define in the global scope as some classes not yet ready. So, lazy initialize.
let classesWithGetInstanceFn = undefined;

function getClassesWithGetInstanceFn() {
  // If the lookup has not yet been created...
  if (!classesWithGetInstanceFn) {
    // ...create the lookup of class name to static getInstance funcion now.
    classesWithGetInstanceFn = { "BasePlugin": BasePlugin.getInstance, "BaseScene": BaseScene.getInstance };
  }

  // Return the lookup.
  return classesWithGetInstanceFn;
}

function getClassNamesWithGetInstanceFn() {
  // Get the object we want to get names for and return the keys.
  const obj = getClassesWithGetInstanceFn();
  return Object.keys(obj);
}

function withClass(className, getInstanceArgs, callFnOnObj) {
  // Make sure the user gave a class name.
  if (className) {
    // Get the lookup so we can get the instance function.
    const classLookup = getClassesWithGetInstanceFn();
    const getInstanceFn = classLookup[className];

    // It is possible we do not have an instance function.
    if (getInstanceFn) {
      // Create an instance using the get instance function we retrieved.
      const obj = getInstanceFn(...getInstanceArgs);

      // If the instance is something, call the member function on it.
      if (obj) {
        callFnOnObj(obj);
      }
    }
  }
}

function callMemberFunction(functionName, ...args) {
  // Return a function that calls our passed in function on the passed in object using our passed in args.
  return function(obj) {
    // Call the closed functionName with closed args on the passed in obj.
    obj[functionName](...args);
  }
}

// Various key options we care about. Upper case.
const keyOptions = {
  meta:      'META',
  ctrl:      'CTRL',
  alt:       'ALT',
  shift:     'SHIFT',
  separator: ' '
}

// Lookup from key code to string representation for special cases. Make sure to keep
// everything UPPERCASE so lookups work correctly. We make sure to upper case and the
// function String.fromCharCode forces the issue by returning UPPER case.
const keyMap = {
  // 0-7: ???
  8:   'BACKSPACE',
  9:   'TAB',
  // 10-12: ??? ??? Numlock
  13:  'ENTER',
  // 14-15: ???
  16:  keyOptions.shift,
  17:  keyOptions.ctrl,
  18:  keyOptions.alt,
  // 19: Pause
  20:  'CAPSLOCK',
  // 21-26: ???
  27:  'ESC',
  // 28-31: ???
  32:  'SPACE',
  33:  'pageup', 34: 'PAGEDOWN',
  35:  'END', 36: 'HOME',
  37:  'LEFT', 38: 'UP', 39: 'RIGHT', 40: 'DOWN',
  // 41-44: Select Print Execute PrintScreen
  45:  'INS', 46: 'DEL',
  // 47: Help
  // 48-57: 0-9
  // 58-64: . ; < = - @
  // 65-90: A-Z
  91:  keyOptions.meta,
  92:  keyOptions.meta,
  93:  keyOptions.meta,
  // 96-111 : Numpad 0-9 * + . - . /
  112: 'F1',  113: 'F2',  114: 'F3',  115: 'F4',  116: 'F5',  117: 'F6',  118: 'F7',  119: 'F8',  120: 'F9',  121: 'F10', 
  122: 'F11', 123: 'F12', 124: 'F13', 125: 'F14', 126: 'F15', 127: 'F16', 128: 'F17', 129: 'F18', 130: 'F19',
  // 131-185: ???
  186: ';',
  187: '=',
  188: ',',
  189: '-',
  190: '.',
  // 191: /
  192: '`',
  // 193-218: ???
  // 219-221: [ \ ]
  222: "'",
  // 223: `
  224: keyOptions.meta,
  // 225-255: ???
}

// Holder for the reverse key map lazily created from regular keymap.
let reverseKeyMap = undefined;

function createReverseKeyMap() {
  // Make a new reverse key map object.
  reverseKeyMap = {};

  // Go through each entry in the regular keymap.
  for (const key in keyMap) {
    // If this is its won property...
    if (keyMap.hasOwnProperty(key)) {
      // ...add it to the reverse key map and convert to an integer.
      reverseKeyMap[keyMap[key]] = parseInt(key);
    }
  }
}

function keyEventToString(keyEvent) {
  // To make a string with a give separator we make an array first.
  let arr = [];

  // Check each of the modifier keys and if present add to the array.
  if (keyEvent.metaKey)  { arr.push(keyOptions.meta); }
  if (keyEvent.ctrlKey)  { arr.push(keyOptions.ctrl); }
  if (keyEvent.altKey)   { arr.push(keyOptions.alt); }
  if (keyEvent.shiftKey) { arr.push(keyOptions.shift); }

  // Look to see if the keycode is a modifier itself. If so, this is a special case.
  const isModifier = [16, 17, 18, 91, 93, 224].indexOf(keyEvent.keyCode) !== -1;

  // This is NOT a modifier key on its own, so we can add it to the array. If we didn't do
  // this check we would end up with "shift shift" when pressing shift key once.
  if (!isModifier) {
    // Add the keycode if we find it in the lookup, or the straight conversion from character code.
    // Interesting to note that fromCharCode returns an upper case letter, so we uppercase in string to keyevent.
    arr.push(keyMap[keyEvent.keyCode] || String.fromCharCode(keyEvent.keyCode));
  }

  // We can take everything in the array and join back together with the given separator.
  return arr.join(keyOptions.separator);
}

function stringToKeyEvent(str) {
  if (reverseKeyMap == undefined) {
    // Create the reverse key map lookup if not already.
    createReverseKeyMap();
  }

  // Create a blank key event with sensible defaults.
  let keyEvent = {};
  keyEvent.metaKey  = false;
  keyEvent.ctrlKey  = false;
  keyEvent.altKey   = false;
  keyEvent.shiftKey = false;

  // Split the input string based on the separator.
  let arr = str.split(keyOptions.separator);

  // This is not good, so esacpe.
  if (arr.length === 0) { return undefined; }

  // Go through the array except for the last element which is the keycode and we
  // will look at that last. Note that if there is only 1 element we will skip this
  // loop altogether.
  for (let i = 0; i < (arr.length - 1); i++) {
    const currentKeyCode = reverseKeyMap[arr[i]];

    const isModifier = [16, 17, 18, 91, 93, 224].indexOf(currentKeyCode) !== -1;

    if (isModifier) {
      if (currentKeyCode == 16) { keyEvent.shiftKey = true; }
      if (currentKeyCode == 17) { keyEvent.ctrlKey = true; }
      if (currentKeyCode == 18) { keyEvent.altKey = true; }
      if ([91, 93, 224].indexOf(currentKeyCode) !== -1) { keyEvent.metaKey = true; }
    } else {
      // If it is not a modifier, then its not really something we can deal with right now.
    }
  }

  // Look at the last element of the array and return the key code for it. We make sure the
  // element is upper case as that is what we get when converting the opposite direction.
  const lastElement = arr[arr.length - 1].toUpperCase();
  keyEvent.keyCode = reverseKeyMap[lastElement] || lastElement.charCodeAt(0);

  // Retun the key event now.
  return keyEvent;
}

const assert = function(condition, message) {
  if (!condition) {
    throw Error('Assert failed' + (message ? (': ' + message) : '.'));
  }
};

const assertEqual = function(value, expected, message) {
  if (value != expected) {
    throw Error(`Assert failed value(${value}) != expected(${expected})` + (message ? (': ' + message) : '.'));
  }
};

//-----------------------------------------------------------------------------
//                                 MODULE TESTS
//-----------------------------------------------------------------------------

function testStringToKeyEvent() {
  const str1 = 'ESC';
  const key1 = stringToKeyEvent(str1);
  assertEqual(key1.keyCode, 27, `for string (${str1})`);
}

function testKeyEventToString() {
  const keyEventA =         { keyCode: 65, metaKey: false, ctrlKey: false, altKey: false, shiftKey: false };
  const keyEventShift =     { keyCode: 16, metaKey: false, ctrlKey: false, altKey: false, shiftKey: true  };
  const keyEventEscapeAll = { keyCode: 27, metaKey: true,  ctrlKey: true,  altKey: true,  shiftKey: true  };

  const str1 = keyEventToString(keyEventA);
  assertEqual(str1, 'A', 'for keyEventA');

  const str2 = keyEventToString(keyEventShift);
  assertEqual(str2, 'SHIFT', 'for keyEventShift');

  const str3 = keyEventToString(keyEventEscapeAll);
  assertEqual(str3, 'META CTRL ALT SHIFT ESC', 'for keyEventEscapeAll');
}

function testModule() {
  testStringToKeyEvent();
  testKeyEventToString();
}

export {
  assert,
  assertEqual,
  getActiveScene,
  getScene,
  getClassNamesWithGetInstanceFn,
  withClass,
  callMemberFunction,
  keyEventToString,
  stringToKeyEvent,
  testModule,
}
