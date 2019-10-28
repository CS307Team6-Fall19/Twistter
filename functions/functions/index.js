const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const auth = admin.auth();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.runeveryminute =
functions.pubsub.schedule('every 1 minutes').onRun((context) => {
    auth.listUsers().then((userRecords) => {
        userRecords.users.forEach((user) => {
            if (!user.emailVerified) {

                ref = admin.database().ref();
                ref.once('value').then((snapshot) => {
                    var mapUIDtoUsername = snapshot.child("mapUIDtoUsername").val();
                    var username = mapUIDtoUsername[user.uid];
                    admin.database().ref().child("mapUIDtoUsername").child(user.uid).remove();
                    admin.database().ref().child("mapUsernameToEmail").child(username).remove();
                    admin.database().ref().child("mapUsernameToUID").child(username).remove();
                    admin.database().ref().child("users").child(user.uid).remove();

                    admin.auth().deleteUser(user.uid).then(function() {
                        console.log("deleted user " + user.email + " because unverified");
                    });
                });
            }
        });
    });

    return 0;
})