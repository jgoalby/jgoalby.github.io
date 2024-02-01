import Constants from '../constants.js';
import FirebasePlugin from '../plugins/FirebasePlugin.js';

var config = {
  type: Constants.GENERAL.TYPE,
  width: Constants.GENERAL.WIDTH,
  height: Constants.GENERAL.HEIGHT,
  backgroundColor: Constants.STYLES.BACKGROUND_COLOR,
  physics: {
    default: Constants.PHYSICS.PHYSICS,
    arcade: {
      gravity: { x: Constants.PHYSICS.X, y: Constants.PHYSICS.Y },
      debug: Constants.PHYSICS.DEBUG,
    },
  },
  plugins: {
    global: [
      FirebasePlugin.options,
    ],
  },
  parent: Constants.GENERAL.PARENT,
  dom: { createContainer: Constants.GENERAL.CREATE_CONTAINER },
  title: Constants.GENERAL.TITLE,
  version: Constants.GENERAL.VERSION
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
