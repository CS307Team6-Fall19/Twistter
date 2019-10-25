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
        this.microblogs = await helperfunctions.getMicroblogsForUser(this.userData.username);
        resolve("done");
    }
    
    async componentDidMount() {

<<<<<<< HEAD
        var loggedIn = true;
=======
    window.setTimeout(() => {
      this.updateMicroblogsList();
    }, 1000);
  }

  updateMicroblogsList() {
    //fetches the latest list of microblogs
    this.state.users = []; //erase previous list of microblogs and re-fetch them from server and populate the page
    
    firebase.database().ref().once('value', (snapshot) => {
      var mapUIDtoUsername = snapshot.child("mapUIDtoUsername").val();
      var usernameOfUser = mapUIDtoUsername[firebase.auth().currentUser.uid];
      var Microblogs = snapshot.child("users").child(firebase.auth().currentUser.uid).child("Microblogs").val();

      if (Microblogs != null) {
        for (var i = 0; i < Microblogs.length; i++) {
          this.getUser(usernameOfUser, Microblogs[i].content, Microblogs[i].topics);
        }
      }
    });
  }

  //get list of microblogs when page first loads
  async componentDidMount() {
    
    //verify user is logged in before displaying page
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (!user) {
        this.props.history.push({
          pathname: "/login"
        });
        return (null);
      }

      this.getMicroblogsForCurrentUser();
    });
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        //CHANGE WHEN USER HAS USERNAME
        this.loggedIn = true;

        firebase.database().ref().once('value', (snapshot) => {
          var UIDtoUsername = snapshot.child('mapUIDtoUsername').val();
          var username = UIDtoUsername[user.uid];

          this.userData = new UserData(username, this.loggedIn);
          this.email = user.email;
        });
>>>>>>> 38286559cff1360c5cc2e59aefee51927c8e9ab3

        var user = firebase.auth().currentUser;
        this.userData = await helperfunctions.getUserdataOfUser(user.uid, loggedIn);
        
       
        this.microblogs = await helperfunctions.getMicroblogsForUser(this.userData.username);
        this.setState({loaded : true});

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