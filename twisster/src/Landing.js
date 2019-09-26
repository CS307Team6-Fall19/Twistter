import React, { Component } from "react";
import { withRouter } from "react-router";

import firebase from "firebase";
import UserData from "./DataObjects/UserData";


class Landing extends Component {
  
  constructor(props){
    super(props); 
    this.goToProfile= this.goToProfile.bind(this);

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
    return(
      <div>
      {this.renderWelcome()}
      </div>
    );
  }

  renderWelcome = () => {
    return(
      <div>
        <h1>Welcome to your Twistter homepage!</h1>
        <form>
        <label id='username'>hello</label>
        <button onClick={this.goToProfile}>Go to your profile</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Landing);