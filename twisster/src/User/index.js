import React, { Component } from 'react';

import firebase from "firebase";
import Bio from "../DataObjects/Bio";
import LoggedInUserView from './LoggedInUserView';
import LoggedInUserEditView from './LoggedInUserEditView';
import VisitedUserView from './VisitedUserView';
import Microblog from '../Microblog'
import { TweetBody } from '../DataObjects/Microblog.js'
import HelperFunctions from "../helperfunctions";

class User extends React.Component{

  constructor(props) {

    super(props);

    

    this.getUser = this.getUser.bind(this);
    //this.uservm = new UserVM();
    this.username = props.user.userData.username;
    this.loggedIn = props.user.userData.loggedIn;
    //this.uid = props.user.userData.uid;    
    //this.state = { editMode : 0 };
    this.editMode = false; 
 
    this.state={
      users:
      [ 
      ]
    }
    this.bio = new Bio();

    this.getMicroblogsForCurrentUser = this.getMicroblogsForCurrentUser.bind(this);
    this.getMicroblogsForCurrentUser();

    this.editProfile = this.editProfile.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.setNewBio = this.setNewBio.bind(this);
    //this.getMicroblogs = this.getMicroblogs.bind(this);
    
  }

  getMicroblogsForCurrentUser() {
    firebase.database().ref().once('value', (snapshot) => {
      let mapUsernametoUID = snapshot.child("mapUsernametoUID").val();
      //let mapUIDtoUsername = snapshot.child("mapUIDtoUsername").val();
      let uidOfUser = mapUsernametoUID[this.username];
      let Microblogs = snapshot.child("users").child(uidOfUser).child("Microblogs").val();
      if(Microblogs != null)
      {
        for (var i = 0; i < Microblogs.length; i++) {
          this.getUser(this.username, Microblogs[i].content);
        }
      }
    });
  }
  

  componentDidMount() {
    this.getMicroblogsForCurrentUser();
  }

  getUser(nameInput, tweetInput) {
    
      this.setState({
        users:[
          {
            name: nameInput,//data.results[0].name,
            image: "",//data.results[0].picture.medium,
            tweet: tweetInput,
          },
          ...this.state.users,
        ]
      });
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
        return (
          <div>
          <LoggedInUserEditView onClick={this.saveChanges}/>

          {[...this.state.users].map((user, index) => {
        let name = `${user.name}`
        let handle = `@${user.name}`
        let image = user.image
        let tweet = user.tweet
        console.log(user.tweet)
          return(
          <Microblog 
            key={index}
            name={name}
            handle={handle}
            tweet={tweet}
            image={image} />
          )
      })}     
        </div>
        );
      }

      else{
        return (
          <div>
            <LoggedInUserView onClick={this.editProfile}/>;   
            {[...this.state.users].map((user, index) => {
        let name = `${user.name}`
        let handle = `@${user.name}`
        let image = user.image
        let tweet = user.tweet
        console.log(user.tweet)
          return(
          <TweetBody 
            key={index}
            name={name}
            handle={handle}
            tweet={tweet}
            image={image} />
          )
      })}    
        </div>
        );
      }
    }

    else if(this.loggedIn == false){
      return (
          <div>
            <VisitedUserView/>;
            {[...this.state.users].map((user, index) => {
        let name = `${user.name}`
        let handle = `@${user.name}`
        let image = user.image
        let tweet = user.tweet
        console.log(user.tweet)
          return(
          <TweetBody 
            key={index}
            name={name}
            handle={handle}
            tweet={tweet}
            image={image} />
          )
      })}    
        </div>
      
      );
    }

          

  }
}

export default User;