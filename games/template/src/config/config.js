import Constants from '../constants.js';

const MAX_SIZE_WIDTH_SCREEN = 1920
const MAX_SIZE_HEIGHT_SCREEN = 1080
const MIN_SIZE_WIDTH_SCREEN = 480
const MIN_SIZE_HEIGHT_SCREEN = 270
const SIZE_WIDTH_SCREEN = 1920
const SIZE_HEIGHT_SCREEN = 1080

export default {
  type: Constants.GAME_TYPE,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 'black',
  scale: {
    mode: Phaser.Scale.RESIZE,
    autocenter: Phaser.Scale.CENTER_BOTH,
    parent: Constants.GAME_PARENT,
    //width: SIZE_WIDTH_SCREEN,
    //height: SIZE_HEIGHT_SCREEN,
    min: {
      width: MIN_SIZE_WIDTH_SCREEN,
      height: MIN_SIZE_HEIGHT_SCREEN
    },
    max: {
      width: MAX_SIZE_WIDTH_SCREEN,
      height: MAX_SIZE_HEIGHT_SCREEN
    },
    zoom: 1,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  parent: Constants.GAME_PARENT,
  dom: {
    createContainer: true,
  },
};
