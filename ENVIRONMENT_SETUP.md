# 🔧 Environment Variables Setup Guide

## Backend Environment Variables (Render)

When deploying to Render, add these environment variables:

### Required Variables:

```env
MONGO_URI=mongodb+srv://projectadmin:projectpass123@cluster0.x5kuecw.mongodb.net/careercounselingdb?appName=Cluster0

JWT_SECRET=4b7f_CareerPath_NavigatOr_@SeCret_2025_#Pjt!

EMAIL_USER=futurfit2@gmail.com

EMAIL_PASS=ycmjjtjqtbuuppwx

NODE_ENV=production

FRONTEND_URL=https://YOUR-SITE-NAME.netlify.app
```

### How to Add on Render:

1. Go to your Render dashboard
2. Select your web service
3. Go to "Environment" tab
4. Click "Add Environment Variable"
5. Add each variable with its value
6. Click "Save Changes"

### Important Notes:

- **MONGO_URI**: Your MongoDB connection string (already configured)
- **JWT_SECRET**: Secret key for JWT tokens (keep it secret!)
- **EMAIL_USER**: Gmail address for sending verification emails
- **EMAIL_PASS**: Gmail App Password (NOT your regular password)
- **NODE_ENV**: Set to "production" for deployment
- **FRONTEND_URL**: Your Netlify site URL (update after frontend deployment)

---

## MongoDB Atlas Configuration

### IP Whitelist:

1. Go to MongoDB Atlas Dashboard
2. Navigate to: **Network Access**
3. Click "Add IP Address"
4. Select "Allow Access from Anywhere" or add `0.0.0.0/0`
5. Click "Confirm"

**Why?** Render uses dynamic IPs, so you need to allow all IPs.

### Database User:

Already configured:
- Username: `projectadmin`
- Password: `projectpass123`

---

## Gmail App Password Setup

Your email credentials are already configured, but if you need to generate a new App Password:

### Steps:

1. Go to Google Account: https://myaccount.google.com
2. Navigate to: **Security** → **2-Step Verification** (enable if not enabled)
3. Scroll down to: **App passwords**
4. Click "Generate"
5. Select:
   - App: Mail
   - Device: Other (Custom name) → "Future-Fit Backend"
6. Click "Generate"
7. Copy the 16-character password
8. Use this as `EMAIL_PASS` in environment variables

**Note**: Your current app password is: `ycmjjtjqtbuuppwx`

---

## Frontend Configuration

### Update API URLs:

After deploying backend, update these files:

#### 1. `js/config.js`:
```javascript
API_BASE_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:5000'
    : 'https://your-backend.onrender.com'  // Replace with actual URL
```

#### 2. `js/main.js`:
```javascript
const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : 'https://your-backend.onrender.com/api';  // Replace with actual URL
```

---

## Security Checklist

✅ **Do's:**
- Keep `.env` file in `.gitignore` (never commit it)
- Use environment variables for all secrets
- Use HTTPS in production
- Keep JWT_SECRET strong and unique
- Use Gmail App Password (not regular password)

❌ **Don'ts:**
- Never commit `.env` file to GitHub
- Never share your JWT_SECRET publicly
- Don't use weak passwords
- Don't expose API keys in frontend code

---

## Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `MONGO_URI` | MongoDB connection | `mongodb+srv://user:pass@cluster...` |
| `JWT_SECRET` | JWT signing key | `random_secret_string_123` |
| `EMAIL_USER` | Gmail for emails | `yourapp@gmail.com` |
| `EMAIL_PASS` | Gmail App Password | `abcd efgh ijkl mnop` |
| `NODE_ENV` | Environment mode | `production` or `development` |
| `FRONTEND_URL` | Frontend domain | `https://yoursite.netlify.app` |
| `PORT` | Server port | `5000` (auto-set by Render) |

---

## Testing Environment Variables

After deployment, verify:

1. **Backend health check**:
   ```
   https://your-backend.onrender.com
   ```
   Should return: "Career Counseling API Running..."

2. **MongoDB connection**:
   - Check Render logs for: "✅ MongoDB connected successfully"

3. **CORS working**:
   - Test signup/login from frontend
   - Check browser console for CORS errors

4. **Email sending**:
   - Test signup with real email
   - Check if verification email arrives

---

## Troubleshooting

### MongoDB Connection Failed:
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist
- Ensure database user has read/write permissions

### Email Not Sending:
- Verify `EMAIL_USER` and `EMAIL_PASS`
- Check if 2-Step Verification is enabled on Gmail
- Generate new App Password if needed

### CORS Errors:
- Verify `FRONTEND_URL` in backend environment
- Check Render logs for CORS-related errors
- Ensure frontend is using correct backend URL

### JWT Errors:
- Verify `JWT_SECRET` is set
- Check if token is being sent in Authorization header
- Clear browser localStorage and try again

---

## Quick Reference Commands

### Check environment variables locally:
```bash
cd backend
cat .env
```

### Test backend locally:
```bash
cd backend
npm install
node server.js
```

### Check if environment variables are set on Render:
- Go to Render Dashboard → Service → Environment
- All variables should be listed there

---

**Important**: After any environment variable change on Render, the service will automatically redeploy.
