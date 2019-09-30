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
    this.followUserIAmViewing = this.followUserIAmViewing.bind(this);
    //this.getMicroblogs = this.getMicroblogs.bind(this);
    
  }

  getMicroblogsForCurrentUser() {
    firebase.database().ref().once('value', (snapshot) => {
      let mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
      //let mapUIDtoUsername = snapshot.child("mapUIDtoUsername").val();
      let uidOfUser = mapUsernameToUID[this.username];
      let Microblogs = snapshot.child("users").child(uidOfUser).child("Microblogs").val();
      if(Microblogs != null)
      {
        for (var i = 0; i < Microblogs.length; i++) {
          this.getUser(this.username, Microblogs[i].content, Microblogs[i].topics);
        }
      }
    });
  }
  

  componentDidMount() {
    this.getMicroblogsForCurrentUser();
  }

  getUser(nameInput, tweetInput, topicsInput) {
    
      this.setState({
        users:[
          {
            name: nameInput,//data.results[0].name,
            image: "",//data.results[0].picture.medium,
            tweet: tweetInput,
            topics: topicsInput
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

  getFollowersAndFollowing() {
    firebase.database().ref().once('value', (snapshot) => {

      var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
      var UIDofUserIAmViewing = mapUsernameToUID[this.username];

      var usersTheUserIsFollowing = snapshot.child("users").child(UIDofUserIAmViewing).child("following").val();
      var followersTheUserHas = snapshot.child("users").child(UIDofUserIAmViewing).child("followers").val();

      document.getElementById('followers').innerHTML = followersTheUserHas;
      document.getElementById('following').innerHTML = usersTheUserIsFollowing;

    });
  }

  //adds the follower I am viewing to the list of users I follow AND
  //adds me as a follower to the user I am viewing
  followUserIAmViewing(){
    firebase.database().ref().once('value', (snapshot) => {
      var usersIAmFollowing = snapshot.child("users").child(firebase.auth().currentUser.uid).child("following").val();
      var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
      var UIDofUserIfollowed = mapUsernameToUID[this.username];
      var followersOfUserIamFollowing = snapshot.child("users").child(UIDofUserIfollowed).child("followers").val();

      var mapUIDToUsername = snapshot.child("mapUIDtoUsername").val();
      var myUsername = mapUIDToUsername[firebase.auth().currentUser.uid];

      if (mapUsernameToUID[this.username] != firebase.auth().currentUser.uid) {
        if (usersIAmFollowing == null) {
          firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("following").set(this.username);
        } else {
          usersIAmFollowing = usersIAmFollowing + ", " + this.username;
          firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("following").set(usersIAmFollowing);
        }

        if (followersOfUserIamFollowing == null) {
          firebase.database().ref().child("users").child(UIDofUserIfollowed).child("followers").set(myUsername);
        } else {
          followersOfUserIamFollowing = followersOfUserIamFollowing + ", " + myUsername;
          firebase.database().ref().child("users").child(UIDofUserIfollowed).child("followers").set(followersOfUserIamFollowing);
        }
      }
      
      this.getFollowersAndFollowing();

    });
  }

  componentDidUpdate = () => {

    console.log("componentdidupdate()");

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
    this.getFollowersAndFollowing();

    console.log("componentdidmount()");

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
        let topics = user.topics
        console.log(user.tweet)
          return(
          <TweetBody 
            key={index}
            name={name}
            handle={handle}
            tweet={tweet}
            image={image} 
            topics={topics}/>
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
        let topics = user.topics
        console.log(user.tweet)
          return(
          <TweetBody 
            key={index}
            name={name}
            handle={handle}
            tweet={tweet}
            image={image}
            topics={topics} />
          )
      })}    
        </div>
        );
      }
    }

    else if(this.loggedIn == false){
      return (
          <div>
            <VisitedUserView onClickFollow={this.followUserIAmViewing}/>;
            {[...this.state.users].map((user, index) => {
        let name = `${user.name}`
        let handle = `@${user.name}`
        let image = user.image
        let tweet = user.tweet
        let topics = user.topics
        console.log(user.tweet)
          return(
          <TweetBody 
            key={index}
            name={name}
            handle={handle}
            tweet={tweet}
            image={image}
            topics={topics} />
          )
      })}    
        </div>
      
      );
    }

          

  }
}

export default User;