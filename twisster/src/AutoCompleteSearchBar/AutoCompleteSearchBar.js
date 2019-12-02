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
        }
        this.searchForUser = this.searchForUser.bind(this);
    }

    onTextChanged = (e) => {
        const { items } = this.props;
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex  = new RegExp(`^${value}`, 'i');
            console.log(items);
            suggestions = items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({ suggestions, text: value }));
    }

    suggestionSelected (value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions () {
        const {suggestions} = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick ={() => this.suggestionSelected(item)}>{item}</li>)}
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

    render ()  {
        const {text} = this.state;
        return (
            <div>
                <div className="AutoCompleteSearchBar" >
                    <input value={text} onChange={this.onTextChanged} type="text" /> <button onClick={this.searchForUser}>Search</button>
                    <ul>
                        {this.renderSuggestions()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(AutoCompleteSearchBar);