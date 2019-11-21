import React, { Component } from 'react';
import './Message.css'

class Message extends React.Component{

    constructor(props){
        super(props)

        this.sender = props.sender;
        this.receiver = props.receiver;

        this.sentByUser = props.sentByUser;

        this.content = props.content;
    }

    render(){        
        if(this.sentByUser){
            return(
                <div className="message-box-sent">
                    <div className="sender">
                        {this.sender}
                        <div className="content">
                            {this.content}
                        </div>
                    </div>
                </div>
            );
        }
        
        else{
            return(
                <div className="message-box-received">
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
}
export default Message;