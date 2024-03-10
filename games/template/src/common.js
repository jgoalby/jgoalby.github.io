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

export {
  getActiveScene,
  getScene,
  getClassNamesWithGetInstanceFn,
  withClass,
  callMemberFunction,
}
