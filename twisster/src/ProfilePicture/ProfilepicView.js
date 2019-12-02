import React from "react"

const ProfilepicView = ({image, changeProfPic, deletePic}) =>   {

    return (
        <div>
        <img height="125" width="125"/>
            <div>
            <button onClick={changeProfPic}>Change profile picture </button>
            </div>
            <div>
            <button onClick={deletePic}>Delete Picture / Change to default</button>
            </div>

        </div>
        
    );
};

export default ProfilepicView;