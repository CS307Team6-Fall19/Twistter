import React, { Component } from "react";
import { withRouter } from "react-router";
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"

import ProfilePageView from "./ProfilePageView";
import UserData from "../DataObjects/UserData";
import TopBar from "../TopBar";

import firebase from "firebase";

class ProfilePage extends React.Component {
  
    constructor(props){
      super(props); 

      this.getUser = this.getUser.bind(this);

      this.state={
        empty: 0
      }

      this.isValidUser = 0;

      if(props.location.pathname != "/profile"){

        firebase.database().ref().once('value', (snapshot) => {
          var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
  
          if(props.location.pathname != "/profile"){
            this.path = props.location.pathname;
            this.username = this.path.substring(9, this.path.length);
            
            if (this.username == null) {
              this.isValidUser = 0;
              alert("username is null");
            }
  
            if (mapUsernameToUID == null || mapUsernameToUID[this.username] == undefined) {
              this.isValidUser = 0;
              alert("username does not exist!");
              return;
            }

            this.isValidUser = 1;
              
            this.getUser(this.username);

            this.setState({empty: 1});
          }
        });
      }
      else{
        console.log(this.props.location.state);
        this.userData = this.props.location.state.userData;
      }
    }

    getUser(username){
      this.userData = new UserData(username, false);
    }

    render(){
      if (!this.isValidUser) {
        return null; 
      }

      return (
        <div>
          <TopBar/>
          <ProfilePageView userData={this.userData}/>
        </div>
      );
    }
}
export default withRouter(ProfilePage);


