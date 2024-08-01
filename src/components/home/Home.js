import React, { useEffect,useState } from 'react';
import * as Realm from 'realm-web';
import GcodeUpload from './GcodeUpload';
import FilterProducts from './FilterProducts';
import SelectPrinter from './SelectPrinter';
import ViewPrintingFiles from './ViewPrintingFiles';
import './home.css';

const app = new Realm.App({ id: process.env.REACT_APP_KEY });

const Home = () => {
  const [printer, setPrinter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
     try {
        console.log(app.currentUser?.accessToken)
        await app.currentUser?.refreshAccessToken();
        if (!app.currentUser || app.currentUser?.accessToken === "") {
          window.location.href = '/octoprint/login';
        } 
      } catch (error) {
        console.log(error.error);
  
    }
  };
  const selectPrinter = (newMessage) => {
    setPrinter(newMessage);
  };
  return (
    <div className="home-container">
      <GcodeUpload  printer={printer}/>
      <SelectPrinter selectPrinter={selectPrinter}  />
      <ViewPrintingFiles />
      <FilterProducts />
     
    
    </div>
  );
};

export default Home;
