import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FiPhone,
  FiDownload,
  FiSearch,
  FiActivity
} from 'react-icons/fi';
import { API_CONFIG, APP_CONFIG } from './config';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import SafetyTipsSection from './components/SafetyTipsSection';
import Footer from './components/Footer';

// Enhanced logo component with animation
const Logo = () => (
  <motion.div 
    className="flex items-center gap-3"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div 
      className="relative"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
        <motion.path 
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" 
          fill="url(#gradient)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
    <div>
      <motion.span 
        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {APP_CONFIG.NAME}
      </motion.span>
      <motion.p 
        className="text-xs text-gray-500 -mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Medicine Verification
      </motion.p>
    </div>
  </motion.div>
);

// Header component with smooth animations
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <motion.header 
      className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {['Features', 'How it Works', 'Safety Tips', 'About', 'Contact'].map((item, index) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-600 hover:text-blue-600 transition-colors relative group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {item}
                <motion.div 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </motion.a>
            ))}
          </motion.nav>
          
          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiX size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiMenu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
        {isMenuOpen && (
            <motion.div 
              className="md:hidden py-4 border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
            <nav className="flex flex-col space-y-2">
                {['Features', 'How it Works', 'Safety Tips', 'About', 'Contact'].map((item, index) => (
                  <motion.a 
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
            </nav>
            </motion.div>
        )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

// Enhanced result card with animations
const ResultCard = ({ result }) => {
  if (!result) return null;

  let cardStyles, icon, title, message, details, bgColor;

  if (result.status === 'error') {
    cardStyles = 'bg-red-50 border-red-200 text-red-800';
    icon = <FiXCircle size={28} className="text-red-500" />;
    title = 'Error';
    message = result.message;
    bgColor = 'red';
  } else if (!result.match_found) {
    cardStyles = 'bg-yellow-50 border-yellow-200 text-yellow-800';
    icon = <FiAlertTriangle size={28} className="text-yellow-500" />;
    title = 'Verification Failed';
    message = result.message;
    bgColor = 'yellow';
  } else {
    cardStyles = 'bg-green-50 border-green-200 text-green-800';
    icon = <FiCheckCircle size={28} className="text-green-500" />;
    title = 'Verification Successful!';
    message = `${result.details.brand_name} - ${result.confidence}% confidence`;
    bgColor = 'green';
    details = (
      <motion.div 
        className="mt-4 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="flex justify-between items-center py-2 border-b border-green-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-sm font-medium">Brand Name:</span>
          <span className="text-sm font-semibold">{result.details.brand_name}</span>
        </motion.div>
        <motion.div 
          className="flex justify-between items-center py-2 border-b border-green-200"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-sm font-medium">Generic Name:</span>
          <span className="text-sm text-right max-w-48">{result.details.composition}</span>
        </motion.div>
        <motion.div 
          className="flex justify-between items-center py-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-sm font-medium">Confidence:</span>
          <div className="flex items-center gap-3">
            <div className="w-24 bg-green-200 rounded-full h-2">
              <motion.div 
                className="bg-green-500 h-2 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${result.confidence}%` }}
                transition={{ duration: 1, delay: 0.6 }}
              />
        </div>
            <span className="text-sm font-semibold min-w-12">{result.confidence}%</span>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`mt-6 w-full max-w-lg rounded-2xl border-2 p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${cardStyles}`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start gap-4">
        <motion.div 
          className="flex-shrink-0 p-2 rounded-full bg-white/70"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          {icon}
        </motion.div>
        <div className="flex-1">
          <motion.h3 
            className="font-bold text-lg mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-sm opacity-90 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {message}
          </motion.p>
          {details}
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced upload area with drag and drop animations
const UploadArea = ({ 
  selectedFile, 
  imagePreview, 
  dragActive, 
  isLoading,
  onFileChange, 
  onDrag, 
  onDrop, 
  onClearFile, 
  onAnalyze 
}) => {
  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    onFileChange(file);
  };

  return (
    <motion.div 
      className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.div 
        className="text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          animate={{ 
            rotate: isLoading ? 360 : 0,
            scale: isLoading ? 1.1 : 1
          }}
          transition={{ 
            rotate: { duration: 2, repeat: isLoading ? Infinity : 0, ease: "linear" },
            scale: { duration: 0.3 }
          }}
        >
          <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
        </motion.div>
        <motion.h2 
          className="mt-2 text-xl font-semibold text-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Upload Image
        </motion.h2>
        <motion.p 
          className="mt-1 text-sm text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Drag & drop or click to select a medicine package image
        </motion.p>
      </motion.div>
      
      {/* Drag and Drop Area */}
      <motion.div
        className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
          dragActive
            ? 'border-blue-400 bg-blue-50 scale-105'
            : 'border-gray-300 bg-gray-50/50 hover:border-gray-400'
        }`}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
      >
        <AnimatePresence mode="wait">
          {imagePreview ? (
            <motion.div 
              className="space-y-4"
              key="preview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={imagePreview}
                alt="Preview"
                className="mx-auto max-h-48 rounded-lg shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              />
              <motion.div 
                className="flex items-center justify-center gap-2 text-sm text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FiImage className="h-4 w-4" />
                <span>{selectedFile.name}</span>
                <motion.button
                  onClick={onClearFile}
                  className="ml-2 p-1 text-red-500 hover:text-red-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiTrash2 className="h-4 w-4" />
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-4"
              key="upload"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ 
                  y: dragActive ? [-5, 5, -5] : 0,
                  scale: dragActive ? 1.1 : 1
                }}
                transition={{ 
                  y: { duration: 1, repeat: dragActive ? Infinity : 0 },
                  scale: { duration: 0.3 }
                }}
              >
                <FiImage className="mx-auto h-12 w-12 text-gray-400" />
              </motion.div>
              <div>
                <motion.p 
                  className="text-sm text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {dragActive ? 'Drop the image here' : 'Drag & drop your image here'}
                </motion.p>
                <motion.p 
                  className="text-xs text-gray-500 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  or
                </motion.p>
                <motion.label
                  htmlFor="file-upload"
                  className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Browse Files
                </motion.label>
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileInputChange}
                  accept="image/png, image/jpeg, image/jpg, image/bmp"
                />
          </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <motion.button
        onClick={onAnalyze}
        disabled={!selectedFile || isLoading}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        whileHover={{ scale: !selectedFile || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: !selectedFile || isLoading ? 1 : 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <FiLoader className="h-5 w-5" />
            </motion.div>
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <FiRefreshCw className="h-5 w-5" />
            <span>Analyze Medicine</span>
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

// Main App component
function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [stats, setStats] = useState(null);
  
  // Load stats on component mount
  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STATS}`);
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
        }
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };
    loadStats();
  }, []);
  
  const handleFileChange = (file) => {
    setResult(null); // Clear previous result
    if (!file) {
      setSelectedFile(null);
      setImagePreview(null);
      return;
    }
    
    // Validate file type
    if (!APP_CONFIG.ALLOWED_TYPES.includes(file.type)) {
      alert('Please select a valid image file (PNG, JPG, or BMP)');
      return;
    }
    
    // Validate file size
    if (file.size > APP_CONFIG.MAX_FILE_SIZE) {
      alert('File size too large. Maximum size is 10MB.');
      return;
    }
    
    setSelectedFile(file);
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
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
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setResult(null);
    
    const formData = new FormData();
    formData.append('image', selectedFile);
    
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VERIFY}`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error during analysis:", error);
      setResult({ 
        status: 'error', 
        message: 'Failed to connect to the API. Please check your internet connection and try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        className="py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Verify Medicine
              <motion.span 
                className="block text-blue-600"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Authenticity
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI-powered OCR technology to identify authentic pharmaceutical products 
              and detect potential counterfeits instantly
            </motion.p>
            
            {/* Stats display */}
            {stats && (
              <motion.div 
                className="flex justify-center gap-8 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.total_medicines}+</div>
                  <div className="text-sm text-gray-500">Medicine Records</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-gray-500">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-gray-500">Available</div>
                </div>
              </motion.div>
            )}
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <UploadArea
                selectedFile={selectedFile}
                imagePreview={imagePreview}
                dragActive={dragActive}
                isLoading={isLoading}
                onFileChange={handleFileChange}
                onDrag={handleDrag}
                onDrop={handleDrop}
                onClearFile={clearFile}
                onAnalyze={handleAnalyze}
              />
              
              {/* Results Section */}
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <AnimatePresence>
                  <ResultCard result={result} />
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Additional Sections */}
      <FeaturesSection />
      <HowItWorksSection />
      <SafetyTipsSection />
      <Footer />
    </div>
  );
}

export default App;