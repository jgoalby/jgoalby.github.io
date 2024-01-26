const TITLE = 'Template';
const VERSION = '0.1'
const AUTHOR = 'John Goalby';

export default class Constants {
  static getCredits(game) {
    const firebasePlugin = game.plugins.get('firebase');
    if (firebasePlugin) {
      const firebaseVersion = game.plugins.get('firebase').getVersion();
      console.log(firebaseVersion);
    } else {
      console.log("No firebase plugin");
    }
    return `${TITLE} : ${VERSION}\nCreated By: ${AUTHOR}\nMade With: Phaser ${Phaser.VERSION}, Javascript ES6\n\n\nLibraries Used...`;
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
    return TITLE;
  }

  static get VERSION() {
    return VERSION;
  }

  static get ASSETS_PATH() {
    return './src/assets/';
  }
}
