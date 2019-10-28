import React, { Component } from 'react';

import  TopicView  from './TopicView.js';
import  TopicHighlightedView  from './TopicHighlightedView.js';


class Topic extends React.Component{

    constructor(props) {
      super(props);

      this.topic = new Object();


      this.topic.text = props.data;
      this.topic.highlight = props.highlight;
    }

    render(){
        let text = `${this.topic.text}`
        if(this.topic.highlight){
            return(
                <TopicHighlightedView 
                    text={text}
                />
            );
        }
        else{
            return(
                <TopicView 
                    text={text}
                />
            );
        }
    }
}
export default Topic;
