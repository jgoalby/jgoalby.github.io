import Constants from '../constants.js';

export default {
  type: Constants.GAME_TYPE,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 'black',
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
  }
};
