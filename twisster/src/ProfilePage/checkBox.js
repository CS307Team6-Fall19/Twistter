import React, { Component } from "react";
import PropTypes from 'prop-types';
const checkboxes = [];
  
  const Checkbox = ({ type = 'checkbox', name, checked, onChange }) => (
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