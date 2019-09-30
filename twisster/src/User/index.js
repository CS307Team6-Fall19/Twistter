import React, { Component } from 'react';

import firebase from "firebase";
import Bio from "../DataObjects/Bio";
import LoggedInUserView from './LoggedInUserView';
import LoggedInUserEditView from './LoggedInUserEditView';
import VisitedUserView from './VisitedUserView';
import helperfunctions from '../helperfunctions.js'
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

  getEmail(){
    return this.email;
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

  async getBio(username) {

    var bio_text;

    await firebase.database().ref().once('value', (snapshot) => {
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
      document.getElementById('username').innerHTML = this.getUsername();
      this.getBio(this.getUsername());
    }
    else{
      document.getElementById('welcome').innerHTML = "Welcome to " + this.getUsername() + " 's profile!";
      this.getBio(this.getUsername());
    }
  }

  componentDidMount = () => {

    console.log("inside component did mount");
    if(this.loggedIn){
      document.getElementById('username').innerHTML = this.getUsername();
      this.getBio(this.getUsername());
    }
    else {
      document.getElementById('welcome').innerHTML = "Welcome to " + this.getUsername() + " 's profile!";
      this.getBio(this.getUsername());
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
          <Microblog 
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
            <VisitedUserView/>;
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