import React, { useState, useRef } from 'react';
import { 
  FiUpload, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiXCircle, 
  FiLoader, 
  FiImage, 
  FiTrash2, 
  FiRefreshCw,
  FiShield,
  FiZap,
  FiEye,
  FiInfo,
  FiMenu,
  FiX,
  FiGithub,
  FiMail,
  FiPhone
} from 'react-icons/fi';

// Enhanced logo component
const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" fill="url(#gradient)"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div>
      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">MedVerify-AI</span>
      <p className="text-xs text-gray-500 -mt-1">Medicine Verification</p>
    </div>
  </div>
);

// Header component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#safety-tips" className="text-gray-600 hover:text-blue-600 transition-colors">Safety Tips</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          </nav>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              <a href="#features" className="px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">Features</a>
              <a href="#how-it-works" className="px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">How it Works</a>
              <a href="#safety-tips" className="px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">Safety Tips</a>
              <a href="#about" className="px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">About</a>
              <a href="#contact" className="px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Footer component
const Footer = () => (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 text-gray-300 max-w-md">
            MedVerify-AI is an advanced medicine verification system that helps identify authentic pharmaceutical products 
            and detect potential counterfeits using cutting-edge OCR technology.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="https://github.com/Mr1ARC" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FiGithub size={20} />
            </a>
            <a href="mailto:adarsh@example.com" className="text-gray-400 hover:text-white transition-colors">
              <FiMail size={20} />
            </a>
            <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">
              <FiPhone size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          <ul className="space-y-2 text-gray-300">
            <li>OCR Text Recognition</li>
            <li>Medicine Database</li>
            <li>Counterfeit Detection</li>
            <li>Real-time Analysis</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Documentation</li>
            <li>API Reference</li>
            <li>Help Center</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 MedVerify-AI. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// Features section component
const FeaturesSection = () => (
  <section id="features" className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced OCR technology combined with comprehensive medicine database for accurate verification
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-6 rounded-xl bg-blue-50 border border-blue-200">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiEye className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">OCR Recognition</h3>
          <p className="text-gray-600">
            Advanced optical character recognition extracts text from medicine packaging with high accuracy
          </p>
        </div>
        
        <div className="text-center p-6 rounded-xl bg-green-50 border border-green-200">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiShield className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Counterfeit Detection</h3>
          <p className="text-gray-600">
            Identifies potential counterfeit medicines by comparing against verified pharmaceutical database
          </p>
        </div>
        
        <div className="text-center p-6 rounded-xl bg-purple-50 border border-purple-200">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiZap className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Analysis</h3>
          <p className="text-gray-600">
            Instant verification results with confidence scoring for quick decision making
          </p>
        </div>
      </div>
    </div>
  </section>
);

// How it works section
const HowItWorksSection = () => (
  <section id="how-it-works" className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-xl text-gray-600">
          Simple three-step process to verify your medicine
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
            1
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Image</h3>
          <p className="text-gray-600">
            Take a photo or upload an image of your medicine package
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
            2
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Analysis</h3>
          <p className="text-gray-600">
            Our AI extracts text and compares it with verified medicine database
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
            3
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Results</h3>
          <p className="text-gray-600">
            Receive instant verification with confidence score and detailed information
          </p>
        </div>
      </div>
    </div>
  </section>
);

// Stats section
const StatsSection = () => (
  <section className="py-16 bg-blue-600">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8 text-center text-white">
        <div>
          <div className="text-4xl font-bold mb-2">588+</div>
          <div className="text-blue-100">Medicine Records</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">95%</div>
          <div className="text-blue-100">Accuracy Rate</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">24/7</div>
          <div className="text-blue-100">Available</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">1s</div>
          <div className="text-blue-100">Average Response</div>
        </div>
      </div>
    </div>
  </section>
);

// Safety Tips section
const SafetyTipsSection = () => (
  <section id="safety-tips" className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Medicine Verification Guidelines</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Important safety tips to help you identify authentic medicines and avoid counterfeits
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">1</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Barcode Verification</h3>
          <p className="text-gray-600 text-sm">
            Currently, barcodes are available on about 25% of medicines. Scan the barcode to be directed to the original manufacturer's website for verification.
          </p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">2</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Packaging Inspection</h3>
          <p className="text-gray-600 text-sm">
            Check for unusual fonts, colors, or spelling errors. Ensure no seal breakage and that holograms are intact and not missing.
          </p>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">3</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Physical Appearance</h3>
          <p className="text-gray-600 text-sm">
            Examine the shape and appearance. Watch for smaller tablets, excessive powder at the bottom, or visible cracks in tablets.
          </p>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">4</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Batch & Expiry Check</h3>
          <p className="text-gray-600 text-sm">
            Verify that batch number and expiry date on the strip or bottle match the outer packaging. Mismatches indicate tampering.
          </p>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">5</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Verification</h3>
          <p className="text-gray-600 text-sm">
            Compare the cost with usual market price. Unusually low or heavily discounted prices may indicate counterfeit medicine.
          </p>
        </div>
        
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
            <FiShield className="text-white text-xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Stay Safe</h3>
          <p className="text-gray-600 text-sm">
            Always purchase medicines from licensed pharmacies and authorized dealers. When in doubt, consult your healthcare provider.
          </p>
        </div>
      </div>
      
      <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <FiInfo className="text-yellow-600 text-2xl mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Note</h3>
            <p className="text-gray-700">
              These guidelines complement our AI-powered verification system. Always use multiple verification methods for the highest level of safety when dealing with medicines.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (file) => {
    setResult(null); // Clear previous result
    if (!file) {
      setSelectedFile(null);
      setImagePreview(null);
      return;
    }
    
    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image file (PNG, JPG, or BMP)');
      return;
    }
    
    setSelectedFile(file);
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    handleFileChange(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append('image', selectedFile);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5001';
      const response = await fetch(`${apiUrl}/api/verify`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error during analysis:", error);
      setResult({ status: 'error', message: 'Failed to connect to the API.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced result card component with better formatting
  const ResultCard = ({ result }) => {
    if (!result) return null;

    let cardStyles, icon, title, message, details;

    if (result.status === 'error') {
      cardStyles = 'bg-red-50 border-red-200 text-red-800';
      icon = <FiXCircle size={28} className="text-red-500" />;
      title = 'Error';
      message = result.message;
    } else if (!result.match_found) {
      cardStyles = 'bg-yellow-50 border-yellow-200 text-yellow-800';
      icon = <FiAlertTriangle size={28} className="text-yellow-500" />;
      title = 'Verification Failed';
      message = result.message;
    } else {
      cardStyles = 'bg-green-50 border-green-200 text-green-800';
      icon = <FiCheckCircle size={28} className="text-green-500" />;
      title = 'Verification Successful!';
      message = `${result.details.brand_name} - ${result.confidence}% confidence`;
      details = (
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-green-200">
            <span className="text-sm font-medium">Brand Name:</span>
            <span className="text-sm font-semibold">{result.details.brand_name}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-green-200">
            <span className="text-sm font-medium">Composition:</span>
            <span className="text-sm text-right max-w-48">{result.details.composition}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm font-medium">Confidence:</span>
            <div className="flex items-center gap-3">
              <div className="w-24 bg-green-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold min-w-12">{result.confidence}%</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`mt-6 w-full max-w-lg rounded-2xl border-2 p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${cardStyles}`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-2 rounded-full bg-white/70">{icon}</div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm opacity-90 mb-3">{message}</p>
            {details}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              MedVerify-AI
              <span className="block text-blue-600">Medicine Verification</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              AI-powered OCR technology to identify authentic pharmaceutical products 
              and detect potential counterfeits instantly
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur-lg">
                <div className="text-center mb-6">
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <h2 className="mt-2 text-xl font-semibold text-gray-800">Upload Image</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Drag & drop or click to select a medicine package image
                  </p>
                </div>
                
                {/* Drag and Drop Area */}
                <div
                  className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-300 bg-gray-50/50 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto max-h-48 rounded-lg shadow-md"
                      />
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <FiImage className="h-4 w-4" />
                        <span>{selectedFile.name}</span>
                        <button
                          onClick={clearFile}
                          className="ml-2 p-1 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">
                          {dragActive ? 'Drop the image here' : 'Drag & drop your image here'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">or</p>
                        <label
                          htmlFor="file-upload"
                          className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                          Browse Files
                        </label>
                        <input
                          ref={fileInputRef}
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileInputChange}
                          accept="image/png, image/jpeg, image/jpg, image/bmp"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleAnalyze}
                  disabled={!selectedFile || isLoading}
                  className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="animate-spin h-5 w-5" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <FiRefreshCw className="h-5 w-5" />
                      <span>Analyze Medicine</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Results Section */}
              <div className="flex flex-col">
                <ResultCard result={result} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SafetyTipsSection />
      <Footer />
    </div>
  );
}

export default App;