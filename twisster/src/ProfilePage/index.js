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

      this.state = {
        loaded: false
      }

      if(props.location.pathname != "/profile"){
        this.path = props.location.pathname;
        this.username = this.path.substring(9, this.path.length);
        this.getUser(this.username);
      }
      else{
        if (this.userData == undefined || this.userData == null) {
          console.log("null");
          //this.userData = new UserData(username, this.loggedIn);
        } else {
          console.log(this.props.location.state);
          this.userData = this.props.location.state.userData; 
        }
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
          this.setState({loaded : false});
          this.props.history.push({
            pathname: "/login"
          });
          return;
        }

        var username = UIDtoUsername[firebase.auth().currentUser.uid];
        this.userData = new UserData(username, true);//this.loggedIn);
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


