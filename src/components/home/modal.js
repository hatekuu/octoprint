import React from 'react';
import './Modal.css'; // Đảm bảo bạn đã tạo file CSS cho modal

const Modal = ({ isOpen, onClose, printers, onSelectPrinter }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Select a Printer</h2>
        <div className="printer-list">
          {printers && printers.length > 0 ? (
            printers.map((printer) => (
              <div 
                key={printer._id} 
                onClick={() => onSelectPrinter(printer)}
                className="printer-item"
              >
                <h3>{printer.machineName}</h3>
                <p><strong>Vật liệu:</strong> {printer.material}</p>
                <p><strong>Màu:</strong> {printer.color}</p>
                <p><strong>Số file đang chờ:</strong> {printer.queueLength}</p>
                <p><strong>Loại máy:</strong> {printer.type}</p>
                <p><strong>Tốc độ:</strong> {printer.speed}</p>
              </div>
            ))
          ) : (
            <p>No printers available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
