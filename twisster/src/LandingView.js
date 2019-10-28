import React from "react"
import "./LandingView.css"
import "./LandingView.js"

const LandingView = ({goLogout}) => {

    return (
        <div>
            <div class = " header">
            <p1 class = "line"> #Twistter  ~ Twitter copied us!</p1>
            <div class = "mid"> 
            
                <label  class = "mid">
                    Search
                    <input
                    name = "search"
                    type = "search"
                    placeholder = "Search for a user"
                    />
                </label>

                <form1>
                    <button>Profile</button>
                    <button onClick={goLogout}>Logout</button>
                </form1>
                </div>
            </div>
            
        </div>
    );
};

export default LandingView;