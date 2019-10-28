import React, { Component } from 'react'
import ProfilepicView from './ProfilepicView'
import NewProfilepicView from './NewProfilepicView'
import {withRouter } from "react-router"

import firebase from 'firebase'


class ProfilePicture extends Component {

    constructor(props) {
        super(props);
        var username;
        this.toUpload = false;
        this.upLoadImage = this.uploadImage.bind(this);
        this.fetchImage = this.fetchImage.bind(this);
        this.changePic = this.changePic.bind(this);

    }


    uploadImage = async event => {
        console.log("upLoadImage running");
        var inpFile = document.getElementById('input');

        const file = inpFile.files[0];

        if (file != null) {
          /*  await firebase.database().ref().once('value', (snapshot)  => {
               // var userList = snapshot.child("users").val();
               // let user = userList[firebase.auth().currentUser.id];
                //user.ref('picture').set(file.name);
                //snapshot.child("users").child(firebase.auth().currentUser.uid).child("picture").set(file.name);
                snapshot.child("users").child(firebase.auth().currentUser.uid).child("picture").set({'hola'};
            });*/

            firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("picture").set(this.username);

           const promise =  firebase.storage().ref().child(this.username).put(file).then(function(snapshot) {
                console.log("file uploaded");
                //window.toUpload = false;
                //forceUpdate();

            });

            promise.then(response => {
                this.toUpload = false;
                this.forceUpdate();
            })
            //this.toUpload = false;
            //this.forceUpdate();
        }

    }


    

    async fetchImage() {

        var picname;
        console.log("fetchImage running");

        await firebase.database().ref().once('value', (snapshot)  => {
            /*var userList = snapshot.child("users").val();
            let user = userList[firebase.auth().currentUser.id];*/
            this.username = snapshot.child("mapUIDtoUsername").child(firebase.auth().currentUser.uid).val();
            picname = snapshot.child("users").child(firebase.auth().currentUser.uid).child("picture").val();
            //picname = user["picture"].val();
            console.log("was here hello world");
        });

        console.log(picname);

        if (true) {
 

            await firebase.storage().ref().child(picname).getDownloadURL().then(function(url) {
                var toReturn = url;
                document.querySelector('img').src = toReturn;
                //return toReturn;

            }).catch(function(error) {
                switch(error.code) {
                    case 'storage/object-not-found':
                        console.log("object not found");
                        break;
                    case 'storage/unauthorized' :
                        console.log("unauthorized");
                        break;
                    case 'storage/unknown':
                        console.log("unknown");
                        break;


                }
            });



        }
        else {
            return firebase.storage().ref(picname);
        }

        console.log("ends now");


    }


    deletePicture = async event => {

        console.log("deletePicture running");

        const promise = firebase.database().ref().child("users").child(firebase.auth().currentUser.uid).child("picture").set("default.jpg");
 

        promise.then(response => {
            this.forceUpdate();
        })

    }

    changePic () {
        console.log("changePic running");
        this.toUpload = true;
        this.forceUpdate();
    }

   /* async componentDidMount() {
        if (this.toUpload) {
            this.setState(true);
        }
    }*/

    render() {
        
        if (this.toUpload == false) {
            console.log("here first");
            return(
            <div>
                <ProfilepicView image = {this.fetchImage()} changeProfPic = {this.changePic} deletePic = {this.deletePicture}/>
            </div>
            );
        }
        else {
            console.log("wrong place");
            return (
            <div>
                <NewProfilepicView image = {this.fetchImage()} changeProfPic = {this.upLoadImage}></NewProfilepicView>
            </div>
            );
        }

    }

}

export default withRouter(ProfilePicture);