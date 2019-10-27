import React, { Component } from "react";
import { withRouter } from "react-router";

import ProfilePageView from "./ProfilePageView";
import UserData from "../DataObjects/UserData";
import TopBar from "../TopBar";
import firebase from "firebase";
import { resolve } from 'q';

class ProfilePage extends React.Component {
  
    constructor(props){
      super(props); 

      //this.getUser = this.getUser.bind(this);
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
            this.userData = new UserData(this.username, false);
          }
          else{
            this.localProps.history.push({
              pathname: "/login"});
              return;
          }

        } else {
          if(this.localProps.location.pathname != "/profile"){
            this.path = this.localProps.location.pathname;
            this.username = this.path.substring(9, this.path.length);

            if (this.username == UIDtoUsername[firebase.auth().currentUser.uid]) {
              this.userData = new UserData(this.username, true, true);
            } else {
              this.userData = new UserData(this.username, true, false);
            }
          } else {
            this.userData = new UserData(UIDtoUsername[firebase.auth().currentUser.uid], true, true);
          }
        }

      });

      resolve("done");
  }

    //getUser(username){
      //this.userData = new UserData(username, false, false);
    //}

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


