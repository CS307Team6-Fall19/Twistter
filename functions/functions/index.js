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
                    try {
                        var mapUIDtoUsername = snapshot.child("mapUIDtoUsername").val();
                        var username = mapUIDtoUsername[user.uid];
                    } catch (e) {
                        console.log("could not fetch username from mapUIDtoUsername");
                    }

                    var date = new Date();
                    var currTimestamp = date.getTime();
                    var diff = snapshot.child("users").child(user.uid).child("signupTimestamp").val() - currTimestamp;
                    //delete account if not activated within one minute
                    if (Math.abs(diff)/1000 > 60) {
                        try {
                            admin.database().ref().child("mapUIDtoUsername").child(user.uid).remove();
                        } catch (e) {
                            console.log("could not delete " + username + " from mapUIDtoUsername");
                        }

                        try {
                            admin.database().ref().child("mapUsernameToEmail").child(username).remove();
                        } catch (e) {
                            console.log("could not delete " + username + " from mapUsernameToEmail");
                        }

                        try {
                            admin.database().ref().child("mapUsernameToUID").child(username).remove();
                        } catch (e) {
                            console.log("could not delete " + username + " from mapUsernameToUID");
                        }

                        try {
                            admin.database().ref().child("users").child(user.uid).remove();
                        } catch (e) {
                            console.log("could not delete " + username + " from users");
                        }

                        try {
                            admin.auth().deleteUser(user.uid).then(function() {
                                console.log("deleted user " + user.email + " because unverified");
                            });
                        } catch (e) {
                            console.log("could not delete " + username + " from authentication");
                        }
                    }
                });
            }
        });
    });

    return 0;
})