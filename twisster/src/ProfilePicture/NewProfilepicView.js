import index from './index'
import React from "react"
import { file } from '@babel/types';

const NewProfilepicView = ({image, changeProfPic}) =>   {
    return (
        <div>
        
        <img id = "img1" height="125" width="125"/>
            <div>
            <button onClick={changeProfPic}>Change profile picture</button>
            <input type="file" accept=".jpg,.png,.jpeg"name = "input" id = "input" onChange={changeProfPic}></input>
            </div>

            
           
        </div>
        
    );
};

export default NewProfilepicView;