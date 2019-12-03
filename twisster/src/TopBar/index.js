import TopBarTwisster from "./TopBarView";
import React, { PureComponent } from "react";
import { withRouter } from "react-router";

import firebase from "firebase";
import { throwStatement } from "@babel/types";
class TopBar extends React.Component {
  constructor(props) {
    super(props);

    this.userData = props.userData;
    this.goLogout = this.goLogout.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.goToChat = this.goToChat.bind(this);
    this.goToLanding = this.goToLanding.bind(this);
    this.getAllUsernames = this.getAllUsernames.bind(this);
  }

  goLogout = async event => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("Signout succesful");
      })
      .catch(function(error) {
        console.log("Error");
      });

    this.props.history.push({
      pathname: "/login"
    });
  };

  goToProfile() {
    this.props.history.push({
      pathname: "/redirecttoaccount",
      state: { userData: this.userData} ,
    });
  }

  goToChat() {
    this.props.history.push({
      pathname: "/chat",
      state: { topBar: true }
    });
  }

  goToLanding() {
    this.props.history.push({
      pathname: "/landing",
      state: { userData: this.userData}
    });
  }

  getAllUsernames(){
    var user_list = [];
    const promise = firebase.database().ref().once('value', (snapshot)=> {
        var all_users = snapshot.child("mapUsernameToEmail").val();
        var key;
        for (key in all_users) {
            if (all_users[key] != firebase.auth().currentUser.email) {
                user_list.push(key);
            }
        }
    });
    return user_list;
  }

  getCurrentUsername(){
    var username;
    const promise = firebase.database().ref().once('value', (snapshot)=> {
        var all_users = snapshot.child("mapUsernameToEmail").val();
        var key;
        for (key in all_users) {
            if (all_users[key] == firebase.auth().currentUser.email) {
                username = key;
                break;
            }
        }
    });
    return username;
  }

  render() {
    if(firebase.auth().currentUser !== null)
    {
      return (
        <div className="top-bar">
          <TopBarTwisster
            getAllUsernames={this.getAllUsernames()}
            getCurrentUsername={this.getCurrentUsername()}
            goLogout={this.goLogout}
            goToProfile={this.goToProfile}
            goToChat={this.goToChat}
            goToLanding={this.goToLanding}
          />
        </div>
      );
    }
    else
    {
      return null;
    }
  }
}
export default withRouter(TopBar);
