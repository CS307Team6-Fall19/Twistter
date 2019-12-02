import React from "react"
import "./LandingView.css"


const LandingLogoutView = ({onClickLogout}) => {

    return (
        <div>
            <div className = " header">
            <p className = "line"> #Twistter  ~ Twitter copied us!</p>
            <div className = "mid"> 
            
                <label className = "mid">
                    Search
                    <input
                    name = "search"
                    type = "search"
                    placeholder = "Search for a user"
                    />
                </label>

                
                <form>                  
                    <button type="button" onClick={onClickLogout}>Logout</button>
                    
                
                </form>
                </div>
            </div>
            
        </div>
    );
};

export default LandingLogoutView;