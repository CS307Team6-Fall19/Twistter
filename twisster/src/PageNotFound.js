import React, { Component } from "react";
import { withRouter } from "react-router";
import TopBarLoginSignup from "./TopBarLoginSignup"


class PageNotFound extends Component {

  goLogIn = async event => {
    
    this.props.history.push({
      pathname: "/login"
    });
  };

  render() {
    return (
      <div>
        <TopBarLoginSignup />
        <h1>404 Page Not Found</h1>
        <form>
        <button onClick={this.goLogIn}>Go to login page</button>
        </form>
      </div>
  );
  }
  
}

export default PageNotFound;