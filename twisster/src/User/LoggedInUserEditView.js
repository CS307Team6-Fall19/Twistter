import React from "react";

const LoggedInUserEditView = ({ onClick })=> {  
  
    return(
        <div>
          <form>
          <label>Email:</label><label id='email'>email</label>
          <br></br>
          <label>Bio:</label><label id='bio'>bio</label>
          <br></br>
          <input
            id="bioTextBox"
            name="Bio"
            type="bio"
            placeholder="New bio"
          />
          <br></br>
          <button onClick={onClick}>Save Changes</button>
          <br></br>
          </form>
        </div>
    );
}; 
export default LoggedInUserEditView;