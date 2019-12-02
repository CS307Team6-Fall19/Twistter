import React, { Component } from 'react';
import { withRouter } from "react-router";

import helperfunctions from '../helperfunctions.js'
import Microblogs from '../Microblogs'
import CheckboxContainer from '../ProfilePage/checkBox.jsx'

import ProfilePicture from '../ProfilePicture'
import LoggedInUserView from "./UserProfileViews/LoggedInUserView";
import LoggedInUserEditView from "./UserProfileViews/LoggedInUserEditView"
import VisitedUserView from "./UserProfileViews/VisitedUserView"

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { resolve } from 'q';
import ProfilePageView from '../ProfilePage/ProfilePageView.js';

import firebase from "firebase";

class User extends React.Component{


    constructor(props) {

        super(props);


        this.username = props.user.userData.username;
        this.loggedIn = props.user.userData.loggedIn;
        this.loggedInViewingOwnProfile = props.user.userData.viewingOwnProfile;

        this.editProfile = this.editProfile.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.followOrUnfollowUser = this.followOrUnfollowUser.bind(this);
        this.directMessageUser = this.directMessageUser.bind(this);
        this.blockUser = this.blockUser.bind(this);
        this.submitRestrictDM = this.submitRestrictDM.bind(this);
        
        this.renderLoggedInUser = this.renderLoggedInUser.bind(this);
        this.renderVisitedUser = this.renderVisitedUser.bind(this);

        this.state = {
            loaded: false
        }
        
        this.editMode = false;
    }

    async submitRestrictDM()
    {
        if(document.getElementById("checkRestrictDM").checked === true)
        {
            var usernames = await helperfunctions.getAllUsers(this.username);
            var objList = await helperfunctions.getFollowersAndFollowing(this.username);
            var following = objList.following;
            var blockUsers = [];
            for(var index = 0; index < usernames.length; index++)
            {
                if(!following.includes(usernames[index]))
                {
                    blockUsers.push(usernames[index]);
                }
            }
            await helperfunctions.removeBlockedUser(usernames);
            await helperfunctions.addBlockedUser(blockUsers);
        }
        else if(document.getElementById("checkRestrictDM").checked === false)
        {
            var usernames = await helperfunctions.getAllUsers(this.username);
            var objList = await helperfunctions.getFollowersAndFollowing(this.username);
            var following = objList.following;
            var blockUsers = [];
            for(var index = 0; index < usernames.length; index++)
            {
                if(!following.includes(usernames[index]))
                {
                    blockUsers.push(usernames[index]);
                }
            }
            await helperfunctions.removeBlockedUser(blockUsers);
        }
    }

    editProfile(){
        this.editMode = true;
        this.setState({
          editMode : 1
        })
    }

  deleteAccount() {
    this.loggedIn = false;
    this.props.history.push({
        pathname: "/DeleteAccount"
    });
  }
  
    saveChanges(){
    
        var bio_cont = document.getElementById('bioTextBox').value;
        helperfunctions.postCurrentUserBio(bio_cont);

        this.editMode = false;
        this.setState({
        mustUpdate : 1
        })
    }

    async followOrUnfollowUser(){
    
        if (document.getElementById('followbutton').textContent ==  "Follow") {
            await helperfunctions.followUserIAmViewing(this.username);
            var objList = await helperfunctions.getFollowersAndFollowingForCurrentUser();
            var following = objList.following;
            var blockedUsers = await helperfunctions.getBlockedUser();
            var check = true;
            for(var index = 0; index < blockedUsers.length; index++)
            {
                if(following.includes(blockedUsers[index]))
                {
                    check = false;
                }
            }
            if(blockedUsers.length !== 0 && check === true)
            {
                var unblockedUsers = [];
                unblockedUsers.push(this.username);
                await helperfunctions.removeBlockedUser(unblockedUsers);
            }
            document.getElementById('followbutton').textContent = "Unfollow";
            this.setState({ follow : 0});
        } else {
            await helperfunctions.unfollowUserIAmViewing(this.username);
            var objList = await helperfunctions.getFollowersAndFollowingForCurrentUser();
            var following = objList.following;
            var blockedUsers = await helperfunctions.getBlockedUser();
            var check = true;
            for(var index = 0; index < blockedUsers.length; index++)
            {
                if(following.includes(blockedUsers[index]))
                {
                    check = false;
                }
            }
            if(blockedUsers.length !== 0 && check === true)
            {
                var blockedUsers = [];
                blockedUsers.push(this.username);
                await helperfunctions.addBlockedUser(blockedUsers);
            }
            document.getElementById('followbutton').textContent = "Unfollow";
            this.setState({ follow : 1});
            document.getElementById('followbutton').textContent = "Follow";
        }

        this.followersAndFollowing = await helperfunctions.getFollowersAndFollowing(this.username);
        this.userProfile.followersAndFollowing = this.followersAndFollowing;
        this.setState({ mustUpdate : 1})
    }

    directMessageUser() {
        this.props.history.push({
            pathname: "/chat",
            state: { dmUsername: this.username,
                    topBar: false }
        });
    }

