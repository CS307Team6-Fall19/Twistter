import index from './index'
import React from "react"
import { file } from '@babel/types';

const NewProfilepicView = ({image, changeProfPic}) =>   {
    return (
        <div>
        
        <img height="125" width="125"/>
            <div>
            <button onClick={changeProfPic}>Change profile pictrue</button>
            <input type="file" name = "input" id = "input" onChange={changeProfPic}></input>
            </div>

            
           
        </div>
        
    );
};

export default NewProfilepicView;