import React, { Component } from "react";
import "../Landing/Landing.css"
import "./Login.css"

export default class LoginFields extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: (props.locked && props.active) || false,
      value: props.value || "",
      error: props.error || "",
      label: props.label || this.props.label
    };
  }

  changeValue(event) {
    const value = event.target.value;
    this.setState({ value, error: "" });
  }

  handleKeyPress(event) {
    if (event.which === 13) {
      this.setState({ value: this.props.predicted });
    }
  }

  render() {
    const { active, value, error, label } = this.state;
    const { predicted, locked } = this.props;
    const fieldClassName = `field ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"}`;

    return (
      <div className={fieldClassName}>
        {active &&
          value &&
          predicted &&
          predicted.includes(value) && <p className="predicted">{predicted}</p>}
        <input
          id={1}
          type={this.props.type}
          value={value}
          placeholder={label}
          onKeyPress={this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
        />
        <label htmlFor={1} className={error && "error"}>
          {error || label}
        </label>
      </div>
    );
  }
}



//export default LogInView;


// const LogInView = ({changeValue, handleKeyPress}) => {  
  
//   const { active, value, error, label } = this.state;
//   const { predicted, locked } = this.props;
//   const fieldClassName = `field ${(locked ? active : active || value) &&
//     "active"} ${locked && !active && "locked"}`;

//   return( 
//       <div className={fieldClassName}>
//       <input
//         id={1}
//         type="text"
//         value={value}
//         placeholder={label}
//         onChange={changeValue}
//         onKeyPress={handleKeyPress}
//         onFocus={() => !locked && this.setState({ active: true })}
//         onBlur={() => !locked && this.setState({ active: false })}
//       />
//       <label htmlFor={1} className={error && "error"}>
//         {error || label}
//       </label>
//     </div>
//   );
// };



/*
<div>
        <h1>Login</h1>
        <form onSubmit={onSubmit}>      
        
        <label>
          Email/Username
          <input
            name="email"
            //type="email"
            placeholder="Email/Username"
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="Password"
          />          
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
    */