import React,{useEffect} from 'react'
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import * as Realm from 'realm-web'
import './Add.css'
const app = new Realm.App({ id: process.env.REACT_APP_KEY });
const schema = {
  type: 'object',
  required: ['cardCategory', 'cardType', 'image', 'quantity','quantityPerHour'],
  properties: {
    cardCategory: { type: 'string', title: 'Danh mục sản phẩm' },
    cardType: { type: 'string', title: 'Loại' },
    image: {
      type: 'array',
      title: 'Link hình ảnh',
      items: {
        type: 'string',
        format: 'uri',
        title: 'Hình ảnh'
      },
      minItems: 1
    },
    quantity: { type: 'integer', title: 'Số lượng mỗi lô hàng' },
    quantityPerHour:{type:'integer',title:"Số lượng sản xuất mỗi giờ"}
  }
};

const onSubmit=async({formData})=>{
  console.log(formData)
}
const uiSchema = {
  "ui:submitButtonOptions": {
    "norender": false,
    "submitText": "Nhập hàng",
  }
};

const AddProducts = () => {
  return (
    <div>
         <Form
    schema={schema}
    validator={validator}
    uiSchema={uiSchema}
    onSubmit={onSubmit}/>
    </div>
  )
}

export default AddProducts