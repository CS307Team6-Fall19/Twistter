/* import React, { Component } from "react";
import app from "./base";
import firebase from "firebase";

/* 
HOW TO USE THIS:
var user = new UserVM();
user.method_name(parameters);
Ex: user.addFollowedUser(username);
Ex: var uid = user.retrieveUserUid(username);
*/
import React, { Component } from 'react';

import firebase from "firebase";
class UserVM extends React.Component
{
    constructor()
    {
        toast("Within the user class");
    }
    //Create a new user
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
        var followedUserRef = firebase.database().ref().child("users").child(uid_current).child("followedUsers").child(uid_follow);
        followedUserRef.push ({
            followedTopics: []
        });
        console.log("Exited addFollowedUser");
    }

    //Description: Add a topic that the current user follows to the already followed user
    //@Params
    //usernameFollow: username of the individual the current user has followed, type: string
    //topicsFollow: the topic(s) that the current user wants to follow from the given usernameFollow, type: array
    addFollowedTopicToFollowedUser(usernameFollow, topicsFollow)
    {
        console.log("Entered addFollowedTopicToFollowedUser");
        //get the uid of the current user
        var uid_current = firebase.auth().currentUser.uid;
        //get the uid of the user to follow
        var username_uid_map = firebase.database.ref().child(mapUsernameToUid);
        var uid_follow = username_uid_map[usernameFollow];
        //add followedTopic to the list of followedTopics within the followedUser
        app.database().ref().once('value', (snapshot) => {
            var followedTopics = snapshot.child("users").child(app.auth().currentUser.uid).child("followedUsers").child(uid_follow).child("followedTopics").val();
            for(index = 0; index < topicsFollow.length; index++)
            {
                followedTopics.push(topicsFollow[index]);
            }
        });
        console.log("Exited addFollowedTopicToFollowedUser");
    }

    //Description: Add a topic to current user (when current user decides to write and post a microblog)
    //@Params
    //content: a string that represents the blog itself (must be a string of less than 250 characters), type: string
    //topic(s): a list of topics associated to the blog, type: array
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
                content: content,
                topics: [],
                timestamp: timestamp
            });

            app.database().ref().once('value', (snapshot) => {
                var topicsList = snapshort.child("users").child(firebase.auth().currentUser.userIdCurr).child("Microblogs").child("topics").val();
                for(index = 0; index < topics.length; index++)
                {
                    topicsList.push(topics[index]);
                }
            });
        }
        console.log("Exited addMicroBlogToCurrentUser");
    }

    //Description: fetch another Users bio (when current user visits another profile)
    //@Params
    //username: string containing Username of profile page current User is visiting
    async getAnotherBio(username) {
        var bio_content;
        //fetch user's uid from the username to uid list and then fetch bio from coresponding uid.
        await firebase.ref().once('value', (snapshot) => {
            var user_uid_list = snapshot.child('mapUsernameToUID').val();
            var uid_val = user_uid_list[username];
            bio_content = snapshot.child("users").child(uid_val).child("bio").val();
        });

        return bio_content;
    }

    getMicroblogsForCurrentUser() {
        firebase.database().ref().once('value', (snapshot) => {
            let mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
            //let mapUIDtoUsername = snapshot.child("mapUIDtoUsername").val();
            let uidOfUser = mapUsernameToUID[this.username];
            let Microblogs = snapshot.child("users").child(uidOfUser).child("Microblogs").val();
            if(Microblogs != null)
            {
                return Microblogs;
            /* for (var i = 0; i < Microblogs.length; i++) {
                this.getUser(this.username, Microblogs[i].content, Microblogs[i].topics);
            } */
            }
        });
    }

    //Description: save current Users bio on database.
    //@Params
    //content: string which contians users bio.
    postCurrentUserBio(content) {
        //fetch current user's uid
        var currentUser_uid = firebase.auth().currentUser.uid;
        // save changes on fire base;
        app.database().ref().child("users").child(currentUser_uid).child("bio").update(content);
    }
} 
export default(UserVM);