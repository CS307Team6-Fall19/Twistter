import React from "react";
import User from "../User/index"
import UserData from "../DataObjects/UserData";
const ProfilePageView = (userData) => {  
  
    return(
        <div>
          <User user={userData}></User>
          <form>
          </form>
        </div>
    );
}; 
export default ProfilePageView;