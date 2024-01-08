import Constants from '../constants.js';

export default {
  type: Constants.GAME_TYPE,
  width: Constants.GAME_WIDTH,
  height: Constants.GAME_HEIGHT,
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  scale: {
    zoom: 1,
  },

  parent: Constants.GAME_PARENT,
  dom: {
    createContainer: true,
  },
};
