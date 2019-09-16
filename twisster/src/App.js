import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./LogIn";
import SignUp from "./SignUp";
import Landing from "./Landing";
import { BrowserRouter as Link} from "react-router-dom";


const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/landing" component={Landing} />
      </div>
    </Router>
  );
  /* return(
  <div>
    <nav>
      <Link to="/home">Home</Link>
    </nav>
    <div>
      <Route path="/home" component={Home} />
    </div>
  </div>
  ); */
};

export default App;