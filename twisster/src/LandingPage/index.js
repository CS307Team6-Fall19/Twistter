import React, { Component } from "react";
import { withRouter } from "react-router";

import Landing from "../Landing";
import TopBar from "../TopBar";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Landing />
      </div>
    );
  }
}
export default LandingPage;
