import React, { Component } from 'react';
import {MicroblogWriterView} from "./MicroblogWriterView"
import helperfunctions from "../helperfunctions";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class MicroblogWriter extends React.Component{

    constructor(props) {
        //TODO: THIS
      super(props);

      this.isQuoted = props.isQuoted;
      if(this.isQuoted){
        this.quotedMicroblog = props.quotedMicroblog;
      }

      this.microblogData = new Object();

      this.microblogPosted = props.microblogPosted;

      this.microblogData.name = props.username;
      this.microblogData.handle = props.username;
      this.microblogData.image = "props.image";

      this.submitMicroblog = this.submitMicroblog.bind(this);
      this.addTopic = this.addTopic.bind(this);

      this.topics = [];
      this.numTopics = 0;
    }

    addTopic(event) {
        if (document.getElementById("addTopics").value != "" && document.getElementById("addTopics").value != ",") {
          this.topics.push(document.getElementById("addTopics").value);
          if (document.getElementById("showTopics").value == "") {

            document.getElementById("showTopics").value = document.getElementById("addTopics").value;
          } else {
            
            document.getElementById("showTopics").value = document.getElementById("showTopics").value + ", " + document.getElementById("addTopics").value;
          }
          document.getElementById("addTopics").value = "";
        }
    }

    async submitMicroblog(event) {
        var content = document.getElementById("content").value;
        console.log(content);
        if(content.length > 250 || content.length <= 0)
        {
          //toast("Cannot post microblog");
          toast("Cannot post microblog. Make sure the content is 250 characters or less");
        }
        else
        {
          if(this.isQuoted){
            await helperfunctions.addQuotedMicroblogToCurrentUser(this.quotedMicroblog, content, this.topics)
          }
          else {
            await helperfunctions.addMicroBlogToCurrentUser(content, this.topics);
          }
          //await helperfunctions.addMicroBlogToCurrentUser(content, this.topics);
          this.microblogPosted();
          this.topics = [];
        }
    
        document.getElementById("content").value = "";
        document.getElementById("showTopics").value = "";
        document.getElementById("addTopics").value = "";
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
            /> 
        );
    }
}
export default MicroblogWriter;