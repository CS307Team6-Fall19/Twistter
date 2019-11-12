import React, { Component } from 'react';
import { MicroblogView } from './MicroblogView.js';
import Topics from '../Topics'
import MicroblogBox from '../MicroblogBox/index.js';
import helperfunctions from "../helperfunctions";
import firebase from "firebase";

class Microblog extends React.Component{

    constructor(props) {
      super(props);

      this.microblogData = new Object();


      this.microblogData.name = props.username;
      this.microblogData.handle = props.username;
      this.microblogData.tweet = props.data.content;
      this.microblogData.image = "props.image";
      this.microblogData.id = props.id;

      this.likeButtonClicked = this.likeButtonClicked.bind(this);
      this.microblogData.topics = props.data.topics;
      
      this.state = {
        like: props.liked
      }
    }

    async likeButtonClicked()
    {
        var username = await helperfunctions.retrieveUsername(firebase.auth().currentUser.uid);
        if(this.state.like){
            this.setState({like : false});  
            await helperfunctions.unlikeMicroblog(this.microblogData, username)
        }
        else{
            this.setState({like : true});  
            await helperfunctions.likeMicroblog(this.microblogData, username)

        }
    }

    render(){
        var likeText = "Placeholder"

        if(this.state.like){
            likeText = "Unlike"
        }
        else{
            likeText = "Like"
        }

        let likeButtonText = likeText;
        let name = `${this.microblogData.name}`
        let handle = `@${this.microblogData.name}`
        let image = this.microblogData.image
        let tweet = this.microblogData.tweet
        let topics = this.microblogData.topics
        
        let likeButtonClicked = this.likeButtonClicked;
        return(
            <div>
                <MicroblogBox>
                    <MicroblogView 
                        key={this.microblogData.key}
                        name={name}
                        handle={handle}
                        image={image}
                        tweet={tweet}
                        likeButtonClicked={likeButtonClicked}
                        likeButtonText={likeButtonText}
                    /> 

                    <Topics topics={topics} />
                </MicroblogBox>
            </div>
        );
    }
}
export default Microblog;