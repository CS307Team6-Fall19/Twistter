import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../base";

import LogInView from "./LogInView";
import User from '../DataObjects/User';
import Landing from "../Landing";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ReactDOM from 'react-dom';

const landingRoute = (props) => {
  
  return (
      <div>
      <Route
            path="/landing"
            component={Landing}
            loggedInUser={props.email}
          />                 
      </div>
    
  );
};

const landingRender = () =>{
  //ReactDOM.render(<landingRoute />, document.getElementById('../Landing.js'));
}

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

      /* landingRender();
      landingRoute(this.us); */

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