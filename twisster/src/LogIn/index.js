import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../base";

import LogInView from "./LogInView";
import User from './../User';

class LogInContainer extends Component {
  
  handleLogIn = async event => {

    
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {

      this.user = await app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);

      this.props.history.push("/");

      this.us = new User(this.user);

      console.log(this.us.email);

    } catch (error) {

      alert(error);
    }

  };
  render() {
    return <LogInView onSubmit={this.handleLogIn} />;
  }
}

export default withRouter(LogInContainer);