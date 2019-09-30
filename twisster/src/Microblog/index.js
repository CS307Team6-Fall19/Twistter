import React, { Component } from 'react';
import MicroblogView from './MicroblogView';
class Microblog extends React.Component{

    constructor(props) {
      super(props);

      this.name = props.props.user.userData.username;
      this.handle = 'My handle';
      this.tweet = 'This is the tweet';
      this.image = 'image';
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