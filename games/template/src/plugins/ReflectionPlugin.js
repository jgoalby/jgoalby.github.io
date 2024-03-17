import Constants from '../constants.js';
import BasePlugin from './BasePlugin.js'

export default class ReflectionPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.REFLECTION_KEY, 
      plugin: this, 
      start: true,
      mapping: Constants.PLUGIN_INFO.REFLECTION_PLUGIN,
    }
  }
}

/*someFunc(level) {
  console.log("Func str1: " + this.getNotificationTextColor);
  console.log("Func str2: " + this.getFunctions);
  console.log("Funcs: " + this.getFunctions(this));
  console.log("All funcs: " + this.getFunctions(this, true));
  console.log("Desc: " + this.getFunctions['description']);

  console.log("Own prop names: " + Object.getOwnPropertyNames(this))

  const funks = this.getFunctions(this);

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
}*/

function getFunctions(theObject, getAllFunctions = false) {
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
getFunctions['description'] = "Get all functions of an object. If getAllFunctions is false, only the object's own functions are returned. If getAllFunctions is true, all functions are returned.";

function getFunctionDescription(func) {
  return func['description'];
}
getFunctionDescription['description'] = "Get the description of a function.";

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
  console.log("Func str2: " + getFunctions);
  //console.log("Funcs: " + getFunctions(this));
  //console.log("All funcs: " + getFunctions(this, true));

  console.log("Desc1: " + getFunctions['description']);
  console.log("Desc2: " + getFunctionSource['description']);

  //console.log("Own prop names: " + Object.getOwnPropertyNames(this))

  /*const funks = getFunctions(this);

  funks.map((e) => {
    console.log("Func: " + e + " type: " + (typeof this[e]));
  })*/

  /*let protoB = Object.getPrototypeOf(this);
  console.log("protoB");
  console.log(Object.getOwnPropertyNames(protoB));

  const funks2 = Object.getOwnPropertyNames(protoB);

  funks2.map((e) => {
    console.log("Func2: " + e + " type: " + (typeof this[e]));
  })*/

  const aModule = `
  /**
   * Get the current active scene.
   * 
   * @param {Phaser.Scenes.SceneManager} [sceneManager=undefined] 
   * @returns {Phaser.Scene | undefined} The active scene.
   */
  function getActiveScene(sceneManager = undefined) {
    // This is empty for the most part
    return undefined;
  }

  function getFunctionDescription(func) {
    // Return the description.
    // It is needed.
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
 `;

  // TODO: Need to remember that this can throw an exceptio, so wrap in try catch when doing properly.

  console.log("About to parse with esprima");
  console.log(esprima.parseModule(aModule, { comment: true, tolerant: true, loc: true, range: true, tokens: false, jsx: false}));
  
  console.log("End biggerest ");
}
