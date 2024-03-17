// Master constants.
const TITLE = 'Template';
const VERSION = '0.1'
const AUTHOR = 'John Goalby';

// Cache constant.
const SW_CACHE_NAME = "cache-v1";

// Proxy handler for constants. This gets the defined constants but allows dynamic also.
const constantHandler = { get(obj, prop) { return prop in obj ? obj[prop] : prop; } };

// General constants.
const General = {
  WIDTH:             window.innerWidth,
  HEIGHT:            window.innerHeight,
  TYPE:              Phaser.AUTO,
  PARENT:            'main',
  TITLE:             TITLE,
  VERSION:           VERSION,
  ASSETS_PATH:       './src/assets/',
  CREATE_CONTAINER:  true,
}

// Physics constants.
const Physics = {
  PHYSICS:           'arcade',
  X:                 0,
  Y:                 0,
  DEBUG:             false,
}

// Styles constants for how various elements look.
class Styles {
  static get BACKGROUND_COLOR()               { return '#000000'; }
  static get MAIN_FONT()                      { return 'Arial'; }
  static get BODY_TEXT_FONT()                 { return Styles.MAIN_FONT }
  static get BODY_TEXT_COLOR()                { return '#ffffff' }
  static get BODY_TEXT_SIZE()                 { return 24 }
  static get BODY_TEXT()                      { return { fontFamily: Styles.BODY_TEXT_FONT, fontSize: Styles.BODY_TEXT_SIZE, color: Styles.BODY_TEXT_COLOR } }
  static get BODY_TEXT_HIGHLIGHT_COLOR()      { return '#ffff00' }
  static get BODY_Y_POS()                     { return 90 }
  static get INTRO_TEXT_COLOR()               { return '#ffffff' }
  static get INTRO_TEXT_SIZE()                { return 24 }
  static get HEADING_TEXT_FONT()              { return Styles.MAIN_FONT }
  static get HEADING_TEXT_COLOR()             { return '#ff0000' }
  static get HEADING_TEXT_SIZE()              { return 32 }
  static get HEADING_Y_POS()                  { return 50 }
  static get HEADING_X_ORIGIN()               { return 0.5 }
  static get HEADING_Y_ORIGIN()               { return 0 }
  static get HEADING_TEXT()                   { return { fontFamily: Styles.HEADING_TEXT_FONT, fontSize: Styles.HEADING_TEXT_SIZE, color: Styles.HEADING_TEXT_COLOR, } }
  static get LABEL()                          { return Styles.BODY_TEXT }
  static get CHECKBOX_LABEL()                 { return Styles.BODY_TEXT }
  static get CHECKBOX_LABEL_HIGHLIGHT()       { return { fontSize: Styles.BODY_TEXT_SIZE, color: Styles.BODY_TEXT_HIGHLIGHT_COLOR, } }
  static get CHECKBOX_INSIDE_SPACE()          { return 10 }
  static get BUTTON_TEXT_COLOR()              { return '#ffffff' }
  static get BUTTON_TEXT_SIZE()               { return 24 }
  static get BUTTON_TEXT()                    { return Styles.BODY_TEXT }
  static get INTRO_TEXT()                     { return { fontSize: Styles.INTRO_TEXT_SIZE, color: Styles.INTRO_TEXT_COLOR, } }

  static get INFO_TEXT_COLOR()                { return '#ADD8E6' }
  static get WARN_TEXT_COLOR()                { return '#00ff00' }
  static get ERROR_TEXT_COLOR()               { return '#ff0000' }
  static get EXCEPTION_TEXT_COLOR()           { return '#ff00ff' }
  static get NOTIFICATION_TEXT_INFO()         { return Object.assign(Styles.BODY_TEXT, { color: Styles.INFO_TEXT_COLOR }) }
  static get NOTIFICATION_TEXT_WARN()         { return Object.assign(Styles.BODY_TEXT, { color: Styles.WARN_TEXT_COLOR }) }
  static get NOTIFICATION_TEXT_ERROR()        { return Object.assign(Styles.BODY_TEXT, { color: Styles.ERROR_TEXT_COLOR }) }
  static get NOTIFICATION_TEXT_EXCEPTION()    { return Object.assign(Styles.BODY_TEXT, { color: Styles.EXCEPTION_TEXT_COLOR }) }
}

