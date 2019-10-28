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
      pathname: "/profile",
      state: { userData: this.userData }
    });
  }

  goToChat() {
    this.props.history.push({
      pathname: "/chat",
      state: { userData: this.userData }
    });
  }

  render() {
    return (
      <div className="top-bar">
        <TopBarTwisster
          goLogout={this.goLogout}
          goToProfile={this.goToProfile}
          goToChat={this.goToChat}
        />
      </div>
    );
  }
}
export default withRouter(TopBar);
