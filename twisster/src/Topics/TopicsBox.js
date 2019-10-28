import React, { Component } from 'react';
import '../css/Landing.css'
class TopicsBox extends React.Component{

    constructor(props) {
      super(props);
    }

    render(){        
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}
export default TopicsBox;