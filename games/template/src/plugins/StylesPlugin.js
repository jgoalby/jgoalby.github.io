import Constants from '../constants.js';
import BasePlugin from './BasePlugin.js'

export default class StylesPlugin extends BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);
  }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.STYLES_KEY, 
      plugin: this, 
      start: true,
      mapping: Constants.PLUGIN_INFO.STYLES_PLUGIN,
    }
  }
}

const isUndefined = o => typeof o === 'undefined'

const nvl = (o, valueIfUndefined) => isUndefined(o) ? valueIfUndefined : o

// gets a deep value from an object, given a 'path'.
const getDeepValue = (obj, path) =>
  path
    .replace(/\[|\]\.?/g, '.')
    .split('.')
    .filter(s => s)
    .reduce((acc, val) => acc && acc[val], obj)

// given a string, resolves all template variables.
const oldresolveTemplate = (str, variables) => {
  //return str.replace(/\$\{([^\}]+)\}/g, (m, g1) => nvl(getDeepValue(variables, g1), m))
  return str.replace(/\[\[([^\}]+)\]\]/g, (m, g1) => nvl(getDeepValue(variables, g1), m))
}

/*
// evalutes with a provided 'this' context.
const evalWithContext = (string, context) => function(s){
  return eval(s);
}.call(context, string)

// given a string, resolves all template variables.
const resolveTemplate2 = function(str, variables) {
  return str.replace(/\$\{([^\}]+)\}/g, (m, g1) => evalWithContext(g1, variables))
}
*/

// TODO: Need to implement error checking for the JSON and print something useful. Missing commas for instance.
//       What to do if the styles fail for some reason? Have a default I presume.

const StylesJSON = `{
  // Comments like these are allowed in this file as they will be stripped out before parsing.
  // All values must be in double quotes.
  // All keys must be in double quotes.
  // Case sensitive.
  // Values within double square brackets are resolved as variables.
  // Order is important. Keys will be processed from top to bottom.
  // If you have duplicate keys, JSON will automatically take the last one defined as the only value.
  // So, it is best if the keys are unique to prevent confusion.
  // Values can reference previously defined values.
  // Cannot replace an object. Only strings.
  // Key names are case sensitive in Phaser. fontFamily is correct, fontfamily is not.

  // Base styles.
  "BASE_BACKGROUND_COLOR": "#001122",
  
  // Main styles.
  "BACKGROUND_COLOR": "[[BASE_BACKGROUND_COLOR]]",
  "MAIN_FONT": "Arial",
  "BODY_TEXT_FONT": "[[MAIN_FONT]]",
  "BODY_TEXT_COLOR": "#ffffff",
  "BODY_TEXT_SIZE": "24",
  "BODY_TEXT": {
    "fontFamily": "[[MAIN_FONT]]",
    "fontSize": "[[BODY_TEXT_SIZE]]",
    "color": "[[BODY_TEXT_COLOR]]"
  },
  "HEADING_TEXT": {
    "fontFamily": "[[BODY_TEXT.fontFamily]]",
    "fontSize": "[[BODY_TEXT.fontSize]]",
    "color": "#123123"
  }
}`

// TODO: can I do something like this...
// 
// "fontSize": "[[BODY_TEXT.fontSize]] + 10",

const resolveTemplate = (source, variables) => {
  // For all of the keys in source object, replace the value with value from variables
  for (var key in source) {
    console.log("1:" + key);
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'string') {
        const retVal = oldresolveTemplate(source[key], variables);
        console.log("2:" + key + " " + retVal);
        source[key] = retVal;
      } else {
        source[key] = resolveTemplate(source[key], variables);
      }
    }
  }

  return source;
}

function doit() {
  // Remove the comment lines from the StylesJSON
  const cleanedStylesJSON = StylesJSON.replace(/\/\/.*/g, '');

  console.log(cleanedStylesJSON);

  let styles = JSON.parse(cleanedStylesJSON);

  console.log("resolve template output");
  console.log(resolveTemplate(styles, styles))

  console.log(styles);

}
