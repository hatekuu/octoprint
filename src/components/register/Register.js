import React from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import * as Realm from "realm-web";
import { Link } from 'react-router-dom';
import '../form.css';
import formConfig from '../../formConfig.json';
// Add your App ID
const app = new Realm.App({ id: process.env.REACT_APP_KEY });

const validate = (formData, errors) => {
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword.addError("Passwords don't match");
  }
  return errors;
};

const RegisterForm = () => {
  const onSubmit = async ({ formData }) => {
    const { email, password } = formData;
    try {
      await app.emailPasswordAuth.registerUser({ email, password });
 
    } catch (error) {
      console.log(error.error);
    }
    window.location.href='/octoprint/login'
  };

  return (
    <div className="form-container">
      <Form
        schema={formConfig.register.schema}
        uiSchema={formConfig.register.uiSchema}
        validator={validator}
        onSubmit={onSubmit}
        customValidate={validate}
      />
      <div className="additional-links">
        <Link to="/octoprint/login" className="link">Login</Link>
      </div>
    </div>
  );
};

export default RegisterForm;
