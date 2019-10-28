import React from "react"

const ProfilepicView = ({image, changeProfPic}) =>   {
    return (
        <div>
        <img src={image}></img>
            <button onClick={changeProfPic}>Change profile picture</button>

        </div>
        
    );
};

export default ProfilepicView;