import React, { Component } from 'react';

import helperfunctions from '../helperfunctions.js'
import Microblogs from '../Microblogs'
import { TweetBody } from '../DataObjects/Microblog.js'
import HelperFunctions from "../helperfunctions";
import { thisExpression } from '@babel/types';

import LoggedInUserView from "./UserProfileViews/LoggedInUserView";
import LoggedInUserEditView from "./UserProfileViews/LoggedInUserEditView"
import VisitedUserView from "./UserProfileViews/VisitedUserView"
import { resolve } from 'q';

class User extends React.Component{

    constructor(props) {

        super(props);

        this.username = props.user.userData.username;
        this.loggedIn = props.user.userData.loggedIn;

        this.editProfile = this.editProfile.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.followUser = this.followUser.bind(this);
        
        this.renderLoggedInUser = this.renderLoggedInUser.bind(this);
        this.renderVisitedUser = this.renderVisitedUser.bind(this);
        

        this.state = {
            loaded: false
        }
        
        this.editMode = false;
    }

    editProfile(){

<<<<<<< HEAD
        this.editMode = true;
        this.setState({
          editMode : 1
        })
    }
=======
    this.editProfile = this.editProfile.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.setNewBio = this.setNewBio.bind(this);
    this.followUserIAmViewing = this.followUserIAmViewing.bind(this);
    this.getFollowedTopics();
    //this.getMicroblogs = this.getMicroblogs.bind(this);
>>>>>>> rohangupta
    
    saveChanges(){
    
<<<<<<< HEAD
        var bio_cont = document.getElementById('bioTextBox').value;
        helperfunctions.postCurrentUserBio(bio_cont);
=======
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

  getFollowedTopics() {
    firebase.database().ref().once('value', (snapshot) => {
      var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
      var currentUser = mapUsernameToUID[this.username];

      var followedTopics = snapshot.child("users").child(currentUser).child("followedTopics").val();
      alert(followedTopics);
      document.getElementById("followedTopics").innerHTML = followedTopics;
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
>>>>>>> rohangupta

        this.editMode = false;
        this.setState({
        mustUpdate : 1
        })
    }

    followUser(){

        helperfunctions.followUserIAmViewing(this.username);
        this.setState({ follow : 0});
    }

    async componentDidMount() {

        this.userProfile = new Object();
        this.userProfile.saveChanges = this.saveChanges;
        this.userProfile.editProfile = this.editProfile;
        this.userProfile.followUser = this.followUser;

        await this.downloadUserProfile(this.userProfile);

        this.setState({loaded : true});
    }

    async componentDidUpdate(){

        await this.downloadUserProfile(this.userProfile);
        
        if(this.state.mustUpdate == 1){
            this.setState({
                mustUpdate : 0
            })
        }
    }

    async downloadUserProfile(userProfile){

        
        userProfile.username = this.username;

        this.bio = await helperfunctions.getBio(this.username);
        userProfile.bio = this.bio;

        this.followersAndFollowing = await helperfunctions.getFollowersAndFollowing(this.username);
        userProfile.followersAndFollowing = this.followersAndFollowing;

        this.microblogs = await helperfunctions.getMicroblogsForUser(this.username);
        userProfile.microblogs = this.microblogs;

        resolve("done");
    }

    render() {

        if(this.state.loaded){

            if(this.loggedIn){
                return this.renderLoggedInUser(this.userProfile);
            }
            else{
                return this.renderVisitedUser(this.userProfile);
            }

        } else{
            return null;
        }
        
    }

    renderLoggedInUser(userProfile){

        if(this.editMode){
            return(
                <div>
                    <LoggedInUserEditView userProfile={userProfile}/>
                    <Microblogs microblogs={userProfile.microblogs} username={userProfile.username} />
                </div>
            );
        }

        else{
            return (
                <div>
                    <LoggedInUserView userProfile={userProfile}/>
                    <Microblogs microblogs={userProfile.microblogs} username={userProfile.username} />
                </div>
            );
        }
    }

    renderVisitedUser(userProfile){
        
        return(
            <div>
                <VisitedUserView userProfile={userProfile}/>
                <Microblogs microblogs={userProfile.microblogs} username={userProfile.username} />
            </div>
        );
    }

    
}
export default User;