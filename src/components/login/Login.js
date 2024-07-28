import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import * as Realm from "realm-web";
import { Link } from 'react-router-dom';
import '../form.css';
import formConfig from '../../formConfig.json';
// Add your App ID
const app = new Realm.App({ id: process.env.REACT_APP_KEY });
const LoginForm = () => {
  const [state, setState] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const onSubmit = async ({ formData }) => {
    // Create an email/password credential
    const { email, password } = formData;
    const credentials = Realm.Credentials.emailPassword(email, password);
    // Authenticate the user
    try {
      await app.logIn(credentials);
    } catch (error) {
      console.log(error.error)
    }
   window.location.href='/octoprint'
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick  = async () => {
    try {
      await app.emailPasswordAuth.sendResetPasswordEmail({ inputValue });
    } catch (error) {
      console.log(error.error)
    }
   
  };

  return (
    <>
      {state ? (
        <div className="reset-password-container">
          <input
            type="text"
            placeholder="Enter text here"
            value={inputValue}
            onChange={handleInputChange}
            className="form-control"
          />
          <button onClick={handleButtonClick} className="btn btn-info">
            Log Input Value
          </button>
        </div>
      ) : (
        <div className="form-container">
          <Form
              schema={formConfig.login.schema}
              uiSchema={formConfig.login.uiSchema}
            validator={validator}
            onSubmit={onSubmit}
          />
          <div className="additional-links">
            <Link to="/octoprint/register" className="link">Register</Link>
            <Link onClick={() => setState(true)} className="link">Reset Password</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
