import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "./base";

class Landing extends Component {
    constructor(props){
        super(props)
        this.user = props.loggedInUser
    }
    
    render() {
        return (
          <div>
            <h1>Landing</h1>
            <form>
            <label>this.user.email</label>
            </form>
          </div>
      );
    }
}
export default withRouter(Landing);