import React from "react";

const VisitedUserView = ({ onClickFollow })=> {  
  
    return(
        <div>
          <form>
              <h1 id='welcome'></h1>
          <br></br>
          <label>Followers:</label><label id='followers'></label>
          <br></br>
          <label>Following:</label><label id='following'></label>
          <br></br>
          <button onClick={onClickFollow}>Follow</button>
          <br></br>
          <label>Bio:</label><label id='bio'>bio</label>
          <br></br>
          </form>
        </div>
    );
}; 
export default VisitedUserView;