import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);

  // In src/App.jsx, replace the old function with this one
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPreview(null); // Clear preview if no file is selected
      return;
    };

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert(`File is too large! Please upload a file smaller than ${MAX_SIZE / 1024 / 1024}MB.`);
      event.target.value = null;
      setSelectedFile(null);
      setResult(null);
      setPreview(null); // Clear preview on error
      return;
    }

    setSelectedFile(file);
    setResult(null);
    setPreview(URL.createObjectURL(file)); // <-- 2. CREATE AND SET PREVIEW URL
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

      // --- 2. UPDATE HISTORY ON SUCCESS ---
      if (data.status === 'success' && data.match_found) {
        // Add the new result to the start of the history array
        setScanHistory(prevHistory => [data, ...prevHistory].slice(0, 5)); // Keep last 5 scans
      }
      // --- END OF HISTORY UPDATE ---


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
          <input
            type="file"
            accept="image/png, image/jpeg, image/bmp"
            onChange={handleFileChange}
          />
          <button onClick={handleAnalyze} disabled={!selectedFile || isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {/* -- 3. ADD PREVIEW IMAGE ELEMENT -- */}
        {preview && (
          <div className="preview-container">
            <h3>Preview:</h3>
            <img src={preview} alt="Selected preview" className="preview-image" />
          </div>
        )}
        
        {isLoading && <p>Loading...</p>}
        {renderResult()}


        {/* --- 3. ADD HISTORY SECTION --- */}
        {scanHistory.length > 0 && (
          <div className="history-container">
            <h2>Recent Scans</h2>
            {scanHistory.map((item, index) => (
              <div key={index} className="history-item">
                <p><strong>{item.details.brand_name}</strong> ({item.confidence}%)</p>
              </div>
            ))}
          </div>
        )}
        {/* --- END OF HISTORY SECTION --- */}





      </header>
    </div>
  );
}

export default App;