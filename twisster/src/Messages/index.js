import React, { PureComponent } from 'react'
import Message from "../Message"

class Messages extends React.Component{

    constructor(props){
        super(props);

        this.messages = props.messages;
    }

    createMessages = (messagesArray) =>{
        var messages = [];
        for (var i = 0; i < messagesArray.length; i++) {

            var sentByUser = false;
            
            messages.push(
                <Message 
                    key={i} 
                    sender={messagesArray[i].sender} 
                    receiver={messagesArray[i].receiver} 
                    content={messagesArray[i].content} 
                    sentByUser={sentByUser} 
                />
            );
        }
        return <div>{messages}</div>;
    }

    render() {
      if(this.props.messages != null){
        return(
          <div>
            {this.createMessages(this.props.messages)}
          </div>
        )
      }
      else{
        return null;
      }
    }
}
export default Messages;