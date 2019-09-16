import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../base";

import LogInView from "./LogInView";
import User from '../User';
import Landing from "../Landing";
import { BrowserRouter as Router, Route } from "react-router-dom";

const landingRoute = (props) => {
  return (
      <div>
      <Route
            exact path="/landing"
            component={Landing}
            loggedInUser={props.email}
          />                 
      </div>
    
  );
};

class LogInContainer extends Component {
  
  constructor (props){
    super(props);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  handleLogIn = async event => {

    event.preventDefault();
    const { email, password } = event.target.elements;
    try {

      this.user = await app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);

      this.us = new User(this.user);

      console.log(this.us.email);

      landingRoute(this.us);

      this.props.history.push("/landing");

    } catch (error) {
      alert(error);
    }
    
  };
  render() {
    return <LogInView onSubmit={this.handleLogIn} />;
  }
}

export default withRouter(LogInContainer);