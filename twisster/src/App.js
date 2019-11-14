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
import PageNotFound from "./PageNotFound"
import { toast } from "react-toastify";

toast.configure();

const App = () => {
  const notify = () => toast("Wow so easy !");
  return (
    <Router>
      <Switch>
       
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="/landing" component={LandingPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path="/chat" component={Chat} />
          
          {/* FOR TESTING ONLY */}
          <Route path="/test" component={TestComponent} />

          <Route component={PageNotFound} />
          {/* <Route render={() => <Redirect to="/home" />} /> */}

       
      </Switch>
    </Router>
  );
};

export default App;
