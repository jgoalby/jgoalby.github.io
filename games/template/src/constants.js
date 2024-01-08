export default class Constants {
  static get GAME_WIDTH() {
    return 1200;
  }

  static get GAME_HEIGHT() {
    return 650;
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
