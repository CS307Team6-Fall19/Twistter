import React, { Component } from "react";
import { withRouter } from "react-router";
import Clock from "./DataObjects/Clock";
import app from "./base";
import ReactDOM from 'react-dom';
import firebase from "firebase";

class User extends Component
{
    //Add a user when followed to the current user
    //@Params
    //userIdCurr: current username
    //userIdFollow: username of the indivudal you want to follow
    addFollowedUser(usernameCurr, usernameFollow)
    {
        console.log("Add Followed User");
        firebase.database().ref().child('users').child(firebase.auth().currentUser.userIdCurr).child('followedUsers').set({
            uid: userIdFollow, 
            topics: blah
        });
    }
    //Add a topic to current user
    //@Params
    //userIdCurr: current user id
    //content: a string that represents the blog itself (must be less than 250 characters)
    //topic(s): a list of topics associated to the blog
    addMicroBlogToCurrentUser(userIdCurr, content, topics)
    {
        firebase.database().ref().child('users').child(firebase.auth().currentUser.userIdCurr).child('Microblogs').set({
            uid: userIdCurr,
            
        })
    }



}