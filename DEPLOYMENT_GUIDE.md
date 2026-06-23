# Deployment Checklist & Setup Guide

## Pre-Deployment Steps (Local)

### 1. Install & Setup PostgreSQL Locally
```bash
# Windows: Download from https://www.postgresql.org/download/windows/
# macOS: brew install postgresql
# Linux: sudo apt-get install postgresql

# Create database
createdb patient_booking

# Update .env.local with your connection string:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/patient_booking"
```

### 2. Generate Prisma Client & Run Migrations
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init  # Creates migration for PostgreSQL
npm run build   # Test the build locally
npm run dev     # Run locally to verify
```

### 3. Test Gemini Integration (Optional)
- Get API key from https://aistudio.google.com/apikey
- Add to .env.local: `GEMINI_API_KEY="your-key"`
- Chat should now use AI responses

### 4. Verify Build Success
```bash
npm run build
# Should see: ✓ Compiled successfully
# NO "Cannot find module '.prisma/client'" error
```

---

## Railway Deployment Steps

### 1. Setup Railway Project
1. Go to https://railway.app
2. Create New Project
3. Deploy from GitHub → Select your repository
4. Railway auto-detects Next.js

### 2. Add PostgreSQL Database
1. Click "Add Service" → PostgreSQL
2. Railway automatically provides `DATABASE_URL`
3. Variables added: `DATABASE_PRISMA_URL`, `DATABASE_URL`

### 3. Set Environment Variables
In Railway Dashboard, add:
```
DATABASE_URL=<auto-provided>
GEMINI_API_KEY=<get from https://aistudio.google.com/apikey>
ADMIN_SECRET=<generate random: $(openssl rand -hex 16)>
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-railway-app.up.railway.app
```

### 4. Configure Build Settings (if needed)
- Build Command: `npm run build`
- Start Command: `npm start`
- Root Directory: `/` (default)

### 5. Deploy
- Push to GitHub → Railway auto-deploys
- Check Deployment tab for build logs
- Look for: "✓ Compiled successfully"

---

## Post-Deployment Verification

### 1. Check if App is Running
- Visit your Railway app URL
- Should load without errors

### 2. Verify Prisma is Working
```bash
# In Railway's web shell
npm run build  # Should still work
```

### 3. Test API Endpoints
- Visit `/api/doctors` - should return doctor list
- Visit `/api/ai/chat` - should handle chat requests
- Check browser console for errors

### 4. Monitor Logs
- Railway Dashboard → Deployment → Logs
- Look for database connection errors
- Prisma generation warnings

---

## Troubleshooting

### Error: "Cannot find module '.prisma/client'"
**Solution**: The postinstall script failed
```
# In Railway, manually run:
npm install
npx prisma generate
```

### Error: "Database connection refused"
**Solution**: DATABASE_URL not set correctly
- Check Railway Dashboard variables
- PostgreSQL plugin must be added
- Restart deployment

### Error: "Prisma migrations out of sync"
**Solution**: Create migration locally, push to repo
```bash
npx prisma migrate dev --name fix_schema
git commit -am "Update Prisma schema"
git push  # Railway redeploys
```

### Gemini Chat Not Working
**Solution**: GEMINI_API_KEY not set
- Add to Railway environment variables
- Restart deployment
- Chat will use fallback responses if key missing (safe to skip)

---

## Performance Tips for Railways

1. **Connection Pooling**: Railway PostgreSQL auto-pools connections
2. **Cold Starts**: ~30s on first request (normal for Railway free tier)
3. **Memory**: Default 512MB - should be enough for this app
4. **Disk**: Download doctor data once, cache if needed

---

## Cost Optimization

- Railway free tier: $5/month credit
- Estimated costs:
  - PostgreSQL: $5/month
  - Next.js App: $5-10/month (depending on usage)
  - Total: ~$10-15/month

Monitor at: Railways Dashboard → Settings → Billing

---

## Quick Rollback

If deployment breaks:
1. Railway Dashboard → Deployments
2. Click previous successful build
3. Click "Redeploy" → Automatic rollback
