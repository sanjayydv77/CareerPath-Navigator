# Elastic Email Setup - 100% FREE FOREVER (2 Minutes)

## Why Elastic Email?
✅ **100% FREE** - 100 emails/day forever, no credit card
✅ **No restrictions** - Send to ANY email address
✅ **Works with Render** - Uses port 2525 (not blocked)
✅ **Super simple** - Just email + API key

---

## Step 1: Create Account (1 minute)

1. Go to: **https://elasticemail.com/account#/create-account**
2. Enter your email: `sanjuydv5357@gmail.com` (or any email)
3. Create password
4. Click **Start Free Trial**
5. Check email and verify

---

## Step 2: Get API Key (30 seconds)

1. After login, go to: **Settings** → **Create Additional SMTP Account** 
   OR directly: https://elasticemail.com/account#/settings/new/create-smtp
2. Enter:
   - **Account Name**: `futurefit`
3. Click **Create**
4. **COPY BOTH**:
   - **Username**: (your email)
   - **Password**: (the API key shown - starts with long string)

---

## Step 3: Add to Render (30 seconds)

1. Go to: **https://dashboard.render.com/**
2. Click: **future-fit-backend-jil4**
3. Click: **Environment** tab
4. Add 2 variables:

```
ELASTIC_EMAIL_USER = sanjuydv5357@gmail.com
ELASTIC_EMAIL_API_KEY = your_api_key_here
```

5. **DELETE old variable**:
   - `RESEND_API_KEY` ❌

6. Click **Save Changes**
7. Wait 2 minutes

---

## Step 4: Test

1. Go to: **https://futurefit-web.netlify.app/**
2. Sign up with ANY email
3. Email arrives in 2-3 seconds! ⚡

---

## Free Limits
- 100 emails/day
- 3,000 emails/month
- Forever FREE!

---

## Done! 🎉
