import index from './index'
import React from "react"
import { file } from '@babel/types';

const NewProfilepicView = ({image, changeProfPic}) =>   {
    return (
        <div>
        <img src={image}></img>
            <button onClick={changeProfPic}>Change profile pictrue</button>
            <input type="file" name = "input" id = "input" onChange="uploadImage()"></input>
            
           
        </div>
        
    );
};

export default NewProfilepicView;