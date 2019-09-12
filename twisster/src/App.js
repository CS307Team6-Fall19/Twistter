import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./LogIn";
import SignUp from "./SignUp";

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </div>
    </Router>
  );
};

export default App;