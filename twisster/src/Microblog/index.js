import React, { Component } from 'react';
import { MicroblogView } from './MicroblogView.js';
import Topics from '../Topics'
import MicroblogBox from '../MicroblogBox/index.js';

class Microblog extends React.Component{

    constructor(props) {
      super(props);

      this.microblogData = new Object();


      this.microblogData.name = props.username;
      this.microblogData.handle = props.username;
      this.microblogData.tweet = props.data.content;
      this.microblogData.image = "props.image";
      

     
      this.microblogData.topics = props.data.topics;
      
    }

    render(){
        let name = `${this.microblogData.name}`
        let handle = `@${this.microblogData.name}`
        let image = this.microblogData.image
        let tweet = this.microblogData.tweet
        let topics = this.microblogData.topics
        return(
            <div>
                <MicroblogBox>
                    <MicroblogView 
                        key={this.microblogData.key}
                        name={name}
                        handle={handle}
                        image={image}
                        tweet={tweet}
                        
                    /> 

                    <Topics topics={topics} />
                </MicroblogBox>
            </div>
        );
    }
}
export default Microblog;