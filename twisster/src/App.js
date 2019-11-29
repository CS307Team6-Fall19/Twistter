import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./LogIn";
import SignUp from "./SignUp";
import LandingPage from "./LandingPage/index";
import ProfilePage from "./ProfilePage";
import ProfilePageRouting from "./ProfilePageRouting";
import DeleteAccountAuthentication from "./DeleteAccountAuthentication"
import Chat from "./Chat";
import { toast } from "react-toastify";

toast.configure();

const App = () => {
  const notify = () => toast("Wow so easy !");
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/landing" component={LandingPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/redirecttoaccount" component={ProfilePageRouting} />
        <Route path="/DeleteAccount" component={DeleteAccountAuthentication} />
        <Route path="/chat" component={Chat} />
      </div>
    </Router>
  );
};

export default App;
