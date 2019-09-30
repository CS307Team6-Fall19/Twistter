import React from "react";

const LoggedInUserView = ({ onClick })=> {  
  
    return(
        <div>
          <form>
          <label>Username:</label><label id='username'>username</label>
          <br></br>
          <label>Bio:</label><label id='bio'>bio</label>
          <button onClick={onClick}>Edit</button>
          <br></br>
          </form>
        </div>
    );
}; 
export default LoggedInUserView;