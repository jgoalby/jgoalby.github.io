import Constants from '../constants.js';
//import { firebase } from '../lib/firebase/firebase-app.js';
//import { initializeApp } from '../lib/firebase/firebase-app.js';
//import { getAuth, signInAnonymously, onAuthStateChanged } from '../lib/firebase/firebase-auth.js';
//import { getDatabase } from '../lib/firebase/firebase-database.js';
//import { signInAnonymously } from '../lib/firebase/firebase-auth-compat.js'

import { firebaseConfig } from '../config/config.js';

// TODO: Change the base plugin

export default class FirebasePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    const app = window.firebase.default.initializeApp(firebaseConfig);
    //const app = initializeApp(firebaseConfig);

    //console.log(app);

    const auth = app.auth();
    //console.log(auth);

    const db = app.database();
    //console.log(db);

    //console.log("FirebasePlugin After initializeApp");

    auth.onAuthStateChanged((user) => {
      //console.log("User state changed: ", user)
      if (user) {
        //console.log("You're logged in");
      } else {
        //console.log("You're logged out");
      }
    })

    auth.signInAnonymously().then(() => {
      //console.log("Signed in");
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      //console.log(errorCode, errorMessage);
    });
  }

  /**
   * External service plugin, so provide the version of firebase.
   * 
   * @returns {string | undefined} The version of the plugin.
   */
  getVersion() { return window.firebase.default.SDK_VERSION; }

  static get options() {
    return { 
      key: Constants.PLUGIN_INFO.FIREBASE_KEY,
      plugin: this,
      start: true,
      mapping: Constants.PLUGIN_INFO.FIREBASE_PLUGIN,
    }
  }
}