const NewStyles = {
  "BACKGROUND_COLOR": "#000000",
  "MAIN_FONT": "Arial",
  "BODY_TEXT_FONT": "Arial",
  "BODY_TEXT_COLOR": "#ffffff",
  "BODY_TEXT_SIZE": 24,
  "BODY_TEXT": {
    "fontFamily": "Arial",
    "fontSize": 24,
    "color": "#ffffff"
  },
  "BODY_TEXT_HIGHLIGHT_COLOR": "#ffff00",
  "BODY_Y_POS": 90,
  "INTRO_TEXT_COLOR": "#ffffff",
  "INTRO_TEXT_SIZE": 24,
  "HEADING_TEXT_FONT": "Arial",
  "HEADING_TEXT_COLOR": "#ff0000",
  "HEADING_TEXT_SIZE": 32,
  "HEADING_Y_POS": 50,
  "HEADING_X_ORIGIN": 0.5,
  "HEADING_Y_ORIGIN": 0,
  "HEADING_TEXT": {
    "fontFamily": "Arial",
    "fontSize": 32,
    "color": "#ff0000"
  },
  "LABEL": {
    "fontFamily": "Arial",
    "fontSize": 24,
    "color": "#ffffff"
  },
  "CHECKBOX_LABEL": {
    "fontFamily": "Arial",
    "fontSize": 24,
    "color": "#ffffff"
  },
  "CHECKBOX_LABEL_HIGHLIGHT": {
    "fontSize": 24,
    "color": "#ffff00"
  },
  "CHECKBOX_INSIDE_SPACE": 10,
  "BUTTON_TEXT_COLOR": "#ffffff",
  "BUTTON_TEXT_SIZE": 24,
  "BUTTON_TEXT": {
    "fontFamily": "Arial",
    "fontSize": 24,
    "color": "#ffffff"
  },
  "INTRO_TEXT": {
    "fontSize": 24,
    "color": "#ffffff"
  },
  "INFO_TEXT_COLOR": "#ADD8E6",
  "WARN_TEXT_COLOR": "#00ff00",
  "ERROR_TEXT_COLOR": "#ff0000",
  "EXCEPTION_TEXT_COLOR": "#ff00ff",
  "NOTIFICATION_TEXT_INFO": {
    "fontFamily": "Arial",
    "fontSize": 24,
    "color": "#ADD8E6"
  },
  "NOTIFICATION_TEXT_WARN": {
    "fontFamily": "Arial",
    "fontSize": 24,
    "color": "#00ff00"
  },
  "NOTIFICATION_TEXT_ERROR": {
    "fontFamily": "Arial",
    "fontSize": 24,
    "color": "#ff0000"
  },
  "NOTIFICATION_TEXT_EXCEPTION": {
    "fontFamily": "Arial",
    "fontSize": 24,
    "color": "#ff00ff"
  }
}

// Regular events constants.
const Events = {
  SETTING_CHANGED: 'SETTING_CHANGED',
  SETTING_ACTION:  'SETTING_ACTION',
  NOTIFICATION:    'NOTIFICATION',
  KEYBOARD:        'KEYBOARD',
  ADD_SHORTCUT:    'ADD_SHORTCUT',
  REMOVE_SHORTCUT: 'REMOVE_SHORTCUT',
  CLEAR_CACHE:     'CLEAR_CACHE',
  CACHE_EVENT:     'CACHE_EVENT',
};

// Notification levels.
const NotificationLevels = {
  INFO:            'INFO',
  WARN:            'WARN',
  ERROR:           'ERROR',
  EXCEPTION:       'EXCEPTION',
}

// Service Worker events constants. If you change anything in there then you need to also change
// them in the service-worker.js code as it cannot import this file. Luckily, this doesn't change often.
const ServiceWorkerEvents = {
  INIT:            'INIT',
  CONFIG:          'CONFIG',
  CLEAR_CACHE:     'CLEAR_CACHE',
  CACHE_EVENT:     'CACHE_EVENT',
  CACHE_CLEARED:   'CACHE_CLEARED',
  CACHE_MESSAGE:   'CACHE_MESSAGE',
};

// Settings types we support.
const SettingsTypes = {
  boolean:         'boolean',
  string:          'string',
  number:          'number',
  range:           'range',
  function:        'function',
  paste:           'paste',
};

// The plugin identifiers. The types are defined for the static definitions in the game.d.ts file.
// Proxy for plugin info allowing dynamic creation.
const PluginInfoProxy = new Proxy({}, constantHandler);

// The scene identifiers. The types are defined for the static definitions in the game.d.ts file.
// This is the proxy for scenes allowing dynamic creation.
const ScenesProxy = new Proxy({}, constantHandler);

// The exported class that contains all of the constants.
export default class Constants {
  static get CREDITS() {
    // Fully compiled credits string.
    return `${TITLE} : ${VERSION}\nCreated By: ${AUTHOR}\nMade With: Phaser ${Phaser.VERSION}, Javascript ES6`;
  }

  // Accessors for the constants.
  static get GENERAL() { return General; }
  static get PHYSICS() { return Physics; }
  static get STYLES() { return Styles; }
  static get EVENTS() { return Events; }
  static get NOTIFICATION_LEVELS() { return NotificationLevels; }
  static get SETTINGS_TYPES() { return SettingsTypes; }

  /**
   * Access the plugin info constants.
   * @returns {PluginInfoProxy} The plugin constants.
   */
  static get PLUGIN_INFO() { return PluginInfoProxy; }

  /**
   * Access the scenes constants.
   * @returns {ScenesProxy} The scenes constants.
   */
  static get SCENES() { return ScenesProxy; }

  // If you change the name of these, then you should also change them in service-worker.js.
  static get SW_EVENTS() { return ServiceWorkerEvents; }
  static get CACHE_NAME() { return SW_CACHE_NAME };
}
