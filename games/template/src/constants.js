const TITLE = 'Template';
const VERSION = '0.1'
const AUTHOR = 'John Goalby';

class General {
  static get WIDTH()                 { return window.innerWidth; }
  static get HEIGHT()                { return window.innerHeight; }
  static get TYPE()                  { return Phaser.AUTO; }
  static get PARENT()                { return 'main'; }
  static get TITLE()                 { return TITLE; }
  static get VERSION()               { return VERSION; }
  static get ASSETS_PATH()           { return './src/assets/'; }
  static get CREATE_CONTAINER()      { return true; }
}

class Physics {
  static get PHYSICS()               { return 'arcade'; }
  static get X()                     { return 0; }
  static get Y()                     { return 0; }
  static get DEBUG()                 { return false; }
}

class Styles {
  static get BACKGROUND_COLOR()      { return '#000'; }
  static get BODY_TEXT_COLOR()       { return '#fff' }
  static get BODY_TEXT_SIZE()        { return 24 }
  static get HEADING_TEXT_COLOR()    { return '#f00' }
  static get HEADING_TEXT_SIZE()     { return 32 }
  static get HEADING_TEXT()          { return { fontSize: Styles.HEADING_TEXT_SIZE, color: Styles.HEADING_TEXT_COLOR, } }
  static get CHECKBOX_LABEL()        { return { fontSize: Styles.BODY_TEXT_SIZE, color: Styles.BODY_TEXT_COLOR, } }
  static get CHECKBOX_INSIDE_SPACE() { return 10 }
}

export default class Constants {
  static getCredits(game) {
    var pluginsList = "";
    const plugins = game.plugins.plugins;

    if (plugins) {
      for (let i = 0; i < plugins.length; i++) {
        const pluginKey = plugins[i].key;
        const curPlugin = plugins[i].plugin;
  
        if (curPlugin.getVersion) {
          pluginsList += `${pluginKey} : ${curPlugin.getVersion()}\n`;
        }
      }
    }

    return `${TITLE} : ${VERSION}\nCreated By: ${AUTHOR}\nMade With: Phaser ${Phaser.VERSION}, Javascript ES6\n\n\nPlugins:\n\n\n${pluginsList}\n\nLibraries:\n\n\n`;
  }

  static get GENERAL() { return General; }
  static get PHYSICS() { return Physics; }
  static get STYLES() { return Styles; }
}
