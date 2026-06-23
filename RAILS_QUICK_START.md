# 🚀 RAILWAYS DEPLOYMENT - QUICK START

## ⚡ 5-Minute Deployment Guide

Your application is ready to deploy. Follow these exact steps:

---

## STEP 1: Push to GitHub (1 min)

```bash
cd f:\patient-booking
git add .
git commit -m "Deploy: Fix Prisma, update to PostgreSQL, ready for Railways"
git push origin main
```

---

## STEP 2: Create Railway Project (2 min)

1. Go to **https://railway.app**
2. Sign up (if needed)
3. Click **"New Project"**
4. Select **"Deploy from GitHub"**
5. Authorize GitHub (if first time)
6. Select **patient-booking** repository
7. Click **"Deploy"**

✅ Railway now starts the build!

---

## STEP 3: Add PostgreSQL Database (1 min)

1. Wait for initial build to complete (1-2 minutes)
2. In Railway Dashboard, click **"Add Service"**
3. Search for **"PostgreSQL"**
4. Click **"PostgreSQL"** → **"Install"**

✅ Database created! Railway auto-generates `DATABASE_URL`

---

## STEP 4: Set Environment Variables (1 min)

In Railway Dashboard:

1. Go to your project
2. Click on the **patient-booking** service
3. Click **"Variables"** tab
4. Add these variables:

```
DATABASE_URL = <Already set by PostgreSQL plugin>

GEMINI_API_KEY = <OPTIONAL - Get free key from https://aistudio.google.com/apikey>

ADMIN_SECRET = <Generate random: openssl rand -hex 32>
             Example: a7f3b8c2e9d1f4a6b5c8e1d2f3a4b5c6

NODE_ENV = production

NEXT_PUBLIC_API_URL = https://patient-booking-<random>.up.railway.app
                     <Replace with your actual Railway app URL>
```

---

## STEP 5: Deploy (Wait 2-3 min)

1. Click **"Deploy"** button in Railway Dashboard
2. Watch the build logs
3. Look for: ✅ "Build successful"
4. App automatically starts

✅ **Your app is now live!**

---

## ✅ Verify Deployment

Visit your Railway app URL:
- Should see the home page
- Try the chatbot
- Browse doctors

---

## 📋 Railway App URL Format

Your app will be at:
```
https://patient-booking-XXXXXXXXXX.up.railway.app
```

Check in Railway Dashboard → Project Settings → Domains

---

## 🎯 What Happens During Deployment

```
GitHub Push
    ↓
Railway detects changes
    ↓
npm install (runs postinstall: prisma generate)
    ↓
npm run build (generates client, compiles Next.js)
    ↓
npm start (starts server)
    ↓
✅ App is LIVE!
```

---

## 🐛 If Build Fails

1. **Check Build Logs** (in Railway Dashboard)
2. **Common issues**:
   - Missing DATABASE_URL → Add PostgreSQL plugin
   - Wrong Node version → Railway uses latest (OK)
   - Prisma error → Check logs, usually just a warning

3. **Restart build**:
   - Click "Redeploy" button
   - Or push new commit to GitHub

---

## 🧪 Test Your Deployed App

```bash
# Visit your app
https://patient-booking-XXXXX.up.railway.app

# Test API (replace URL)
curl https://patient-booking-XXXXX.up.railway.app/api/doctors

# Test Chatbot API
curl -X POST https://patient-booking-XXXXX.up.railway.app/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","sessionId":"test-1"}'
```

---

## 💰 Cost

- **Free Tier**: $5/month credit (usually covers small apps)
- **PostgreSQL**: Included in free tier
- **App Runtime**: Included in free tier
- **Domains**: Free `.up.railway.app` subdomain

Monitor usage in Railway Dashboard → Settings → Billing

---

## 🎉 You're Done!

Your patient booking app is now live on Railways!

### What's Running
- ✅ Next.js 16 app
- ✅ PostgreSQL database
- ✅ Gemini AI chatbot
- ✅ All APIs working
- ✅ Admin panel

### Next Steps (Optional)
1. **Custom Domain**: Add your own domain (in Railway Settings)
2. **Enable Gemini**: Add `GEMINI_API_KEY` to environment
3. **Monitor**: Check Railway Logs occasionally
4. **Scale**: Upgrade plan if needed

---

## 📞 Need Help?

**If deployment fails:**
1. Check Railway Build Logs
2. Verify all environment variables are set
3. Make sure PostgreSQL plugin is added
4. Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for troubleshooting

**Gemini chatbot not working:**
1. If no API key → Uses fallback responses (still works!)
2. If API key set → May need to restart deployment

---

## 🔗 Quick Links

- **Railway Dashboard**: https://railway.app/dashboard
- **Your Project Logs**: Railway Dashboard → Deployments
- **Gemini API Key**: https://aistudio.google.com/apikey
- **Project Docs**: See `DEPLOYMENT_GUIDE.md` in your project

---

**Status: ✅ READY TO DEPLOY**

Good luck! 🚀
