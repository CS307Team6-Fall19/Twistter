import React, { Component } from "react";
import { withRouter } from "react-router";

import MicroblogWriter from "../MicroblogWriter";
import helperfunctions from "../helperfunctions";
import firebase from "firebase";
import TopBar from "../TopBar";
import Microblogs from "../Microblogs";

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

    render() {

        if(this.state.loaded){
            
            return(
                <div>
                    <TopBar userData={this.userData}/>
                    <MicroblogWriter username={this.userData.username} microblogPosted={this.microblogPosted}/>
                    <Microblogs microblogs={this.microblogs} username={this.userData.username} />                               
                </div>
                
            );

        } else{
            return  null;
        }
        
    }

}
export default withRouter(Landing); 