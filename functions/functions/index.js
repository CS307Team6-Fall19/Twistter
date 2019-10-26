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
                admin.auth().deleteUser(user.uid).then(function() {
                    console.log("deleted user " + user.email + " because unverified");
                });
            }
        });
    });

    return 0;
})