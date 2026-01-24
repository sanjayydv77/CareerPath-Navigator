# 🎯 Deployment Checklist

Use this checklist to track your deployment progress:

## Pre-Deployment Setup
- [ ] All code tested locally
- [ ] Backend running on http://localhost:5000
- [ ] Frontend working with local backend
- [ ] MongoDB Atlas connection working
- [ ] Email verification working locally

## GitHub Setup
- [ ] GitHub account created
- [ ] Repository created: `future-fit-app`
- [ ] Code pushed to GitHub
- [ ] .env file NOT committed (check .gitignore)

## Backend Deployment (Render)
- [ ] Render account created
- [ ] New Web Service created
- [ ] GitHub repository connected
- [ ] Root directory set to: `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `node server.js`
- [ ] Instance type: Free
- [ ] Environment variables added:
  - [ ] MONGO_URI
  - [ ] JWT_SECRET
  - [ ] EMAIL_USER
  - [ ] EMAIL_PASS
  - [ ] NODE_ENV = production
  - [ ] FRONTEND_URL (update after frontend deployment)
- [ ] Deployment successful
- [ ] Backend URL copied: `_________________________`
- [ ] Test URL returns "Career Counseling API Running..."

## Frontend Configuration
- [ ] Updated `js/config.js` with Render backend URL
- [ ] Updated `js/main.js` with Render backend URL
- [ ] Changes committed and pushed to GitHub

## Frontend Deployment (Netlify)
- [ ] Netlify account created
- [ ] New site from Git created
- [ ] GitHub repository connected
- [ ] Publish directory set to: `.`
- [ ] Deployment successful
- [ ] Custom site name set (optional)
- [ ] Frontend URL copied: `_________________________`

## Backend Configuration Update
- [ ] Returned to Render dashboard
- [ ] Updated FRONTEND_URL environment variable with Netlify URL
- [ ] Backend redeployed automatically
- [ ] Verified new FRONTEND_URL in logs

## MongoDB Atlas Configuration
- [ ] Logged into MongoDB Atlas
- [ ] Network Access → Add IP Address
- [ ] Added `0.0.0.0/0` (Allow all IPs)
- [ ] Confirmed changes saved

## Testing
- [ ] Backend health check passes: `https://your-backend.onrender.com`
- [ ] Frontend loads: `https://your-site.netlify.app`
- [ ] Signup form works
- [ ] Verification email received
- [ ] Email verification link works
- [ ] Login works with verified account
- [ ] All pages load correctly:
  - [ ] Home (index.html)
  - [ ] Assessment (assessment.html)
  - [ ] Streams (streams.html)
  - [ ] Colleges (colleges.html)
  - [ ] Jobs (jobs.html)
  - [ ] Mentorship (mentorship.html)
  - [ ] Growth (growth.html)
- [ ] User data persists in MongoDB
- [ ] Logout works correctly
- [ ] No console errors in browser
- [ ] No CORS errors

## Optional: Keep Backend Alive
- [ ] UptimeRobot account created
- [ ] HTTP monitor created for backend URL
- [ ] Monitor interval set to 5 minutes
- [ ] Monitor active and pinging backend

## Documentation
- [ ] Deployment URLs documented
- [ ] Team members have access (if applicable)
- [ ] Environment variables backed up securely
- [ ] MongoDB credentials stored safely

## Final Verification
- [ ] Tested on different browsers (Chrome, Firefox, Edge)
- [ ] Tested on mobile device
- [ ] All features working as expected
- [ ] Performance acceptable (considering cold starts)

---

## 🎉 Deployment Complete!

**Your Live URLs:**
- Frontend: `https://___________________.netlify.app`
- Backend: `https://___________________.onrender.com`

**Next Steps:**
- Share your application!
- Monitor Render logs for errors
- Consider upgrading to paid tier if needed ($7/month for instant response)
- Add custom domain (optional)

---

## 📊 Monitoring

### Check Backend Status:
- Render Dashboard: https://dashboard.render.com
- View logs: Service → Logs tab
- Monitor uptime: UptimeRobot dashboard

### Check Frontend Status:
- Netlify Dashboard: https://app.netlify.com
- View deploy logs: Site → Deploys tab
- Analytics: Site → Analytics (if enabled)

### Check Database:
- MongoDB Atlas: https://cloud.mongodb.com
- View connections: Database → Connect
- Monitor usage: Metrics tab

---

## 🔄 Future Updates

To update your deployed app:

1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
4. Render auto-deploys backend (if connected to GitHub)
5. Netlify auto-deploys frontend
6. Test changes on live site

---

**Deployment Date:** _______________
**Deployed By:** Sanjay Yadav
**Version:** 1.0.0
