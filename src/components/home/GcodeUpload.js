import React, { useState } from 'react';
import * as Realm from 'realm-web';
import './upload.css';

const app = new Realm.App({ id: process.env.REACT_APP_KEY });

const GcodeUpload = () => {
  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] = useState(0);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        let printTime = 'Unknown';
        if (lines.length > 1) {
          const timeLine = lines[1];
          const timeMatch = timeLine.match(/;TIME:(\d+)/);
          if (timeMatch) {
            printTime = parseInt(timeMatch[1], 10); // Convert to an integer
          }
        }

        const payload = {
          fileName: file.name,
          userId: user.id,
          fileSize: parseFloat(fileSize), // Ensure fileSize is a number
          fileContent,
          printTime,
        };

        const result = await user.functions.uploadGcodeFile(payload);

        if (result.success) {
          setMessage('File uploaded successfully');
        } else {
          setMessage('Error uploading file: ' + result.message);
        }
        setIsLoading(false);
      };

      reader.readAsText(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file');
      setIsLoading(false);
    }
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
    </div>
  );
};

export default GcodeUpload;
