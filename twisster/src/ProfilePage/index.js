import React, { Component } from "react";
import { withRouter } from "react-router";
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"

import ProfilePageView from "./ProfilePageView";
import UserData from "../DataObjects/UserData";
import TopBar from "../TopBar";
import firebase from "firebase";
import { resolve } from 'q';

class ProfilePage extends React.Component {
  
    constructor(props){
      super(props); 

      this.getUser = this.getUser.bind(this);
      this.localProps = props;

      this.state = {
        loaded: false
      }
    }
    
    async componentDidMount() {
      await this.setUsername();
      this.setState({loaded : true});
    }

    async setUsername(){

      await firebase.database().ref().once('value', (snapshot) => {
        var UIDtoUsername = snapshot.child('mapUIDtoUsername').val();

        if (firebase.auth().currentUser == undefined || firebase.auth().currentUser == null) {

          if(this.localProps.location.pathname != "/profile"){
            this.path = this.localProps.location.pathname;
            this.username = this.path.substring(9, this.path.length);
            this.getUser(this.username);
          }
          else{
            this.localProps.history.push({
              pathname: "/login"});
              return;
          }

        } else {
          var username = UIDtoUsername[firebase.auth().currentUser.uid];
          this.userData = new UserData(username, true);
        }

      });

      resolve("done");
  }

    getUser(username){
      this.userData = new UserData(username, false);
    }

    render(){
      if(this.state.loaded){
        return (
          <div>
            <TopBar/>
            <ProfilePageView userData={this.userData}/>
          </div>
        );

    } else{
        return null;
    }
  }
}
export default withRouter(ProfilePage);


