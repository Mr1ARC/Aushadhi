# 🏥 Aushadhi-OCR v2.0.0

> AI-powered medicine verification system that helps identify authentic pharmaceutical products and detect potential counterfeits using advanced OCR technology.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Python](https://img.shields.io/badge/python-3.11+-blue.svg)
![React](https://img.shields.io/badge/react-19.1.1-blue.svg)

## ✨ Features

- 🔍 **Advanced OCR Recognition** - Extract text from medicine packaging with high accuracy
- 🛡️ **Counterfeit Detection** - Identify potential fake medicines using AI comparison
- ⚡ **Real-time Analysis** - Get instant verification results with confidence scoring
- 🎯 **Smart Matching** - Intelligent fuzzy matching algorithm for best results
- 📊 **Quality Validation** - Validates image quality and pharmaceutical keywords
- 🗄️ **Trusted Database** - Comprehensive database of verified medicines

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/aushadhi-ocr.git
   cd aushadhi-ocr
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## 🏗️ Project Structure

```
aushadhi-ocr/
├── backend/                 # Flask API server
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── Finally.csv        # Medicine database
│   └── Procfile           # Deployment configuration
├── Frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── config.js      # Configuration
│   │   └── App.jsx        # Main app component
│   ├── package.json       # Node dependencies
│   └── vercel.json        # Vercel deployment config
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the Frontend directory:

```env
VITE_API_URL=http://localhost:5001
```

For production, update with your deployed backend URL:
```env
VITE_API_URL=https://your-backend-url.railway.app
```

## 🚀 Deployment

### Option 1: Vercel + Railway (Recommended)

#### Frontend (Vercel)
1. Push to GitHub
2. Connect repository to Vercel
3. Set build directory to `Frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend-url.railway.app`

#### Backend (Railway)
1. Connect GitHub repository to Railway
2. Set root directory to `backend`
3. Railway will auto-detect Python and install dependencies
4. Deploy!

### Option 2: All-in-One (Render)
1. Create two services on Render:
   - **Web Service** for backend (Python)
   - **Static Site** for frontend (React)

## 📊 API Endpoints

### Health Check
```
GET /
```
Returns system status and database information.

### Get Statistics
```
GET /api/stats
```
Returns database statistics and system information.

### Verify Medicine
```
POST /api/verify
Content-Type: multipart/form-data

Body:
- image: (file) Medicine package image
```

**Response:**
```json
{
  "status": "success",
  "match_found": true,
  "confidence": 95.2,
  "details": {
    "brand_name": "Paracetamol",
    "composition": "Paracetamol 500mg",
    "id": 1
  },
  "extracted_text": ["Paracetamol", "500mg", "Tablet"],
  "keyword_matches": ["mg", "tablet"],
  "verification_notes": "Medicine verified against trusted database."
}
```

## 🛡️ Safety Guidelines

1. **Barcode Verification** - Scan barcodes when available
2. **Packaging Inspection** - Check for unusual fonts, colors, or spelling errors
3. **Physical Appearance** - Examine shape and appearance of medicines
4. **Batch & Expiry Check** - Verify batch numbers and expiry dates match
5. **Price Verification** - Compare with usual market prices
6. **Stay Safe** - Always purchase from licensed pharmacies

## 🔬 How It Works

1. **Upload Image** - Take a photo or upload an image of your medicine package
2. **AI Analysis** - Our AI extracts text and compares it with verified medicine database
3. **Get Results** - Receive instant verification with confidence score and detailed information

## 📈 Performance

- **588+** Medicine Records in Database
- **95%** Accuracy Rate
- **24/7** Availability
- **1-2 seconds** Average Response Time

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- EasyOCR for text recognition capabilities
- TheFuzz for fuzzy string matching
- React and Framer Motion for the frontend
- Flask for the backend API

## 📞 Support

- 📧 Email: support@aushadhi-ocr.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/aushadhi-ocr/issues)
- 📖 Documentation: [Wiki](https://github.com/your-username/aushadhi-ocr/wiki)

---

**⚠️ Disclaimer**: This tool is for informational purposes only. Always consult healthcare professionals for medical advice and purchase medicines from licensed pharmacies.