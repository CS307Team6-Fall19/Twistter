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

      this.user = await app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);

      
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