import React, { useState, useEffect } from 'react';
import * as Realm from 'realm-web';
import './upload.css';
import Modal from '../modal/modal';

const app = new Realm.App({ id: process.env.REACT_APP_KEY });

const GcodeUpload = ({ printer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [printers, setPrinters] = useState([]);
  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] = useState(0);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (printer?.result) {
  
      setPrinters(printer?.result[0]?.public?.output?.jsonData?.printer || []);
    }

    if (printer?.press === "yes") {
      handleOpenModal();
    }
  }, [printer]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileSizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2);
      if (fileSizeMB > 5) {
        setMessage('File size exceeds 5MB limit. Please select a smaller file.');
        setFile(null);
        setFileSize(0);
      } else {
        setFile(selectedFile);
        setFileSize(parseFloat(fileSizeMB));
        setMessage('');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('No file selected');
      return;
    }

    setIsLoading(true);

    try {
      const user = app.currentUser;
      if (!user) {
        setMessage('User not authenticated');
        setIsLoading(false);
        return;
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const fileContent = event.target.result;

        // Extract print time from the second line
        const lines = fileContent.split('\n');
        let duration = 'Unknown';
        if (lines.length > 1) {
          const timeLine = lines[1];
          const timeMatch = timeLine.match(/;TIME:(\d+)/);
          if (timeMatch) {
            duration = parseInt(timeMatch[1], 10); // Convert to an integer
          }
        }

        if (selectedPrinter) {
          const printerId = selectedPrinter._id;
          const payload = {
            fileName: file.name,
            userId: user.id,
            fileSize: parseFloat(fileSize), // Ensure fileSize is a number
            fileContent,
            duration,
            printerId
          };

          const result = await user.functions.uploadGcodeFile(payload);

          if (result.success) {
            setMessage('File uploaded successfully');
            setFile(null);
            setFileSize(0);
            setSelectedPrinter(null);
            document.querySelector('input[type="file"]').value = null; // Reset input file
          } else {
            console.log(result.message);
            setMessage('Error uploading file: ' + result.message);
          }
          setIsLoading(false);
        } else {
          alert("Bạn phải chọn máy in");
          setIsLoading(false);
        }
      };

      reader.readAsText(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file');
      setIsLoading(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectPrinter = (printer) => {
    setSelectedPrinter(printer);
    setIsModalOpen(false);
  };

  return (
    <div className="upload-container">
      <h2>Upload G-code File</h2>
      <input type="file" accept=".gcode" onChange={handleFileChange} />
      {file && <p>File size: {fileSize} MB</p>}
      <button onClick={handleUpload} className="btn btn-info" disabled={isLoading || !file}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p>{message}</p>}
      <Modal
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        printers={printers} 
        onSelectPrinter={handleSelectPrinter} 
      />
      {selectedPrinter && (
        <div>
          <h2>Selected Printer:</h2>
          <p><strong>Tên máy:</strong> {selectedPrinter.machineName}</p>
          <p><strong>Vật liệu:</strong> {selectedPrinter.material}</p>
          <p><strong>Màu:</strong> {selectedPrinter.color}</p>
          <p><strong>File đang chờ:</strong> {selectedPrinter.queueLength}</p>
          <p><strong>Loại máy:</strong> {selectedPrinter.type}</p>
          <p><strong>Tốc độ:</strong> {selectedPrinter.speed}</p>
        </div>
      )}
    </div>
  );
};

export default GcodeUpload;
