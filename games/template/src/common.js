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
 * @param {string} sceneName The scene name.
 * @param {Phaser.Scenes.SceneManager} [sceneManager=undefined] 
 * @returns {Phaser.Scene | undefined} The scene.
 */
function getScene(sceneName, sceneManager = undefined) {
  // Figure out which scene manager to use based on if one was passed in or not.
  const sceneMgr = sceneManager ? sceneManager : window.game.scene;

  // No scene manager, no active scene.
  if (!sceneMgr) { return undefined; }

  // Get all of the scenes.
  const allScenes = sceneMgr.getScenes(false, false);

  // Go through all of the scenes.
  for (let i = 0; i < allScenes.length; i++) {
    // If this name matches we can return it.
    if (allScenes[i].scene.sceneName === sceneName) {
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



const keyOptions = {
  meta: 'meta',
  ctrl: 'ctrl',
  alt: 'alt',
  shift: 'shift',
  separator: ' '
}

const keyMap = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  16: keyOptions.shift,
  17: keyOptions.ctrl,
  18: keyOptions.alt,
  20: 'capslock',
  27: 'esc',
  32: 'space',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  45: 'ins',
  46: 'del',
  91: keyOptions.meta,
  93: keyOptions.meta,
  112: 'F1', 
  113: 'F2', 
  114: 'F3', 
  115: 'F4', 
  116: 'F5', 
  117: 'F6', 
  118: 'F7', 
  119: 'F8', 
  120: 'F9', 
  121: 'F10', 
  122: 'F11', 
  123: 'F12',
  124: 'F13',
  125: 'F14',
  126: 'F15',
  127: 'F16',
  128: 'F17',
  129: 'F18',
  130: 'F19',
  186: ';',
  187: '=',
  188: ',',
  189: '-',
  190: '.',
  192: '`',
  222: "'",
  224: keyOptions.meta,
}

let reverseKeyMap = undefined;

function createReverseKeyMap() {
  if (reverseKeyMap == undefined) {
    reverseKeyMap = {};
    for (const key in keyMap) {
      if (keyMap.hasOwnProperty(key)) {
          reverseKeyMap[keyMap[key]] = parseInt(key);
      }
    }
  }
}

function keyEventToString(keyEvent) {
  let arr = [];

  if (keyEvent.metaKey)  { arr.push(keyOptions.meta); }
  if (keyEvent.ctrlKey)  { arr.push(keyOptions.ctrl); }
  if (keyEvent.altKey)   { arr.push(keyOptions.alt); }
  if (keyEvent.shiftKey) { arr.push(keyOptions.shift); }

  const isModifier = [16, 17, 18, 91, 93, 224].indexOf(keyEvent.keyCode) !== -1;

  if (!isModifier) {
    arr.push(keyMap[keyEvent.keyCode] || String.fromCharCode(keyEvent.keyCode));
  }

  return arr.join(keyOptions.separator);
}

function stringToKeyEvent(str) {
  createReverseKeyMap();

  let keyEvent = {};
  keyEvent.metaKey  = false;
  keyEvent.ctrlKey  = false;
  keyEvent.altKey   = false;
  keyEvent.shiftKey = false;

  let arr = str.split(keyOptions.separator);

  if (arr.length === 0) {
    return undefined;
  }

  // If there is just 1 element then it needs to be the keycode.
  if (arr.length === 1) {
    keyEvent.keyCode = reverseKeyMap[arr[0]] || (arr[0]).charCodeAt(0);
    return keyEvent;
  }

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

  const lastElement = arr[arr.length - 1];
  keyEvent.keyCode = reverseKeyMap[lastElement] || lastElement.charCodeAt(0);

  return keyEvent;
}

export {
  getActiveScene,
  getScene,
  getClassNamesWithGetInstanceFn,
  withClass,
  callMemberFunction,
  keyEventToString,
  stringToKeyEvent,
}
