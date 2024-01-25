const AUTHOR = 'John Goalby';
const VERSION = '0.1'

export default class Constants {
  static get CREDITS() {
    return `Created By: ${AUTHOR} \nMade With: Phaser ${Phaser.VERSION}, Javascript ES6\n\n\nLibraries Used...`;
  }

  static get WIDTH() {
    return window.innerWidth;
  }

  static get HEIGHT() {
    return window.innerHeight;
  }

  static get BACKGROUND_COLOR() {
    return '#000';
  }

  static get TYPE() {
    return Phaser.AUTO;
  }

  static get PARENT() {
    return 'main';
  }

  static get TITLE() {
    return 'Template';
  }

  static get VERSION() {
    return VERSION;
  }

  static get ASSETS_PATH() {
    return './src/assets/';
  }
}
