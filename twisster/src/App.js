import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./LogIn";
import SignUp from "./SignUp";
import Landing from "./Landing";
import ProfilePage from "./ProfilePage";


const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/landing" component={Landing} />
        <Route exact path="/profile" component={ProfilePage} />
      </div>
    </Router>
  );

};

export default App;