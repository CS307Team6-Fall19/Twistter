import React, { Component } from 'react'
import ProfilepicView from './ProfilepicView'

import firebase from 'firebase'
import { stringLiteral } from '@babel/types';

class ProfilePicture extends Component {

    constructor(props) {
        super(props);
        
        firebase.database.ref().once('value', (snapshot) => {
            var userid = snapshot.child("mapUIDtousername").val();
            this.username = userid[firebase.auth().currentUser.id];

        });
            
        


    }
}