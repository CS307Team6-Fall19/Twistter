import React, { Component } from 'react';
import { withRouter } from "react-router";

class Bio{
    constructor(){
        this.text = "This is your bio!";
    }

    setText(text){
        this.text = text;
    }

    getText(){
        return this.text;
    }
}
export default Bio;