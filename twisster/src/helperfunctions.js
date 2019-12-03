import React, { Component } from "react";
import { withRouter } from "react-router";
import ReactDOM from 'react-dom';
import firebase from "firebase";
import { resolve } from "dns";
import UserData from "./DataObjects/UserData";
import { isFlowDeclaration } from "@babel/types";
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
        var username_email_map = firebase.database().ref().child("mapUsernameToEmail");
        var email = username_email_map[username];
        console.log("Exited retrieveUserEmail");
        return email;
    },

    retrieveUsername: async function(uid)
    {
      console.log("Entered retrieveUsername");
      var username;
      await firebase.database().ref().once('value', (snapshot) => {
        var mapUIDtoUsername = snapshot.child("mapUIDtoUsername").val();
        username = mapUIDtoUsername[uid];
      });
      console.log("Exited retrieveUsername");
      return username;
    },

    getAllUsers: async function(username)
    {
      var usernames = [];
      await firebase.database().ref().once('value', (snapshot) => {
        var mapUIDtoUsername = snapshot.child("mapUIDtoUsername").val();
        snapshot.child("users").forEach(function(childSnapshot)
        {
          var currUsername = mapUIDtoUsername[childSnapshot.key];
          if(currUsername !== username)
          {
            usernames.push(currUsername);
          }
        });
      });

      resolve("done");
      return usernames;
    },

    getAllOtherUsers: async function()
    {
      var usernames = [];
      await firebase.database().ref().once('value', (snapshot) => {
        var mapUIDtoUsername = snapshot.child("mapUIDtoUsername").val();
        snapshot.child("users").forEach(function(childSnapshot)
        {
          var currUsername = mapUIDtoUsername[childSnapshot.key];
          usernames.push(currUsername);
        });
      });

      resolve("done");
      return usernames;
    },

    //Description: Add a user to follow to the current user's list of followers
    //@Params
    //usernameFollow: username of the individual you want to follow
    //DEPRECATED
    // addFollowedUser: function(usernameFollow)
    // {
    //     console.log("Entered addFollowedUser");
    //     //get the uid of the current user
    //     var uid_current = firebase.auth().currentUser.uid;
    //     //get the uid of the user to follow
    //     var username_uid_map = firebase.database.ref().child("mapUsernameToUid");
    //     var uid_follow = username_uid_map[usernameFollow];
    //     //put it in the appropriate spot in the databasee under followedUsers
    //     //add uid and an empty list of followedTopics
    //     var followedUserRef = firebase.database().ref().child("users").child(uid_current).child("followedUsers").child(uid_follow);
    //     followedUserRef.push ({
    //         followedTopics: []
    //     });
    //     console.log("Exited addFollowedUser");
    // },

    //Description: Add a topic that the current user follows to the already followed user
    //@Params
    //usernameFollow: username of the individual the current user has followed, type: string
    //topicsFollow: the topic(s) that the current user wants to follow from the given usernameFollow, type: array
    //DEPRECATED
    // addFollowedTopicToFollowedUser: function(usernameFollow, topicsFollow)
    // {
    //     console.log("Entered addFollowedTopicToFollowedUser");
    //     //get the uid of the current user
    //     var uid_current = firebase.auth().currentUser.uid;
    //     //get the uid of the user to follow
    //     var username_uid_map = firebase.database.ref().child("mapUsernameToUid");
    //     var uid_follow = username_uid_map[usernameFollow];
    //     //add followedTopic to the list of followedTopics within the followedUser
    //     firebase.database().ref().once('value', (snapshot) => {
    //         var followedTopics = snapshot.child("users").child(firebase.auth().currentUser.uid).child("followedUsers").child(uid_follow).child("followedTopics").val();
    //         for(var index = 0; index < topicsFollow.length; index++)
    //         {
    //             followedTopics.push(topicsFollow[index]);
    //         }
    //     });
    //     console.log("Exited addFollowedTopicToFollowedUser");
    // },

    //Description: Add a topic to current user (when current user decides to write and post a microblog)
    //@Params
    //content: a string that represents the blog itself (must be a string of less than 250 characters), type: string
    //topic(s): a list of topics associated to the blog, type: array
    addMicroBlogToCurrentUser: async function(content, topics)
    {
        var username = "";
        console.log("Entered addMicroBlogToCurrentUser");
        //get the current user's uid
        var uid_current = firebase.auth().currentUser.uid;
        await firebase.database().ref().once('value', (snapshot) => {
          var mapUIDtoUsername = snapshot.child("mapUIDtoUsername").val();
          username = mapUIDtoUsername[uid_current];
          console.log("USERNAME:", username);
        });
        //fetch the current timestamp
        var date = new Date();
        var timestamp = date.getTime();
        //check if the length of the microblog does not exceed 250 characters
        if(content.length > 250)
        {
            console.log("ERROR: content of microblog cannot exceed 250 characters --> will not store in firebase");
        }
        //add uid, microblog content, and list of topics to Microblogs
        var wTopics = [];

        for(var index = 0; index < topics.length; index++)
        {
            wTopics.push({"topics":topics[index], "timestamp":timestamp});
        }
        await firebase.database().ref().once('value', (snapshot) => {
            var writtenTopics = snapshot.child("users").child(firebase.auth().currentUser.uid).child("writtenTopics").val();
            console.log("TYPE:", typeof(writtenTopics));
            //console.log("VALUES:", Object.values(writtenTopics));
            if(writtenTopics == null || writtenTopics.length === 0)
            {
                firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("writtenTopics").set(wTopics);
            }
            else
            {
                for(var index = 0; index < wTopics.length; index++)
                {
                  var w = 0;
                  for (; w < writtenTopics.length; w++) {
                    if (writtenTopics[w].topics == wTopics[index].topics) {
                      break;
                    }
                  }
                  if (w == writtenTopics.length) {
                    writtenTopics.push(wTopics[index]);
                  }
                }
                firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("writtenTopics").set(writtenTopics);
            }
        });
        var topicsList = [];
        for(var index = 0; index < topics.length; index++)
        {
            topicsList.push(topics[index]);
        }
        var numLikes = 0;
        var userLikes = [];
        userLikes.push("hello");
        var microblog = {'userLikes': userLikes, 'id': username + timestamp, 'user': username, 'content': content, 'topics': topicsList, 'timestamp': timestamp, 'numLikes': numLikes};
        await firebase.database().ref().once('value', (snapshot) => {
            var microblog_list = snapshot.child("users").child(firebase.auth().currentUser.uid).child("Microblogs").val();
            //console.log(microblog_list);
            if(microblog_list == null || microblog_list.length === 0)
            {
                firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("Microblogs").set({'0': microblog});
            }
            else
            {
                microblog_list.push(microblog);
                firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("Microblogs").set(microblog_list);
            }
        });

        resolve("done");
        return;
        console.log("Exited addMicroBlogToCurrentUser");
    },

    addQuotedMicroblogToCurrentUser: async function(microblog, content, topics)
    {
      console.log("Entered addQuotedMicroblogToCurrentUser");
      var username = "";
      var uid_current = firebase.auth().currentUser.uid;
      await firebase.database().ref().once('value', (snapshot) => {
        var mapUIDtoUsername = snapshot.child("mapUIDtoUsername").val();
        username = mapUIDtoUsername[uid_current];
        console.log("USERNAME:", username);
      });

      var date = new Date();
      var timestamp = date.getTime();
      if(content.length > 250)
      {
        console.log("ERROR: content of microblog cannot exceed 250 characters --> will note store in firebase");
      }

      var wTopics = [];

      for(var index = 0; index < topics.length; index++)
      {
        wTopics.push({"topics": topics[index], "timestamp": timestamp});
      }

      await firebase.database().ref().once('value', (snapshot) => {
        var writtenTopics = snapshot.child("users").child(firebase.auth().currentUser.uid).child("writtenTopics").val();
        console.log("TYPE:", typeof(writtenTopics));
        //console.log("VALUES:", Object.values(writtenTopics));
        if(writtenTopics == null || writtenTopics.length === 0)
        {
            firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("writtenTopics").set(wTopics);
        }
        else
        {
            for(var index = 0; index < wTopics.length; index++)
            {
              var w = 0;
              for (; w < writtenTopics.length; w++) {
                if (writtenTopics[w].topics == wTopics[index].topics) {
                  break;
                }
              }
              if (w == writtenTopics.length) {
                writtenTopics.push(wTopics[index]);
              }
            }
            firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("writtenTopics").set(writtenTopics);
        }
      });

      var topicsList = [];
      for(var index = 0; index < topics.length; index++)
      {
          topicsList.push(topics[index]);
      }
      var numLikes = 0;
      var userLikes = [];
      userLikes.push("hello");

      var microblogAdd = {};
      if(microblog.userLikes !== undefined)
      {
        microblogAdd = {'quotedUserLikes': userLikes, 'quotedId': username + timestamp, 'quotedUser': username, 'quotedContent': content, 'quotedTopics': topicsList, 'timestamp': timestamp, 'quotedNumLikes': numLikes, 'quote': true, 'userLikes': microblog.userLikes, 'id': microblog.id, 'user': microblog.name, 'content': microblog.tweet, 'topics': microblog.topics, 'numLikes': microblog.numLikes};
      }
      else
      {
        microblogAdd = {'quotedUserLikes': userLikes, 'quotedId': username + timestamp, 'quotedUser': username, 'quotedContent': content, 'quotedTopics': topicsList, 'timestamp': timestamp, 'quotedNumLikes': numLikes, 'quote': true, 'id': microblog.id, 'user': microblog.name, 'content': microblog.tweet, 'topics': microblog.topics, 'numLikes': microblog.numLikes};
      }
      await firebase.database().ref().once('value', (snapshot) => {
        var microblog_list = snapshot.child("users").child(firebase.auth().currentUser.uid).child("Microblogs").val();
        //console.log(microblog_list);
        if(microblog_list == null || microblog_list.length === 0)
        {
            firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("Microblogs").set({'0': microblogAdd});
        }
        else
        {
            microblog_list.push(microblogAdd);
            firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("Microblogs").set(microblog_list);
        }
      });

      resolve("done");

      console.log("Exited addQuotedMicroblogToCurrentUser");
    },

    likeMicroblog: async function(microblog, username)
    {
      console.log("Entered likeMicroblog");
      await firebase.database().ref().once('value', (snapshot) => {
        var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
        var UIDofUserIAmViewing = mapUsernameToUID[microblog.name];
        snapshot.child("users").child(UIDofUserIAmViewing).child("Microblogs").forEach((function(child)
        {
          //console.log(username);
          // console.log(child);
          // console.log(child.key);
          // console.log(child.val().id);
          var countLikes = 0;
          var userLikes = [];
          if(child.val().id === microblog.id)
          {
            if(child.val().userLikes === undefined)
            {
              userLikes.push(username);
            }
            else if(child.val().userLikes.includes(username) === false)
            {
              if(child.val().numLikes === 0 || child.val().userLikes.includes("hello"))
              {
                userLikes = child.val().userLikes;
                userLikes[0] = username;
              }
              else
              {
                userLikes = child.val().userLikes;
                userLikes.push(username);
              }
            }
            else if(child.val().userLikes.includes(username) === true)
            {
              userLikes = child.val().userLikes;
            }
            countLikes = userLikes.length;
            firebase.database().ref().child("users").child(UIDofUserIAmViewing).child("Microblogs").child(child.key).update({'userLikes': userLikes});
            firebase.database().ref().child("users").child(UIDofUserIAmViewing).child("Microblogs").child(child.key).update({'numLikes': countLikes});
          }
        }));
      });

      resolve("done");
      console.log("Exited likeMicroblog");
    },

    unlikeMicroblog: async function(microblog, username)
    {
      console.log("Entered unlikeMicroblog");
      await firebase.database().ref().once('value', (snapshot) => {
        var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
        var UIDofUserIAmViewing = mapUsernameToUID[microblog.name];
        snapshot.child("users").child(UIDofUserIAmViewing).child("Microblogs").forEach((function(child)
        {
          var countLikes = 0;
          var userLikes = [];
          if(child.val().id === microblog.id)
          {
            if(child.val().userLikes === undefined)
            {
              countLikes = 0;
            }
            else if(child.val().userLikes.includes(username) === true)
            {
              userLikes = child.val().userLikes;
              var index = userLikes.indexOf(username);
              userLikes.splice(index, 1);
            }
            countLikes = userLikes.length;
            firebase.database().ref().child("users").child(UIDofUserIAmViewing).child("Microblogs").child(child.key).update({'userLikes': userLikes});
            firebase.database().ref().child("users").child(UIDofUserIAmViewing).child("Microblogs").child(child.key).update({'numLikes': countLikes});
          }
        }));
      });
      resolve("done");
      console.log("Exited unlikeMicroblog");
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

    fetchImageForCurrentUser: async function(username)
    {
      var picname;
      await firebase.database().ref().once('value', (snapshot) =>
      {
        var uid_curr = snapshot.child("mapUsernametoUid").child(username).val();
        picname = snapshot.child("users").child(uid_curr).child("picture").val();
      });
      return picname;
    },

    //Method to get list of followers and following
    getFollowersAndFollowing: async function(username){

        var result;
        await firebase.database().ref().once('value', (snapshot) => {
    
          var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
          var UIDofUserIAmViewing = mapUsernameToUID[username];
          var usersTheUserIsFollowing = [];
          snapshot.child("users").child(UIDofUserIAmViewing).child("following").forEach((function(child)
          {
            usersTheUserIsFollowing.push(child.key);
          }));
          var followersTheUserHas = snapshot.child("users").child(UIDofUserIAmViewing).child("followers").val();
          var followers = "";
          if(followersTheUserHas == null)
          {
            followers = "";
          }
          else
          {
            for(var i = 0; i < followersTheUserHas.length - 1; i++)
            {
              followers += followersTheUserHas[i] + ", ";
            }
            followers += followersTheUserHas[followersTheUserHas.length - 1];
          }
          var following = "";
          if(usersTheUserIsFollowing == null || usersTheUserIsFollowing === undefined || usersTheUserIsFollowing.length === 0)
          {
            following = "";
          }
          else
          {
            for(var i = 0; i < usersTheUserIsFollowing.length - 1; i++)
            {
              following += usersTheUserIsFollowing[i] + ", ";
            }
            following += usersTheUserIsFollowing[usersTheUserIsFollowing.length - 1];
          }
          result = {followers, following};
          
        });

        resolve("done");
        return result;
    },

    getFollowersAndFollowingForCurrentUser: async function()
    {
        var result;
        await firebase.database().ref().once('value', (snapshot) => {
    
          var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
          var UIDofUserIAmViewing = firebase.auth().currentUser.uid;
          var usersTheUserIsFollowing = [];
          snapshot.child("users").child(UIDofUserIAmViewing).child("following").forEach((function(child)
          {
            usersTheUserIsFollowing.push(child.key);
          }));
          var followersTheUserHas = snapshot.child("users").child(UIDofUserIAmViewing).child("followers").val();
          var followers = "";
          if(followersTheUserHas == null)
          {
            followers = "";
          }
          else
          {
            for(var i = 0; i < followersTheUserHas.length - 1; i++)
            {
              followers += followersTheUserHas[i] + ", ";
            }
            followers += followersTheUserHas[followersTheUserHas.length - 1];
          }
          var following = "";
          if(usersTheUserIsFollowing == null || usersTheUserIsFollowing === undefined || usersTheUserIsFollowing.length === 0)
          {
            following = "";
          }
          else
          {
            for(var i = 0; i < usersTheUserIsFollowing.length - 1; i++)
            {
              following += usersTheUserIsFollowing[i] + ", ";
            }
            following += usersTheUserIsFollowing[usersTheUserIsFollowing.length - 1];
          }
          result = {followers, following};
          
        });

        resolve("done");
        return result;
    },

    //Method to follow user I am viewing
    followUserIAmViewing: async function(username){
        
        await firebase.database().ref().once('value', (snapshot) => {
          var currUserUID = firebase.auth().currentUser.uid;
          var mapUIDToUsername = snapshot.child("mapUIDtoUsername").val();
          var currUserName = mapUIDToUsername[firebase.auth().currentUser.uid];
          var followedUserName = username;
          var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
          var followedUserUID = mapUsernameToUID[followedUserName];

          var date = new Date();
          var timestamp = date.getTime();
          firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("followingTimestamp").child(followedUserName).set(timestamp);

          var usersIAmFollowing = snapshot.child("users").child(currUserUID).child("following").val();
          // var usersIAmFollowing = snapshot.child("users").child(currUserUID).child("following").forEach(function(childSnapshot) 
          // {
          //   var childKey = childSnapshot.key;
          //   toast("CHILD KEY: " + childKey);
          //   var childData = childSnapshot.val();
          //   toast("CHILD VALUE: " + childData);
          // });

          var followersOfUserIamFollowing = snapshot.child("users").child(followedUserUID).child("followers").val();

          if(followedUserUID !== currUserUID)
          {
            if(usersIAmFollowing == null || usersIAmFollowing.length == 0)
            {
              var topicsList = [];
              topicsList.push("None");
              if(snapshot.child("users").child(firebase.auth().currentUser.uid).child("following").hasChild(followedUserName) === false)
              {
                firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("following").child(followedUserName).set(topicsList);
              }
            }
            else
            {
              var topicsList = [];
              topicsList.push("None");
              if(snapshot.child("users").child(firebase.auth().currentUser.uid).child("following").hasChild(followedUserName) === false)
              {
                firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("following").child(followedUserName).set(topicsList);
              }
            }

            if(followersOfUserIamFollowing == null || followersOfUserIamFollowing.length === 0)
            {
                var usersList = [];
                usersList.push(currUserName);
                firebase.database().ref().child("users").child(followedUserUID).child("followers").set(usersList);
            }
            else
            {
              if(followersOfUserIamFollowing.includes(currUserName) === false)
              {
                followersOfUserIamFollowing.push(currUserName);
                firebase.database().ref().child("users").child(followedUserUID).child("followers").set(followersOfUserIamFollowing);
              }
            }
          }
        });

        resolve("done");
      },

    //Method to unfollow user I am viewing
    unfollowUserIAmViewing: async function(username)
    {
      await firebase.database().ref().once('value', (snapshot) => {
        var mapUIDToUsername = snapshot.child("mapUIDtoUsername").val();
        var currUserName = mapUIDToUsername[firebase.auth().currentUser.uid];
        var followedUserName = username;
        var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
        var followedUserUID = mapUsernameToUID[followedUserName];

        var followersOfUserIamFollowing = snapshot.child("users").child(followedUserUID).child("followers").val();

        if(firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("following").child(followedUserName) != null)
        {
          firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("following").child(followedUserName).remove();
        }

        if(followersOfUserIamFollowing.includes(currUserName))
        {
          var usersList = [];
          for(var i = 0; i < followersOfUserIamFollowing.length; i++)
          {
            if(followersOfUserIamFollowing[i] !== currUserName)
            {
              usersList.push(followersOfUserIamFollowing[i]);
            }
          }
          firebase.database().ref().child("users").child(followedUserUID).child("followers").set(usersList);
        }
      });

      resolve("done");
    },

    addBlockedUser: async function(blockedUsers)
    {
      await firebase.database().ref().once('value', (snapshot) => {
        var currUserUID = firebase.auth().currentUser.uid;
        var mapUIDToUsername = snapshot.child("mapUIDtoUsername").val();
        var currUserName = mapUIDToUsername[firebase.auth().currentUser.uid];
        
        var blockedList = [];
        for(var index = 0; index < blockedUsers.length; index++)
        {
          blockedList.push(blockedUsers[index]);
        }

        var currBlockedList = [];
        if(snapshot.child("users").child(firebase.auth().currentUser.uid).hasChild("blockedUsers") === true)
        {
          currBlockedList = snapshot.child("users").child(firebase.auth().currentUser.uid).child("blockedUsers").val();
        }

        for(var index = 0; index < currBlockedList.length; index++)
        {
          if(!blockedList.includes(currBlockedList[index]))
          {
            blockedList.push(currBlockedList[index]);
          }
        }

        firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("blockedUsers").set(blockedList);

        for(var index = 0; index < blockedUsers.length; index++)
        {
          var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
          var uid_blocked = mapUsernameToUID[blockedUsers[index]];
          var blockedFromList = [];
          if(snapshot.child("users").child(uid_blocked).hasChild("usersBlockedFrom") === true)
          {
            blockedFromList = snapshot.child("users").child(uid_blocked).child("usersBlockedFrom").val();
          }
          if(!blockedFromList.includes(currUserName))
          {
            blockedFromList.push(currUserName);
          }

          firebase.database().ref().child("users").child(uid_blocked).child("usersBlockedFrom").set(blockedFromList);
          
        }

      });

      resolve("done");
    },

    removeBlockedUser: async function(blockedUsers)
    {
      await firebase.database().ref().once('value', (snapshot) => {
        var currUserUID = firebase.auth().currentUser.uid;
        var mapUIDToUsername = snapshot.child("mapUIDtoUsername").val();
        var currUserName = mapUIDToUsername[firebase.auth().currentUser.uid];

        var blockedList = [];

        var currBlockedList = [];
        if(snapshot.child("users").child(firebase.auth().currentUser.uid).hasChild("blockedUsers") === true)
        {
          currBlockedList = snapshot.child("users").child(firebase.auth().currentUser.uid).child("blockedUsers").val();
        }

        for(var index = 0; index < currBlockedList.length; index++)
        {
          if(!blockedUsers.includes(currBlockedList[index]))
          {
            blockedList.push(currBlockedList[index]);
          }
        }

        firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("blockedUsers").set(blockedList);

        for(var index = 0; index < blockedUsers.length; index++)
        {
          var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
          var uid_blocked = mapUsernameToUID[blockedUsers[index]];
          var blockedFromList = [];
          var newBlockedFromList = [];
          if(snapshot.child("users").child(uid_blocked).hasChild("usersBlockedFrom") === true)
          {
            blockedFromList = snapshot.child("users").child(uid_blocked).child("usersBlockedFrom").val();
          }
          for(var r = 0; r < blockedFromList.length; r++)
          {
            if(blockedFromList[r] !== currUserName)
            {
              newBlockedFromList.push(blockedFromList[r]);
            }
          }

          firebase.database().ref().child("users").child(uid_blocked).child("usersBlockedFrom").set(newBlockedFromList);
          
        }

      });

      resolve("done");
    },

    getBlockedUser: async function()
    {
      var blockedList = [];
      await firebase.database().ref().once('value', (snapshot) => {
        var currUserUID = firebase.auth().currentUser.uid;
        if(snapshot.child("users").child(firebase.auth().currentUser.uid).hasChild("blockedUsers") === true)
        {
          blockedList = snapshot.child("users").child(firebase.auth().currentUser.uid).child("blockedUsers").val();
        }
      });

      resolve("done");
      return blockedList;
    },

    getUsersBlockedFrom: async function()
    {
      var blockedFrom = [];
      await firebase.database().ref().once('value', (snapshot) => {
        var currUserUID = firebase.auth().currentUser.uid;
        if(snapshot.child("users").child(firebase.auth().currentUser.uid).hasChild("usersBlockedFrom") === true)
        {
          blockedFrom = snapshot.child("users").child(firebase.auth().currentUser.uid).child("usersBlockedFrom").val();
        }
      });

      resolve("done");
      return blockedFrom;
    },
    
    //Description: Method to add and remove topics from a followed user
    addAndRemoveTopicsFromFollowedUser: async function(username, topicsFollow, topicsUnFollow)
    {
      await firebase.database().ref().once('value', (snapshot) => {
        var currUserUID = firebase.auth().currentUser.uid;
        var mapUIDToUsername = snapshot.child("mapUIDtoUsername").val();
        var currUserName = mapUIDToUsername[firebase.auth().currentUser.uid];
        var followedUserName = username;
        var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
        var followedUserUID = mapUsernameToUID[followedUserName];

        if(snapshot.child("users").child(currUserUID).child("following").hasChild(username) === false)
        {
          //ERROR: cannot find username - user should be followed before adding/removing topics from that user
        }
        else
        {
           //user has been verified as followed
          var topicsList = [];
          for(var i = 0; i < topicsFollow.length; i++)
          {
            topicsList.push(topicsFollow[i]);
          }
          for(var i = 0; i < topicsUnFollow.length; i++)
          {
            if(topicsList.includes(topicsUnFollow[i]))
            {
              var index = topicsList.indexOf(topicsUnFollow[i]);
              if(index > -1)
              {
                topicsList.splice(index, 1);
              }
            }
          }
          firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("following").child(followedUserName).set(topicsList);
        }
      });
      
      resolve("done");
    },

    getFollowedAndUnfollowedTopics: async function(username)
    {
      var result;
      await firebase.database().ref().once('value', (snapshot) => {
        var currUserUID = "";
        if(firebase.auth().currentUser != null)
        {
          currUserUID = firebase.auth().currentUser.uid;
          var mapUIDToUsername = snapshot.child("mapUIDtoUsername").val();
          var currUserName = mapUIDToUsername[firebase.auth().currentUser.uid];
        }
        var followedUserName = username;
        var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
        var followedUserUID = mapUsernameToUID[followedUserName];

        var writtenTopics = snapshot.child("users").child(followedUserUID).child("writtenTopics").val();
        var tList = [];
        if(writtenTopics != null && writtenTopics !== undefined)
        {
          for(var v = 0; v < writtenTopics.length; v++)
          {
            if(writtenTopics[v] !== undefined)
            {
              tList.push(writtenTopics[v].topics);
            }
          }
        }
        console.log("WRITTEN TOPICS", tList);
        var followedTopicsList = [];
        var unfollowedTopics = [];
        if(currUserUID !== "")
        {
          var followedTopics = snapshot.child("users").child(currUserUID).child("following").child(followedUserName).val();
          if(followedTopics != null && followedTopics.length !== 0)
          {
            for(var index = 0; index < followedTopics.length; index++)
            {
              if(followedTopics[index] !== "None")
              {
                followedTopicsList.push(followedTopics[index]);
              }
            }
          }
          if(tList != null && tList.length !== 0 && followedTopicsList != null && followedTopicsList.length !== 0)
          {
            for(var i = 0; i < tList.length; i++)
            {
              if(followedTopicsList.includes(tList[i]) === false)
              {
                if(tList[i] !== undefined)
                {
                  unfollowedTopics.push(tList[i]);
                }
              }
            }
          }
          else
          {
            for(var i = 0; i < tList.length; i++)
            {
              unfollowedTopics.push(tList[i]);
            }
            followedTopicsList = [];
          }
        }
        console.log("FOLLOWED TOPICS", followedTopicsList);
        console.log("UNFOLLOWED TOPICS", unfollowedTopics);

        result = {followedTopicsList, unfollowedTopics};
      });

      resolve("done");
      return result;
    },
    //Description: save current Users bio on database.
    //@Params
    //content: string which contians users bio.
    postCurrentUserBio: async function(content) {
        //save current users bio on firebase
        await firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("bio").set(content);
        resolve("done");
    },

    //Delete users data and authentication
    //@Params
    //content: string which contains username
    deleteUserData: async function(username) {
      firebase.database().ref().child("mapUIDtoUsername").child(firebase.auth().currentUser.uid).remove();
      firebase.database().ref().child("mapUsernameToEmail").child(username).remove();
      firebase.database().ref().child("mapUsernameToUID").child(username).remove();

      var profilePic;
      await firebase.database().ref().once('value', (snapshot) => {
        var followingUsers = snapshot.child("users").child(firebase.auth().currentUser.uid).child('followers').val();
        var followedUsers =  snapshot.child("users").child(firebase.auth().currentUser.uid).child('following').val();
        profilePic =  snapshot.child("users").child(firebase.auth().currentUser.uid).child('picture').val();
        //remove users name from the following list of the users who follow them
        for (var key in followingUsers) {
          console.log(followingUsers[key])
          var followerUid = snapshot.child("mapUsernameToUID").child(followingUsers[key]).val();
          console.log(followerUid);
          firebase.database().ref().child('users').child(followerUid).child('following').child(username).remove();
        }

        //remove users name from the followers list of the users who they follow
        for (var key in followedUsers) {
          var followingUserUid = snapshot.child("mapUsernameToUID").child(key).val();
          console.log(followingUserUid);
          var followerlist = snapshot.child('users').child(followingUserUid).child('followers').val();
          console.log(followerlist);
          for (var index in followerlist) {
            if(followerlist[index] === username) {
              console.log(index);
              firebase.database().ref().child('users').child(followingUserUid).child('followers').child(index).remove();
              break;
            }
          }
        }
      });

      if(profilePic.localeCompare("default.jpg") != 0) {
        firebase.storage().child(profilePic).remove();
      }
      firebase.auth().currentUser.delete();
      firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).remove();
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

    //use this function to get all related microblogs for a user's timeline (including following)
    getMicroblogsForUserTimeline: async function(username)
    {
      var Microblogs = [];
      await firebase.database().ref().once('value', (snapshot) => {
        var mapUsernameToUID = snapshot.child("mapUsernameToUID").val();
        var uidOfUser = mapUsernameToUID[username];
        snapshot.child("users").child(uidOfUser).child("following").forEach(function(childSnapshot)
        {
          var followedUsername = childSnapshot.key;
          var followedTopics = childSnapshot.val();
          var uidOfFollowedUser = mapUsernameToUID[followedUsername];
          var microblogs = snapshot.child("users").child(uidOfFollowedUser).child("Microblogs").val();

          var followingTimestamp = snapshot.child("users").child(uidOfUser).child("followingTimestamp").val();
          var followingTimestampOfFollowedUser = followingTimestamp[followedUsername];
          var writtenTopics = snapshot.child("users").child(uidOfFollowedUser).child("writtenTopics").val();
          
          if(microblogs != undefined || microblogs != null)
          {
            for(var i = 0; i < microblogs.length; i++)
            {

              //first check if any new topics were added and include the first microblog with that new topic highlighted
              var currMicroblog = microblogs[i];
              var topicsList = currMicroblog.topics;

              if (topicsList != undefined || topicsList != null) {

                var foundNewTopic = false;
                for (var t = 0; t < topicsList.length; t++) {
                  
                  for (var w = 0; w < writtenTopics.length; w++) {
                    if (writtenTopics[w].topics == topicsList[t]) {
                      if (writtenTopics[w].timestamp == microblogs[i].timestamp) {
                        if (followingTimestampOfFollowedUser < writtenTopics[w].timestamp) {
                          //console.log("true", microblogs[i].timestamp);
                          microblogs[i].topics[t] = "/h" + microblogs[i].topics[t];
                          foundNewTopic = true;
                        }
                      }
                    }
                  }


                }

                if (foundNewTopic) {
                  Microblogs.push(currMicroblog);
                  continue;
                }


                for(var j = 0; j < topicsList.length; j++)
                {
                  if(followedTopics.includes(topicsList[j]))
                  {
                    Microblogs.push(currMicroblog);
                    break;
                  }
                }
              }
            }
          }
        });
      });

      resolve("done");
      //Sort Microblogs based on timestamp
      Microblogs.sort(function(m1, m2)
      {
        return m1.timestamp > m2.timestamp ? -1 : 1;
      });
      return Microblogs;
    },

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
        if(Microblogs != null && Microblogs.length !== 0)
        {
          Microblogs.sort(function(m1, m2)
          {
            return m1.timestamp > m2.timestamp ? -1 : 1;
          });
        }
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
        if(Microblogs != null && Microblogs.length !== 0)
        {
          Microblogs.sort(function(m1, m2)
          {
            return m1.timestamp > m2.timestamp ? -1 : 1;
          });
        }
        return Microblogs;
      },

      getUserdataOfLoggedInUser: async function() {
        var userData;

        var loggedIn = true;

        

        firebase.auth().onAuthStateChanged(async function(user) {          
          if (user) {

            userData = await helperfunctions.getUserdataOfUser(user.uid, loggedIn);
            resolve("done");
            return userData;
          } else {
            console.log("null");
            // No user is signed in.
          }
        });

        
        /* while(userData == undefined){
          console.log("undefined")
        } */
        
      },

      getUserdataOfUser : async function(uid, loggedIn) {
        var userData;

        
        await firebase.database().ref().once('value', (snapshot) => {
          var UIDtoUsername = snapshot.child('mapUIDtoUsername').val();
          var username = UIDtoUsername[uid];
          userData = new UserData(username, loggedIn, true);
          //this.email = user.email;
        });

        resolve("done");
        return userData;
      },

      getUserdataOfUserDiff : async function(username, loggedIn) {
        var userData;

        
        await firebase.database().ref().once('value', (snapshot) => {
          userData = new UserData(username, loggedIn, true);
          //this.email = user.email;
        });

        resolve("done");
        return userData;
      }





}

export default helperfunctions;
