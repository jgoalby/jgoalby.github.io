const TITLE = 'Template';
const VERSION = '0.1'
const AUTHOR = 'John Goalby';

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

  static get WIDTH() {              return window.innerWidth; }
  static get HEIGHT() {             return window.innerHeight; }

  static get BACKGROUND_COLOR() {   return '#000'; }

  static get TYPE() {               return Phaser.AUTO; }

  static get PARENT() {             return 'main'; }

  static get TITLE() {              return TITLE; }
  static get VERSION() {            return VERSION; }

  static get ASSETS_PATH() {        return './src/assets/'; }
}
