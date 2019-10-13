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
      this.microblogData.topics = "props.topics";
      
    }

    /* render(){
        return(
            <MicroblogView 
                name={this.name}
                handle={this.handle}
                tweet={this.tweet}
                image={this.image} 
                topics={this.topics}
            />
        );
    } */
    render(){
        let name = `${this.microblogData.name}`
        let handle = `@${this.microblogData.name}`
        let image = this.microblogData.image
        let tweet = this.microblogData.tweet
        //let topics = user.topics
        return(
            
            <MicroblogView 
                /* name={this.microblogData.name} 
                handle={this.microblogData.same}
                tweet={this.microblogData.tweet}
                image={this.microblogData.image}
                topics={this.microblogData.topics} */
                key={this.microblogData.key}
                name={name}
                handle={handle}
                image={image}
                tweet={tweet}
                //props={this.microblogData}
            /> 
        );
    }
}
export default Microblog;