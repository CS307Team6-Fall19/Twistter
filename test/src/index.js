import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

var element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!');
ReactDOM.render(element, document.getElementById('root'));
serviceWorker.unregister();

//<script src="https://www.gstatic.com/firebasejs/6.4.2/firebase-app.js"></script>
//<script src="https://www.gstatic.com/firebasejs/6.4.2/firebase-auth.js"></script>
//<script src="https://www.gstatic.com/firebasejs/3.1.0/firebase-database.js"></script>

var firebaseConfig = {
    apiKey: "AIzaSyBz9SOr8DjfgATYDORi2l185jmlbzKLsKk",
    authDomain: "twistter.firebaseapp.com",
    databaseURL: "https://twistter.firebaseio.com",
    projectId: "twistter",
    storageBucket: "twistter.appspot.com",
    messagingSenderId: "71618548828",
    appId: "1:71618548828:web:b37e4c8670f32606"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
//db.settings( { timestampsInSnapshots: true });

var ref = db.ref();

ref.on("value", function(snapshot) {
console.log(snapshot.val());
}, function (error) {
console.log("Error: " + error.code);
});

document.getElementById("signup").addEventListener("click", function() {
    var email = document.getElementById("emailsignup").value;
    var password = document.getElementById("passwordsignup").value;
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log("created user");
        console.log(cred.user);
        cred.user.sendEmailVerification().then(function() {
            console.log("email verification sent");
        });
    })
});

document.getElementById("logout").addEventListener("click", function() {
    if (auth.currentUser) {
        auth.signOut().then(() => {
            console.log("user logged out");
        });
    } else {
        console.log("no user is currently logged in");
    }
});

document.getElementById("signin").addEventListener("click", function() {
    var email = document.getElementById("emaillogin").value;
    var password = document.getElementById("passwordlogin").value;
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log("user logged in");
        console.log(cred.user);
        console.log(cred.user.emailVerified);
    })
});