import React from "react";

const VisitedUserView = ({ userProfile })=> {  
  
    return(
        <div>
          <form>
              <h1 id='welcome'></h1>
          <br></br>
          <label>Followers:</label><label id='followers'>{userProfile.followersAndFollowing.followers}</label>
          <br></br>
          <label>Following:</label><label id='following'>{userProfile.followersAndFollowing.following}</label>
          <br></br>
          <button type='button' id="followbutton" onClick={userProfile.followUser}>Follow</button>
          <br></br>
          <label>Bio:</label><label id='bio'>{userProfile.bio}</label>
          <br></br>
          </form>
        </div>
    );
}; 
export default VisitedUserView;