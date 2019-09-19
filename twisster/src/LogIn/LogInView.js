import React from "react";

const LogInView = ({ onSubmit }) => {  
  
  return (
    <div>
        <h1>Login</h1>
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
          Username
          <input
            name="username"
            type="username"
            placeholder="Username"
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
  );
};

export default LogInView;