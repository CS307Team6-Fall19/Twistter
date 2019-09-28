import React, { Component } from "react";
import { withRouter } from "react-router";
import Clock from "./DataObjects/Clock"
import app from "./base";
import ReactDOM from 'react-dom';
import firebase from "firebase";
import './Landing.css'
import { TweetBody } from './DataObjects/Microblog.js'
import { NewTweetBody } from './DataObjects/Microblog.js'
import { TopBar } from './DataObjects/Microblog.js'
//import UserData from "../DataObjects/User";

class Landing extends Component {

  componentDidMount () {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          console.log("user is not null");
          console.log("user id: " + user.uid);

          //set a value (erase previous values or update) in firebase database
          //firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('followedTopics').set({'0': 'blabla'}); //erases everything and pushes new value at location
          //firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('followedTopics').update({'0': 'blabla'}); //updates value at location

          //fetch and update value in firebase database
          //app.database().ref().once('value', (snapshot) => { //.once means fetch value and do this function once
          //document.getElementById('email').innerHTML = snapshot.child('users').child(app.auth().currentUser.uid).child('email').val();
          //var test = snapshot.child('users').child(app.auth().currentUser.uid).child('followedTopics').val();
          //test.splice(0, 1);
          //test.push('test6');
          //console.log(test);
          //app.database().ref().child('users').child(app.auth().currentUser.uid).child('followedTopics').set(test);
          // });

      } else {
        console.log("user is null");
      }
    });
  }

  constructor(props) {
    super(props)
    this.state={
      users:
      [ 
      ],
      value:""
    }
    //this.handleRefresh = this.handleRefresh.bind(this)
   this.getUser = this.getUser.bind(this)
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.goToProfile = this.goToProfile.bind(this);

  }

  goToProfile(){
    this.props.history.push({
      pathname: "/profile",
      state: { userData: this.userData }
    })
  }
/*
  constructor(props){
      super(props)
  }
  
  render() {
    return(
      <div>
      {this.renderWelcome()}
      </div>
    );
  }*/

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.getUser()
  }

  componentWillMount() {
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
    return (
        <div className="main-body">
        <TopBar onClick={this.goToProfile}/>
        {[...this.state.users].map((user, index) => {
          let name = `${user.name.first} ${user.name.last}`
          let handle = `@${user.name.first}${user.name.last}`
          let image = user.image
          let tweet = user.tweet
          console.log(image)
          if (index == 0) {
          return(
            <NewTweetBody 
              key={index}
              name='{name}'
              handle={handle}
              newTweet={tweet}
              image={image} 
              onSubmit={this.handleSubmit}
              />
            )
          } else {
            return(
            <TweetBody 
              key={index}
              name={name}
              handle={handle}
              tweet={tweet}
              image={image} />
            )
          }
        })}      
      </div>
    );
  }


/*  renderClock(){
    ReactDOM.render(
      <Clock />,
      document.getElementById('root')
    );
  }

  renderWelcome = () => {
    return(
      <div>
        <h1>Welcome to Twistter!</h1>
        <form>
        <label id='email'>hello</label>
        </form>
      </div>
    );
  }*/
}

export default withRouter(Landing);