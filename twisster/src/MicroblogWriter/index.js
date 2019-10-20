import React, { Component } from 'react';
import {MicroblogWriterView} from "./MicroblogWriterView"
import helperfunctions from "../helperfunctions";

class MicroblogWriter extends React.Component{

    constructor(props) {
        //TODO: THIS
      super(props);

      this.microblogData = new Object();


      this.microblogData.name = props.username;
      this.microblogData.handle = props.username;
      this.microblogData.image = "props.image";

      this.submitMicroblog = this.submitMicroblog.bind(this);
      this.addTopic = this.addTopic.bind(this);
      
    }

    addTopic(event) {
        if (document.getElementById("addTopics").value != "" && document.getElementById("addTopics").value != ",") {
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
          alert("Cannot post microblog");
        }
        else
        {
          await helperfunctions.addMicroBlogToCurrentUser(content, [document.getElementById("showTopics").value]);
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