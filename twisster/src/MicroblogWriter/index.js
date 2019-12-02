import React, { Component } from "react";
import { MicroblogWriterView } from "./MicroblogWriterView";
import helperfunctions from "../helperfunctions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class MicroblogWriter extends React.Component {
  constructor(props) {
    //TODO: THIS
    super(props);

    this.microblogData = new Object();

    this.isQuoted = props.isQuoted;
    if(this.isQuoted){
      this.quotedMicroblog = props.quotedMicroblog;
      this.numOfMicroblog = props.numOfMicroblog;
    }

   
    this.microblogPosted = props.microblogPosted;

    this.microblogData.name = props.username;
    this.microblogData.handle = props.username;
    this.microblogData.image = "props.image";

    this.submitMicroblog = this.submitMicroblog.bind(this);
    this.addTopic = this.addTopic.bind(this);

    this.topics = [];
    this.numTopics = 0;

    if(this.isQuoted){
      this.addTopicsId = "addTopicsQuoted" + this.numOfMicroblog
      this.showTopicsId = "showTopicsQuoted" + this.numOfMicroblog
      this.contentId = "contentQuoted" + this.numOfMicroblog
    }
    else{
      this.addTopicsId = "addTopics"
      this.showTopicsId = "showTopics"
      this.contentId = "content"
    }
  }

  addTopic(event) {
    if (
      document.getElementById(this.addTopicsId).value != "" &&
      document.getElementById(this.addTopicsId).value != ","
    ) {
      this.topics.push(document.getElementById(this.addTopicsId).value);
      if (document.getElementById(this.showTopicsId).value == "") {
        document.getElementById(this.showTopicsId).value = document.getElementById(
          this.addTopicsId
        ).value;
      } else {
        document.getElementById(this.showTopicsId).value =
          document.getElementById(this.showTopicsId).value +
          ", " +
          document.getElementById(this.addTopicsId).value;
      }
      document.getElementById(this.addTopicsId).value = "";
    }
  }

  async submitMicroblog(event) {
    var content = document.getElementById(this.contentId).value;
    console.log(content);
    if (content.length > 250 || content.length <= 0) {
      //toast("Cannot post microblog");
        toast(
          "Cannot post microblog. Make sure the content is 250 characters or less"
        );

    }  
    else 
    {

      if(this.isQuoted){
        await helperfunctions.addQuotedMicroblogToCurrentUser(this.quotedMicroblog, content, this.topics);
      }

      else {
        await helperfunctions.addMicroBlogToCurrentUser(content, this.topics);
        this.microblogPosted();
      }
    
      this.topics = [];
    }

    document.getElementById(this.contentId).value = "";
    document.getElementById(this.showTopicsId).value = "";
    document.getElementById(this.contentId).value = "";
  }

  render() {
    let name = `${this.microblogData.name}`;
    let handle = `@${this.microblogData.name}`;
    let image = this.microblogData.image;

    return (
      <MicroblogWriterView
        name={name}
        handle={handle}
        image={image}
        submitMicroblog={this.submitMicroblog}
        addTopic={this.addTopic}

        addTopicsId={this.addTopicsId}
        showTopicsId={this.showTopicsId}
        contentId={this.contentId}
      />
    );
  }
}
export default MicroblogWriter;
