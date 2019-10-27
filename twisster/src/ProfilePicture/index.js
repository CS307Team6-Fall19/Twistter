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

        this.storageRef = firebase.storage.ref();
        this.upLoadImage = this.uploadImage.bind(this);
        this.fetchImage = this.fetchImage.bind(this);

    }


    uploadImage() {
        

    }

    render

}