    async blockUser() {
        if(document.getElementById('blockbutton').textContent === "Block")
        {
            var currBlocked = await helperfunctions.getBlockedUser();
            if(!currBlocked.includes(this.username))
            {
                var blockedUsers = [];
                blockedUsers.push(this.username);
                await helperfunctions.addBlockedUser(blockedUsers);
            }
            document.getElementById('blockbutton').textContent = "Unblock";
            document.getElementById('directmessagebutton').disabled = true;
        }
        else if(document.getElementById('blockbutton').textContent === "Unblock")
        {
            var currBlocked = await helperfunctions.getBlockedUser();
            if(currBlocked.includes(this.username))
            {
                var blockedUsers = [];
                blockedUsers.push(this.username);
                await helperfunctions.removeBlockedUser(blockedUsers);
            }
            document.getElementById('blockbutton').textContent = "Block";
            document.getElementById('directmessagebutton').disabled = false;
        }
    }

    async componentDidMount() {

        if(!this.loggedIn){
            document.getElementById('followbutton').disabled = true;
            document.getElementById('logout').disabled = true;
            document.getElementById('profile').disabled = true;
        }

        this.userProfile = new Object();
        this.userProfile.saveChanges = this.saveChanges;
        this.userProfile.editProfile = this.editProfile;
        this.userProfile.followUser = this.followOrUnfollowUser;
        this.userProfile.dmUser = this.directMessageUser;
        this.userProfile.blockUser = this.blockUser;
        await this.downloadUserProfile(this.userProfile);
        this.setState({loaded : true});

        if(this.loggedInViewingOwnProfile === true)
        {
            var objList = await helperfunctions.getFollowersAndFollowing(this.username);
            var following = objList.following;
            var blockedUsers = await helperfunctions.getBlockedUser();
            var check = true;
            for(var index = 0; index < blockedUsers.length; index++)
            {
                if(following.includes(blockedUsers[index]))
                {
                    check = false;
                }
            }
            if(check === false || blockedUsers.length === 0)
            {
                document.getElementById("checkRestrictDM").checked = false;
            }
            else if(check === true)
            {
                document.getElementById("checkRestrictDM").checked = true;
            }

        }
        var blockedUsers = await helperfunctions.getBlockedUser();

        var usersBlockedFrom = await helperfunctions.getUsersBlockedFrom();

        if(this.loggedInViewingOwnProfile === false)
        {
            if(usersBlockedFrom !== undefined && usersBlockedFrom.length !== 0 && usersBlockedFrom.includes(this.username))
            {
                document.getElementById("directmessagebutton").disabled = true;
                if(blockedUsers !== undefined && blockedUsers.length !== 0 && blockedUsers.includes(this.username))
                {
                    document.getElementById("blockbutton").textContent = "Unblock";
                }
                else
                {
                    document.getElementById("blockbutton").textContent = "Block";
                }
            }
            else
            {
                if(blockedUsers !== undefined && blockedUsers.length !== 0 && blockedUsers.includes(this.username))
                {
                    document.getElementById("directmessagebutton").disabled = true;
                    document.getElementById("blockbutton").textContent = "Unblock";
                }
                else
                {
                    document.getElementById("directmessagebutton").disabled = false;
                    document.getElementById("blockbutton").textContent = "Block";
                }

            }
        }

        //check if I am currently following the user I am viewing and if so, change button text to "unfollow"
        if(this.loggedInViewingOwnProfile === false)
        {
            await firebase.database().ref().once('value', (snapshot) => {
                var mapUIDToUsername = snapshot.child("mapUIDtoUsername").val();
                var currUserName = mapUIDToUsername[firebase.auth().currentUser.uid];
    
                if ((this.userProfile.followersAndFollowing.followers).includes(currUserName)) {
                    document.getElementById('followbutton').textContent = "Unfollow";
                }
            });
        }
    }

    async componentDidUpdate(prevProps){

        await this.downloadUserProfile(this.userProfile);

        if (this.props.userID !== prevProps.userID) {
            this.fetchData(this.props.userID);
        }

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
                if (this.loggedInViewingOwnProfile) {
                    return this.renderLoggedInUser(this.userProfile, this.deleteAccount, this.submitRestrictDM);
                } else {

                    return this.renderVisitedUser(this.userProfile);
                }
            }
            else{
                return this.renderVisitedUser(this.userProfile);
            }

        } else{
            return null;
        }
        
    }

    renderLoggedInUser(userProfile, deleteAccount, submitRestrictDM){

        if(this.editMode){
            return(
                <div>
                    <LoggedInUserEditView userProfile={userProfile} deleteAccount={deleteAccount} submitRestrictDM={submitRestrictDM}/>
                    <Microblogs microblogs={userProfile.microblogs} username={userProfile.username} />
                    
                </div>
            );
        }

        else{
            return (
                <div>
                    <ProfilePicture strangername={this.username} visiting={false}/>
                    <LoggedInUserView userProfile={userProfile} deleteAccount={deleteAccount} submitRestrictDM={submitRestrictDM}/>
                    <Microblogs microblogs={userProfile.microblogs} username={userProfile.username} />
                    
                </div>
            );
        }
    }

    renderVisitedUser(userProfile){

        return(
            <div>
                <ProfilePicture strangername={this.username} visiting={true}/>
                <VisitedUserView userProfile={userProfile}/>
                <Microblogs microblogs={userProfile.microblogs} username={userProfile.username} />
               
            </div>
        );
    }

    
}

export default withRouter(User);
