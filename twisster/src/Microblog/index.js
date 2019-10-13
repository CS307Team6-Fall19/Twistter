import React, { Component } from 'react';
import { MicroblogView } from './MicroblogView.js';

class Microblog extends React.Component{

    constructor(props) {
      super(props);

      this.microblogData = new Object();


      this.microblogData.name = props.username;
      this.microblogData.handle = props.username;
      this.microblogData.tweet = props.data.content;
      this.microblogData.image = "props.image";
      

      var topics = "";
      for(var i = 0; i < props.data.topics.length-1; i++){
            topics += props.data.topics[i];
            topics += ", "
      }
      topics += props.data.topics[props.data.topics.length-1];

      this.microblogData.topics = topics;
      
    }

    render(){
        let name = `${this.microblogData.name}`
        let handle = `@${this.microblogData.name}`
        let image = this.microblogData.image
        let tweet = this.microblogData.tweet
        let topics = this.microblogData.topics
        return(
            
            <MicroblogView 
                key={this.microblogData.key}
                name={name}
                handle={handle}
                image={image}
                tweet={tweet}
                topics={topics}
            /> 
        );
    }
}
export default Microblog;