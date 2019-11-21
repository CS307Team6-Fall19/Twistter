import React, { Component } from "react";
import Messages from "../Messages"

class Conversation extends React.Component {

    constructor(props){
        super(props);

        this.messages = props.messages;

    }
}
export default Conversation;