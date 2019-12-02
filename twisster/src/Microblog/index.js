import React, { Component } from "react";
import { MicroblogView } from "./MicroblogView.js";
import Topics from "../Topics";
import MicroblogBox from "../MicroblogBox/index.js";
import helperfunctions from "../helperfunctions";
import firebase from "firebase";
import { nullLiteral } from "@babel/types";

import QuotingMicroblogBox from "../QuotingMicroblogBox"
import { toast } from 'react-toastify';

import MicroblogWriter from "../MicroblogWriter"

class Microblog extends React.Component {
  // static counter;

  constructor(props) {
    super(props);

    this.microblogData = new Object();
    if (Microblog.counter == undefined) {
      Microblog.counter = 0;
    }
    this.counter = Microblog.counter;
    this.blogid = "blogid" + this.counter;
    Microblog.counter++;

    this.microblogData.name = props.username;
    this.microblogData.handle = props.username;
    this.microblogData.tweet = props.data.content;
    this.microblogData.image = "props.image";
    this.microblogData.id = props.id;

    this.fetchImage = this.fetchImage.bind(this);
    this.userLikes = props.userLikes;
    this.microblogData.topics = props.data.topics;
    this.microblogData.numLikes = props.numLikes;
    this.numOfMicroblog = props.numOfMicroblog;

    this.quoteButtonClicked = this.quoteButtonClicked.bind(this);

    this.likeButtonClicked = this.likeButtonClicked.bind(this);
    this.microblogData.topics = props.data.topics;

    this.microblogData.numLikes = props.numLikes;

    this.state = {
      like: props.liked,
      quote: false
    }

  }

  async likeButtonClicked() {
    var username = await helperfunctions.retrieveUsername(
      firebase.auth().currentUser.uid
    );
    if (this.state.like) {
      this.microblogData.numLikes--;
      await helperfunctions.unlikeMicroblog(this.microblogData, username);
      this.setState({ like: false });
    } else {
      this.microblogData.numLikes++;
      await helperfunctions.likeMicroblog(this.microblogData, username);
      this.setState({ like: true });
    }
  }

  async fetchImage() {
    var picname;
    var picname2;
    var strangeruid;
    console.log("fetchImage running");

    await firebase
      .database()
      .ref()
      .once("value", snapshot => {
        /*var userList = snapshot.child("users").val();
            let user = userList[firebase.auth().currentUser.id];*/
        console.log(this.microblogData.name);
        strangeruid = snapshot
          .child("mapUsernameToUID")
          .child(this.microblogData.name)
          .val();
        picname = snapshot
          .child("users")
          .child(strangeruid)
          .child("picture")
          .val();
        picname2 = snapshot
          .child("users")
          .child(firebase.auth().currentUser.uid)
          .child("picture")
          .val();
        //picname = user["picture"].val();
        console.log("was here hello world");
      });

    console.log(picname);
    console.log(picname2);
    //console.log(this.blogid);
    var toMatch = this.blogid;

    if (true) {
      await firebase
        .storage()
        .ref()
        .child(picname)
        .getDownloadURL()
        .then(function(url) {
          var toReturn = url;
          console.log(toMatch);

          document.querySelectorAll("img").forEach(function(item) {
            // console.log(this.blogid);
            if (item.id == toMatch) {
              item.src = toReturn;
            }
          });
          //return toReturn;
        })
        .catch(function(error) {
          switch (error.code) {
            case "storage/object-not-found":
              console.log("object not found");
              break;
            case "storage/unauthorized":
              console.log("unauthorized");
              break;
            case "storage/unknown":
              console.log("unknown");
              break;
          }
        });

      await firebase
        .storage()
        .ref()
        .child(picname2)
        .getDownloadURL()
        .then(function(url) {
          var toReturn = url;
          document.querySelectorAll("img").forEach(function(item) {
            if (item.id == "img3") {
              item.src = toReturn;
            }
          });
          //return toReturn;
        })
        .catch(function(error) {
          switch (error.code) {
            case "storage/object-not-found":
              console.log("object not found");
              break;
            case "storage/unauthorized":
              console.log("unauthorized");
              break;
            case "storage/unknown":
              console.log("unknown");
              break;
          }
        });
    } else {
      return firebase.storage().ref(picname);
    }
  }

    componentDidMount() {
      this.fetchImage();
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

    /* let likeButtonText = likeText;
    let name = `${this.microblogData.name}`;
    let handle = `@${this.microblogData.name}`;
    //let image = this.microblogData.image
    let tweet = this.microblogData.tweet;
    let topics = this.microblogData.topics;
    let numLikes = this.microblogData.numLikes;

    let likeButtonClicked = this.likeButtonClicked;
    return (
      <MicroblogView
        key={this.microblogData.key}
        name={name}
        handle={handle}
        image={nullLiteral}
        unitid={this.blogid}
        tweet={tweet}
        likeButtonClicked={likeButtonClicked}
        likeButtonText={this.state.like}
        numLikes={numLikes}
        topics={topics}
      />
    );
  } */
}
export default Microblog;
