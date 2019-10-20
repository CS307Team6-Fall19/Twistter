import React, { Component } from "react";
import { withRouter } from "react-router";

import ProfilePageView from "./ProfilePageView";
import UserData from "../DataObjects/UserData";
import TopBar from "../TopBar";

class ProfilePage extends React.Component {
  
    constructor(props){
      super(props); 

      this.getUser = this.getUser.bind(this);

      if(props.location.pathname != "/profile"){
        this.path = props.location.pathname;
        this.username = this.path.substring(9, this.path.length);
        this.getUser(this.username);
      }
      else{
        console.log(this.props.location.state);
        this.userData = this.props.location.state.userData;
      }
    }

    getUser(username){
      this.userData = new UserData(username, false);
    }

    render(){
      return (
        <div>
          <TopBar/>
          <ProfilePageView userData={this.userData}/>
        </div>
      );
    }
}
export default withRouter(ProfilePage);


