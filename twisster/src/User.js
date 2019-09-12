import React, { Component } from 'react';
import { withRouter } from "react-router";

export class User {
  constructor(user) {
    this.email = user.user.email;
    
  }
}
export default User;