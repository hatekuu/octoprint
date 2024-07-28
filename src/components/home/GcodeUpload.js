import React, { useState, useEffect } from 'react';
import * as Realm from 'realm-web';

const app = new Realm.App({ id: process.env.REACT_APP_KEY });

const Manafile = () => {
  const [user, setUser] = useState(app.currentUser);
  const [fileContent, setFileContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      fetchUploadedFiles();
    }
  }, [user]);

  const uploadFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // Check if file size is greater than 5MB
        setErrorMessage("File size exceeds 5MB. Please upload a smaller file.");
        return;
      }

      setIsLoading(true);
      setErrorMessage("");
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileContent = e.target.result;

        try {
          const mongodb = user.mongoClient("mongodb-atlas");
          const collection = mongodb.db("octoprint").collection("octoprintFileCloud");
          await collection.insertOne({ fileName: file.name, fileContent: fileContent });
          alert("File uploaded successfully");
          fetchUploadedFiles();
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          setIsLoading(false);
        }
      };
      reader.readAsText(file); // Read the file content as text
    }
  };

  const fetchUploadedFiles = async () => {
    if (user) {
      const mongodb = user.mongoClient("mongodb-atlas");
      const collection = mongodb.db("octoprint").collection("octoprintFileCloud");
      const files = await collection.find({});
      setUploadedFiles(files);
    }
  };

  const viewFileContent = (fileContent) => {
    setFileContent(fileContent); // Set the file content directly
  };

  return (
    <div>
      <h1>Upload G-code Files</h1>
      <input type="file" accept=".gcode" onChange={uploadFile} />
      {isLoading && <p>Uploading...</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <h2>Uploaded Files</h2>
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file._id}>
            {file.fileName}
            <button onClick={() => viewFileContent(file.fileContent)}>View Content</button>
          </li>
        ))}
      </ul>
      {fileContent && (
        <div>
          <h2>File Content</h2>
          <pre>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default Manafile;
