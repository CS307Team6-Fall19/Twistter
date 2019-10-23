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
        this.editMode = true;
        this.setState({
          editMode : 1
        })
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