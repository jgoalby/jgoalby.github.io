/**
 * Get the current active scene.
 * 
 * @param {Phaser.Scenes.SceneManager} [sceneManager=undefined] 
 * @returns {Phaser.Scene | undefined} The active scene.
 */
function getActiveScene(sceneManager = undefined) {
  // Figure out which scene manager to use based on if one was passed in or not.
  const sceneMgr = sceneManager ? sceneManager : window.game.scene;

  // Get the active scenes in reverse.
  const allActiveScenes = sceneMgr.getScenes(true, true);

  if (allActiveScenes.length == 0) {
    // Nothing to choose.
    return undefined;
  } else if (allActiveScenes.length == 1) {
    // There's a chosen one.
    return allActiveScenes[0];
  } else {
    // Go through all of the active scenes.
    for (let i = 0; i < allActiveScenes.length; i++) {
      // If this one is visible, let's return it.
      if (allActiveScenes[i].scene.isVisible()) {
        return allActiveScenes[i];
      }
    }

    // Just return the first one (which is the last one) even though it isn't visible?
    return allActiveScenes[0];
  }
}

function getFunctions(theObject, getAllFunctions = false) {
  this.getFunctions['description'] = "Get all functions of an object. If getAllFunctions is false, only the object's own functions are returned. If getAllFunctions is true, all functions are returned.";

  // Holder for the properties we capture as we go down prototype chain.
  const props = [];

  // Start with the object we are given. curObj will change as we go down the prototype chain.
  let curObj = theObject;

  // Go down the prototype chain.
  while (curObj = Object.getPrototypeOf(curObj)) {
    // Get all of the property names on the given current object.
    props.push(...Object.getOwnPropertyNames(curObj));

    // If we are only getting the object's own functions, then we are done. Otherwise keep going.
    if (!getAllFunctions) break;
  }

  // We not have a list of property names. Let's sort them and filter out the duplicates and non-functions.
  return props.sort().filter((e, i, arr) => { 
    if (e != arr[i+1] && typeof theObject[e] == 'function') return true;
  })
}

function getFunctionDescription(func) {
  this.getFunctionDescription['description'] = "Get the description of a function.";

  return func['description'];
}

/**
 * Get the source of a function.
 * 
 * @param {Function} func The function to get the source of.
 */
function getFunctionSource(func) {
  return func.toString();
}

function doSomeTests() {
  console.log("Start biggerest ");
  console.log("Func str2: " + this.getFunctions);
  console.log("Funcs: " + getFunctions(this));
  console.log("All funcs: " + getFunctions(this, true));

  console.log("Desc1: " + getFunctions['description']);
  console.log("Desc2: " + getFunctionSource['description']);

  console.log("Own prop names: " + Object.getOwnPropertyNames(this))

  const funks = getFunctions(this);

  funks.map((e) => {
    console.log("Func: " + e + " type: " + (typeof this[e]));
  })

  let protoB = Object.getPrototypeOf(this);
  console.log("protoB");
  console.log(Object.getOwnPropertyNames(protoB));

  const funks2 = Object.getOwnPropertyNames(protoB);

  funks2.map((e) => {
    console.log("Func2: " + e + " type: " + (typeof this[e]));
  })

  console.log("About to parse with esprima");
  console.log(esprima.parseModule('import { sqrt } from "math.js"'));
}

export {
  getActiveScene,
  getFunctions,
  getFunctionDescription,
  getFunctionSource,
  doSomeTests
}
