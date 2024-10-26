import Constants from '../constants.js';

// Phaser specific settings.
var phaserConfig = {
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
    // Global plugins are defined in Plugins.js
    //global: global_plugins,
  },
  parent: Constants.GENERAL.PARENT,
  dom: { createContainer: Constants.GENERAL.CREATE_CONTAINER },
  title: Constants.GENERAL.TITLE,
  version: Constants.GENERAL.VERSION,
};

// General, non-phaser specific settings.
var generalConfig = {
  sendCacheMessages: true,
}

// Firebase specific settings.
var firebaseConfig = {
  apiKey: "AIzaSyDCnBfOg8aHhwLQIFWxde-gwLbTefyHzrU",
  authDomain: "phaser-template.firebaseapp.com",
  projectId: "phaser-template",
  storageBucket: "phaser-template.appspot.com",
  messagingSenderId: "907415004904",
  appId: "1:907415004904:web:3f1181f9a62c51ac6acb5d"
};

export {
  phaserConfig,
  generalConfig,
  firebaseConfig
};
