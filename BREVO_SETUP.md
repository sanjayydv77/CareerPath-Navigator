# Resend Email Setup - SUPER SIMPLE (2 Minutes)

## Why Resend?
✅ NO credit card required (100 emails/day free)
✅ Uses HTTP API (no SMTP blocking on Render)
✅ Works instantly - emails in 1 second
✅ Only 1 environment variable needed

---

## Step 1: Create Resend Account (30 seconds)

1. Go to: **https://resend.com/signup**
2. Sign up with GitHub OR email
3. Verify email (if using email signup)

---

## Step 2: Get API Key (30 seconds)

1. After login, you'll see **API Keys** page automatically
2. OR go to: https://resend.com/api-keys
3. Click **Create API Key**
4. Name: `Future-Fit`
5. Permission: **Full Access** (or just "Sending access")
6. Click **Add**
7. **COPY THE KEY** (starts with `re_...`)

---

## Step 3: Add to Render (1 minute)

1. Go to: **https://dashboard.render.com/**
2. Click: **future-fit-backend-jil4**
3. Click: **Environment** tab
4. Add just ONE variable:

```
RESEND_API_KEY = re_your_actual_key_here
```

5. **REMOVE these old variables** (they're not needed):
   - `BREVO_SMTP_USER` (delete)
   - `BREVO_SMTP_KEY` (delete)

6. Click **Save Changes**
7. Wait 2 minutes for redeploy

---

## Step 4: Test (30 seconds)

1. Go to: **https://futurefit-web.netlify.app/**
2. Click **Sign Up**
3. Register with real email
4. Email arrives in **1-2 seconds**! ⚡

---

## Notes

- Sender email will be: `onboarding@resend.dev` (Resend's test email, works immediately)
- Later you can add your own domain for custom sender email
- Free tier: 100 emails/day, 3000/month

---

## Done! 🎉
Emails will work perfectly now!
