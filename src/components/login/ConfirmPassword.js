import React, { useState } from 'react';
import * as Realm from 'realm-web';
import './confirm.css';

const app = new Realm.App({ id: process.env.REACT_APP_KEY });

const ConfirmPassword = () => {
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const confirmEmail = async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const tokenId = params.get('tokenId');

    if (!token || !tokenId) {
      setMessage('Invalid confirmation link');
      return;
    }

    try {
      await app.emailPasswordAuth.resetPassword({
        password: inputValue,
        token,
        tokenId,
      });
      setMessage('Password reset successfully!');
      setTimeout(() => {
        window.location.href = '/octoprint/login';
      }, 3000); // Redirect to login after 3 seconds
    } catch (error) {
      setMessage('Password reset failed. Please try again.');
    }
  };

  return (
    <div className="reset-password-container">
      <input
        type="password"
        placeholder="Enter new password"
        value={inputValue}
        onChange={handleInputChange}
        className="form-control"
      />
      <button onClick={confirmEmail} className="btn btn-info">
        Confirm
      </button>
      {message && <div className="confirmation-message">{message}</div>}
    </div>
  );
};

export default ConfirmPassword;
