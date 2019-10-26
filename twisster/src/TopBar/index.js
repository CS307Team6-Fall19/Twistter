import TopBarTwisster from './TopBarView'
import React, { PureComponent } from 'react'
import { withRouter } from "react-router";

import firebase from "firebase";
class TopBar extends React.Component{

    constructor(props) {
  
      super(props);

      this.goLogout = this.goLogout.bind(this);
    }

    goLogout = async event => {
      firebase.auth().signOut()
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

    render(){
        return(
            <div className="top-bar">
                <TopBarTwisster onClick={this.goLogout} />
            </div>
          )
    }
}
export default withRouter(TopBar);