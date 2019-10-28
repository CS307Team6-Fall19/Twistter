import React from "react";

const LoggedInUserEditView = ({ userProfile, deleteAccount })=> {  
  
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
          <br></br>
          <input
            id="bioTextBox"
            name="Bio"
            type="bio"
            placeholder="New bio"
          />
          <br></br>
          <button onClick={userProfile.saveChanges}>Save Changes</button>
          <br></br>
          </form>
        </div>
    );
}; 
export default LoggedInUserEditView;