import React, { useState, useEffect } from 'react';
import * as Realm from 'realm-web';
import "./fileManager.css"
const app = new Realm.App({ id: process.env.REACT_APP_KEY });

const Bills = () => {
  const [Bills, setBill] = useState([]);
  const [done, setDone] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [currentView, setCurrentView] = useState(0); // 0 for Bills, 1 for Done, 2 for In Progress
  const [currentPage, setCurrentPage] = useState(0); // For pagination

  useEffect(() => {
  
    fetchData();
  }, []);
  const fetchData = async () => {
    const userId = app.currentUser.id;
    try {
      const result = await app.currentUser.functions.Adminview(userId);
      setBill(result[0]?.public?.output?.jsonData?.Bills || []);
      setDone(result[0]?.public?.output?.jsonData?.done || []);
      setInProgress(result[0]?.public?.output?.jsonData?.in_progress || []);
      console.log(result[0]?.public?.output?.jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };
  const itemsPerPage = 2;

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  const getCurrentData = () => {
    if (currentView === 0) {
      return Bills.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    } else if (currentView === 1) {
      return done.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    } else if (currentView === 2) {
      return inProgress.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    }
    return [];
  };
const Recieved = async(item)=>{
  try {
     await app.currentUser.functions.Shipping(item._id);
     fetchData()
  } catch (error) {
    console.log(error.error)
  }
}
  const renderCurrentView = () => {
    const currentData = getCurrentData();
    return (
      <div className="column">
        <h2>{currentView === 0 ? 'Đơn hàng' : currentView === 1 ? 'Sản phẩm hoàng thành' : 'Trong quá trình'}</h2>
        <div className="item-list">
          {currentData.map((item, index) => (
            <div className="item" key={index}>
              {currentView === 0 && (
                <>
                  <p>Loại thẻ: {item.cardType}</p>
                  <p>Chất liệu: {item.material}</p>
                  <p>Công nghệ thẻ: {item.cardTechnology}</p>
                  <p>Số lượng: {item.quantity}</p>
                  <p>Trạng thái: {item.status}</p>
                  {item.status==="Đang gói hàng" && (
                  <button onClick={()=>Recieved(item)}>Gửi hàng</button>)}
                </>
              )}
              {currentView === 1 && (
                <>
                  <p>Tên File: {item.fileName}</p>
                  <p>Kích thước: {item.fileSize} MB</p>

                  <p>Trạng thái: {item.status}</p>
                  <p>Thời gian bắt đầu: {new Date(item.StartTime).toLocaleString()}</p>
                  <p>Thời giang kết thúc: {new Date(item.EndTime).toLocaleString()}</p>
                  {item.status==="Đang gói hàng" && (
                  <button onClick={()=>Recieved(item)}>Gửi hàng</button>)}
                </>
              )}
              {currentView === 2 && (
                <>
                  <p>Trạng thái: {item.status}</p>
                  <p>Tổng thời gian dự kiến: {item.duration} giây</p>
                  {item.estimatedStartTime && (
                    <p>Thời giang bắt đầu dự kiến: {new Date(item.estimatedStartTime).toLocaleString()}</p>
                  )}
                  <p>Thời giang kết thúc dự kiến: {new Date(item.estimatedEndTime).toLocaleString()}</p>
            
                </>
              )}
            </div>
          ))}
        </div>
        <button onClick={handlePrevious} disabled={currentPage === 0}>
          ◀
        </button>
        <button onClick={handleNext} disabled={(currentPage + 1) * itemsPerPage >= (currentView === 0 ? Bills.length : currentView === 1 ? done.length : inProgress.length)}>
          ▶
        </button>
      </div>
    );
  };

  return (
    <div className="view-printing-files">
      <button onClick={() => {setCurrentView(0); setCurrentPage(0)}}>Xem đơn hàng</button>
      <button onClick={() => {setCurrentView(1); setCurrentPage(0)}}>Đã in xong</button>
      <button onClick={() => {setCurrentView(2); setCurrentPage(0)}}>Đang in</button>
      {renderCurrentView()}
    </div>
  );
};

export default Bills;
