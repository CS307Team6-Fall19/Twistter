import React from "react"
import './ProfilepicView.css'

const ProfilepicView = ({image, changeProfPic, deletePic, name}) =>   {
    console.log(name);
    return (
        <div>
        <img id = "img1" height="125" width="125"/>
            <div className="hold_text">
            <text className="user_name" thename={name}> {name} </text>
            </div>
            <div>
            <button onClick={changeProfPic}>Change profile picture </button>
            </div>
            <div className="del_bt">
            <button onClick={deletePic}>Delete Picture / Change to default</button>
            </div>

        </div>
        
    );
};

export default ProfilepicView;