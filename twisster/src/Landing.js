import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "./base";
import firebase from "firebase";

class Landing extends Component {
    constructor(props){
        super(props)
        this.user = props.loggedInUser

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
    
    render() {
        return (
          <div>
            <h1>Landing</h1>
            <form>
            <label id='email'>this.user.email</label>
            </form>
          </div>
      );
    }
}
export default withRouter(Landing);