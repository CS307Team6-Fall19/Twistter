import React, { Component } from 'react';
import { QuotedMicroblogView } from './QuotedMicroblogView';
import Topics from '../Topics'
import MicroblogBox from '../MicroblogBox';
import helperfunctions from "../helperfunctions";
import firebase from "firebase";

import "./QuotedMicroblog.css"

import Microblog from "../Microblog"

class QuotedMicroblog extends Microblog{

    constructor(props){
        super(props)

        this.content = props.content;

        this.userWhoQuoted = props.user;
    }

    render(){
        return(
            <div class="quoted-microblog">
                <label>Quoted by {this.userWhoQuoted}</label>
                {super.render()}
            </div>
        )
    }

}export default QuotedMicroblog;