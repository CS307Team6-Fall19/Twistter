import React, { Component } from "react";
import { MicroblogWriterView } from "./MicroblogWriterView";
import helperfunctions from "../helperfunctions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase";

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
    this.fetchImage = this.fetchImage.bind(this);

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
        picname2 = snapshot
          .child("users")
          .child(firebase.auth().currentUser.uid)
          .child("picture")
          .val();
        //picname = user["picture"].val();
        console.log("was here hello world");
      });

 
    console.log(picname2);
    //console.log(this.blogid);
    var toMatch = this.blogid;

    if (true) {
 

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

    console.log("ends now");
  }

  componentDidMount() {
    this.fetchImage();
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
