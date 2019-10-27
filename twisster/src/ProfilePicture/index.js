import React, { Component } from 'react'
import ProfilepicView from './ProfilepicView'
import {withRouter } from "react-router"

import firebase from 'firebase'
import { stringLiteral } from '@babel/types';

class ProfilePicture extends Component {

    constructor(props) {
        super(props);
        firebase.database.ref().once('value', (snapshot)  => {
            var userid = snapshot.child("mapUIDtousername").val();
            this.username = userid[firebase.auth().currentUser.id];

        });        

        this.toUpload = false;
        this.storageRef = firebase.storage.ref();
        this.upLoadImage = this.uploadImage.bind(this);
        this.fetchImage = this.fetchImage.bind(this);
        this.changePic = this.changePic.bind(this);

    }


    uploadImage() {
        
        var inpFile = document.getElementById('input');

        const file = inpFile.files[0];

        if (file != null) {
            firebase.database.ref().once('value', (snapshot)  => {
                var userList = snapshot.child("users").val();
                this.user = userList[firebase.auth().currentUser.id];
                user.ref('picture').set(file.name);
            });

            this.storageRef.put(file).then(function(snapshot) {
                console.log("file uploaded");

            });

        }

    }


    

    fetchImage() {

        firebase.database.ref().once('value', (snapshot)  => {
            var userList = snapshot.child("users").val();
            this.user = userList[firebase.auth().currentUser.id];
            var picname = user['picure'].value;
        });

        console.log(picname);

        if (picname == 'defualt.jpg') {
            return firebase.storage.ref('default.jpg');
        }
        else {
            return firebase.storage.ref(picname);
        }


    }

    changePic () {
        this.toUpload = true;
    }

    render() {
        
        if (this.toUpload == false) {
             <div>
                <ProfilepicView image = {fetchImage} changeProPic = {changePic}></ProfilepicView>
            </div>
        }
        else {
            <div>
                <NewProfilepicView image = {this.fetchImage} changePic = {changePic}></NewProfilepicView>
            </div>
        }

    }

}