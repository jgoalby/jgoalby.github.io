import Constants from '../constants.js';

const MAX_SIZE_WIDTH_SCREEN = 1200
const MAX_SIZE_HEIGHT_SCREEN = 650
const MIN_SIZE_WIDTH_SCREEN = 600
const MIN_SIZE_HEIGHT_SCREEN = 325
const SIZE_WIDTH_SCREEN = 1920
const SIZE_HEIGHT_SCREEN = 1080

export default {
  type: Constants.GAME_TYPE,
  width: 1200,
  height: 650,
  backgroundColor: 'black',
  /*scale: {
    //width: 1200,
    //height: 650,
    mode: Phaser.Scale.FIT,
    //autocenter: Phaser.Scale.CENTER_BOTH,
    //parent: Constants.GAME_PARENT,
    /*min: {
      width: 1200,
      height: 650
    },
    max: {
      width: 1600,
      height: 1200
    },
    //zoom: 1,
  },*/
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
