import React from 'react';
import firebase from "firebase";
import { withRouter } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ProfilePageRouting extends React.Component {
    constructor(props) {
        super(props);
        this.goToProfile = this.goToProfile.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    goToProfile() {
        var userData = this.props.location.state.userData;
        var text = this.props.location.state.text;
        if (text != undefined) {
            this.props.history.replace({
                pathname: "/profile/" + text,
                state: { userData: userData }
            });
        }
        else {
            this.props.history.replace({
                pathname: "/profile",
                state: { userData: userData }
            }); 
        }
    }

    goBack()
    {
        console.log("Reached here");
    }

    render() {
            return(
                <div>
                    {this.goToProfile()}
                </div>
            );
    }

}
export default withRouter(ProfilePageRouting);