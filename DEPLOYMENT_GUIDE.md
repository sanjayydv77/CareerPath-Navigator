# 🚀 Future-Fit Deployment Guide

## Overview
This guide will help you deploy your Future-Fit application **completely FREE** using:
- **Backend**: Render (Free Tier)
- **Frontend**: Netlify (Free Tier)
- **Database**: MongoDB Atlas (Already configured - Free Tier)

---

## 📋 Prerequisites
- GitHub account
- MongoDB Atlas account (you already have this)
- Render account (free - https://render.com)
- Netlify account (free - https://netlify.com)

---

## 🗂️ Deployment Architecture

```
Frontend (Netlify)
    ↓
Backend API (Render) 
    ↓
MongoDB Atlas
```

---

## PART 1: Prepare Your Code for Deployment

### ✅ Already Completed for You:
1. ✓ Backend deployment files created (Procfile, render.yaml)
2. ✓ Frontend configuration files created (netlify.toml, _redirects)
3. ✓ Environment-aware API URL configuration
4. ✓ Start script added to package.json

---

## PART 2: Deploy Backend to Render

### Step 1: Push Your Code to GitHub

1. **Initialize Git** (if not already done):
```bash
cd "C:\Users\ftt\Desktop\Future-Fit - locally perfect"
git init
git add .
git commit -m "Initial commit - Ready for deployment"
```

2. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Name it: `future-fit-app`
   - Don't initialize with README (you already have files)
   - Create repository

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/future-fit-app.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend on Render

1. **Sign up/Login to Render**: https://render.com

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `future-fit-app`

3. **Configure the service**:
   - **Name**: `future-fit-backend` (or any name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`

4. **Add Environment Variables** (Click "Advanced" → "Add Environment Variable"):
   ```
   MONGO_URI = mongodb+srv://projectadmin:projectpass123@cluster0.x5kuecw.mongodb.net/careercounselingdb?appName=Cluster0
   
   JWT_SECRET = 4b7f_CareerPath_NavigatOr_@SeCret_2025_#Pjt!
   
   EMAIL_USER = futurfit2@gmail.com
   
   EMAIL_PASS = ycmjjtjqtbuuppwx
   
   NODE_ENV = production
   
   FRONTEND_URL = https://future-fit.netlify.app
   ```
   
   **Note**: You'll update `FRONTEND_URL` after deploying frontend

5. **Deploy**: Click "Create Web Service"

6. **Wait for deployment** (3-5 minutes)

7. **Copy your backend URL**: It will be something like:
   ```
   https://future-fit-backend.onrender.com
   ```

### Step 3: Update CORS Settings

After deployment, go to your backend code and update `server.js` if needed. The current CORS setup should work, but verify it allows your frontend domain.

---

## PART 3: Deploy Frontend to Netlify

### Step 1: Update Frontend Configuration

1. **Update `js/config.js`**:
   - Replace `http://localhost:5000` with your Render backend URL
   - Example: `https://future-fit-backend.onrender.com`

2. **Update `js/main.js`**:
   - Update the `API_URL` constant (line 5)
   - Change to: `const API_URL = 'https://future-fit-backend.onrender.com/api';`

3. **Commit changes**:
```bash
git add .
git commit -m "Update API URLs for production"
git push
```

### Step 2: Deploy to Netlify

**Option A: Using Netlify Web UI (Easiest)**

1. **Login to Netlify**: https://netlify.com

2. **Import from Git**:
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your `future-fit-app` repository

3. **Configure build settings**:
   - **Base directory**: (leave empty - root directory)
   - **Build command**: (leave empty - no build needed for static HTML)
   - **Publish directory**: `.` (dot - meaning root)

4. **Deploy**: Click "Deploy site"

5. **Custom domain** (Optional):
   - After deployment, click "Domain settings"
   - Change site name to something like: `future-fit`
   - Your URL will be: `https://future-fit.netlify.app`

**Option B: Using Netlify CLI**

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Step 3: Update Backend Environment Variable

Go back to **Render Dashboard** → Your backend service → Environment:
- Update `FRONTEND_URL` to your actual Netlify URL: `https://future-fit.netlify.app`
- Save and wait for auto-redeploy

---

## PART 4: Update Email Verification URLs

Update `backend/utils/mailer.js`:
- Change verification URLs to use your Render backend URL
- Already configured to use `process.env.FRONTEND_URL` or backend URL

Commit and push changes:
```bash
git add .
git commit -m "Update email verification URLs"
git push
```

Render will auto-deploy the changes.

---

## 🔧 Post-Deployment Configuration

### Update MongoDB Atlas IP Whitelist

1. Go to MongoDB Atlas Dashboard
2. Navigate to: Network Access
3. Add IP Address: `0.0.0.0/0` (allows all IPs - for free tier services)
   - **Note**: This is necessary because Render uses dynamic IPs

### Test Your Deployment

1. **Test Backend**:
   - Visit: `https://future-fit-backend.onrender.com`
   - Should see: "Career Counseling API Running..."

2. **Test Frontend**:
   - Visit: `https://future-fit.netlify.app`
   - Test signup/login functionality
   - Test all features

---

## 📱 Important Notes

### Render Free Tier Limitations:
- **Spins down after 15 minutes of inactivity**
- **First request after sleep takes 50+ seconds** (cold start)
- **750 hours/month free** (enough for one app)
- Solution: Use a service like UptimeRobot to ping your backend every 10 minutes

### Keep Your Backend Alive (Optional):

1. **Sign up for UptimeRobot**: https://uptimerobot.com (Free)
2. **Create Monitor**:
   - Monitor Type: HTTP(s)
   - URL: `https://future-fit-backend.onrender.com`
   - Monitoring Interval: 5 minutes
3. This prevents cold starts by keeping your backend active

### MongoDB Atlas Free Tier:
- ✓ Already configured
- ✓ 512MB storage (plenty for your app)
- ✓ No credit card required

### Netlify Free Tier:
- ✓ 100GB bandwidth/month
- ✓ Automatic HTTPS
- ✓ Continuous deployment from Git

---

## 🔍 Troubleshooting

### Backend not connecting to MongoDB:
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check environment variables on Render
- Check Render logs

### Frontend can't reach backend:
- Verify API URLs are updated in `js/config.js` and `js/main.js`
- Check browser console for CORS errors
- Verify backend environment has correct `FRONTEND_URL`

### Email verification not working:
- Check `EMAIL_USER` and `EMAIL_PASS` environment variables
- Verify Gmail App Password is still valid
- Check Render logs for email errors

### Backend is slow (50+ seconds):
- This is normal for Render free tier after inactivity
- Use UptimeRobot to prevent cold starts
- Consider upgrading to paid tier ($7/month) for instant response

---

## 🎉 Success Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Netlify
- [ ] Environment variables configured
- [ ] MongoDB Atlas IP whitelist updated
- [ ] API URLs updated in frontend
- [ ] Tested signup/login
- [ ] Tested all features
- [ ] Email verification working
- [ ] (Optional) UptimeRobot monitoring setup

---

## 📞 Support & Resources

- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

---

## 💰 Cost Summary

| Service | Tier | Cost |
|---------|------|------|
| Backend (Render) | Free | $0/month |
| Frontend (Netlify) | Free | $0/month |
| Database (MongoDB Atlas) | Free | $0/month |
| **Total** | | **$0/month** |

---

## 🚀 Quick Start Commands

```bash
# 1. Commit all changes
git add .
git commit -m "Ready for deployment"
git push

# 2. Your URLs will be:
# Backend: https://future-fit-backend.onrender.com
# Frontend: https://future-fit.netlify.app

# 3. Monitor deployment:
# - Render: Check dashboard for build logs
# - Netlify: Check deploy logs in dashboard
```

---

**Developed by Sanjay Yadav**
**Deployment Guide Version 1.0**
