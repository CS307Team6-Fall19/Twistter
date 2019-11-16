import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../base";
import TopBarLoginSignup from "../TopBarLoginSignup";
import helperfunctions from '../helperfunctions.js'

import { ToastContainer, toast } from "react-toastify";
import firebase from "firebase";

import "react-toastify/dist/ReactToastify.css";
import DeleteAccountAuthenticationView from "./DeleteAccountAuthenticationView";

class DeleteAcountAuthenticationContainter extends Component {
    constructor(props){
        super(props);
        this.handleLogIn = this.handleLogIn.bind(this);
    }
  
    handleLogIn = async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        var user_exists = false;
        var currentEmail = firebase.auth().currentUser.email;
        var currentUsername = null;

        if(email.value == currentEmail) {
            user_exists = true;
            await app
            .database()
            .ref()
            .once("value", snapshot => {
                var user_email_list = snapshot.child("mapUsernameToEmail").val();
                var username;
                for (username in user_email_list) {
                    if (user_email_list[username] == currentEmail) {
                        currentUsername = username;
                        break;
                    }
                }
            }); 
        }
        else {
            await app
            .database()
            .ref()
            .once("value", snapshot => {
                var user_email_list = snapshot.child("mapUsernameToEmail").val();
                
                console.log(user_email_list[email.value]);
                if (user_email_list[email.value] != undefined) {
                    if (user_email_list[email.value] == currentEmail) {
                        currentUsername = email.value;
                        user_exists = true;
                    }
                }
            }); 
        }
  
        if (!user_exists) {
          toast("The Email/Username or Password is incorrect");
          toast("The Email/Username or Password is incorrect", { containerId: "B" });
          return;
        }
  
        var valid_password = true;
        this.user = await app
          .auth()
          .signInWithEmailAndPassword(currentEmail, password.value).catch(function() {
            valid_password = false;
          });

        if (!valid_password) {
          toast("The Email/Username or Password is incorrect");
          toast("The Email/Username or Password is incorrect", { containerId: "B" });
          return;
        }
        
        console.log(currentUsername);
        helperfunctions.deleteUserData(currentUsername);
        toast("User account deleted");
        this.loggedIn = false;

        this.props.history.push({
          pathname: "/login"
        });
      } catch (error) {
        toast(error);
      }
    };
    render() {
      return (
        <div>
          <ToastContainer
            enableMultiContainer
            containerId={"B"}
            position={toast.POSITION.TOP_RIGHT}
          />

          <TopBarLoginSignup />
          <DeleteAccountAuthenticationView onSubmit={this.handleLogIn} />
        </div>
      );
    }
  }
  
  export default withRouter(DeleteAcountAuthenticationContainter);