import Constants from '../constants.js';

const MAX_SIZE_WIDTH_SCREEN = 1920
const MAX_SIZE_HEIGHT_SCREEN = 1080
const MIN_SIZE_WIDTH_SCREEN = 480
const MIN_SIZE_HEIGHT_SCREEN = 270
const SIZE_WIDTH_SCREEN = 1920
const SIZE_HEIGHT_SCREEN = 1080

export default {
  type: Constants.GAME_TYPE,
  //width: Constants.GAME_WIDTH,
  //height: Constants.GAME_HEIGHT,
  backgroundColor: 'black',
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autocenter: Phaser.Scale.CENTER_BOTH,
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  /*scale: {
    zoom: 1,
  },*/
  parent: Constants.GAME_PARENT,
  dom: {
    createContainer: true,
  },
};
