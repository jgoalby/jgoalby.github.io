import { initializeApp } from '..//lib/firebase/firebase-app.js';
import { getAuth, signInAnonymously, onAuthStateChanged } from '..//lib/firebase/firebase-auth.js';

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

        const app = initializeApp(firebaseConfig);

        console.log(app);

        // delay for 3 seconds
        setTimeout(() => {
            const auth = getAuth(app);
            console.log(auth);
        } , 3000);


        //const db = app.firestore();
        //const auth = app.auth;

        console.log("After initializeApp");

        /*auth.onAuthStateChanged((user) => {
            console.log(user)
            if (user) {
                //You're logged in!
            } else {
                //You're logged out.
            }
        })*/

        /*signInAnonymously(auth).then(() => {
            console.log("Signed in");
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode, errorMessage);
        });*/
    }
}