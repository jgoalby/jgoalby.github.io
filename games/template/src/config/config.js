import Constants from '../constants.js';
import FirebasePlugin from '../plugins/FirebasePlugin.js';

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
  plugins: {
    global: [
      { 
        key: 'FirebasePlugin', 
        plugin: FirebasePlugin, 
        start: true,
        mapping: 'firebase',
      },
    ],
  },
  parent: Constants.PARENT,
  dom: {
    createContainer: true,
  },
  title: Constants.TITLE,
  version: Constants.VERSION
};
