import React,{useEffect,useState} from 'react';
import Form from '@rjsf/core';
import * as Realm from 'realm-web';
import validator from '@rjsf/validator-ajv8';
const app = new Realm.App({ id: process.env.REACT_APP_KEY });
const SelectPrinter = ({selectPrinter}) => {
const [schema,setSchema]= useState({})
const [uiSchema,setUiSchema]= useState({})
  useEffect(()=>{
        fetchData()
  },[])
  const fetchData =async()=>{
    try {
      const result = await app.currentUser.functions.printerModule("dong");
      setSchema(result[0]?.public?.input?.jsonSchema)
      setUiSchema(result[0]?.public?.input?.uiSchema)
    } catch (error) {
       console.log(error.error)
    }
  }
  const handleSubmit = async ({ formData }) => {
    try {
      
     const result= await app.currentUser.functions.printerModule(formData);
     console.log(result)
    const data={
      result,
      press:"yes"
    }
     selectPrinter(data)
    } catch (error) {
      console.log(error.error)
    }
    // Add logic to select printer based on formData
  
  };

  return (
    <div className="select-printer">
      <h3>Chọn máy in</h3>
      <Form schema={schema} onSubmit={handleSubmit} validator={validator} uiSchema={uiSchema} />
    </div>
  );
};

export default SelectPrinter;
