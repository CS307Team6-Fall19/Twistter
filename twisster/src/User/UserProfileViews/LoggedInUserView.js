import React from "react";
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const LoggedInUserView = ({ userProfile, deleteAccount, submitRestrictDM, logout})=> {  
  
    return(
        <div>
          <form>

          <label>Bio:</label><label id='bio'>{userProfile.bio}</label>
          <button onClick={userProfile.editProfile}>Edit</button>
          <br></br>
          <button type='button' style={{marginLeft: "365px"}} onClick={deleteAccount}>Delete account</button>
          <IconButton><ExitToAppIcon fontSize="large" onClick={logout}></ExitToAppIcon></IconButton>
          
          </form>

          <div>
            <label>Followers :  </label><label id='followers'>{userProfile.followersAndFollowing.followers}</label>
          </div>
          
          <div>
            <label> Following :  </label><label id='following'>{userProfile.followersAndFollowing.following}</label>
          </div>

          <div>
            Restrict direct messages to those you follow: <input type="checkbox" id="checkRestrictDM" onClick={submitRestrictDM}/>
          </div>

        </div>
    );
}; 
export default LoggedInUserView;