# Netlify Deployment Instructions

## Quick Deploy to Netlify

### Option 1: Drag & Drop (Easiest)
1. Go to https://app.netlify.com/drop
2. Drag your project folder
3. Done! Your site is live

### Option 2: GitHub (Recommended for Updates)
1. Push code to GitHub
2. Go to https://netlify.com
3. Click "Add new site" → "Import an existing project"
4. Select GitHub and your repository
5. Build settings:
   - Base directory: (leave empty)
   - Build command: (leave empty)
   - Publish directory: `.`
6. Click "Deploy"

### Option 3: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## After Deployment
1. Copy your Netlify URL (e.g., https://your-site.netlify.app)
2. Update backend environment variable `FRONTEND_URL` on Render
3. Update API URLs in `js/config.js` and `js/main.js`

## Custom Domain (Optional)
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records as instructed
