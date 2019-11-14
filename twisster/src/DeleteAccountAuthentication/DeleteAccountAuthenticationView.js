import React from "react";

const DeleteAccountAuthenticationView = ({ onSubmit }) => {  
  
  return (
    <div>
        <h1>User verification</h1>
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
        <button type="submit">Delete Account</button>
      </form>
    </div>
  );
};

export default DeleteAccountAuthenticationView;