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

    this.microblogPosted = props.microblogPosted;

      this.isQuoted = props.isQuoted;
      if(this.isQuoted){
        this.quotedMicroblog = props.quotedMicroblog;
        this.numOfMicroblog = props.numOfMicroblog;
      }

    /* this.microblogData = new Object();
    this.microblogData.name = props.username;
    this.microblogData.handle = props.username;
    this.microblogData.image = "props.image"; */

    this.submitMicroblog = this.submitMicroblog.bind(this);
    this.addTopic = this.addTopic.bind(this);

    this.topics = [];
    this.numTopics = 0;
  }

  addTopic(event) {
    if (
      document.getElementById("addTopics").value != "" &&
      document.getElementById("addTopics").value != ","
    ) {
      this.topics.push(document.getElementById("addTopics").value);
      if (document.getElementById("showTopics").value == "") {
        document.getElementById("showTopics").value = document.getElementById(
          "addTopics"
        ).value;
      } else {
        document.getElementById("showTopics").value =
          document.getElementById("showTopics").value +
          ", " +
          document.getElementById("addTopics").value;
      }
      document.getElementById("addTopics").value = "";
    }
  }

  async submitMicroblog(event) {
    var content = document.getElementById("content").value;
    console.log(content);
    if (content.length > 250 || content.length <= 0) {
      //toast("Cannot post microblog");
      toast(
        "Cannot post microblog. Make sure the content is 250 characters or less"
      );
    } else {
      await helperfunctions.addMicroBlogToCurrentUser(content, this.topics);
      //await helperfunctions.addMicroBlogToCurrentUser(content, this.topics);
      this.microblogPosted();
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
  }

    addTopic(event) {
      
      console.log("topic: " + document.getElementById(this.addTopicsId).value);
        if (document.getElementById(this.addTopicsId).value != "" && document.getElementById(this.addTopicsId).value != ",") {
          this.topics.push(document.getElementById(this.addTopicsId).value);
          if (document.getElementById(this.showTopicsId).value == "") {

            document.getElementById(this.showTopicsId).value = document.getElementById(this.addTopicsId).value;
          } else {
            
            document.getElementById(this.showTopicsId).value = document.getElementById(this.showTopicsId).value + ", " + document.getElementById(this.addTopicsId).value;
          }
          document.getElementById(this.addTopicsId).value = "";
        }
    }

    async submitMicroblog(event) {
        var content = document.getElementById(this.contentId).value;
        console.log(content);
        if(content.length > 250 || content.length <= 0)
        {
          //toast("Cannot post microblog");
          toast("Cannot post microblog. Make sure the content is 250 characters or less");
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
          //await helperfunctions.addMicroBlogToCurrentUser(content, this.topics);
          
          this.topics = [];
        }
    
        document.getElementById(this.contentId).value = "";
        document.getElementById(this.showTopicsId).value = "";
        document.getElementById(this.addTopicsId).value = "";
    }

    render(){
        let name = `${this.microblogData.name}`
        let handle = `@${this.microblogData.name}`
        let image = this.microblogData.image
        
        return(
            
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
