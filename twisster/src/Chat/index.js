import React, { Component } from "react";
import "./chat.css";
import Messages from "./Messages";
import Input from "./Input";
import { resolve } from "path";
import firebase from "firebase";
import { withRouter } from "react-router";
import helperfunctions from "../helperfunctions";
import { timeout } from "q";

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
        this.state.member.id = this.userData.username;
        this.fillWithPreviousMessages();
        this.listenToPersistantMessages();
      }
    });
  }

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.location.state.dmUsername == undefined || this.props.location.state.dmUsername == null) {
      return null;
    } else {
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
  }

  fillWithPreviousMessages() {
    this.appendMessageFromMe("test text from me previous");
    this.appendMessageFromOtherUser("test text from other user previous");
  }

  appendMessageFromMe(inputText) {
    const messages = this.state.messages;
    messages.push({ member: this.state.member, text: inputText });
    this.setState({ messages });
  }

  appendMessageFromOtherUser(inputText) {
    let member2 = {
      username: this.props.location.state.dmUsername,
      color: randomColor(),
      id: this.props.location.state.dmUsername
    };
    const messages = this.state.messages;
    messages.push({ member: member2, text: inputText });
    this.setState({ messages });
  }

  listenToPersistantMessages() {
    firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("persistantmessages").child("bloisch").on('value', (snapshot) => {
      firebase.database().ref().once('value', (snapshot) => {
        var test = snapshot.child("users").child(firebase.auth().currentUser.uid).child("persistantmessages").child("bloisch").val();
        console.log(test);
      });
    });
  }

  onSendMessage = message => {

    console.log("onSendMessage(message: " + message + ")");

    //document.getElementById("messageslist").innerHTML = "";

    firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("persistantmessages").child("bloisch").set({"0": "bloisch" + "," + message});

    this.appendMessageFromMe(message);

    setTimeout(function() {
      if (document.getElementById("messageslist").innerHTML != "") {
        var element = document.getElementById("messageslist");
        element.scrollTop = element.clientHeight;
      }
    }, 200);
  };
}

export default withRouter(Chat);
