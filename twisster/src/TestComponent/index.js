import React, { Component } from 'react';
import Topics from '../Topics'
import MicroblogBox from '../MicroblogBox/index.js';
import helperfunctions from "../helperfunctions";
import firebase from "firebase";

import Microblog from "../Microblog"
import QuotedMicroblog from "../QuotedMicroblog"

class TestComponent extends React.Component{

    constructor(props){
        super(props)

    }

    render(){
        return(
            <div >
                <label>Test Component</label>
                <QuotedMicroblog 
                key={0} 
                data={"Data"} 
                username={"username"} 
                id={"ID"} 
                liked={false} 
                numLikes={0}
                />
            </div>
        )
    }

}export default TestComponent;