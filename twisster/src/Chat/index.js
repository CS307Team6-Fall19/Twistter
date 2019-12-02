import React, { Component } from "react";
import "./chat.css";
import Messages from "./Messages";
import Input from "./Input";
import { resolve } from "path";
import firebase from "firebase";
import { withRouter } from "react-router";
import helperfunctions from "../helperfunctions";

// Current Issues ----
// Refresh does not work well
// the data is temporary, need to change to user data
// need to fix the this.userData and how to understand it.

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class Chat extends Component {
  state = {
    messages: [],
    member: {
      username: "ABCD",
      color: randomColor()
    }
  };

  async componentDidMount() {
    //verify user is logged in before displaying page
    this.updateUserName();
  }

  async updateUserName() {
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        this.props.history.push({
          pathname: "/login"
        });
        return null;
      } else {
        var loggedIn = true;
        var user = firebase.auth().currentUser;
        this.userData = await helperfunctions.getUserdataOfUser(
          user.uid,
          loggedIn
        );
        this.state.member.username = this.userData.username;
      }
    });
  }

  constructor(props) {
    super(props);
    this.updateUserName();
    this.drone = new window.Scaledrone("QeA5YRICL8SUcMYT", {
      data: this.state.member
    });
    this.drone.on("open", error => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Twisster Chat</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }

  onSendMessage = message => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  };
}

export default withRouter(Chat);
