import React, { Component } from "react";
import { withRouter } from "react-router";
import TopBarLoginSignup from "./TopBarLoginSignup"


class Home extends Component {

  goLogIn = async event => {
    
    this.props.history.push({
      pathname: "/login"
    });
  };

  goSignUp = async event => {

    this.props.history.push({
      pathname: '/signup'
    })
  };
 
  render() {
    return (
      <div>
        <TopBarLoginSignup />
        <h1>Home</h1>
        <form>
        <button onClick={this.goLogIn}>Login</button>
        <button onClick={this.goSignUp}>Signup</button>
        </form>
      </div>
  );
  }
  
}

export default withRouter(Home);

