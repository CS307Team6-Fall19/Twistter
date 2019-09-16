import React from "react";

const SignUpView = ({ onSubmit }) => {  
  
  return (
    <div>
        <h1>SignUp</h1>
        <form onSubmit={onSubmit}>      
        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="Email"
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
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
};

export default SignUpView;