import React, { useEffect, useState } from 'react';
import * as Realm from 'realm-web';
import './confirm.css'

const app = new Realm.App({ id: process.env.REACT_APP_KEY });

const ConfirmRegister = () => {
  const [message, setMessage] = useState('');


  useEffect(() => {
    const confirmEmail = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const tokenId = params.get('tokenId');

      if (!token || !tokenId) {
        setMessage('Invalid confirmation link');
        return;
      }

      try {
        await app.emailPasswordAuth.confirmUser({ token, tokenId });
        setMessage('Email confirmed successfully!');
        setTimeout(() => {
          window.location.href='/octoprint/login';
        }, 3000); // Redirect to login after 3 seconds
      } catch (error) {
        setMessage('Email confirmation failed. Please try again.');
      }
    };

    confirmEmail();
  },[]);

  return (
    <div className="confirmation-container">
    <div className="confirmation-message">
      <h1>{message}</h1>
    </div>
  </div>
  );
};

export default ConfirmRegister;
