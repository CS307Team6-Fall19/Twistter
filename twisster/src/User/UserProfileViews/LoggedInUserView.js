import React from "react";

const LoggedInUserView = ({ userProfile, deleteAccount})=> {  
  
    return(
        <div>
          <form>

          <label>Bio:</label><label id='bio'>{userProfile.bio}</label>
          <button onClick={userProfile.editProfile}>Edit</button>
          <br></br>
          <button type='button' style={{marginLeft: "365px"}} onClick={deleteAccount}>Delete account</button>
          </form>

          <div>
            <label>Followers :  </label><label id='followers'>{userProfile.followersAndFollowing.followers}</label>
          </div>
          
          <div>
            <label> Following :  </label><label id='following'>{userProfile.followersAndFollowing.following}</label>
          </div>

        </div>
    );
}; 
export default LoggedInUserView;