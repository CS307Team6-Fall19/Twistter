import React, { Component } from 'react';
import { MicroblogView } from './MicroblogView.js';
import Topics from '../Topics'
import MicroblogBox from '../MicroblogBox';
import QuotingMicroblogBox from "../QuotingMicroblogBox"
import MicroblogWriter from "../MicroblogWriter"
import helperfunctions from "../helperfunctions";
import firebase from "firebase";
import { toast } from 'react-toastify';

class Microblog extends React.Component{

    constructor(props) {
      super(props);

      this.microblogData = new Object();

      this.userLikes = props.userLikes;

      this.microblogData.name = props.username;
      this.microblogData.handle = props.username;
      this.microblogData.tweet = props.data.content;
      this.microblogData.image = "props.image";
      this.microblogData.id = props.id;
      this.microblogData.topics = props.data.topics;
      this.microblogData.numLikes = props.numLikes;

      this.likeButtonClicked = this.likeButtonClicked.bind(this);
      this.quoteButtonClicked = this.quoteButtonClicked.bind(this);
      
      this.state = {
        like: props.liked,
        quote: false
      }

      this.numOfMicroblog = props.numOfMicroblog;
    }

    async likeButtonClicked()
    {
        var username = await helperfunctions.retrieveUsername(firebase.auth().currentUser.uid);
        if(this.state.like){
            this.microblogData.numLikes--;
            await helperfunctions.unlikeMicroblog(this.microblogData, username)
            this.setState({like : false});  

        }
        else{
            this.microblogData.numLikes++;
            await helperfunctions.likeMicroblog(this.microblogData, username)
            this.setState({like : true});  


        }
    }

    async quoteButtonClicked(){
        toast("Quote!");

        this.loggedInUser = await helperfunctions.retrieveUsername(firebase.auth().currentUser.uid);

        if(this.state.quote){
            this.setState({quote : false});
        }
        else{
            this.setState({quote : true});
        }
        
    }

    render(){
        if(this.state.loaded == false){
            return null;
        }

        var likeText = "Placeholder"

        if(this.state.like){
            likeText = "Unlike"
        }
        else{
            likeText = "Like"
        }

        let quoteButtonText = "Quote"
        let likeButtonText = likeText;
        let name = `${this.microblogData.name}`
        let handle = `@${this.microblogData.name}`
        let image = this.microblogData.image
        let tweet = this.microblogData.tweet
        let topics = this.microblogData.topics
        let numLikes = this.microblogData.numLikes;
        
        let likeButtonClicked = this.likeButtonClicked;
        let quoteButtonClicked = this.quoteButtonClicked;

        if(!this.state.quote){
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
                            numLikes={numLikes}

                            quoteButtonText={quoteButtonText}
                            quoteButtonClicked={quoteButtonClicked}

                        /> 

                        <Topics topics={topics} />
                    </MicroblogBox>
                </div>
            );
        }

        else{
            return(
                <div>
                    <QuotingMicroblogBox>
                        <MicroblogView 
                            key={this.microblogData.key}
                            name={name}
                            handle={handle}
                            image={image}
                            tweet={tweet}

                            likeButtonClicked={likeButtonClicked}
                            likeButtonText={likeButtonText}
                            numLikes={numLikes}

                            quoteButtonText={quoteButtonText}
                            quoteButtonClicked={quoteButtonClicked}

                        /> 

                        <Topics topics={topics} />

                        <MicroblogWriter 
                            username={this.loggedInUser} 
                            microblogPosted={this.microblogPosted}
                            isQuoted={true}
                            quotedMicroblog={this.microblogData}
                            numOfMicroblog={this.numOfMicroblog}
                        />
                        
                    </QuotingMicroblogBox>
                </div>
            );
        }
    }
}
export default Microblog;