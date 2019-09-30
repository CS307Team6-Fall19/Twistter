import React, { Component } from "react";
import { withRouter } from "react-router";

import firebase from "firebase";
import UserData from "../DataObjects/UserData";
import { TweetBody } from '../DataObjects/Microblog.js'
import { NewTweetBody } from '../DataObjects/Microblog.js'
import { TopBar } from '../DataObjects/Microblog.js'
import './Landing.css'
import LandingLogoutView from "./LandingLogoutView";
import LandingProfileView from "./LandingProfileView";
import HelperFunctions from "../helperfunctions";

class Landing extends Component {
  
  constructor(props){
    super(props); 

    this.state={
      users:
      [ 
      ]
    }

    this.getUser = this.getUser.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.goToProfile = this.goToProfile.bind(this);
    this.goLogout = this.goLogout.bind(this);

    //this.email = this.email.bind(this);
  }

  /* componentDidMount = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //CHANGE WHEN USER HAS USERNAME
        this.loggedIn = true;
        this.userData = new UserData(user.email, this.loggedIn);
        
        document.getElementById('name').innerHTML = user.email;
      } else {
        console.log("user is null");
      }
    }.bind(this));
  } */

  goToProfile(){
    this.props.history.push({
      pathname: "/profile",
      state: { userData: this.userData }
    })
  }

  //gets a list of all the microblogs that the current user has posted and the posts he/she follows
  getMicroblogsForCurrentUser() {
    firebase.database().ref().once('value', (snapshot) => {
      let mapUIDtoUsername = snapshot.child("mapUIDtoUsername").val();
      let usernameOfUser = mapUIDtoUsername[firebase.auth().currentUser.uid];
      let Microblogs = snapshot.child("users").child(firebase.auth().currentUser.uid).child("Microblogs").val();
      if(Microblogs != null)
      {
        for (var i = 0; i < Microblogs.length; i++) {
          this.getUser(usernameOfUser, Microblogs[i].content);
        }
      }
    });
  }

  //whenever we add a new microblog from our draft, that gets uploaded to firebase and must be show
  //in our current timeline so add that draft, then re-fetch the list of microblogs
  handleSubmit(event) {
    var content = document.getElementById("content").value;
    console.log(content);
    HelperFunctions.addMicroBlogToCurrentUser(content, []);
    //upload your microblog draft here
    /*


    */


    //fetches the latest list of microblogs
    this.state.users = []; //erase previous list of microblogs and re-fetch them from server and populate the page
    this.getMicroblogsForCurrentUser();
  }

  //get list of microblogs when page first loads
  componentDidMount() {
    this.getMicroblogsForCurrentUser();
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //CHANGE WHEN USER HAS USERNAME
        this.loggedIn = true;
        this.userData = new UserData(user.email, this.loggedIn);
        this.email = user.email;
       // document.getElementById('name').innerHTML = user.email;
      } else {
        console.log("user is null");
      }
    }.bind(this));
  }

 getUser(nameInput, tweetInput) {
    fetch('https://randomuser.me/api/')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      this.setState({
        users:[
          {
            name: nameInput,//data.results[0].name,
            image: "",//data.results[0].picture.medium,
            tweet: tweetInput,
          },
          ...this.state.users,
        ]
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    /* return (
      <div>
        <LandingLogoutView onClickLogout={this.goLogout} />
        <LandingProfileView onClickProfile={this.goToProfile}/>;
      </div>
    ); */
    return (
      <div className="main-body">
      <TopBar onClick={this.goToProfile}/>
      <NewTweetBody  
            name='{name}'
            handle='{handle}'
            newTweet='{tweet}'
            image={this.getUser.image}
            onClick={this.handleSubmit}/>
      {[...this.state.users].map((user, index) => {
        let name = `${user.name}`
        let handle = `@${user.name}`
        let image = user.image
        let tweet = user.tweet
        console.log(image)
          return(
          <TweetBody 
            key={index}
            name={name}
            handle={handle}
            tweet={tweet}
            image={image} />
          )
      })}      
    </div>
  );
  }

  goLogout = async event => {
    firebase.auth.signOut()
      .then(function() {
        console.log("Signout succesful");
      })
      .catch(function(error) {
        console.log("Error");
      })

    this.props.history.push({
      pathname: "/login"
    })
  };

  
}

export default withRouter(Landing);