import React from 'react'
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import formConfig from "../../formConfig.json"

const FilterProducts = () => {
    const handleSubmit = ({ formData }) => {
        console.log("Printer data:", formData);
     
      };
  return (
    <div className="filter-products">
    <h3>Chọn sản phẩm</h3>
    <Form 
    schema={formConfig.filterProducts.schema} 
    onSubmit={handleSubmit} 
    validator={validator} 
    uiSchema={formConfig.filterProducts.uiSchema} />
  </div>
  )
}

export default FilterProducts