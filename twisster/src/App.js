import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom"

import Home from "./Home";
import Login from "./LogIn";
import SignUp from "./SignUp";
import LandingPage from "./LandingPage/index";
import ProfilePage from "./ProfilePage";
import Chat from "./Chat";
import TestComponent from "./TestComponent"
import { toast } from "react-toastify";

toast.configure();

const App = () => {
  const notify = () => toast("Wow so easy !");
  return (
    <Switch>
      <div>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/landing" component={LandingPage} />
        <Route path='/profile' component={ProfilePage} />
        <Route path="/chat" component={Chat} />
        
        {/* FOR TESTING ONLY */}
        <Route path="/test" component={TestComponent} />

        {/* <Route path="*" render={() => <Redirect to="/home" />} /> */}
      </div>
    </Switch>
  );
};

export default App;
