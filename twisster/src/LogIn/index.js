import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../base";
import TopBarLoginSignup from "../TopBarLoginSignup"

import LogInView from "./LogInView";
import firebase from "firebase";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Landing/Landing.css"
import "./Login.css"

class LogInContainer extends Component {

  
  constructor (props){
    super(props);

    this.handleLogIn = this.handleLogIn.bind(this);
    
  }

  handleLogIn = async event => {

    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      console.log(document.getElementById('email').value);
      var user_exists = true;
      var username_or_email;
      await app.database().ref().once('value', (snapshot) => {
        var user_email_list = snapshot.child('mapUsernameToEmail').val();
        if (email.value.includes("@") != true) {
          if (user_email_list[email.value] == undefined) {
            user_exists = false;
          }
          username_or_email = user_email_list[email.value];
        }
        else {
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
        alert('User Account does not exist');
        toast('User Account does not exist', {containerId: 'B'});
        return;
      }

      this.user = await app
        .auth()
        .signInWithEmailAndPassword(username_or_email, password.value);

      if (!this.user.user.emailVerified) {
        alert("email is not verified! resending verification link...");
        firebase.auth().currentUser.sendEmailVerification({
          url: 'http://localhost:3000/login',
          handleCodeInApp: true
        })
        .then(function() {
          console.log("sent verification email");
        })
        .catch(function(error) {
          alert(error);
        });
        return;
      }
      
      this.props.history.push({
        pathname: "/landing"
      });

    } catch (error) {
      alert(error);
    }
    
  };

  render() {
    // const { active, value, error, label } = this.state;
    // const { predicted, locked } = this.props;
    // const fieldClassName = `field ${(locked ? active : active || value) &&
    //   "active"} ${locked && !active && "locked"}`;

    return( 

      // </div>
      // </div>
      // </div>
      <div className="main-body">
          { <LogInView Click={this.handleLogIn} /> }
      </div>
    );
  }
}

export default withRouter(LogInContainer);