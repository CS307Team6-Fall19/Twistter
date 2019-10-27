import React from "react"

const NewProfilepicView = ({image, changeProfPic}) =>   {
    return (
        <div>
        <img src={image}></img>
            <button onClick={changeProfPic}>Change profile pictrue</button>
            <input type="file" name = "input" id = "input"></input>
            
            <script>
                const input = document.getElementbyId('input')
            </script>
        </div>
        
    );
};