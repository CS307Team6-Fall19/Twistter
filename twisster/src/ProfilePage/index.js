import React, { Component } from "react";
import { withRouter } from "react-router";
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"

import ProfilePageView from "./ProfilePageView";
import UserData from "../DataObjects/UserData";

class ProfilePage extends React.Component {
  
    constructor(props){
      super(props); 

      this.getUser = this.getUser.bind(this);

      /* if(props.location.pathname != "/profile"){
        this.path = props.location.pathname;
        this.username = this.path.substring(9, this.path.length);
        
        this.getUser(this.username);
      }
      else */
        this.userData = this.props.location.state.userData;
    }

    getUser(username){
      this.userData = new UserData(username, false);
    }

    render(){
        
        return <ProfilePageView userData={this.userData}/>;
    }

    
}
export default withRouter(ProfilePage);


