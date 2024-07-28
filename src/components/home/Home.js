import React, { useEffect } from 'react';
import * as Realm from 'realm-web';
import GcodeUpload from './GcodeUpload';
const app = new Realm.App({ id: process.env.REACT_APP_KEY });

const Home = () => {
  useEffect(() => {
   fetchData()
  }, []);
const fetchData= async()=>{
  if (!app.currentUser || app.currentUser.accessToken === '') {
    window.location.href = '/octoprint/login';
  }else{
    try {
      await app.currentUser.refreshAccessToken()
    } catch (error) {
      console.log(error.error)
    }
  }
}
  return (
    <div>
      <h2>Home Page</h2>
      <GcodeUpload/>
    </div>
  );
};

export default Home;
