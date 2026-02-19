# 🚀 LIVE DEPLOYMENT - Step by Step Guide
## Critical Fixes Applied ✅

### ✅ Fixed Issues:
- ✅ Email verification URLs now use environment variables
- ✅ Password reset URLs now use environment variables  
- ✅ No more 404 errors on email button clicks
- ✅ All URLs dynamically configured

---

## 📦 STEP 1: Deploy Backend on Render

### 1.1 Go to Render
- Visit: https://dashboard.render.com
- Click **"New +"** → **"Web Service"**

### 1.2 Connect GitHub Repository
- Click **"Connect account"** if needed
- Search for: `CareerPath-Navigator`
- Click **"Connect"**

### 1.3 Configure Web Service
Enter these **EXACT** values:

```
Name: future-fit-backend
Region: Singapore (or closest to your users)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### 1.4 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

**⚠️ CRITICAL - Add these EXACT variables:**

```
MONGO_URI
mongodb+srv://projectadmin:projectpass123@cluster0.x5kuecw.mongodb.net/careercounselingdb?appName=Cluster0

JWT_SECRET
4b7f_CareerPath_NavigatOr_@SeCret_2025_#Pjt!

EMAIL_USER
futurfit2@gmail.com

EMAIL_PASS
ycmjjtjqtbuuppwx

NODE_ENV
production

FRONTEND_URL
[LEAVE EMPTY FOR NOW - Will add after Netlify deployment]

BACKEND_URL
[Will be auto-generated - Copy it after deploy completes]
```

### 1.5 Deploy
- Click **"Create Web Service"**
- Wait 5-10 minutes for build to complete
- You'll see: ✅ "Live" status

### 1.6 **SAVE YOUR BACKEND URL** 
Your URL will be: `https://future-fit-backend-XXXX.onrender.com`

**📝 Write it down! You'll need it in next steps.**

---

## 🌐 STEP 2: Update Backend with Its Own URL

### 2.1 Add BACKEND_URL to Environment Variables
- In Render Dashboard → Your Service → "Environment"
- Find `BACKEND_URL` variable
- Set value to: `https://future-fit-backend-XXXX.onrender.com` (YOUR actual URL)
- Click **"Save Changes"**
- Service will auto-redeploy (wait 2-3 minutes)

---

## 💻 STEP 3: Update Frontend Config

### 3.1 Update js/config.js locally
Open `js/config.js` and replace with YOUR backend URL:

```javascript
const config = {
    API_BASE_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5000'
        : 'https://future-fit-backend-XXXX.onrender.com'  // ← YOUR RENDER URL HERE
};
```

### 3.2 Commit and Push
```powershell
git add js/config.js
git commit -m "Update production backend URL"
git push origin main
```

---

## 🌍 STEP 4: Deploy Frontend on Netlify

### 4.1 Go to Netlify
- Visit: https://app.netlify.com
- Click **"Add new site"** → **"Import an existing project"**

### 4.2 Connect GitHub
- Click **"Deploy with GitHub"**
- Select: `CareerPath-Navigator`
- Click **"Deploy"**

### 4.3 Configure Build Settings
```
Branch: main
Base directory: (leave empty)
Build command: (leave empty)
Publish directory: .
```

### 4.4 Deploy
- Click **"Deploy site"**
- Wait 2-3 minutes
- You'll get a random URL like: `https://sparkling-unicorn-123abc.netlify.app`

### 4.5 (Optional) Set Custom Domain
- Click **"Domain settings"** → **"Add custom domain"**
- Or use the default Netlify URL

### 4.6 **SAVE YOUR FRONTEND URL**
Example: `https://future-fit-app.netlify.app`

**📝 Write it down!**

---

## 🔗 STEP 5: Connect Backend to Frontend

### 5.1 Update Backend Environment Variables
Go back to Render Dashboard:
- Open your backend service
- Go to **"Environment"**
- Update `FRONTEND_URL` variable to: `https://your-site.netlify.app` (YOUR actual Netlify URL)
- Click **"Save Changes"**
- Wait for auto-redeploy (2-3 minutes)

---

## ✅ STEP 6: Verify Everything Works

### 6.1 Test Backend
Open: `https://your-backend.onrender.com/`

You should see:
```json
{
  "status": "Career Counseling API Running...",
  "version": "3.0-DYNAMIC-URLS",
  "environment": "production",
  "verificationUrl": "https://your-backend.onrender.com/api/auth/verify",
  "resetUrl": "https://your-frontend.netlify.app/reset-password.html"
}
```

✅ Check that URLs match YOUR deployment URLs

### 6.2 Test Frontend
Open: `https://your-frontend.netlify.app`

- ✅ Page loads correctly
- ✅ Navigation works
- ✅ All pages accessible

### 6.3 Test Registration & Email Verification
1. Click **"Signup"** on your Netlify site
2. Register with a **real email address** you can check
3. Wait 10-30 seconds for email
4. Check your inbox for "Future-Fit: Verify Your Email"
5. Click **"Verify My Email"** button in email
6. Should redirect to: `https://your-frontend.netlify.app/index.html?verified=true`
7. ✅ You should see success message

### 6.4 Test Login
1. Try logging in with verified account
2. Should work successfully

### 6.5 Test Password Reset
1. Click **"Forgot Password"**
2. Enter your email
3. Check inbox for "Future-Fit: Password Reset"
4. Click **"Reset Password"** button
5. Should open: `https://your-frontend.netlify.app/reset-password.html?token=...`
6. Enter new password
7. ✅ Password should reset successfully

---

## 🎉 SUCCESS CHECKLIST

After deployment, verify these work:

- ✅ Frontend loads on Netlify URL
- ✅ Backend API responds at Render URL
- ✅ User registration works
- ✅ Email verification arrives
- ✅ Email verification button redirects correctly (NO 404!)
- ✅ User can login after verification
- ✅ Password reset email arrives
- ✅ Password reset link works (NO 404!)
- ✅ All HTML pages accessible
- ✅ Navigation between pages works

---

## 🔥 IMPORTANT NOTES

### First Request Delay (Render Free Tier)
- Backend sleeps after 15 min inactivity
- First request takes 30-60 seconds to wake up
- This is normal for free tier
- Subsequent requests are instant

### If Email Verification Returns 404:
- Check `BACKEND_URL` in Render environment variables
- Should match your actual Render URL exactly
- Redeploy backend if needed

### If Password Reset Returns 404:
- Check `FRONTEND_URL` in Render environment variables
- Should match your Netlify URL exactly
- Redeploy backend if needed

---

## 📝 Your Deployment URLs

Fill these in as you deploy:

```
GitHub Repository:
https://github.com/sanjayydv77/CareerPath-Navigator

Backend (Render):
https://_____________________________.onrender.com

Frontend (Netlify):
https://_____________________________.netlify.app
```

---

## 🆘 Troubleshooting

### Backend won't start:
- Check Render logs: Dashboard → Service → Logs
- Verify all environment variables are set
- Check MongoDB connection string

### CORS errors:
- Verify `FRONTEND_URL` is set in Render
- Check it matches your Netlify URL exactly

### 404 on email links:
- Verify `BACKEND_URL` and `FRONTEND_URL` in Render
- Should NOT have trailing slashes
- Redeploy backend after changing

### Email not arriving:
- Check spam folder
- Verify `EMAIL_USER` and `EMAIL_PASS` in Render
- Check Render logs for email errors

---

**🎯 Ready to go live! Follow each step carefully and your platform will be 100% functional!**
