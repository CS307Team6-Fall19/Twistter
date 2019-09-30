import React, { Component } from 'react';
import MicroblogView from './MicroblogView';
class Microblog extends React.Component{

    constructor(props) {
      super(props);

      this.name = props.name;
      this.handle = props.handle;
      this.tweet = props.tweet;
      this.image = props.image;
    }

    render(){
        return(
            <MicroblogView 
                key={this.index}
                name={this.name}
                handle={this.handle}
                tweet={this.tweet}
                image={this.image} 
            />
        );
    }
}
export default Microblog;