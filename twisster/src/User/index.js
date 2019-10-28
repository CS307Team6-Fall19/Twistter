import React, { Component } from 'react';
import { withRouter } from "react-router";

import helperfunctions from '../helperfunctions.js'
import Microblogs from '../Microblogs'

import LoggedInUserView from "./UserProfileViews/LoggedInUserView";
import LoggedInUserEditView from "./UserProfileViews/LoggedInUserEditView"
import VisitedUserView from "./UserProfileViews/VisitedUserView"

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { resolve } from 'q';

class User extends React.Component{


    constructor(props) {

        super(props);


        this.username = props.user.userData.username;
        this.loggedIn = props.user.userData.loggedIn;
        this.loggedInViewingOwnProfile = props.user.userData.viewingOwnProfile;

        this.editProfile = this.editProfile.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
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
        this.editMode = true;
        this.setState({
          editMode : 1
        })
    }

  deleteAccount() {
    helperfunctions.deleteUserData(this.username);
    this.loggedIn = false;
    this.props.history.push({
        pathname: "/login"
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

    followUser(){
        console.log("following");
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

        if(!this.loggedIn){
            document.getElementById('followbutton').disabled = true;
            document.getElementById('logout').disabled = true;
            document.getElementById('profile').disabled = true;
        }
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
                if (this.loggedInViewingOwnProfile) {
                    return this.renderLoggedInUser(this.userProfile, this.deleteAccount);
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

    renderLoggedInUser(userProfile, deleteAccount){

        if(this.editMode){
            return(
                <div>
                    <LoggedInUserEditView userProfile={userProfile} deleteAccount={deleteAccount}/>
                    <Microblogs microblogs={userProfile.microblogs} username={userProfile.username} />
                </div>
            );
        }

        else{
            return (
                <div>
                    <LoggedInUserView userProfile={userProfile} deleteAccount={deleteAccount}/>
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

export default withRouter(User);
