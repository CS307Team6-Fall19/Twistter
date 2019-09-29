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

class Landing extends Component {
  
  constructor(props){
    super(props); 

    this.state={
      users:
      [ 
      ]
    }

    this.getUser = this.getUser.bind(this)
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

  handleSubmit(event) {
    this.getUser()
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
    this.getUser()
    this.getUser()
    this.getUser()
    this.getUser()
  }

 getUser() {
    fetch('https://randomuser.me/api/')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      this.setState({
        users:[
          {
            name: data.results[0].name,
            image: data.results[0].picture.medium,
            tweet: data.results[0].email,
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
            name={this.email}
            handle='{handle}'
            newTweet='{tweet}'
            image={this.getUser.image}
            onClick={this.handleSubmit}/>
      {[...this.state.users].map((user, index) => {
        let name = `${user.name.first} ${user.name.last}`
        let handle = `@${user.name.first}${user.name.last}`
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