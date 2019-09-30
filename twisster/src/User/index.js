import React, { Component } from 'react';

import Bio from "../DataObjects/Bio";
import LoggedInUserView from './LoggedInUserView';
import LoggedInUserEditView from './LoggedInUserEditView';
import VisitedUserView from './VisitedUserView';
import helperfunctions from '../helperfunctions.js'

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

  getCurrentBio() {
    var bio_cont = helperfunctions.getCurrentBio(firebase.auth().currentUser.uid);
    if (bio_cont == undefined) {
      this.bio.setText(bio_cont);
    }
    return this.bio.getText();
  }

  getBio(username) {

    var bio_cont = helperfunctions.getBio(username);
    if (bio_cont == undefined) {
      this.bio.setText(bio_cont);
    }
    return this.bio.getText();
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
    this.bio.setText(document.getElementById('bioTextBox').value);
  }

  componentDidUpdate = () => {

    if(this.loggedIn){
      document.getElementById('email').innerHTML = this.getEmail();
      document.getElementById('bio').innerHTML = this.getBio();
    }
    else{
      document.getElementById('welcome').innerHTML = "Welcome to " + this.getEmail() + " 's profile!";
      document.getElementById('bio').innerHTML = this.getBio();
    }
  }

  componentDidMount = () => {

    if(this.loggedIn){
      document.getElementById('email').innerHTML = this.getEmail();
      document.getElementById('bio').innerHTML = this.getCurrentBio();
    }
    else {
      document.getElementById('welcome').innerHTML = "Welcome to " + this.getEmail() + " 's profile!";
      var username;
      //get username coresponding to email of user bio the current user is visiting
      await firebase.ref().once('value', (snapshot) => {
        usernameToEmailList = snapshot.child("mapUsernameToEmail").val();
        for(var user in usernameToEmailList) {
          if (usernameToEmailList[user] == this.getEmail()) {
            username = user;
            break;
          }
        }
      });
      document.getElementById('bio').innerHTML = this.getBio(this.getEmail());
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