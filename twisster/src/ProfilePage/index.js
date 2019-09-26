import React, { Component } from "react";
import { withRouter } from "react-router";
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"

import ProfilePageView from "./ProfilePageView";

class ProfilePage extends React.Component {
  
    constructor(props){
      super(props); 
      this.userData = this.props.location.state.userData;
    }

    
    render(){
        
        return <ProfilePageView userData={this.userData}/>;
    }

    
}
export default withRouter(ProfilePage);


