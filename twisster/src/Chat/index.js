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
    this.getUsernameOfOtherUser();
  }

  async getUsernameOfOtherUser() {
    await firebase.database().ref().once('value', (snapshot)  => {
      let mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
      let otherUIDRetrieved = mapUsernameToUID[this.props.location.state.dmUsername];
      this.otherUID = otherUIDRetrieved;
    });
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

    let otherUID = "";
    let currentRetrievedData = [];

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
    console.log("fillWithPreviousMessages");
    firebase.database().ref().once('value', (snapshot) => {
      var retrievedData = snapshot.child("users").child(firebase.auth().currentUser.uid).child("persistantmessages").child(this.props.location.state.dmUsername).val();
      this.currentRetrievedData = retrievedData;

      if (retrievedData != undefined || retrievedData != null) {
        for (let i = 0; i < retrievedData.length; i++) {
          let username = retrievedData[i].substr(0, retrievedData[i].indexOf(','));
          let message = retrievedData[i].substr(retrievedData[i].indexOf(',') + 1, retrievedData[i].length - 1 - retrievedData[i].indexOf(','));

          console.log(username + " + " + message);

          if (username == this.userData.username) {
            this.appendMessageFromMe(message, false);
          } else {
            this.appendMessageFromOtherUser(message);
          }
        }
      }
    });
  }

  appendMessageFromMe(inputText, adjustData) {
    console.log("appendMessageFromMe");
    const messages = this.state.messages;
    messages.push({ member: this.state.member, text: inputText });
    this.setState({ messages });

    if (adjustData) {
      if (this.currentRetrievedData == undefined || this.currentRetrievedData == null) {
        this.currentRetrievedData = [this.userData.username + "," + inputText];
        firebase.database().ref().child("users").child(this.otherUID).child("persistantmessages").child(this.userData.username).set({"0": this.userData.username + "," + inputText});
        firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("persistantmessages").child(this.props.location.state.dmUsername).set({"0": this.userData.username + "," + inputText});
      } else {
        this.currentRetrievedData.push(this.userData.username + "," + inputText);
        firebase.database().ref().child("users").child(this.otherUID).child("persistantmessages").child(this.userData.username).set(this.currentRetrievedData);
        firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("persistantmessages").child(this.props.location.state.dmUsername).set(this.currentRetrievedData);
      }
    }
  }

  appendMessageFromOtherUser(inputText) {
    if (document.getElementById("messageslist") == null) {
      return;
    }

    console.log("appendMessageFromOtherUser");
    let member2 = {
      username: this.props.location.state.dmUsername,
      color: randomColor(),
      id: this.props.location.state.dmUsername
    };
    const messages = this.state.messages;
    messages.push({ member: member2, text: inputText });
    this.setState({ messages });

    setTimeout(function() {
      if (document.getElementById("messageslist").innerHTML != "") {
        var element = document.getElementById("messageslist");
        element.scrollTop = element.clientHeight;
      }
    }, 200);
  }

  listenToPersistantMessages() {
    if (document.getElementById("messageslist") == null) {
      return;
    }

    console.log("listenToPersistantMessages");
    firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("persistantmessages").child(this.props.location.state.dmUsername).on('value', (snapshot) => {
      firebase.database().ref().once('value', (snapshot) => {
        var retrievedData = snapshot.child("users").child(firebase.auth().currentUser.uid).child("persistantmessages").child(this.props.location.state.dmUsername).val();
        if (this.currentRetrievedData == null || retrievedData == null || this.currentRetrievedData[this.currentRetrievedData.length - 1] == retrievedData[retrievedData.length - 1]) {
          return;
        }
        
        this.currentRetrievedData = retrievedData;
          if (retrievedData != undefined || retrievedData != null) {
            if (this.userData.username != retrievedData[retrievedData.length - 1].substr(0, retrievedData[retrievedData.length - 1].indexOf(','))) {
              this.appendMessageFromOtherUser(retrievedData[retrievedData.length - 1].substr(retrievedData[retrievedData.length - 1].indexOf(',') + 1, retrievedData[retrievedData.length - 1].length - 1 - retrievedData[retrievedData.length - 1].indexOf(',')));
            }
          }
        //}
      });
    });
  }

  onSendMessage = message => {

    this.appendMessageFromMe(message, true);

    setTimeout(function() {
      if (document.getElementById("messageslist").innerHTML != "") {
        var element = document.getElementById("messageslist");
        element.scrollTop = element.clientHeight;
      }
    }, 200);
  };
}

export default withRouter(Chat);
