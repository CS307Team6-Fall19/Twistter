import React, { Component } from 'react';
import MicroblogView from './MicroblogView';
class Microblog extends React.Component{

    constructor(props) {
      super(props);

      this.name = props.name;
      this.handle = props.handle;
      this.tweet = props.tweet;
      this.image = props.image;
      this.topics = props.topics;
    }

    render(){
        return(
            <MicroblogView 
                key={this.index}
                name={this.name}
                handle={this.handle}
                tweet={this.tweet}
                image={this.image} 
                topics={this.topics}
            />
        );
    }
}
export default Microblog;