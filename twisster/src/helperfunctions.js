import React, { Component } from "react";
import { withRouter } from "react-router";
import ReactDOM from 'react-dom';
import firebase from "firebase";

/* 
HOW TO USE THIS:
var user = new User();
user.method_name(parameters);
Ex: user.addFollowedUser(username);
Ex: var uid = user.retrieveUserUid(username);
*/
const helperfunctions =
    {
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
    retrieveUserUid: function(username)
    {
        console.log("Entered retrieveUserUid");
        var username_uid_map = firebase.database.ref().child("mapUsernameToUid");
        var uid_follow = username_uid_map[username];
        console.log("Exited retrieveUserUid");
        return uid_follow;
    },

    //Description: Retrieve email of a specific user
    //@Params
    //username: username of the specific user
    //@Return
    //email: email of the specific user
    retrieveUserEmail: function(username) 
    {
        console.log("Entered retrieveUserEmail");
        var username_email_map = firebase.database.ref().child("mapUsernameToEmail");
        var email = username_email_map[username];
        console.log("Exited retrieveUserEmail");
        return email;
    },

    //Description: Add a user to follow to the current user's list of followers
    //@Params
    //usernameFollow: username of the individual you want to follow
    addFollowedUser: function(usernameFollow)
    {
        console.log("Entered addFollowedUser");
        //get the uid of the current user
        var uid_current = firebase.auth().currentUser.uid;
        //get the uid of the user to follow
        var username_uid_map = firebase.database.ref().child("mapUsernameToUid");
        var uid_follow = username_uid_map[usernameFollow];
        //put it in the appropriate spot in the databasee under followedUsers
        //add uid and an empty list of followedTopics
        var followedUserRef = firebase.database().ref().child("users").child(uid_current).child("followedUsers").child(uid_follow);
        followedUserRef.push ({
            followedTopics: []
        });
        console.log("Exited addFollowedUser");
    },

    //Description: Add a topic that the current user follows to the already followed user
    //@Params
    //usernameFollow: username of the individual the current user has followed, type: string
    //topicsFollow: the topic(s) that the current user wants to follow from the given usernameFollow, type: array
    addFollowedTopicToFollowedUser: function(usernameFollow, topicsFollow)
    {
        console.log("Entered addFollowedTopicToFollowedUser");
        //get the uid of the current user
        var uid_current = firebase.auth().currentUser.uid;
        //get the uid of the user to follow
        var username_uid_map = firebase.database.ref().child("mapUsernameToUid");
        var uid_follow = username_uid_map[usernameFollow];
        //add followedTopic to the list of followedTopics within the followedUser
        firebase.database().ref().once('value', (snapshot) => {
            var followedTopics = snapshot.child("users").child(firebase.auth().currentUser.uid).child("followedUsers").child(uid_follow).child("followedTopics").val();
            for(var index = 0; index < topicsFollow.length; index++)
            {
                followedTopics.push(topicsFollow[index]);
            }
        });
        console.log("Exited addFollowedTopicToFollowedUser");
    },

    //Description: Add a topic to current user (when current user decides to write and post a microblog)
    //@Params
    //content: a string that represents the blog itself (must be a string of less than 250 characters), type: string
    //topic(s): a list of topics associated to the blog, type: array
    addMicroBlogToCurrentUser: function(content, topics)
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
        var topicsList = [];
        for(var index = 0; index < topics.length; index++)
        {
            topicsList.push(topics[index]);
        }
        var microblog = {'content': content, 'topics': topicsList, 'timestamp': timestamp};
        firebase.database().ref().once('value', (snapshot) => {
            var microblog_list = snapshot.child("users").child(firebase.auth().currentUser.uid).child("Microblogs").val();
            console.log(microblog_list);
            if(microblog_list == null || microblog_list.length == 0)
            {
                firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("Microblogs").set({'0': microblog});
            }
            else
            {
                microblog_list.push(microblog);
                firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("Microblogs").set(microblog);
            }
        });
        console.log("Exited addMicroBlogToCurrentUser");
    },

    //Description: fetch current Users bio (when current user visits another profile)
    //@Params
    //username: string containing Username of profile page current User is visiting
    getCurrentBio: function(uid_val) 
    {
        var bio_content;
        //fetch user's uid from the username to uid list and then fetch bio from coresponding uid.
        await firebase.ref().once('value', (snapshot) => {
            bio_content = snapshot.child("users").child(uid_val).child("bio").val();
        });

        return bio_content;
    },
    
    //Description: fetch another Users bio (when current user visits another profile)
    //@Params
    //username: string containing Username of profile page current User is visiting
    getBio: function(username) 
    {
        var bio_content;
        //fetch user's uid from the username to uid list and then fetch bio from coresponding uid.
        await firebase.ref().once('value', (snapshot) => {
            var user_uid_list = snapshot.child('mapUsernameToUID').val();
            var uid_val = user_uid_list[username];
            bio_content = snapshot.child("users").child(uid_val).child("bio").val();
        });

        return bio_content;
    },

    //Description: save current Users bio on database.
    //@Params
    //content: string which contians users bio.
    postCurrentUserBio: function(content) {
        //fetch current user's uid
        var currentUser_uid = firebase.auth().currentUser.uid;
        // save changes on fire base;
        app.database().ref().child("users").child(currentUser_uid).child("bio").update(content);
    }
}

export default helperfunctions;
