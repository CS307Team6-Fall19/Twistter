import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./LogIn";
import SignUp from "./SignUp";
import Landing from "./Landing/index";
import ProfilePage from "./ProfilePage";


const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/landing" component={Landing} />
        <Route path="/profile" component={ProfilePage} />
      </div>
    </Router>
  );

};

export default App;