import React from "react";
import "./LandingView.css";

const LandingProfileView = ({ onClickProfile }) => {
  return (
    <div>
      <label id="username">hello</label>

      <button type="button" onClick={onClickProfile}>
        Go to your profile
      </button>
    </div>
  );
};

export default LandingProfileView;
