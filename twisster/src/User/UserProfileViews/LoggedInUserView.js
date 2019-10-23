import React from "react";

const LoggedInUserView = ({ userProfile})=> {  
  
    return(
        <div>
          <form>
          <label>Username:</label><label id='username'>{userProfile.username}</label>
          <br></br>
          <label>Followers:</label><label id='followers'>{userProfile.followersAndFollowing.followers}</label>
          <br></br>
          <label>Following:</label><label id='following'>{userProfile.followersAndFollowing.following}</label>
          <br></br>
          <button type='button' id="followbutton" onClick={userProfile.followUser}>Follow</button>
          <br></br>
          <label>Bio:</label><label id='bio'>{userProfile.bio}</label>
          <button onClick={userProfile.editProfile}>Edit</button>
          <br></br>
          </form>
        </div>
    );
}; 
export default LoggedInUserView;