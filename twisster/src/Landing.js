import React, { Component } from "react";
import { withRouter } from "react-router";
import Clock from "./DataObjects/Clock"
import app from "./base";
import ReactDOM from 'react-dom';
import firebase from "firebase";
import LandingView from "./LandingView"
import login from "./LogIn"
import { async } from "q";
import LogInView from "./LogIn/LogInView";

class Landing extends Component {

  componentDidMount () {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("user is not null");
        console.log("user id: " + user.uid);

        //set a value (erase previous values or update) in firebase database
        firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('followedTopics').set({'0': 'blabla'}); //erases everything and pushes new value at location
        //firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('followedTopics').update({'0': 'blabla'}); //updates value at location

        //fetch and update value in firebase database
        app.database().ref().once('value', (snapshot) => { //.once means fetch value and do this function once
          //document.getElementById('email').innerHTML = snapshot.child('users').child(app.auth().currentUser.uid).child('email').val();
          //var test = snapshot.child('users').child(app.auth().currentUser.uid).child('followedTopics').val();
          //test.splice(0, 1);
          //test.push('test6');
          //console.log(test);
          //app.database().ref().child('users').child(app.auth().currentUser.uid).child('followedTopics').set(test);
        });

      } else {
        console.log("user is null");
      }
    });
  }

  constructor(props){
      super(props)
  }
  

  goLogout = async event  => {
    jds
    firebase.auth().signOut()
      .then(function() {
        console.log("Signout succesful");
      })
      .catch(function(error) {
        console.log("Error");
      });
    ;
    
    this.props.history.push({
      pathname: "/login"
    });
 
    this.renderLogin();

  };

  renderLogin() {
    return <LogInView/>;
  }


  render() {
    /*return(
      <div>
      {this.renderWelcome()}
      </div>
    );*/
    return <LandingView onClick = {this.goLogout} />;
  }

  renderClock(){
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
  }
}

export default withRouter(Landing);