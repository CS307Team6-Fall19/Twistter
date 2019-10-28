import React from 'react';

const LoginTextBox = (props) => {
  return(
    <div className="login-textbox">
      
    </div>
  )
}

const PasswordTextBox = (props) => {
    return (
        <div className="login-textbox">
            <textarea id='passwordCredential' className='login-text' placeholder="Please enter your password"/>
        </div>
    )
}

const LoginPrompt = (props) => {
    return (
        <div className="login-prompt">
            <LoginTextBox>             
            </LoginTextBox>
            <PasswordTextBox>

            </PasswordTextBox>
        </div>
    )
}


export { LoginPrompt }