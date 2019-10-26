import React from "react";
import './TopBar.css'

const TopBarTwisster = ({onClick}) => {
    return (
      <div className="inner-body">
        <label className="top-bar-twisster" >Twistter</label>
        <button className="top-bar-logout" onClick={onClick}>Logout</button>
        {/* <input className="top-bar-search" placeholder="Search"/>
        <button className="top-bar-button" type="button" onClick={onClickProfile}>Go to your profile</button>  */}   
      </div>
    )
}
export default TopBarTwisster;
