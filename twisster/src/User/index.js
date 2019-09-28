import React, { Component } from 'react';

import Bio from "../DataObjects/Bio";
import LoggedInUserView from './LoggedInUserView';
import LoggedInUserEditView from './LoggedInUserEditView';
import VisitedUserView from './VisitedUserView';

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

  getBio(){
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
      document.getElementById('bio').innerHTML = this.getBio();
    }
    else {
      document.getElementById('welcome').innerHTML = "Welcome to " + this.getEmail() + " 's profile!";
      document.getElementById('bio').innerHTML = this.getBio();
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