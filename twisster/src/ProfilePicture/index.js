import React, { Component } from 'react'
import ProfilepicView from './ProfilepicView'
import NewProfilepicView from './NewProfilepicView'
import {withRouter } from "react-router"

import firebase from 'firebase'
import { stringLiteral, isArrowFunctionExpression } from '@babel/types';

class ProfilePicture extends Component {

    constructor(props) {
        super(props);
        
        this.toUpload = false;
        this.upLoadImage = this.uploadImage.bind(this);
        this.fetchImage = this.fetchImage.bind(this);
        this.changePic = this.changePic.bind(this);

    }


    uploadImage = async event => {
        
        var inpFile = document.getElementById('input');

        const file = inpFile.files[0];

        if (file != null) {
            await firebase.database.ref().once('value', (snapshot)  => {
                var userList = snapshot.child("users").val();
                let user = userList[firebase.auth().currentUser.id];
                user.ref('picture').set(file.name);
            });

            this.storageRef.put(file).then(function(snapshot) {
                console.log("file uploaded");

            });

        }

    }


    

    fetchImage() {

        var picname;

        firebase.database.ref().once('value', (snapshot)  => {
            var userList = snapshot.child("users").val();
            let user = userList[firebase.auth().currentUser.id];
            picname = user['picure'].value;
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
        this.forceUpdate();
    }

    render() {
        
        if (this.toUpload == false) {
            return(
             <div>
                <ProfilepicView image = {this.fetchImage} changeProPic = {this.changePic}></ProfilepicView>
            </div>
            );
        }
        else {
            return (
            <div>
                <NewProfilepicView image = {this.fetchImage} changePic = {this.changePic}></NewProfilepicView>
            </div>
            );
        }

    }

}

export default withRouter(ProfilePicture);