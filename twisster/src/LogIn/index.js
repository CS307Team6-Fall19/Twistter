import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../base";

import LogInView from "./LogInView";

class LogInContainer extends Component {
  
  constructor (props){
    super(props);
    this.handleLogIn = this.handleLogIn.bind(this);
    
  }

  handleLogIn = async event => {

    event.preventDefault();
    const { email, password } = event.target.elements;
    try {

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
        return;
      }

      this.user = await app
        .auth()
        .signInWithEmailAndPassword(username_or_email, password.value);

      
      this.props.history.push({
        pathname: "/landing"
      });

    } catch (error) {
      alert(error);
    }
    
  };
  render() {
    return <LogInView onSubmit={this.handleLogIn} />;
  }
}

export default withRouter(LogInContainer);