import React, { Component } from "react";
import PropTypes from 'prop-types';
const checkboxes = [
    {
      name: 'check-box-1',
      key: 'checkBox1',
      label: 'Check Box 1',
    },
    {
      name: 'check-box-2',
      key: 'checkBox2',
      label: 'Check Box 2',
    },
    {
      name: 'check-box-3',
      key: 'checkBox3',
      label: 'Check Box 3',
    },
    {
      name: 'check-box-4',
      key: 'checkBox4',
      label: 'Check Box 4',
    },
  ];
  
  const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
    <input type={type} name={name} checked={checked} onChange={onChange} />
  );
  
  Checkbox.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }
  
  export { Checkbox };

  export { checkboxes };