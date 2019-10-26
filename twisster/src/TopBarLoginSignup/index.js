import TopBarTwissterLoginSignup from './TopBarLoginSignupView'
import React, { PureComponent } from 'react'
import { withRouter } from "react-router";

import firebase from "firebase";
class TopBarLoginSignup extends React.Component{

    constructor(props) {
  
      super(props);

    }


    render(){
        return(
            <div className="top-bar">
                <TopBarTwissterLoginSignup  />
            </div>
          )
    }
}
export default withRouter(TopBarLoginSignup);