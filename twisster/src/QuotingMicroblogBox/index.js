import React, { Component } from 'react';
import '../MicroblogBox/MicroblogBox.css'
class QuotingMicroblogBox extends React.Component{

    constructor(props) {
      super(props);

      
    }

    render(){        
        return(
            <div className="quoting-tweet-body">
                {this.props.children}
            </div>
        );
    }
}
export default QuotingMicroblogBox;