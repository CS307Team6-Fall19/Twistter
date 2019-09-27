import React, { Component } from "react";
import { withRouter } from "react-router";

import firebase from "firebase";
import UserData from "../DataObjects/UserData";
import LandingLogoutView from "./LandingLogoutView";
import LandingProfileView from "./LandingProfileView";

class Landing extends Component {
  
  constructor(props){
    super(props); 

    this.goToProfile = this.goToProfile.bind(this);
    this.goLogout = this.goLogout.bind(this);
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //CHANGE WHEN USER HAS USERNAME
        this.loggedIn = true;
        this.userData = new UserData(user.email, this.loggedIn);
        document.getElementById('username').innerHTML = user.email;
      } else {
        console.log("user is null");
      }
    }.bind(this));
  }

  goToProfile(){
    this.props.history.push({
      pathname: "/profile",
      state: { userData: this.userData }
    })
  }
  
  render() {
    return (
      <div>
        <LandingLogoutView onClickLogout={this.goLogout} />
        <LandingProfileView onClickProfile={this.goToProfile}/>;

        
      </div>
    );
  }

  goLogout = async event => {
    firebase.auth.signOut()
      .then(function() {
        console.log("Signout succesful");
      })
      .catch(function(error) {
        console.log("Error");
      })

    this.props.history.push({
      pathname: "/login"
    })
  };

  
}

export default withRouter(Landing);