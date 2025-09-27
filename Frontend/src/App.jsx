import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setResult(null); // Clear previous results when a new file is selected
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/verify', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error during analysis:", error);
      setResult({ status: 'error', message: 'Failed to connect to the API.' });
    } finally {
      setIsLoading(false);
    }
  };

  // A helper function to render the result nicely
  const renderResult = () => {
    if (!result) return null;

    if (result.status === 'error') {
      return <div className="result error"><p>{result.message}</p></div>;
    }
    
    if (!result.match_found) {
      return <div className="result warning"><p>⚠️ {result.message}</p></div>;
    }

    return (
      <div className="result success">
        <h3>✅ Match Found!</h3>
        <p><strong>Brand Name:</strong> {result.details.brand_name}</p>
        <p><strong>Generic Name:</strong> {result.details.generic_name}</p>
        <p><strong>Composition:</strong> {result.details.composition}</p>
        <p><strong>Confidence:</strong> {result.confidence}%</p>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aushadhi-OCR 🌿</h1>
        <p>Upload a medicine package image to verify</p>
        
        <div className="uploader">
          <input type="file" accept="image/png, image/jpeg, image/bmp" onChange={handleFileChange} />
          <button onClick={handleAnalyze} disabled={!selectedFile || isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {isLoading && <p>Loading...</p>}
        {renderResult()}
      </header>
    </div>
  );
}

export default App;