import React, { Component } from "react";
import { withRouter } from "react-router";

import MicroblogWriter from "../MicroblogWriter";
import helperfunctions from "../helperfunctions";
import firebase from "firebase";
import TopBar from "../TopBar";
import Microblogs from "../Microblogs";
import AutoCompleteSearchBar from "../AutoCompleteSearchBar/AutoCompleteSearchBar"
import QuotedMicroblog from "../QuotedMicroblog"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resolve } from "q";

class Landing extends Component {

    constructor(props) {

        super(props);        


        this.state = {

            loaded: false
        }
        
        this.editMode = false;

        this.microblogPosted = this.microblogPosted.bind(this);
        this.getAllUsernames = this.getAllUsernames.bind(this);
    }

    async microblogPosted(){
        await this.updateMicroblogs();
        this.setState({loaded : true});
    }

    async updateMicroblogs(){
        toast("Microblog posted!");
        this.microblogs = await helperfunctions.getMicroblogsForUserTimeline(this.userData.username);
        resolve("done");
    }
    
    async componentDidMount() {

        //verify user is logged in before displaying page
        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
            this.props.history.push({
                pathname: "/login"
            });
                return (null);
            } else {
                var loggedIn = true;
                var user = firebase.auth().currentUser;
                this.userData = await helperfunctions.getUserdataOfUser(user.uid, loggedIn);
                
            
                this.microblogs = await helperfunctions.getMicroblogsForUserTimeline(this.userData.username);
                this.setState({loaded : true});
            }
        });
    }

    goToProfile(){
        this.props.history.push({
          pathname: "/profile",
          state: { userData: this.userData }
        })
    }

    getAllUsernames(){
        var user_list = [];
        const promise = firebase.database().ref().once('value', (snapshot)=> {
            var all_users = snapshot.child("mapUsernameToEmail").val();
            var key;
            for (key in all_users) {
                if (all_users[key] != firebase.auth().currentUser.email) {
                    user_list.push(key);
                }
            }
        });
        return user_list;
    }

    render() {

        if(this.state.loaded){
            return(
                <div>
                    <TopBar userData={this.userData}/>
                    <MicroblogWriter 
                        username={this.userData.username} 
                        microblogPosted={this.microblogPosted}
                        quotedMicroblog={false}
                    />
                    <Microblogs microblogs={this.microblogs} username={this.userData.username} loggedInUser={this.userData.username}/>   


                    
                </div>
                
            );

        } else{
            return  null;
        }
        
    }

}
export default withRouter(Landing); 