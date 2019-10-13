import React, { Component } from "react";
import { withRouter } from "react-router";
import ReactDOM from 'react-dom';
import firebase from "firebase";
import { resolve } from "dns";

/*
TODO
How to use this class:

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
                firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("Microblogs").set(microblog_list);
            }
        });
        console.log("Exited addMicroBlogToCurrentUser");
    },
    
    //Description: fetch another Users bio (when current user visits another profile)
    //@Params
    //username: string containing Username of profile page current User is visiting
    /* getBio: function(username) 
    {
        var bio_content;
        //fetch user's uid from the username to uid list and then fetch bio from coresponding uid.
        firebase.database().ref().once('value', (snapshot) => {
            var user_uid_list = snapshot.child('mapUsernameToUID').val();
            var uid_val = user_uid_list[username];
            bio_content = snapshot.child("users").child(uid_val).child("bio").val();
        });

        return bio_content;
    }, */

    getBio: async function(username) {

      var bio_text;
  
      const bio = await firebase.database().ref().once('value', (snapshot) => {
        var user_uid_list = snapshot.child('mapUsernameToUID').val();
        var uid_val = user_uid_list[username];
        var bio_cont = snapshot.child("users").child(uid_val).child("bio").val();
        if (bio_cont != undefined) {
          //resolve(bio_cont);
          bio_text = bio_cont;
          return bio_cont;
        }
      });

        resolve("done")
        return bio_text;
    },

    getFollowersAndFollowing: async function(username){

        var result;
        await firebase.database().ref().once('value', (snapshot) => {
    
          var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
          var UIDofUserIAmViewing = mapUsernameToUID[username];
          var usersTheUserIsFollowing = snapshot.child("users").child(UIDofUserIAmViewing).child("following").val();
          var followersTheUserHas = snapshot.child("users").child(UIDofUserIAmViewing).child("followers").val();

          var followers = followersTheUserHas;
          var following = usersTheUserIsFollowing;

          result = {followers, following};
          
        });

        resolve("done")
        return result;
    },

    followUserIAmViewing: async function(username){

        await firebase.database().ref().once('value', (snapshot) => {
          var usersIAmFollowing = snapshot.child("users").child(firebase.auth().currentUser.uid).child("following").val();
          var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
          var UIDofUserIfollowed = mapUsernameToUID[username];
          var followersOfUserIamFollowing = snapshot.child("users").child(UIDofUserIfollowed).child("followers").val();
    
          var mapUIDToUsername = snapshot.child("mapUIDtoUsername").val();
          var myUsername = mapUIDToUsername[firebase.auth().currentUser.uid];
    
          if (mapUsernameToUID[username] != firebase.auth().currentUser.uid) {
            if (usersIAmFollowing == null) {
              firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("following").set(username);
            } else {
              usersIAmFollowing = usersIAmFollowing + ", " + username;
              firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("following").set(usersIAmFollowing);
            }
    
            if (followersOfUserIamFollowing == null) {
              firebase.database().ref().child("users").child(UIDofUserIfollowed).child("followers").set(myUsername);
            } else {
              followersOfUserIamFollowing = followersOfUserIamFollowing + ", " + myUsername;
              firebase.database().ref().child("users").child(UIDofUserIfollowed).child("followers").set(followersOfUserIamFollowing);
            }
          }
        });

        resolve("done");
      },
    //Description: save current Users bio on database.
    //@Params
    //content: string which contians users bio.
    postCurrentUserBio: async function(content) {
        //save current users bio on firebase
        await firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("bio").set(content);
        resolve("done");
    },

    /*
    //gets a list of all the microblogs that the current user has posted and the posts he/she follows
    getMicroblogsForCurrentUserAsync: async function() {
    let result;
    await firebase.database().ref().once('value', (snapshot) => {
      var mapUIDtoUsername = snapshot.child("mapUIDtoUsername").val();
      var usernameOfUser = mapUIDtoUsername[firebase.auth().currentUser.uid];
      var Microblogs = snapshot.child("users").child(firebase.auth().currentUser.uid).child("Microblogs").val();

      result = {usernameOfUser, Microblogs};
    });

    return result;
    }*/

    getMicroblogsForCurrentUser: async function(username) {
        var Microblogs;
        firebase.database().ref().once('value', (snapshot) => {
          let mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
          //let mapUIDtoUsername = snapshot.child("mapUIDtoUsername").val();
          let uidOfUser = mapUsernameToUID[username];
          Microblogs = snapshot.child("users").child(uidOfUser).child("Microblogs").val();
          if(Microblogs != null)
          {
              
            
          }
        });
        return Microblogs;
      },

      getMicroblogsForUser: async function(username) {
        var Microblogs;
        const t = await firebase.database().ref().once('value', (snapshot) => {
          let mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
          //let mapUIDtoUsername = snapshot.child("mapUIDtoUsername").val();
          let uidOfUser = mapUsernameToUID[username];
          Microblogs = snapshot.child("users").child(uidOfUser).child("Microblogs").val();
          if(Microblogs != null)
          {
              
            
          }
        });
        resolve("done");

        return Microblogs;
      }
}

export default helperfunctions;
