import { initializeApp } from '..//lib/firebase/firebase-app.js';

const firebaseConfig = {
    apiKey: "AIzaSyDCnBfOg8aHhwLQIFWxde-gwLbTefyHzrU",
    authDomain: "phaser-template.firebaseapp.com",
    projectId: "phaser-template",
    storageBucket: "phaser-template.appspot.com",
    messagingSenderId: "907415004904",
    appId: "1:907415004904:web:3f1181f9a62c51ac6acb5d"
};

export default class FirebasePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
        console.log("In firebase plugin constructor");

        const firebase = initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user)
            if (user) {
                //You're logged in!
            } else {
                //You're logged out.
            }
        })
        
        firebase.auth().signInAnonymously().catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode, errorMessage);
        });    
    }
}
