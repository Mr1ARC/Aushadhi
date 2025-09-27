# 🚀 Aushadhi-OCR Deployment Guide

## Quick Deployment Options

### Option 1: Vercel + Railway (Recommended)

#### Frontend Deployment (Vercel)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Select the `Frontend` folder as root directory
   - Add environment variable: `REACT_APP_API_URL=https://your-backend-url.railway.app`
   - Deploy!

#### Backend Deployment (Railway)

1. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Set root directory to `backend`
   - Railway will automatically detect Python and install dependencies
   - Deploy!

2. **Get Backend URL:**
   - After deployment, copy the Railway URL
   - Update Vercel environment variable with this URL

### Option 2: Netlify + Heroku

#### Frontend (Netlify)
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Build command: `cd Frontend && npm run build`
4. Publish directory: `Frontend/build`

#### Backend (Heroku)
1. Go to [heroku.com](https://heroku.com)
2. Create new app
3. Connect GitHub repository
4. Set root directory to `backend`
5. Deploy!

### Option 3: All-in-One (Render)

1. Go to [render.com](https://render.com)
2. Create two services:
   - **Web Service** for backend (Python)
   - **Static Site** for frontend (React)

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.railway.app
```

### Backend
No additional environment variables needed for basic deployment.

## Post-Deployment Steps

1. **Update API URL** in frontend environment variables
2. **Test the application** end-to-end
3. **Set up custom domain** (optional)
4. **Enable HTTPS** (automatic with most platforms)

## Troubleshooting

### Common Issues:
- **CORS errors**: Make sure Flask-CORS is properly configured
- **File upload issues**: Check file size limits on hosting platform
- **API connection**: Verify environment variables are set correctly

### File Size Limits:
- Vercel: 50MB for serverless functions
- Railway: 1GB for file uploads
- Netlify: 100MB for forms

## Cost Estimation

- **Vercel**: Free tier (100GB bandwidth)
- **Railway**: $5/month (1GB RAM, 1GB storage)
- **Total**: ~$5/month for production deployment

## Security Considerations

1. **Environment Variables**: Never commit API keys to repository
2. **CORS**: Configure allowed origins properly
3. **File Validation**: Implement proper file type and size validation
4. **Rate Limiting**: Consider adding rate limiting for production

## Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Railway Metrics**: CPU, memory, and network usage
- **Error Tracking**: Consider adding Sentry for error monitoring
