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
  static get BODY_TEXT()                      { return { fontfamily: Styles.BODY_TEXT_FONT, fontSize: Styles.BODY_TEXT_SIZE, color: Styles.BODY_TEXT_COLOR } }
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
  static get HEADING_TEXT()                   { return { fontfamily: Styles.HEADING_TEXT_FONT, fontSize: Styles.HEADING_TEXT_SIZE, color: Styles.HEADING_TEXT_COLOR, } }
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

// Regular events constants.
class Events {
  static get SETTING_CHANGED()           { return 'SETTING_CHANGED'; }
  static get SETTING_ACTION()            { return 'SETTING_ACTION'; }
  static get NOTIFICATION()              { return 'NOTIFICATION'; }
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

  // If you change the name of this, then you should also change it in service-worker.js.
  static get SW_EVENTS() { return ServiceWorkerEvents; }
}
