import Constants from '../constants.js';

export default {
  type: Constants.TYPE,
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
  parent: Constants.PARENT,
  dom: {
    createContainer: true,
  },
  title: Constants.TITLE,
  version: Constants.VERSION
};
