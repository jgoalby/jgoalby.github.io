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
  static get BACKGROUND_COLOR()          { return '#000'; }
  static get BODY_TEXT_COLOR()           { return '#fff' }
  static get BODY_TEXT_HIGHLIGHT_COLOR() { return '#ff0' }
  static get BODY_TEXT_SIZE()            { return 24 }
  static get HEADING_TEXT_COLOR()        { return '#f00' }
  static get HEADING_TEXT_SIZE()         { return 32 }
  static get HEADING_TEXT()              { return { fontSize: Styles.HEADING_TEXT_SIZE, color: Styles.HEADING_TEXT_COLOR, } }
  static get CHECKBOX_LABEL()            { return { fontSize: Styles.BODY_TEXT_SIZE, color: Styles.BODY_TEXT_COLOR, } }
  static get CHECKBOX_LABEL_HIGHLIGHT()  { return { fontSize: Styles.BODY_TEXT_SIZE, color: Styles.BODY_TEXT_HIGHLIGHT_COLOR, } }
  static get CHECKBOX_INSIDE_SPACE()     { return 10 }
}

// Events constants.
class Events {
  static get SETTING_CHANGED()           { return 'SETTING_CHANGED'; }
};

// Settings types we support.
const SETTINGS_TYPES = {
  boolean: 'boolean',
  string: 'string',
  number: 'number',
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
  static get SETTINGS_TYPES() { return SETTINGS_TYPES; }
}
