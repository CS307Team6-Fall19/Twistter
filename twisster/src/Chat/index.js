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

    this.addButton("rgupta");
    this.addButton("gosse");

    var buttons = document.getElementsByTagName('button');
    for (var i = 0, len = buttons.length; i < len; i++) {
      if (buttons[i].innerHTML != "Send") {
        buttons[i].addEventListener('click', mouseEvt => {
          this.userButtonClick(mouseEvt.toElement.id);
        });
      }
    }
  }

  addButton(username) {
    var ul = document.getElementById("userlist");
    var button = ul.appendChild(document.createElement("button"));
    button.id = username;
    button.innerHTML = username;
    button.outerHTML = button.outerHTML + "<br></br>";
  }

  userButtonClick(username) {
    this.props.location.state.dmUsername = username;
    this.props.location.state.topBar = false;
    this.currentRetrievedData = null;
    this.getUsernameOfOtherUser();
    this.fillWithPreviousMessages();
    this.listenToPersistantMessages();
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
        if (this.props.location.state.topBar == false) {
          this.fillWithPreviousMessages();
          this.listenToPersistantMessages();
        }
      }
    });
  }

  constructor(props) {
    super(props);

    let otherUID = "";
    let currentRetrievedData = [];

    this.userButtonClick = this.userButtonClick.bind(this);
  }

  render() {
      return (
      <div className="App">
        <div className="App-header">
          <h1>Twisster Chat</h1>
        </div>

        <ul id="userlist">
        
        </ul>

        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }

  fillWithPreviousMessages() {
    if (document.getElementById("messageslist") == undefined || document.getElementById("messageslist") == null) {
      return;
    }

    document.getElementById("messageslist").innerHTML = "";
    firebase.database().ref().once('value', (snapshot) => {
      var retrievedData = snapshot.child("users").child(firebase.auth().currentUser.uid).child("persistantmessages").child(this.props.location.state.dmUsername).val();
      this.currentRetrievedData = retrievedData;

      if (retrievedData != undefined || retrievedData != null) {
        for (let i = 0; i < retrievedData.length; i++) {
          let username = retrievedData[i].substr(0, retrievedData[i].indexOf(','));
          let message = retrievedData[i].substr(retrievedData[i].indexOf(',') + 1, retrievedData[i].length - 1 - retrievedData[i].indexOf(','));

          if (username == this.userData.username) {
            this.appendMessageFromMe(message, false);
          } else {
            this.appendMessageFromOtherUser(message);
          }
        }
      }

      setTimeout(function() {
        if (document.getElementById("messageslist").innerHTML != "") {
          var element = document.getElementById("messageslist");
          element.scrollTop = element.scrollHeight;
        }
      }, 200);
    });
  }

  appendMessageFromMe(inputText, adjustData) {
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
        element.scrollTop = element.scrollHeight;
      }
    }, 200);
  }

  listenToPersistantMessages() {
    if (document.getElementById("messageslist") == null) {
      return;
    }

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
      });
    });
  }

  onSendMessage = message => {

    this.appendMessageFromMe(message, true);

    setTimeout(function() {
      if (document.getElementById("messageslist").innerHTML != "") {
        var element = document.getElementById("messageslist");
        element.scrollTop = element.scrollHeight;
      }
    }, 200);
  };
}

export default withRouter(Chat);
