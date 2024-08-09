import React,{useEffect,useState} from 'react';

import * as Realm from 'realm-web';

const app = new Realm.App({ id: process.env.REACT_APP_KEY });
const Printer = () => {
const [config,setConfig]=useState({})
  useEffect(()=>{
        fetchData()
  },[])
  const fetchData =async()=>{
    try {
      const result = await app.currentUser.functions.FindConfig();
     setConfig(result)
     console.log(result)
    } catch (error) {
       console.log(error.error)
    }
  }
  
  const Print=async()=>{
    
        try {
            await app.currentUser.functions.Printing();
        } catch (error) {
            console.log(error.error)
        }
  }
  return (
    <div className="select-printer">
        <h2>Máy in3d</h2>
      <p>Trạng thái:{config.state}</p>
{config.state!=="starting"&&(
            <button onClick={()=>{Print()}}> Bắt đầu in</button>
)}
    </div>
  );
};

export default Printer;
