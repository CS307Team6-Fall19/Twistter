import React, { Component } from "react";
import "../Landing/Landing.css"
import "./Login.css"
import LoginFields from "./loginFields"
import logo from '../DataObjects/logo.png'
export default class LoginView extends Component {

  render() {
    return (
      <div className="login-prompt">
          <img src={logo} className="logo-size"/>
          <label className="twisster">twisster</label>
              <LoginFields name="email" label="Username or Email" type="text"/>
              <LoginFields name="password" label="Password" type="password"/>
              <button className="login-button" onClick={this.props.Click}>Login</button>
              <label className="or">or</label>
              <button className="signup-button">Sign Up</button>           
      </div>
      // 
      
    );
  }
}



//export default LogInView;


// const LogInView = ({changeValue, handleKeyPress}) => {  
  
//   const { active, value, error, label } = this.state;
//   const { predicted, locked } = this.props;
//   const fieldClassName = `field ${(locked ? active : active || value) &&
//     "active"} ${locked && !active && "locked"}`;

//   return( 
//       <div className={fieldClassName}>
//       <input
//         id={1}
//         type="text"
//         value={value}
//         placeholder={label}
//         onChange={changeValue}
//         onKeyPress={handleKeyPress}
//         onFocus={() => !locked && this.setState({ active: true })}
//         onBlur={() => !locked && this.setState({ active: false })}
//       />
//       <label htmlFor={1} className={error && "error"}>
//         {error || label}
//       </label>
//     </div>
//   );
// };



/*
<div>
        <h1>Login</h1>
        <form onSubmit={onSubmit}>      
        
        <label>
          Email/Username
          <input
            name="email"
            //type="email"
            placeholder="Email/Username"
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="Password"
          />          
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
    */