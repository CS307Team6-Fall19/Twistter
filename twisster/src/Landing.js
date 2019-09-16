import React, { Component } from "react";
import { withRouter } from "react-router";
import Clock from "./DataObjects/Clock"
import app from "./base";
import ReactDOM from 'react-dom';
import firebase from "firebase";

class Landing extends Component {
    constructor(props){
        super(props)
        /* this.useruid = this.useruid.bind(this);
        firebase.auth().onAuthStateChanged(function(user) {
          this.useruid = user.uid;
        });   */
        this.renderClock();
    }
    
    render() {
      return(
        <div>
        {this.renderWelcome()}
        
        </div>
      );
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
          <label>hello</label>
          </form>
        </div>
      );
    }
}

export default withRouter(Landing);