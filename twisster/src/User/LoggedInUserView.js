import React from "react";

const LoggedInUserView = ({ onClick, onClick1})=> {  
  
    return(
        <div>
          <form>
          <label>Username:</label><label id='username'>username</label>
          <button type='button' style={{marginLeft: "365px"}} onClick={onClick1}>Delete account</button>
          <br></br>
          <label>Followers:</label><label id='followers'></label>
          <br></br>
          <label>Following:</label><label id='following'></label>
          <br></br>
          <label>Bio:</label><label id='bio'>bio</label>
          <button type='button' onClick={onClick}>Edit</button>
          <br></br>
          </form>
        </div>
    );
}; 
export default LoggedInUserView;