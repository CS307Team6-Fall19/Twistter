import React from "react"

const thePicture = ({image, changeProfPic}) =>   {
    return (
        <div>
            <img src={image}></img>
            <button onClick={changeProfPic}>Change profile pictrue</button>
        </div>
    );
};