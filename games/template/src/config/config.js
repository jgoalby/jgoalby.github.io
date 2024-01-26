import Constants from '../constants.js';
import FirebasePlugin from '../plugins/FirebasePlugin.js';

var config = {
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

var firebaseConfig = {
  apiKey: "AIzaSyDCnBfOg8aHhwLQIFWxde-gwLbTefyHzrU",
  authDomain: "phaser-template.firebaseapp.com",
  projectId: "phaser-template",
  storageBucket: "phaser-template.appspot.com",
  messagingSenderId: "907415004904",
  appId: "1:907415004904:web:3f1181f9a62c51ac6acb5d"
};

export {
  config,
  firebaseConfig
};
