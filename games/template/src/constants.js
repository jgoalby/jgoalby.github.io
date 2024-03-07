import { doit } from './styles.js';

doit();

// Master constants.
const TITLE = 'Template';
const VERSION = '0.1'
const AUTHOR = 'John Goalby';

// General constants.
class General {
  static get WIDTH()                     { return window.innerWidth; }
  static get HEIGHT()                    { return window.innerHeight; }
  static get TYPE()                      { return Phaser.AUTO; }
  static get PARENT()                    { return 'main'; }
  static get TITLE()                     { return TITLE; }
  static get VERSION()                   { return VERSION; }
  static get ASSETS_PATH()               { return './src/assets/'; }
  static get CREATE_CONTAINER()          { return true; }
}

// Physics constants.
class Physics {
  static get PHYSICS()                   { return 'arcade'; }
  static get X()                         { return 0; }
  static get Y()                         { return 0; }
  static get DEBUG()                     { return false; }
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
class Events {
  static get SETTING_CHANGED()           { return 'SETTING_CHANGED'; }
  static get SETTING_ACTION()            { return 'SETTING_ACTION'; }
  static get NOTIFICATION()              { return 'NOTIFICATION'; }
  static get KEYBOARD()                  { return 'KEYBOARD'; }
  static get CLEAR_CACHE()               { return 'CLEAR_CACHE'; }
};

// Notification levels.
class NotificationLevels {
  static get INFO()                      { return 'INFO'; }
  static get WARN()                      { return 'WARN'; }
  static get ERROR()                     { return 'ERROR'; }
  static get EXCEPTION()                 { return 'EXCEPTION'; }
};

// Service Worker events constants. If you change anything in there then you need to also change
// them in the service-worker.js code as it cannot import this file. Luckily, this doesn't change often.
class ServiceWorkerEvents {
  static get INIT()                      { return 'INIT'; }
  static get CONFIG()                    { return 'CONFIG'; }
  static get CLEAR_CACHE()               { return 'CLEAR_CACHE'; }
  static get CACHE_EVENT()               { return 'CACHE_EVENT'; }
  static get CACHE_CLEARED()             { return 'CACHE_CLEARED'; }
  static get CACHE_MESSAGE()             { return 'CACHE_MESSAGE'; }
};

// Settings types we support.
const SETTINGS_TYPES = {
  boolean: 'boolean',
  string: 'string',
  number: 'number',
  range: 'range',
  function: 'function',
};

// Plugin keys and mappings as they are used in multiple places.
const PLUGIN_INFO = {
  INIT_SETUP_KEY: 'InitSetupPlugin',
  INIT_SETUP_MAPPING: 'initsetup',
  EVENT_KEY: 'EventPlugin',
  EVENT_MAPPING: 'customevent',
  SETTINGS_KEY: 'SettingsPlugin',
  SETTINGS_MAPPING: 'settings',
  SERVICE_WORKER_KEY: 'ServiceWorkerPlugin',
  SERVICE_WORKER_MAPPING: 'serviceworker',
  WINDOW_KEY: 'WindowPlugin',
  WINDOW_MAPPING: 'windowplugin',
  CONSOLE_KEY: 'ConsolePlugin',
  CONSOLE_MAPPING: 'console',
  NOTIFICATION_KEY: 'NotificationPlugin',
  NOTIFICATION_MAPPING: 'notification',
  INTROSPECT_KEY: 'IntrospectPlugin',
  INTROSPECT_MAPPING: 'introspect',
  CACHE_KEY: 'CachePlugin',
  CACHE_MAPPING: 'cache',
  AUDIO_KEY: 'AudioPlugin',
  AUDIO_MAPPING: 'audio',
  FIREBASE_KEY: 'FirebasePlugin',
  FIREBASE_MAPPING: 'firebase'
}

// TODO: Make a const for plugin names.
// TODO: Change the above classes to variables when just return strings?

// The exported class that contains all of the constants.
export default class Constants {
  static getCredits() {
    // Fully compiled credits string.
    return `${TITLE} : ${VERSION}\nCreated By: ${AUTHOR}\nMade With: Phaser ${Phaser.VERSION}, Javascript ES6`;
  }

  static get GENERAL() { return General; }
  static get PHYSICS() { return Physics; }
  static get STYLES() { return Styles; }
  static get EVENTS() { return Events; }
  static get NOTIFICATION_LEVELS() { return NotificationLevels; }
  static get SETTINGS_TYPES() { return SETTINGS_TYPES; }
  static get PLUGIN_INFO() { return PLUGIN_INFO; }

  // If you change the name of this, then you should also change it in service-worker.js.
  static get SW_EVENTS() { return ServiceWorkerEvents; }
}
