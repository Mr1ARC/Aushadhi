#!/bin/bash

# Aushadhi-OCR Deployment Script
# This script helps deploy the application to various platforms

set -e

echo "🏥 Aushadhi-OCR Deployment Script v2.0.0"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ and try again."
        exit 1
    fi
    
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.11+ and try again."
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git and try again."
        exit 1
    fi
    
    print_success "All dependencies are installed!"
}

# Install all dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install frontend dependencies
    print_status "Installing frontend dependencies..."
    cd Frontend
    npm install
    cd ..
    
    # Install backend dependencies
    print_status "Installing backend dependencies..."
    cd backend
    pip install -r requirements.txt
    cd ..
    
    print_success "All dependencies installed successfully!"
}

# Build the project
build_project() {
    print_status "Building the project..."
    
    # Build frontend
    print_status "Building frontend..."
    cd Frontend
    npm run build
    cd ..
    
    print_success "Project built successfully!"
}

# Test the application
test_application() {
    print_status "Testing the application..."
    
    # Start backend in background
    print_status "Starting backend server..."
    cd backend
    python app.py &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend to start
    sleep 5
    
    # Test backend health
    if curl -f http://localhost:5001/ > /dev/null 2>&1; then
        print_success "Backend is running successfully!"
    else
        print_error "Backend failed to start!"
        kill $BACKEND_PID 2>/dev/null || true
        exit 1
    fi
    
    # Stop backend
    kill $BACKEND_PID 2>/dev/null || true
    
    print_success "Application tests passed!"
}

# Deploy to Vercel
deploy_vercel() {
    print_status "Deploying to Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    cd Frontend
    vercel --prod
    cd ..
    
    print_success "Frontend deployed to Vercel!"
}

# Deploy to Railway
deploy_railway() {
    print_status "Deploying to Railway..."
    
    if ! command -v railway &> /dev/null; then
        print_warning "Railway CLI not found. Installing..."
        npm install -g @railway/cli
    fi
    
    cd backend
    railway login
    railway deploy
    cd ..
    
    print_success "Backend deployed to Railway!"
}

# Show deployment options
show_options() {
    echo ""
    echo "🚀 Deployment Options:"
    echo "1. Local Development Setup"
    echo "2. Build Project"
    echo "3. Test Application"
    echo "4. Deploy to Vercel (Frontend)"
    echo "5. Deploy to Railway (Backend)"
    echo "6. Full Deployment (Vercel + Railway)"
    echo "7. Show Deployment Instructions"
    echo "8. Exit"
    echo ""
}

# Show deployment instructions
show_instructions() {
    echo ""
    echo "📖 Deployment Instructions:"
    echo "=========================="
    echo ""
    echo "🔧 Manual Deployment:"
    echo ""
    echo "Frontend (Vercel):"
    echo "1. Push code to GitHub"
    echo "2. Go to https://vercel.com"
    echo "3. Import your repository"
    echo "4. Set root directory to 'Frontend'"
    echo "5. Add environment variable: VITE_API_URL=https://your-backend-url.railway.app"
    echo "6. Deploy!"
    echo ""
    echo "Backend (Railway):"
    echo "1. Go to https://railway.app"
    echo "2. Connect your GitHub repository"
    echo "3. Set root directory to 'backend'"
    echo "4. Railway will auto-detect Python and install dependencies"
    echo "5. Deploy!"
    echo ""
    echo "🌐 Alternative Platforms:"
    echo "- Netlify (Frontend) + Heroku (Backend)"
    echo "- Render (Both Frontend and Backend)"
    echo "- DigitalOcean App Platform"
    echo ""
    echo "📝 Environment Variables:"
    echo "Frontend: VITE_API_URL=https://your-backend-url"
    echo "Backend: PORT (auto-set by platform)"
    echo ""
}

# Main menu
main_menu() {
    while true; do
        show_options
        read -p "Select an option (1-8): " choice
        
        case $choice in
            1)
                check_dependencies
                install_dependencies
                print_success "Local development setup complete!"
                print_status "Run 'npm run dev' to start development servers"
                ;;
            2)
                check_dependencies
                install_dependencies
                build_project
                ;;
            3)
                check_dependencies
                install_dependencies
                test_application
                ;;
            4)
                check_dependencies
                install_dependencies
                build_project
                deploy_vercel
                ;;
            5)
                check_dependencies
                deploy_railway
                ;;
            6)
                check_dependencies
                install_dependencies
                build_project
                test_application
                deploy_vercel
                deploy_railway
                print_success "Full deployment complete!"
                ;;
            7)
                show_instructions
                ;;
            8)
                print_success "Goodbye! 👋"
                exit 0
                ;;
            *)
                print_error "Invalid option. Please select 1-8."
                ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
        echo ""
    done
}

# Check if script is being run directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main_menu
fi