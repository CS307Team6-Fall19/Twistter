import React, { Component } from "react";
import { withRouter } from "react-router";
import ReactDOM from 'react-dom';
import { BrowserRouter as BrowserRouter, Router, Link } from "react-router-dom";
import { Route, Switch, Redirect } from 'react-router-dom'

import app from "./base";

import HomeView from "./Home/HomeView";
import User from './DataObjects/User';
import LogIn from "./LogIn";
import SignUp from "./SignUp";



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

