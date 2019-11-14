import React, { Component } from 'react';
import './MicroblogBox.css'
class MicroblogBox extends React.Component{

    constructor(props) {
      super(props);
    }

    render(){        
        return(
            <div className="tweet-body">
                {this.props.children}
            </div>
        );
    }
}
export default MicroblogBox;