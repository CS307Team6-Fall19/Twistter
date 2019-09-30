import React, { Component } from 'react';

import Bio from "../DataObjects/Bio";
import LoggedInUserView from './LoggedInUserView';
import LoggedInUserEditView from './LoggedInUserEditView';
import VisitedUserView from './VisitedUserView';
import helperfunctions from '../helperfunctions.js'
import firebase from 'firebase'

class User extends React.Component{

  constructor(props) {

    super(props);

    //this.uservm = new UserVM();
    this.email = props.user.userData.email;
    this.loggedIn = props.user.userData.loggedIn;
    //this.uid = props.user.userData.uid;    
    this.state = { editMode : 0 };
    this.editMode = false; 
 
    this.bio = new Bio();

    this.editProfile = this.editProfile.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.setNewBio = this.setNewBio.bind(this);
  }

  getEmail(){
    
      return this.email;
  }

  async getBio(userEmail) {

    var bio_text;
    await firebase.database().ref().once('value', (snapshot) => {
      var user_email_list = snapshot.child('mapUsernameToEmail').val();
      var username;
      for (var user in user_email_list) {
          if (user_email_list[user] == userEmail) {
              username = user;
              break;
          }
      }

      var user_uid_list = snapshot.child('mapUsernameToUID').val();
      var uid_val = user_uid_list[username];
      console.log(user_uid_list);
      console.log(uid_val);
      var bio_cont = snapshot.child("users").child(uid_val).child("bio").val();
      console.log("bio_cont: ", bio_cont);
      if (bio_cont != undefined) {
        this.bio.setText(bio_cont);
        bio_text = bio_cont;
      }
    });
    /*then(result => function(result)
    {
      console.log(": " + result);
    })*/

    console.log(bio_text);
    document.getElementById('bio').innerHTML = this.bio.getText();
  }

  getUid(){
    return this.uid;
  }

  editProfile(){
    this.editMode = true;
    this.setState({
      editMode : 1
    })
  }

  saveChanges(){
    this.setNewBio();
    document.getElementById('bio').innerHTML = this.getBio();
    this.editMode = false;
    this.setState({
      editMode : 0
    })
  }

  setNewBio(){ 
    var bio_cont = document.getElementById('bioTextBox').value;
    helperfunctions.postCurrentUserBio(bio_cont);
    this.bio.setText(bio_cont);
  }

  componentDidUpdate = () => {

    if(this.loggedIn){
      document.getElementById('email').innerHTML = this.getEmail();
      this.getBio(this.getEmail());
    }
    else{
      document.getElementById('welcome').innerHTML = "Welcome to " + this.getEmail() + " 's profile!";
      this.getBio(this.getEmail());
    }
  }

  componentDidMount = () => {

    console.log("inside component did mount");
    if(this.loggedIn){
      document.getElementById('email').innerHTML = this.getEmail();
      this.getBio(this.getEmail());
    }
    else {
      document.getElementById('welcome').innerHTML = "Welcome to " + this.getEmail() + " 's profile!";
      this.getBio(this.getEmail());
    }
  }

  render(){
    
    if(this.loggedIn == true){

      if(this.editMode){
        return <LoggedInUserEditView onClick={this.saveChanges}/>;
      }

      else{
        return <LoggedInUserView onClick={this.editProfile}/>;
      }
    }

    else if(this.loggedIn == false)
      return <VisitedUserView/>;
  }
}

export default User;