import React, { useEffect, useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import * as Realm from 'realm-web';
import './Modal.css'; // Import custom styles for the modal

const app = new Realm.App({ id: process.env.REACT_APP_KEY });

const FilterProducts = () => {
  const [schema, setSchema] = useState({});
  const [uiSchema, setUiSchema] = useState({});
  const [resultData, setResultData] = useState(null); // State to store the result data
  const [error, setError] = useState(null); // State to store error messages
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal visibility
const [data,setData]=useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await app.currentUser.functions.OrderModule("dong");
        setSchema(result[0]?.public?.input?.jsonSchema);
        setUiSchema(result[0]?.public?.input?.uiSchema);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async ({ formData }) => {
    try {
      setData(formData)
      const result = await app.currentUser.functions.OrderModule(formData);
      setResultData(result[0]?.public?.output?.jsonData); // Update state with jsondata
      setModalIsOpen(true); // Open modal after submission
    } catch (error) {
      setError(error.message);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false); // Close modal
    setData(null)
  };
const MakeBill=async()=>{
  data.userId=app.currentUser.id
  try {
    await app.currentUser.functions.AddToBills(data);
    alert("Đặt hàng thành công")
  } catch (error) {
    console.log(error.error)
  }
  
  setModalIsOpen(false);
  setData(null)
}
  const formatProductionTime = (totalProductionTime) => {
    const days = Math.floor(totalProductionTime);
    const hours = Math.round((totalProductionTime - days) * 24);
    return `${days} days ${hours} hours`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="filter-products">
      <h3>Chọn sản phẩm</h3>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        validator={validator}
        uiSchema={uiSchema}
      />

      {modalIsOpen && resultData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p><strong>Tông giá:</strong> {resultData.totalCost.toLocaleString()}đồng</p>
            <p><strong>Thời gian hoàng thành:</strong> {formatProductionTime(resultData.totalProductionTime)}</p>
          <p>Bạn vẫn muốn mua chứ?</p>
            <button onClick={closeModal}>Không</button>
            <button onClick={MakeBill}>Có</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterProducts;
