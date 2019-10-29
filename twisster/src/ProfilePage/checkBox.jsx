import React from 'react';
import PropTypes from 'prop-types';
import { checkboxes } from './checkBox.js';
import { Checkbox } from './checkBox.js';
import helperfunctions from '../helperfunctions.js';

class CheckboxContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = 
    {
      checkedItems: new Map(),
      loaded: false
    }

    this.username = props.username;

    this.handleChange = this.handleChange.bind(this);

    // const isChecked = true;
    // let name = "Hello";
    // let key = "checkbox4";
    // let label = "Check Box n";
    
    // let newCheckbox = {
    //   name: name,
    //   key: key,
    //   label: label
    // }

    // checkboxes.map(item => (      
    //   this.state.checkedItems.set(item.name, isChecked)
    // ));
    
    // checkboxes.push(newCheckbox);
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  async componentDidMount()
  {
    this.topics = await helperfunctions.getFollowedAndUnfollowedTopics(this.username);
    
    for(var index = 0; index < this.topics.followedTopics.length; index++)
    {
      const isChecked = true;
      let name = this.topics.followedTopics[index];
      let key = this.topics.followedTopics[index] + "" + index;
      let label = "Check Box " + index;
      
      let checkbox_new = {
        name : name,
        key: key,
        label: label
      };

      /* checkboxes.map(item => (
        this.state.checkedItems.set(item.name, isChecked)
      )); */

      this.state.checkedItems.set(name, isChecked)

      checkboxes.push(checkbox_new);
    }

    for(var index = 0; index < this.topics.unfollowedTopics.length; index++)
    {
      const isChecked = false;
      let name = this.topics.unfollowedTopics[index];
      let key = this.topics.unfollowedTopics[index] + "" + index;
      let label = "Check Box " + index;
      
      let checkbox_new = {
        name : name,
        key: key,
        label: label
      };

     /*  checkboxes.map(item => (
        this.state.checkedItems.set(item.name, isChecked)
      )); */

      this.state.checkedItems.set(name, isChecked)

      checkboxes.push(checkbox_new);
    }
    //this.handleChange = this.handleChange.bind(this);
    this.setState({loaded: true});
  }

  async save()
  {
    console.log("REACHED HERE");
  }
  // componentWillMount() {
  //   const isChecked = true;
  //   checkboxes.map(item => (      
  //     this.state.checkedItems.set(item, isChecked)
  //    ));
  // }

  render() {
    if(this.state.loaded)
    {
      return (
        <React.Fragment>
          {
            checkboxes.map(item => (
              <label key={item.key}>
                {item.name}
                <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} />
              </label>
            ))
          }
          <button type="button" onClick={this.save}>Save</button>
        </React.Fragment>
      );
    }
    else
    {
      return null;
    }
  }
}

export default CheckboxContainer;