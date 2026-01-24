# ⚠️ IMPORTANT: URLs to Update Before Deployment

After you deploy your backend to Render, you MUST update these URLs in your code.

---

## 🎯 Step-by-Step Update Process

### 1. Deploy Backend First
Deploy your backend to Render and get your URL.
Example: `https://future-fit-backend.onrender.com`

### 2. Update These 2 Files

#### File 1: `js/config.js`

**Find this line (line 8):**
```javascript
: 'YOUR_RENDER_BACKEND_URL_HERE'  // Replace with: https://your-app.onrender.com
```

**Replace with your actual Render URL:**
```javascript
: 'https://future-fit-backend.onrender.com'  // Use your actual URL
```

**Complete section should look like:**
```javascript
const config = {
    API_BASE_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5000'
        : 'https://future-fit-backend.onrender.com'  // Your actual Render URL
};
```

---

#### File 2: `js/main.js`

**Find this line (line 7):**
```javascript
: 'YOUR_RENDER_BACKEND_URL_HERE/api';  // Replace with: https://your-app.onrender.com/api
```

**Replace with your actual Render URL (with /api):**
```javascript
: 'https://future-fit-backend.onrender.com/api';  // Your actual URL + /api
```

**Complete section should look like:**
```javascript
const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : 'https://future-fit-backend.onrender.com/api';  // Your actual URL + /api
```

---

## 🔄 Complete Workflow

```
1. Deploy Backend to Render
   → Get URL: https://your-backend.onrender.com

2. Update js/config.js
   → Line 8: Replace YOUR_RENDER_BACKEND_URL_HERE
   → With: https://your-backend.onrender.com

3. Update js/main.js
   → Line 7: Replace YOUR_RENDER_BACKEND_URL_HERE/api
   → With: https://your-backend.onrender.com/api

4. Commit and Push
   → git add .
   → git commit -m "Update API URLs for production"
   → git push

5. Deploy Frontend to Netlify
   → Frontend will use production URLs
```

---

## ✅ Verification

After updating, verify your changes:

### js/config.js should have:
```javascript
const config = {
    API_BASE_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5000'
        : 'https://YOUR-ACTUAL-RENDER-URL.onrender.com'  // ← Your URL here
};
```

### js/main.js should have:
```javascript
const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : 'https://YOUR-ACTUAL-RENDER-URL.onrender.com/api';  // ← Your URL + /api here
```

---

## 🚨 Common Mistakes

### ❌ Wrong:
```javascript
// Missing https://
'future-fit-backend.onrender.com'

// Missing /api in main.js
'https://future-fit-backend.onrender.com'

// Using localhost in production
'http://localhost:5000'

// Typo in URL
'https://future-fit-backnd.onrender.com'  // Missing 'e'
```

### ✅ Correct:
```javascript
// config.js
'https://future-fit-backend.onrender.com'

// main.js
'https://future-fit-backend.onrender.com/api'  // Note the /api
```

---

## 📝 Quick Checklist

Before deploying frontend:

- [ ] Backend deployed to Render
- [ ] Backend URL copied (example: https://xyz.onrender.com)
- [ ] Updated `js/config.js` line 8
- [ ] Updated `js/main.js` line 7
- [ ] Verified URLs are correct (https://, no typos)
- [ ] Added `/api` to main.js URL
- [ ] Committed changes: `git commit -m "Update API URLs"`
- [ ] Pushed to GitHub: `git push`

---

## 🔍 How to Find Your Render URL

1. Go to Render Dashboard: https://dashboard.render.com
2. Click on your service (future-fit-backend)
3. Look at the top - you'll see the URL
4. Example: `https://future-fit-backend-abc123.onrender.com`
5. Copy this entire URL
6. Use it in your files

---

## 💡 Pro Tip

Your files already have auto-detection:
- **Localhost**: Uses `http://localhost:5000` automatically
- **Production**: Uses your Render URL automatically

This means:
✅ Works locally without changes
✅ Works in production after updating URLs
✅ No manual switching needed!

---

## 🆘 Need Help?

If frontend can't reach backend:

1. **Check browser console** (F12)
   - Look for CORS errors
   - Look for network errors
   - Verify API URL is correct

2. **Check these URLs**:
   - config.js: `https://your-backend.onrender.com`
   - main.js: `https://your-backend.onrender.com/api` (with /api)

3. **Verify backend is running**:
   - Visit: `https://your-backend.onrender.com`
   - Should see: "Career Counseling API Running..."

4. **Check Render environment**:
   - Verify `FRONTEND_URL` is set to your Netlify URL

---

## 📋 Summary

**Only 2 files need updates:**
1. `js/config.js` - Line 8
2. `js/main.js` - Line 7

**What to replace:**
- `YOUR_RENDER_BACKEND_URL_HERE`

**With what:**
- Your actual Render URL (get it after deploying backend)

**Then:**
- Commit, push, deploy frontend!

---

**This is the ONLY manual step in the deployment process!**  
Everything else is automated. 🚀
