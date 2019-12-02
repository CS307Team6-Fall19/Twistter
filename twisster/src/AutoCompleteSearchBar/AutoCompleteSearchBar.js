import React from 'react';
import './AutoCompleteSearchBar.css';
import firebase from "firebase";
import { withRouter } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AutoCompleteSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            text: '',
            onFocus: false,
            clickoption: false,
        }
        this.searchForUser = this.searchForUser.bind(this);
        this.checkIfFocused = this.checkIfFocused.bind(this);
        this.changeFocus = this.changeFocus.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }

    onTextChanged = (e) => {
        const { items } = this.props;
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex  = new RegExp(`^${value}`, 'i');
            suggestions = items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({ suggestions, text: value }));
    }

    suggestionSelected (value) {    
        this.setState(() => ({
            text: value,
            suggestions: [],
            onFocus: false,
            clickoption: true,
        }))
    }

    renderSuggestions () {
        const {suggestions} = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li key={item} onMouseDown ={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        )
    }
    
    searchForUser() {
        const {text} = this.state;
        const {items} = this.props;
        const {username} = this.props;
        var userexists = false;
        var index;
        for (index in items) {
            if(items[index] == text) {
                userexists = true;
                break;
            }
        }
        if (userexists) {
            this.props.history.push({
                pathname: "/profile/" + text,
                state: { userData: this.userData }
            });
        }
        else {
            if (text != username) {
                toast("Username not found!");
            }
            else {
                toast("You can visit your profile page by clicking the profile button");
            }
        }
    }

    checkIfFocused() {
        console.log("checking focus");
        this.setState(() => ({
            onFocus: false,
        }))
        var onFocus = false;
        const {clickoption} = this.state;
        if(onFocus == false && clickoption == false) {
            this.setState(() => ({ suggestions: []}));
        }
        this.setState(() => ({
            onFocus: false,
            clickoption: false,
        }))
    }

    changeFocus() {
        this.setState(() => ({
            onFocus: true,
        }))
    }

    keyPress(e) {
        if(e.keyCode == 13){
            this.searchForUser();
        }
    }

    render ()  {
        const {text} = this.state;
        return (
            <div>
                <div className="AutoCompleteSearchBar" onBlur={this.checkIfFocused}>
                    <input value={text} onClick={this.changeFocus} onKeyDown={this.keyPress} onChange={this.onTextChanged} type="text"/><button onClick={this.searchForUser}>Search</button>
                        {this.renderSuggestions()}
                </div>
            </div>
        )
    }
}

export default withRouter(AutoCompleteSearchBar);