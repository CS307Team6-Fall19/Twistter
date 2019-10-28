import React from "react";

const LoggedInUserView = ({ userProfile, deleteAccount})=> {  
  
    return(
        <div>
          <form>
          <label>Username:</label><label id='username'>{userProfile.username}</label>
          <button type='button' style={{marginLeft: "365px"}} onClick={deleteAccount}>Delete account</button>
          <br></br>
          <label>Followers:</label><label id='followers'>{userProfile.followersAndFollowing.followers}</label>
          <br></br>
          <label>Following:</label><label id='following'>{userProfile.followersAndFollowing.following}</label>
          <br></br>
          <label>Bio:</label><label id='bio'>{userProfile.bio}</label>
          <button onClick={userProfile.editProfile}>Edit</button>
          <br></br>
          </form>
        </div>
    );
}; 
export default LoggedInUserView;