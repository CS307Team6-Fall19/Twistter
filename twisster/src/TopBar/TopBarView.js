import React from "react";
import "./TopBar.css";
import logo from "../logo192.png";

const TopBarTwisster = ({ goLogout, goToProfile, goToChat }) => {
  return (
    <div className="inner-body">
      <label className="top-bar-twisster">Twistter</label>
      <button className="top-bar-logout" id="logout" onClick={goLogout}>
        Logout
      </button>
      <button className="top-bar-profile" id="profile" onClick={goToProfile}>
        Profile
      </button>
<<<<<<< HEAD
      <button className="top-bar-chat" id="chat" onClick={goToChat}>Chat</button>
=======
      <button className="top-bar-chat" id="chat" onClick={goToChat}>
        {/* <img className="picture" src={logo} alt="my image" onClick={goToChat} /> */}
        Chat
      </button>
>>>>>>> master
      {/* <input className="top-bar-search" placeholder="Search"/>
        <button className="top-bar-button" type="button" onClick={onClickProfile}>Go to your profile</button>  */}
    </div>
  );
};
export default TopBarTwisster;
