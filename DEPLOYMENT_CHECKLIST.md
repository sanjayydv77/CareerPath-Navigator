# 🚀 Quick Deployment Checklist

## ✅ Before You Start
- [ ] Code is working perfectly on localhost
- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:5500`
- [ ] All features tested locally
- [ ] .env file is NOT committed to git
- [ ] MongoDB Atlas is accessible

---

## 📦 Step 1: GitHub Setup (5 minutes)

```powershell
cd "c:\Users\ftt\Desktop\Future-Fit - locally perfect"
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/future-fit-app.git
git push -u origin main
```

**Status:** [ ] Complete

---

## 🔙 Step 2: Backend Deployment - Render (10 minutes)

1. [ ] Go to https://render.com
2. [ ] New → Web Service
3. [ ] Connect GitHub repo
4. [ ] Configure:
   - Name: `future-fit-backend`
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
5. [ ] Add Environment Variables:
   ```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=4b7f_CareerPath...
   EMAIL_USER=futurfit2@gmail.com
   EMAIL_PASS=ycmjjtjqtbuuppwx
   NODE_ENV=production
   FRONTEND_URL=(leave empty for now)
   ```
6. [ ] Deploy & wait 5-10 minutes
7. [ ] Save your backend URL: ___________________________

**Status:** [ ] Complete

---

## 🌐 Step 3: Update Frontend Config (2 minutes)

1. [ ] Open `js/config.js`
2. [ ] Update production URL with your Render URL
3. [ ] Save, commit, and push:
   ```powershell
   git add js/config.js
   git commit -m "Update API URL"
   git push
   ```

**Status:** [ ] Complete

---

## 🎨 Step 4: Frontend Deployment - Netlify (5 minutes)

1. [ ] Go to https://app.netlify.com
2. [ ] New site → Import from GitHub
3. [ ] Select your repo
4. [ ] Configure:
   - Branch: `main`
   - Publish directory: `.`
5. [ ] Deploy
6. [ ] Save your frontend URL: ___________________________

**Status:** [ ] Complete

---

## 🔗 Step 5: Connect Frontend & Backend (3 minutes)

1. [ ] Go back to Render
2. [ ] Environment tab
3. [ ] Update `FRONTEND_URL` with your Netlify URL
4. [ ] Save (auto redeploys)

**Status:** [ ] Complete

---

## ✅ Step 6: Final Testing (5 minutes)

Test on your live site:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Register new account
- [ ] Receive verification email
- [ ] Login works
- [ ] All pages accessible

**Status:** [ ] Complete

---

## 🎉 DEPLOYMENT COMPLETE!

**Your URLs:**
- Frontend: _______________________________
- Backend: _______________________________
- GitHub: _______________________________

---

## 📝 Notes:
- Free tier backend sleeps after 15 min (first load takes 30-60 sec)
- Push to `main` branch auto-deploys both services
- Check logs if issues occur

---

**Total Time:** ~30 minutes  
**For detailed help:** See [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)
