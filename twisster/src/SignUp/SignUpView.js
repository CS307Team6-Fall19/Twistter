import React from "react";
import "./SignUp.css";
import Button from "react-bootstrap/Button";
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

const SignupEmail = props => {
  return (
    <input
      name="email"
      className="s_email-textbox"
      placeholder="Email"
      onFocus={e => (e.target.placeholder = "")}
      onBlur={e => (e.target.placeholder = "Email")}
    >
      {props.children}
    </input>
  );
};

const ReturnToLogin = props => {
  return (
    <div>
      <label className="return-login">
        Already a member?
        <button
          type="submit"
          className="return-login_b"
          onClick={props.onClick}
        >
          Login
        </button>
      </label>
    </div>
  );
};

const SignupUsername = props => {
  return (
    <input
      name="username"
      className="s_username-textbox"
      placeholder="Username"
      onFocus={e => (e.target.placeholder = "")}
      onBlur={e => (e.target.placeholder = "Username")}
    >
      {props.children}
    </input>
  );
};

const SignupPassword = props => {
  return (
    <input
      name="password"
      type="password"
      className="s_password-textbox"
      placeholder="Password"
      onFocus={e => (e.target.placeholder = "")}
      onBlur={e => (e.target.placeholder = "Password")}
    >
      {props.children}
    </input>
  );
};

const CenterUiBox = props => {
  return <div className="s_login-prompt">{props.children}</div>;
};

const SignUpView = ({ onSubmit, onClick }) => {
  return (
    <CenterUiBox>
      <form onSubmit={onSubmit}>
        <MainLogo></MainLogo>
        <MainName></MainName>
        <SignupEmail />
        <SignupUsername />
        <SignupPassword />
        <Button
          className="s_signup-button"
          variant="outline-dark"
          type="submit"
        >
          <span>Sign Up </span>
        </Button>
      </form>
      <ReturnToLogin onClick={onClick} />
    </CenterUiBox>
  );
};

export default SignUpView;
