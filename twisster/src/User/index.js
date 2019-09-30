import React, { Component } from 'react';

import Bio from "../DataObjects/Bio";
import LoggedInUserView from './LoggedInUserView';
import LoggedInUserEditView from './LoggedInUserEditView';
import VisitedUserView from './VisitedUserView';
import Microblog from '../Microblog'

class User extends React.Component{

  constructor(props) {

    super(props);

    //this.uservm = new UserVM();
    this.username = props.user.userData.username;
    this.loggedIn = props.user.userData.loggedIn;
    //this.uid = props.user.userData.uid;    
    this.state = { editMode : 0 };
    this.editMode = false; 
 
    this.bio = new Bio();

    this.editProfile = this.editProfile.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.setNewBio = this.setNewBio.bind(this);
  }

  getUsername(){
      return this.username;
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
      document.getElementById('username').innerHTML = this.getUsername();
      document.getElementById('bio').innerHTML = this.getBio();
    }
    else{
      document.getElementById('welcome').innerHTML = "Welcome to " + this.getUsername() + " 's profile!";
      document.getElementById('bio').innerHTML = this.getBio();
    }
  }

  componentDidMount = () => {

    if(this.loggedIn){
      document.getElementById('username').innerHTML = this.getUsername();
      document.getElementById('bio').innerHTML = this.getBio();
    }
    else {
      document.getElementById('welcome').innerHTML = "Welcome to " + this.getUsername() + " 's profile!";
      document.getElementById('bio').innerHTML = this.getBio();
    }
  }

  render(){
    
    if(this.loggedIn == true){

      if(this.editMode){
        return <LoggedInUserEditView onClick={this.saveChanges}/>;
      }

      else{
        return (
          <div>
            <LoggedInUserView onClick={this.editProfile}/>;
            <Microblog props={this.props}/>
          </div>
        );
      }
    }

    else if(this.loggedIn == false)
      return <VisitedUserView/>;
  }
}

export default User;