import React from "react"

const LandingView = () => {

    return (
        <div>
            <head class = "header">
                <h1>#Twistter</h1>
                <label>
                    <input
                    name = "search"
                    type = "search"
                    placeholder = "Search for a user"
                    />
                </label>
            </head>
        </div>
    );
};

export default LandingView;