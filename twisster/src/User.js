import React, { Component } from "react";
import { withRouter } from "react-router";
import Clock from "./DataObjects/Clock";
import app from "./base";
import ReactDOM from 'react-dom';
import firebase from "firebase";

class User extends Component
{
    // //Create a new user
    // //@Params
    // //email: user's email
    // //username: user's username
    // //password: user's password
    // createNewUser(email, username, password)
    // {
    //     console.log("Entered createNewUser");
    //     //create email and password
    //     const user = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
    //     //update username:email combo
    //     let username_email_combo = {};
    //     username_email_combo[username.value] = email.value;
    //     firebase.database.ref().child('mapUsernameToEmail').update(username_email_combo);
    //     //update username:uid combo
    //     let username_uid_combo = {};
    //     username_uid_combo[username.value] = uid.value;
    //     firebase.database.ref().child('mapUsernameToUid').update(username_uid_combo);
    //     console.log("Exited createNewUser");
    // }
    
    //Description: Retrieve uid of a specific user
    //@Params
    //username: username of the specific user
    //@Return
    //uid_follow: uid of the specific user
    retrieveUserUid(username)
    {
        console.log("Entered retrieveUserUid");
        var username_uid_map = firebase.database.ref().child("mapUsernameToUid");
        var uid_follow = username_uid_map[username];
        console.log("Exited retrieveUserUid");
        return uid_follow;
    }

    //Description: Retrieve email of a specific user
    //@Params
    //username: username of the specific user
    //@Return
    //email: email of the specific user
    retrieveUserEmail(username)
    {
        console.log("Entered retrieveUserEmail");
        var username_email_map = firebase.database.ref().child("mapUsernameToEmail");
        var email = username_email_map[username];
        console.log("Exited retrieveUserEmail");
        return email;
    }

    //Description: Add a user to follow to the current user's list of followers
    //@Params
    //usernameFollow: username of the individual you want to follow
    addFollowedUser(usernameFollow)
    {
        console.log("Entered addFollowedUser");
        //get the uid of the current user
        var uid_current = firebase.auth().currentUser.uid;
        //get the uid of the user to follow
        var username_uid_map = firebase.database.ref().child(mapUsernameToUid);
        var uid_follow = username_uid_map[usernameFollow];
        //put it in the appropriate spot in the databasee under followedUsers
        //add uid and an empty list of followedTopics
        var followedUserRef = firebase.database().ref().child("users").child(uid_current).child("followedUsers");
        followedUserRef.push ({
            uid: uid_follow,
            followedTopics: []
        });
        console.log("Exited addFollowedUser");
    }

    //Description: Add a topic that the current user follows to the already followed user
    //@Params
    //usernameFollow: username of the individual the current user has followed
    //topicFollow: the topic that the current user wants to follow from the given usernameFollow
    addFollowedTopicToFollowedUser(usernameFollow, topicFollow)
    {
        console.log("Entered addFollowedTopicToFollowedUser");
        //get the uid of the current user
        var uid_current = firebase.auth().currentUser.uid;
        //get the uid of the user to follow
        var username_uid_map = firebase.database.ref().child(mapUsernameToUid);
        var uid_follow = username_uid_map[usernameFollow];
        //add followedTopic to the list of followedTopics within the followedUser
        var followedUserRef = firebase.database.ref().child("users").child(uid_current).child("followedUsers");
        console.log("Exited addFollowedTopicToFollowedUser");
    }
    
    //Description: Add a topic to current user (when current user decides to write and post a microblog)
    //@Params
    //content: a string that represents the blog itself (must be a string of less than 250 characters)
    //topic(s): a list of topics associated to the blog (must be a list)
    addMicroBlogToCurrentUser(content, topics)
    {
        console.log("Entered addMicroBlogToCurrentUser");
        //get the current user's uid
        var uid_current = firebase.auth().currentUser.uid;
        //fetch the current timestamp
        var date = new Date();
        var timestamp = date.getTime();
        //check if the length of the microblog does not exceed 250 characters
        if(content.length > 250)
        {
            console.log("ERROR: content of microblog cannot exceed 250 characters -- will not store in firebase");
        }
        //add uid, microblog content, and list of topics to Microblogs
        else
        {
            firebase.database().ref().child("users").child(firebase.auth().currentUser.userIdCurr).child("Microblogs").push({
                uid: uid_current,
                content: content,
                topics: topics,
                timestamp: timestamp
            });
        }
        console.log("Exited addMicroBlogToCurrentUser");
    }



}