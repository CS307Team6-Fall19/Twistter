import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../base";
import TopBarLoginSignup from "../TopBarLoginSignup";

import LogInView from "./LogInView";
import firebase from "firebase";

import { toast } from 'react-toastify';
// goLogIn = async event => {

//   this.props.history.push({
//     pathname: "/login"
//   });
// };

class LogInContainer extends Component {
  constructor(props) {
    super(props);

    this.handleLogIn = this.handleLogIn.bind(this);
    this.goSignUp = this.goSignUp.bind(this);
  }

  handleLogIn = async event => {

    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      var user_exists = true;
      var username_or_email;
      await app
        .database()
        .ref()
        .once("value", snapshot => {
          var user_email_list = snapshot.child("mapUsernameToEmail").val();
          if (email.value.includes("@") != true) {
            if (user_email_list[email.value] == undefined) {
              user_exists = false;
            }
            username_or_email = user_email_list[email.value];
          } else {
            username_or_email = email.value;
            user_exists = false;
            var value;
            for (var key in user_email_list) {
              value = user_email_list[key];
              if (value == email.value) {
                user_exists = true;
                break;
              }
            }
          }
        });

      if (!user_exists) {
        toast("User Account does not exist");
        toast("User Account does not exist", { containerId: "B" });
        return;
      }

      this.user = await app
        .auth()
        .signInWithEmailAndPassword(username_or_email, password.value);

        if(!this.user){
          toast("Error")
        }

      if (!this.user.user.emailVerified) {
        toast("email is not verified! resending verification link...");
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            url: "http://localhost:3000/login",
            handleCodeInApp: true
          })
          .then(function() {
            console.log("sent verification email");
            toast("sent verification email");
          })
          .catch(function(error) {
            toast(error);
          });
        return;
      }

      this.props.history.push({
        pathname: "/landing"
      });
    } catch (error) {
      toast(error.message);
      
    }
  };

  goSignUp = async event => {
    this.props.history.push({
      pathname: "/signup"
    });
  };

  render() {
    return (
      <div>
        

        {/* <TopBarLoginSignup /> */}
        <LogInView onSubmit={this.handleLogIn} onClick={this.goSignUp} />
      </div>
    );
  }
}

export default withRouter(LogInContainer);
