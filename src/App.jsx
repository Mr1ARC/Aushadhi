import React, { useState } from 'react';
import { Upload, Search, CheckCircle, AlertTriangle, XCircle, Clock, Pill } from 'lucide-react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPreview(null);
      setSelectedFile(null);
      return;
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert(`File is too large! Please upload a file smaller than ${MAX_SIZE / 1024 / 1024}MB.`);
      event.target.value = null;
      setSelectedFile(null);
      setResult(null);
      setPreview(null);
      return;
    }

    setSelectedFile(file);
    setResult(null);
    setPreview(URL.createObjectURL(file));
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

      if (data.status === 'success' && data.match_found) {
        setScanHistory(prevHistory => [data, ...prevHistory].slice(0, 5));
      }

    } catch (error) {
      console.error("Error during analysis:", error);
      setResult({ status: 'error', message: 'Failed to connect to the API.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    if (result.status === 'error') {
      return (
        <div className="result error">
          <div className="result-header">
            <XCircle size={24} />
            <h3 className="result-title">Error</h3>
          </div>
          <p>{result.message}</p>
        </div>
      );
    }
    
    if (!result.match_found) {
      return (
        <div className="result warning">
          <div className="result-header">
            <AlertTriangle size={24} />
            <h3 className="result-title">No Match Found</h3>
          </div>
          <p>{result.message}</p>
        </div>
      );
    }

    return (
      <div className="result success">
        <div className="result-header">
          <CheckCircle size={24} />
          <h3 className="result-title">Verified Medicine</h3>
          <span className="confidence-badge">{result.confidence}%</span>
        </div>
        <div className="result-details">
          <div className="result-item">
            <span className="result-label">Brand Name:</span>
            <span className="result-value">{result.details.brand_name}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Generic Name:</span>
            <span className="result-value">{result.details.generic_name}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Composition:</span>
            <span className="result-value">{result.details.composition}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="main-container">
        <div className="header">
          <h1 className="title">Aushadhi-OCR 🌿</h1>
          <p className="subtitle">
            Upload a medicine package image to verify its authenticity and get detailed information
          </p>
        </div>
        
        <div className={`upload-section ${selectedFile ? 'has-file' : ''}`}>
          <div className="file-input-wrapper">
            <input
              type="file"
              accept="image/png, image/jpeg, image/bmp"
              onChange={handleFileChange}
              className="file-input"
            />
            <button className="file-input-button">
              <Upload size={20} />
              {selectedFile ? 'Change Image' : 'Choose Image'}
            </button>
          </div>
          
          {selectedFile && (
            <div className="file-info">
              <strong>{selectedFile.name}</strong> ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
          
          {!selectedFile && (
            <p className="file-info">
              Supported formats: PNG, JPG, BMP • Max size: 5MB
            </p>
          )}
        </div>

        <button 
          onClick={handleAnalyze} 
          disabled={!selectedFile || isLoading}
          className="analyze-button"
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Search size={20} />
              Verify Medicine
            </>
          )}
        </button>

        {preview && (
          <div className="preview-container">
            <h3 className="preview-title">Image Preview</h3>
            <img src={preview} alt="Selected preview" className="preview-image" />
          </div>
        )}
        
        {renderResult()}

        {scanHistory.length > 0 && (
          <div className="history-container">
            <h2 className="history-title">
              <Clock size={24} />
              Recent Scans
            </h2>
            <div className="history-grid">
              {scanHistory.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="history-item-header">
                    <div className="history-brand">
                      <Pill size={16} style={{ display: 'inline', marginRight: '8px' }} />
                      {item.details.brand_name}
                    </div>
                    <div className="history-confidence">{item.confidence}%</div>
                  </div>
                  <div className="history-generic">{item.details.generic_name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;