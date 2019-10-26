import firebase from "firebase";

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: twistter.appspot.com,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    
});

export default app;