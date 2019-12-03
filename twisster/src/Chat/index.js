import React, { Component } from "react";
import "./chat.css";
import Messages from "./Messages";
import Input from "./Input";
import { resolve } from "path";
import firebase from "firebase";
import { withRouter } from "react-router";
import helperfunctions from "../helperfunctions";
import { timeout } from "q";
import TopBar from "../TopBar";
import { minHeight } from "@material-ui/system";


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

    await firebase.database().ref().once('value', (snapshot)  => {
      var retrievedDMUsers = snapshot.child("users").child(firebase.auth().currentUser.uid).child("persistantmessages").val();     
      if (retrievedDMUsers != undefined || retrievedDMUsers != null) {
        for (let i = 0; i < Object.keys(retrievedDMUsers).length; i++) {
          this.addButton(Object.keys(retrievedDMUsers)[i]);
        }
      }

      var retrievedUnseenDMUsers = snapshot.child("users").child(firebase.auth().currentUser.uid).child("unseenUsersDM").val();     
      if (retrievedUnseenDMUsers != undefined || retrievedUnseenDMUsers != null) {
        for (let i = 0; i < retrievedUnseenDMUsers.length; i++) {
          this.changeButtonColor(retrievedUnseenDMUsers[i], "#fff000");
        }
      }
    });

    var buttons = document.getElementsByTagName('button');
    for (var i = 0, len = buttons.length; i < len; i++) {
      if (buttons[i].innerHTML != "Send" && buttons[i].innerHTML != "Search" && buttons[i].id != "profile" && buttons[i].id != "Home" && buttons[i].id != "chat") {
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
    console.log("testcolor");
    button.style.background = "#ff0000";
  }

  changeButtonColor(buttonID, color) {
    var button = document.getElementById(buttonID);
    if (button == null) {
      console.log("add new button");
      var ul = document.getElementById("userlist");
      var button = ul.appendChild(document.createElement("button"));
      button.id = buttonID;
      button.innerHTML = buttonID;
      button.outerHTML = button.outerHTML + "<br></br>";
      console.log(color);
      var property=document.getElementById(buttonID);
      property.style.backgroundColor = color;
      var buttons = document.getElementsByTagName('button');
      for (var i = 0, len = buttons.length; i < len; i++) {
        if (buttons[i].innerHTML == buttonID) {
          buttons[i].addEventListener('click', mouseEvt => {
            console.log("testclick");
            this.userButtonClick(mouseEvt.toElement.id);
          });
        }
      }
    } else {
      button.style.background = color;
    }
  }

  async getUsersBlocked(inputUsername) {
    var blockedFrom = [];
    await firebase.database().ref().once('value', (snapshot) => {
      let mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
      let otherUIDRetrieved = mapUsernameToUID[inputUsername];
      if(snapshot.child("users").child(otherUIDRetrieved).hasChild("blockedUsers") === true)
      {
        blockedFrom = snapshot.child("users").child(otherUIDRetrieved).child("blockedUsers").val();
      }
    });
    return blockedFrom;
  }

  async userButtonClick(username) {  
    if (document.getElementById("messageslist") == undefined || document.getElementById("messageslist") == null) {
      return;
    }
    
    this.props.location.state.dmUsername = username; 
    var currBlocked = await helperfunctions.getBlockedUser();
    var blockedFrom = await this.getUsersBlocked(username);
    if(currBlocked.includes(username))
    {
      this.setPlaceholderInputBar("You are blocking " + username);
      document.getElementById("placeholder").disabled = true;
      document.getElementById("send").disabled = true;
    } else if (blockedFrom.includes(this.userData.username)) {
      this.setPlaceholderInputBar("You are being blocked by " + username);
      document.getElementById("placeholder").disabled = true;
      document.getElementById("send").disabled = true;
    } else {
      this.setPlaceholderInputBar("Send message to " + username);
      document.getElementById("placeholder").disabled = false;
      document.getElementById("placeholder").focus();
      document.getElementById("send").disabled = false;
    }

    console.log("userbuttonclick() " + username);
    this.props.location.state.dmUsername = username;
    this.props.location.state.topBar = false;
    this.currentRetrievedData = null;
    this.changeButtonColor(username, "orangered");
    this.removeUserFromUnseenList(username);
    this.getUsernameOfOtherUser();
    this.fillWithPreviousMessages();
    this.listenToPersistantMessages();
    this.listenToUsersBlockedFrom();
  }

  async removeUserFromUnseenList(username) {
    firebase.database().ref().once('value', (snapshot)  => {
      var retrievedUnseenDMUsers = snapshot.child("users").child(firebase.auth().currentUser.uid).child("unseenUsersDM").val();     
      if (retrievedUnseenDMUsers != undefined || retrievedUnseenDMUsers != null) {
        if (retrievedUnseenDMUsers.indexOf(username) != -1) {
          retrievedUnseenDMUsers.splice(retrievedUnseenDMUsers.indexOf(username), 1);
          firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("unseenUsersDM").set(retrievedUnseenDMUsers);
        }
      }
    });
  }

  async getUsernameOfOtherUser() {
    await firebase.database().ref().once('value', (snapshot)  => {
      let mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
      let otherUIDRetrieved = mapUsernameToUID[this.props.location.state.dmUsername];
      this.otherUID = otherUIDRetrieved;
    });
  }

  async updateUserName() {
    if (document.getElementById("messageslist") == undefined || document.getElementById("messageslist") == null) {
      return;
    }

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
        if (document.getElementById("messageslist") != undefined && document.getElementById("messageslist") != null) {
          if (this.props.location.state.topBar == false) {
            this.fillWithPreviousMessages();
            this.listenToPersistantMessages();
            this.setPlaceholderInputBar("Send message to " + this.props.location.state.dmUsername);
            document.getElementById("placeholder").disabled = false;
            document.getElementById("send").disabled = false;
            this.listenToUsersBlockedFrom();
          } else {
            this.setPlaceholderInputBar("To send a message, click on a username");
            document.getElementById("placeholder").disabled = true;
            document.getElementById("send").disabled = true;
          }
          this.listenToUnseenUsersDM();
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
      <div className="main-body">

        <TopBar userData={this.userData} />

        <div className="inner-body">
        <div className="body" style={{minWidth:"300px"}}>
        <ul id="userlist">
        
        </ul>
        </div>

        <div className="body" style={{width:"800px", height:"600px"}}>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
        </div>
        </div>

        
      </div>
    );
  }

  setPlaceholderInputBar(text) {
    if (document.getElementById("messageslist") == undefined || document.getElementById("messageslist") == null) {
      return;
    }
    document.getElementById("placeholder").placeholder = text;
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
        
        if (document.getElementById("messageslist") == null) {
          return;
        }

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

  listenToUsersBlockedFrom() {
    if (document.getElementById("messageslist") == null) {
      return;
    }

    firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("usersBlockedFrom").on('value', (snapshot) => {
      firebase.database().ref().once('value', async (snapshot) => {
        
        if (document.getElementById("messageslist") == null) {
          return;
        }
        
        var retrievedData = snapshot.child("users").child(firebase.auth().currentUser.uid).child("usersBlockedFrom").val();
        var retrievedData2 = snapshot.child("users").child(firebase.auth().currentUser.uid).child("blockedUsers").val();
        if ((retrievedData == undefined || retrievedData == null) && (retrievedData2 == undefined || retrievedData2 == null)) {
          this.setPlaceholderInputBar("Send message to " + this.props.location.state.dmUsername);
          document.getElementById("placeholder").disabled = false;
          document.getElementById("placeholder").focus();
          document.getElementById("send").disabled = false;
          return;
        }

        var currBlocked = await helperfunctions.getBlockedUser();
        var blockedFrom = await this.getUsersBlocked(this.props.location.state.dmUsername);
        if(currBlocked.includes(this.props.location.state.dmUsername))
        {
          this.setPlaceholderInputBar("You are blocking " + this.props.location.state.dmUsername);
          document.getElementById("placeholder").disabled = true;
          document.getElementById("send").disabled = true;
        } else if (blockedFrom.includes(this.userData.username)) {
          this.setPlaceholderInputBar("You are being blocked by " + this.props.location.state.dmUsername);
          document.getElementById("placeholder").disabled = true;
          document.getElementById("send").disabled = true;
        } else {
          this.setPlaceholderInputBar("Send message to " + this.props.location.state.dmUsername);
          document.getElementById("placeholder").disabled = false;
          document.getElementById("placeholder").focus();
          document.getElementById("send").disabled = false;
        }
       
      });
    });
  }

  listenToUnseenUsersDM() {
    if (document.getElementById("messageslist") == null) {
      return;
    }

    firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("unseenUsersDM").on('value', (snapshot) => {
      firebase.database().ref().once('value', (snapshot) => {

        if (document.getElementById("messageslist") == null) {
          return;
        }

        var retrievedUnseenDMUsers = snapshot.child("users").child(firebase.auth().currentUser.uid).child("unseenUsersDM").val();     
        if (retrievedUnseenDMUsers != undefined || retrievedUnseenDMUsers != null) {
          for (let i = 0; i < retrievedUnseenDMUsers.length; i++) {
            console.log(this.props.location.state.dmUsername);
            if (this.props.location.state.dmUsername != retrievedUnseenDMUsers[i]) {
              console.log("listenToUnseenUsersDM changeButtonColor of : " + retrievedUnseenDMUsers[i]);
              this.changeButtonColor(retrievedUnseenDMUsers[i], "#fff000");
            } else {
              if (retrievedUnseenDMUsers.indexOf(this.props.location.state.dmUsername) != -1) {
                retrievedUnseenDMUsers.splice(retrievedUnseenDMUsers.indexOf(this.props.location.state.dmUsername), 1);
                firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("unseenUsersDM").set(retrievedUnseenDMUsers);
              }
            }
          }
        }
      });
    });
  }

  onSendMessage = message => {

    if (message == "") {
      return;
    }

    firebase.database().ref().once('value', (snapshot)  => {
      var retrievedUnseenDMUsers = snapshot.child("users").child(this.otherUID).child("unseenUsersDM").val();     
      if (retrievedUnseenDMUsers != undefined || retrievedUnseenDMUsers != null) {
        if (!retrievedUnseenDMUsers.includes(this.userData.username)) {
          retrievedUnseenDMUsers.push(this.userData.username);
          firebase.database().ref().child("users").child(this.otherUID).child("unseenUsersDM").set(retrievedUnseenDMUsers);
        }
      } else {
        firebase.database().ref().child("users").child(this.otherUID).child("unseenUsersDM").set({"0": this.userData.username });
      }
    });

    this.changeButtonColor(this.props.location.state.dmUsername, "orangered");

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
