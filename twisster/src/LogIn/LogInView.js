import React from "react";
import "./LoginView.css";
import Button from 'react-bootstrap/Button';
import logo from "../assets/twisster_logo.png";

const MainLogo = props => {
  return (
    <img className="logo-twisster" src={logo}>
      {props.children}
    </img>
  );
};

const MainName = props => {
  return <label className="name-twisster">twisster</label>;
};

const CenterUiBox = props => {
  return <div className="login-prompt">{props.children}</div>;
};

const EmailField = props => {
  return (
    <input
      name="email"
      className="login-textbox"
      placeholder="Email/Username"
      onFocus={e => (e.target.placeholder = "")}
      onBlur={e => (e.target.placeholder = "Email/Username")}
    >
      {props.children}
    </input>
  );
};

const PasswordField = props => {
  return (
    <input
      name="password"
      className="password-textbox"
      type="password"
      placeholder="Password"
      onFocus={e => (e.target.placeholder = "")}
      onBlur={e => (e.target.placeholder = "Password")}
      focus
    >
      {props.children}
    </input>
  );
};

const LogInView = ({ onSubmit, onClick }) => {
  return (
    <div className="main-body">
      <div className="body">
        <CenterUiBox>
          {/* <h1>Login</h1> */}
          <MainLogo></MainLogo>
          <MainName></MainName>
          <form onSubmit={onSubmit}>
            <EmailField />
            <PasswordField />
            <Button
              className="login-button"
              variant="outline-dark"
              type="submit"
            >
              <span>Login </span>
            </Button>
          </form>
          <Button
            className="signup-button"
            variant="outline-dark"
            type="submit"
            onClick={onClick}
          >
            <span>Sign Up </span>
          </Button>
        </CenterUiBox>
      </div>
    </div>
  );
};

export default LogInView;
