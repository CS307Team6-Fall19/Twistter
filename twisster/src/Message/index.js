import React, { Component } from 'react';
import './Message.css'

class Message extends React.Component{

    constructor(props){
        super(props)

        this.sender = "props.sender";
        this.receiver = "props.receiver";

        this.content = "props.content";
    }

    render(){        
        return(
            <div className="message-box">
                <div className="sender">
                    {this.sender}
                    <div className="content">
                        {this.content}
                    </div>
                </div>
            </div>
        );
    }
}
export default Message;