import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../base";

import SignUpView from "./SignUpView";

class SignUpContainer extends Component {
  
  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const user = await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);

        //set redirect page
        var actionCodeSettings = {
          url: 'http://localhost:3000/login',
          handleCodeInApp: true
        };

        //send verification email
        app.auth().currentUser.sendEmailVerification(actionCodeSettings)
        .then(function() {
          console.log("sent verification email");
        })
        .catch(function(error) {
          alert(error);
        });

        //store user email into database and create empty followedTopics list
        var database = app.database();
        var newUserRef = database.ref().child("users").child(app.auth().currentUser.uid);
        newUserRef.set({'email' : email.value, 'followedTopics' : []});

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