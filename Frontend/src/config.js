// API Configuration
export const API_CONFIG = {
  // Use environment variable if available, otherwise fallback to localhost
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
  
  // API endpoints
  ENDPOINTS: {
    VERIFY: '/api/verify',
    STATS: '/api/stats',
    HEALTH: '/'
  }
};

// App configuration
export const APP_CONFIG = {
  NAME: 'Aushadhi-OCR',
  VERSION: '2.0.0',
  DESCRIPTION: 'AI-powered medicine verification system',
  
  // File upload settings
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp'],
  
  // UI settings
  ANIMATION_DURATION: 0.3,
  DEBOUNCE_DELAY: 300
};
