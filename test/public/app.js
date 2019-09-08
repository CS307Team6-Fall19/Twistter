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