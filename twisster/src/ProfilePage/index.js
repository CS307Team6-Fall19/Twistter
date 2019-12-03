import React, { Component } from "react";
import { withRouter } from "react-router";

import ProfilePageView from "./ProfilePageView";
import UserData from "../DataObjects/UserData";
import TopBar from "../TopBar";
import ProfilePicture from "../ProfilePicture";
import firebase from "firebase";
import { resolve } from "q";
import CheckboxContainer from "./checkBox.jsx";
import PageNotFound from "../PageNotFound.js";
import helperfunctions from "../helperfunctions";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    //this.getUser = this.getUser.bind(this);
    this.localProps = props;

    this.state = {
      //checkedItems: new Map(),
      loaded: false,
    };

    this.doesNotExist = false;
    //this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.doesNotExist = false;
    await this.setUsername();
    var allUsers = await helperfunctions.getAllOtherUsers();
    if(this.username !== undefined)
    {
      if(!allUsers.includes(this.username))
      {
      this.doesNotExist = true;
      }
    }
    this.setState({ loaded: true });
  }

  async setUsername() {
    await firebase
      .database()
      .ref()
      .once("value", snapshot => {
        var UIDtoUsername = snapshot.child("mapUIDtoUsername").val();

        if (
          firebase.auth().currentUser == undefined ||
          firebase.auth().currentUser == null
        ) {
          if (this.localProps.location.pathname != "/profile") {
            this.path = this.localProps.location.pathname;
            this.username = this.path.substring(9, this.path.length);
            this.userData = new UserData(this.username, false);
          } else {
            this.localProps.history.push({
              pathname: "/login"
            });
            return;
          }
        } else {
          if (this.localProps.location.pathname != "/profile") {
            this.path = this.localProps.location.pathname;
            this.username = this.path.substring(9, this.path.length);

            if (
              this.username == UIDtoUsername[firebase.auth().currentUser.uid]
            ) {
              this.userData = new UserData(this.username, true, true);
            } else {
              this.userData = new UserData(this.username, true, false);
            }
          } else {
            this.userData = new UserData(
              UIDtoUsername[firebase.auth().currentUser.uid],
              true,
              true
            );
          }
        }
      });

    resolve("done");
  }


  //getUser(username){
  //this.userData = new UserData(username, false, false);
  //}

  // handleChange(e) {
  //   const item = e.target.name;
  //   const isChecked = e.target.checked;
  //   this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  // }

  render() {
    if (this.state.loaded) {
      if(this.doesNotExist === false)
      {
        return (
          <div>
            <TopBar />

            <ProfilePageView userData={this.userData} />
            <CheckboxContainer username={this.username} />
          </div>
        ) ;
      }
      else
      {
        return (
          <PageNotFound/>
        );
      }
      
    } else {
      return null;
    }
  }
}
export default withRouter(ProfilePage);
