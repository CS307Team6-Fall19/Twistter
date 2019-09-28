import React, { Component } from "react";
import { withRouter } from "react-router";
import firebase from "firebase";

import SignUpView from "./SignUpView";

class SignUpContainer extends Component {
  
  handleSignUp = async event => {
    event.preventDefault();
    const { email, username, password } = event.target.elements;
    try {

      //check to see if email, and username is a unique combination
      var username_exists = false;
      await firebase.database().ref().once('value', (snapshot) => {
        var snap = snapshot.val();
        var user_email_list = snapshot.child('mapUsernameToEmail').val();
        if (user_email_list[username.value] != undefined) {
          alert('Username already exists');
          username_exists = true;
        }
      });

      if (username_exists == true) {
        return;
      }

      //if email and password are unique, make a new user
      const user = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);

      //if successful, add username / email combination to database
      let username_email_combo = {};
      username_email_combo[username.value] = email.value;
      firebase.database().ref().child('mapUsernameToEmail').update(username_email_combo);

      //set redirect page
      var actionCodeSettings = {
        url: 'http://localhost:3000/login',
        handleCodeInApp: true
      };

      //send verification email
      firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
      .then(function() {
        console.log("sent verification email");
      })
      .catch(function(error) {
        alert(error);
      });

      //create a new user from the data and set default fields and arrays
      var database = firebase.database();
      var newUserRef = database.ref().child("users").child(firebase.auth().currentUser.uid);
      newUserRef.set({'email' : email.value, 'followedTopics' : ['topic1']});

      this.props.history.push("/login");
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return <SignUpView onSubmit={this.handleSignUp} />;
  }
}

export default withRouter(SignUpContainer);