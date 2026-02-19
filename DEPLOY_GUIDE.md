# 🚀 Future-Fit Deployment Guide
## Complete Step-by-Step Deployment from Zero

---

## 📋 Pre-Deployment Checklist

### ✅ What We Have Ready:
- ✅ Backend code (Express + MongoDB)
- ✅ Frontend code (HTML/CSS/JS)
- ✅ Dependencies installed
- ✅ Environment variables configured
- ✅ Database connection (MongoDB Atlas)
- ✅ Email service configured

---

## 🎯 Deployment Strategy

**Backend → Render** (Free tier available)  
**Frontend → Netlify** (Free tier available)

---

## 📦 PART 1: Backend Deployment (Render)

### Step 1: Create GitHub Repository (If not exists)

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `future-fit-app` (or any name you prefer)
3. Keep it **Public** or **Private** (your choice)
4. **DO NOT** initialize with README

### Step 2: Push Code to GitHub

```powershell
# Navigate to your project root
cd "c:\Users\ftt\Desktop\Future-Fit - locally perfect"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Ready for deployment"

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/future-fit-app.git

# Push to GitHub
git push -u origin main
```

### Step 3: Deploy Backend on Render

1. Go to [Render Dashboard](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `future-fit-backend` (or any name)
   - **Region**: `Singapore` or closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. **Add Environment Variables** (Click "Advanced" → "Add Environment Variable"):
   ```
   MONGO_URI=mongodb+srv://projectadmin:projectpass123@cluster0.x5kuecw.mongodb.net/careercounselingdb?appName=Cluster0
   JWT_SECRET=4b7f_CareerPath_NavigatOr_@SeCret_2025_#Pjt!
   EMAIL_USER=futurfit2@gmail.com
   EMAIL_PASS=ycmjjtjqtbuuppwx
   NODE_ENV=production
   FRONTEND_URL=[LEAVE EMPTY FOR NOW - ADD AFTER NETLIFY DEPLOYMENT]
   ```

6. Click **"Create Web Service"**
7. Wait 5-10 minutes for deployment
8. **SAVE YOUR BACKEND URL**: `https://future-fit-backend-XXXXX.onrender.com`

---

## 🌐 PART 2: Frontend Deployment (Netlify)

### Step 1: Update Frontend Config

**⚠️ IMPORTANT**: Update the backend URL in your config file:

1. Open `js/config.js`
2. Replace the production URL with your NEW Render URL:

```javascript
API_BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000'
    : 'https://YOUR-NEW-RENDER-URL.onrender.com'  // ← UPDATE THIS
```

3. Save the file
4. Commit and push changes:
```powershell
git add js/config.js
git commit -m "Update production API URL"
git push
```

### Step 2: Deploy on Netlify

1. Go to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Select your `future-fit-app` repository
5. Configure:
   - **Branch**: `main`
   - **Base directory**: *(leave empty - deploy from root)*
   - **Build command**: *(leave empty)*
   - **Publish directory**: `.` (dot means root)

6. Click **"Deploy site"**
7. Wait 2-3 minutes
8. **SAVE YOUR FRONTEND URL**: `https://YOUR-SITE-NAME.netlify.app`

### Step 3: Update Backend CORS (Add Frontend URL)

1. Go back to Render Dashboard
2. Open your backend service
3. Go to **"Environment"**
4. Update `FRONTEND_URL` variable:
   ```
   FRONTEND_URL=https://YOUR-SITE-NAME.netlify.app
   ```
5. Click **"Save Changes"**
6. Backend will automatically redeploy

---

## ✅ PART 3: Post-Deployment Verification

### Test Your Deployment:

1. **Frontend Test**:
   - Open your Netlify URL: `https://YOUR-SITE-NAME.netlify.app`
   - Page should load properly
   - Navigation should work

2. **Backend Test**:
   - Open: `https://your-backend.onrender.com/`
   - Should see: `{"status": "Career Counseling API Running..."}`

3. **Full Integration Test**:
   - On your Netlify site, try to register a new account
   - Check if you receive verification email
   - Login and test all features

---

## 🔧 Troubleshooting

### Backend Issues:

**Problem**: Backend not starting
- Check Render logs (Dashboard → Service → Logs)
- Verify all environment variables are set
- Check MongoDB connection string

**Problem**: CORS errors
- Verify `FRONTEND_URL` is set in Render
- Check CORS configuration in `server.js`

### Frontend Issues:

**Problem**: API calls failing
- Check `js/config.js` has correct backend URL
- Open browser console (F12) and check for errors
- Verify backend is running

**Problem**: Pages not loading
- Check Netlify deploy logs
- Verify all HTML files are committed to GitHub

---

## 📝 Important URLs to Save:

1. **GitHub Repository**: `https://github.com/YOUR_USERNAME/future-fit-app`
2. **Backend (Render)**: `https://future-fit-backend-XXXXX.onrender.com`
3. **Frontend (Netlify)**: `https://YOUR-SITE-NAME.netlify.app`
4. **MongoDB Atlas**: Already configured in environment variables

---

## 🔐 Security Notes:

⚠️ **NEVER** commit `.env` file to GitHub  
⚠️ Keep your MongoDB credentials secure  
⚠️ Use environment variables for all sensitive data  

---

## 🎉 Next Steps After Deployment:

1. Custom domain (optional):
   - Netlify: Settings → Domain Management
   - Render: Settings → Custom Domain

2. Monitor your services:
   - Render: Check logs regularly
   - Netlify: Check deploy status

3. Updates:
   - Just push to GitHub `main` branch
   - Both services will auto-deploy

---

## 💡 Free Tier Limitations:

**Render**:
- Sleeps after 15 min inactivity (first request takes 30-60 seconds to wake up)
- 750 hours/month free

**Netlify**:
- 100GB bandwidth/month
- 300 build minutes/month
- Unlimited sites

---

**🎯 You're ready to deploy! Follow each step carefully.**
