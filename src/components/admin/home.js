// Home.js
import React from 'react';
import AddProducts from './AddProducts';
import BillFilter from './BillFilter';
import PrinterFilter from './PrinterFilter';
import ProductFilter from './ProductFilter';
import './Home.css'; // Import CSS file

const Home = () => {
  return (
    <div className="grid-container">
      <div className="item"><AddProducts /></div>
      <div className="item"><PrinterFilter /></div>
      <div className="item"><ProductFilter /></div>
      <div className="item"><BillFilter /></div>
    </div>
  );
}

export default Home;
