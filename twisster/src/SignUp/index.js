import React, { Component } from "react";
import { withRouter } from "react-router";
import firebase from "firebase";
import SignUpView from "./SignUpView";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.goLogin = this.goLogin.bind(this);
  }

  handleSignUp = async event => {
    event.preventDefault();
    const { email, username, password } = event.target.elements;
    try {
      //check to see if email, and username is a unique combination
      var username_exists = false;
      await firebase
        .database()
        .ref()
        .once("value", snapshot => {
          var user_email_list = snapshot.child("mapUsernameToEmail").val();
          if (user_email_list != undefined) {
            if (user_email_list[username.value] != undefined) {
              toast("Username already exists");
              username_exists = true;
            }
          }
        });

      if (username_exists == true) {
        return;
      }

      //if email and password are unique, make a new user
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);

      //if successful, add username / email combination to database
      let username_email_combo = {};
      username_email_combo[username.value] = email.value;
      firebase
        .database()
        .ref()
        .child("mapUsernameToEmail")
        .update(username_email_combo);

      //add username / uid combination to database
      let username_uid_combo = {};
      username_uid_combo[username.value] = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref()
        .child("mapUsernameToUID")
        .update(username_uid_combo);

      //add uid / username combination to database
      let uid_username_combo = {};
      uid_username_combo[firebase.auth().currentUser.uid] = username.value;
      firebase
        .database()
        .ref()
        .child("mapUIDtoUsername")
        .update(uid_username_combo);

      //set redirect page
      var actionCodeSettings = {
        url: "https://twistter.firebaseapp.com/login",
        handleCodeInApp: true
      };

      //send verification email
      firebase
        .auth()
        .currentUser.sendEmailVerification(actionCodeSettings)
        .then(function() {
          console.log("sent verification email");
        })
        .catch(function(error) {
          toast(error.message);
        });

      //add timestamp for when they first signed up (used for automatic deletion)
      var date = new Date();
      var timestamp = date.getTime();

      //create a new user from the data and set default fields and arrays
      var database = firebase.database();
      var newUserRef = database
        .ref()
        .child("users")
        .child(firebase.auth().currentUser.uid);
      newUserRef.set({ email: email.value, signupTimestamp: timestamp, picture: "default.jpg" });

      firebase.auth().signOut();

      this.props.history.push("/login");
    } catch (error) {
      toast(error.message);
    }
  };

  goLogin = async event => {
    this.props.history.push({
      pathname: "/login"
    });
  };

  render() {
    return (
      <div className="main-body">
        <SignUpView onSubmit={this.handleSignUp} onClick={this.goLogin} />
      </div>
    );
  }
}

export default withRouter(SignUpContainer);
