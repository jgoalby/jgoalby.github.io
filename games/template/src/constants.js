const TITLE = 'Template';
const VERSION = '0.1'
const AUTHOR = 'John Goalby';

export default class Constants {
  static getCredits(game) {
    const firebasePlugin = game.plugins.get('FirebasePlugin');
    console.log(firebasePlugin);
    if (firebasePlugin) {
      const firebaseVersion = firebasePlugin.getVersion();
      console.log(firebaseVersion);
    } else {
      console.log("No firebase plugin");
    }

    const plugins = game.plugins.plugins;
    console.log("There are " + plugins.length + " plugins");

    for (let i = 0; i < plugins.length; i++) {
      console.log(plugins[i]);
      if (plugins[i].getVersion) {
        console.log("Key is:");
        console.log(plugins[i].key);
        console.log("Version is:");
        console.log(plugins[i].getVersion());
      }
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
