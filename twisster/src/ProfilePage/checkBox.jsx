import React from 'react';
import PropTypes from 'prop-types';
import { checkboxes } from './checkBox.js';
import { Checkbox } from './checkBox.js';

class CheckboxContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedItems: new Map(),
    }

    this.handleChange = this.handleChange.bind(this);

    const isChecked = true;
    let name = "Hello";
    let key = "checkbox4";
    let label = "Check Box n";
    
    let newCheckbox = {
      name: name,
      key: key,
      label: label
    }

    checkboxes.map(item => (      
      this.state.checkedItems.set(item.name, isChecked)
    ));
    
    checkboxes.push(newCheckbox);
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  // componentWillMount() {
  //   const isChecked = true;
  //   checkboxes.map(item => (      
  //     this.state.checkedItems.set(item, isChecked)
  //    ));
  // }

  render() {
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
      </React.Fragment>
    );
  }
}

export default CheckboxContainer;