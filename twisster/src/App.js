import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom"

import Home from "./Home";
import Login from "./LogIn";
import SignUp from "./SignUp";
import LandingPage from "./LandingPage/index";
import ProfilePage from "./ProfilePage";
import ProfilePageRouting from "./ProfilePageRouting";
import DeleteAccountAuthentication from "./DeleteAccountAuthentication"
import Chat from "./Chat";
import { toast } from "react-toastify";

import PageNotFound from "./PageNotFound"

toast.configure();

const App = () => {
  const notify = () => toast("Wow so easy !");
  return (
    <Switch>
    
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/landing" component={LandingPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/redirecttoaccount" component={ProfilePageRouting} />
        <Route path="/DeleteAccount" component={DeleteAccountAuthentication} />
        <Route path="/chat" component={Chat} />

     

        <Route component={PageNotFound} />

  
    </Switch>
  );
};

export default App;
