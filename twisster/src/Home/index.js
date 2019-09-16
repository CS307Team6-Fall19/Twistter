import React, { Component } from "react";
import { withRouter } from "react-router";
import app from "../base";

import HomeView from "./HomeView";
import User from '../User';


class Home extends Component {

  constructor(props){
    super(props)
    console.log(this.props.location.state.us);
  }

  render() {
    return <HomeView />;
  }
}

export default withRouter(Home);

