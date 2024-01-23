const AUTHOR = 'John Goalby';

export default class Constants {
  static get GAME_CREDITS() {
    return `Created By: ${AUTHOR} \nMade With: Phaser ${Phaser.VERSION}, Javascript ES6\n\n\nLibraries Used...`;
  }

  static get GAME_WIDTH() {
    return window.innerWidth;
  }

  static get GAME_HEIGHT() {
    return window.innerHeight;
  }

  static get GAME_BACKGROUND_COLOR() {
    return '#000';
  }

  static get GAME_TYPE() {
    return Phaser.AUTO;
  }

  static get GAME_PARENT() {
    return 'main';
  }

  static get GAME_TITLE() {
    return 'Game';
  }

  static get ASSETS_PATH() {
    return './src/assets/';
  }
}
