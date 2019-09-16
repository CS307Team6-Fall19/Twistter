import React, { Component } from "react";
import { withRouter } from "react-router";
import Clock from "./DataObjects/Clock"
import app from "./base";
import ReactDOM from 'react-dom';
import firebase from "firebase";

class Landing extends Component {

  componentDidMount () {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("user is not null");
        console.log("user id: " + user.uid);
        document.getElementById('email').innerHTML = user.email;
      } else {
        console.log("user is null");
      }
    });
  }

  constructor(props){
      super(props)
  }
  
  render() {
    return(
      <div>
      {this.renderWelcome()}
      </div>
    );
  }

  renderClock(){
    ReactDOM.render(
      <Clock />,
      document.getElementById('root')
    );
  }

  renderWelcome = () => {
    return(
      <div>
        <h1>Welcome to Twistter!</h1>
        <form>
        <label id='email'>hello</label>
        </form>
      </div>
    );
  }
}

export default withRouter(Landing);