import React from "react";
import './TopBar.css'

const TopBarTwisster = ({goLogout, goToProfile}) => {
    return (
      <div className="inner-body">
        <label className="top-bar-twisster" >Twistter</label>
<<<<<<< HEAD
        <button className="top-bar-logout" onClick={goLogout}>Logout</button>
        <button className="top-bar-profile" onClick={goToProfile}>Profile</button>
=======
        <button id="logout" className="top-bar-logout" onClick={onClick}>Logout</button>
>>>>>>> 38286559cff1360c5cc2e59aefee51927c8e9ab3
        {/* <input className="top-bar-search" placeholder="Search"/>
        <button className="top-bar-button" type="button" onClick={onClickProfile}>Go to your profile</button>  */}   
      </div>
    )
}
export default TopBarTwisster;
