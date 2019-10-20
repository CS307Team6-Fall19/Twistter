import React, { Component } from "react";
import { withRouter } from "react-router";

import MicroblogWriter from "../MicroblogWriter";
import HelperFunctions from "../helperfunctions";
import helperfunctions from "../helperfunctions";
import firebase from "firebase";
import TopBar from "../TopBar";
import Microblogs from "../Microblogs";
import { resolve } from "path";
class Landing extends Component {
    constructor(props) {

        super(props);        

        
        
        this.state = {
            loaded: false
        }
        
        this.editMode = false;
    }

    async componentDidMount() {

        var loggedIn = true;

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
                {/* <TopBar onClick={this.goToProfile} /> */}
                <TopBar userData={this.userData}/>
                <MicroblogWriter username={this.userData.username} />
                <Microblogs microblogs={this.microblogs} username={this.userData.username} />
                </div>
            );

        } else{
            return null;
        }
        
    }

}
export default withRouter(Landing); 