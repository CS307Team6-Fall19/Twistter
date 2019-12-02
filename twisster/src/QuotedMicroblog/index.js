import React, { Component } from 'react';
import Topics from '../Topics'
import MicroblogBox from '../MicroblogBox';
import helperfunctions from "../helperfunctions";
import firebase from "firebase";

import "./QuotedMicroblog.css"

import Microblog from "../Microblog"

class QuotedMicroblog extends Microblog{

    constructor(props){
        super(props)

        this.quotedContent = props.quotedContent;

        this.quotedTopics = props.quotedTopics;

        this.quotedUserLikes = props.quotedUserLikes

        this.quotedNumLikes = props.quotedNumLikes

        this.quotedUser = props.quotedUser
        
        this.profilePicture = 'profilePicture'
    }

    render(){
        return(
            <div class="quoted-microblog">
    
                <div className="quoted-body">

                    <div className="inner-body-quoted">

                        <img src={this.profilePicture} alt="Logo" className="picture">

                        </img>
                        

                        <div className="quoted-name">
                            {this.quotedUser}
                        </div>
                    </div>

                    <div className="quoted-content">
                        {this.quotedContent}
                    </div>
    
                </div>
                {super.render()}
                
                <Topics topics={this.quotedTopics} />
                <br></br>
                
            </div>
        );
    }

}export default QuotedMicroblog;