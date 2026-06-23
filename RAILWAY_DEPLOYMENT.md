# Railway Deployment Guide

## Prerequisites
- Railway account (https://railway.app)
- GitHub repository connected to Railway
- PostgreSQL database

## Environment Variables Setup on Railway

1. **Add these variables in Railway Dashboard**:
   - `DATABASE_URL` - PostgreSQL connection string (Railway auto-provides this)
   - `GEMINI_API_KEY` - Get from https://aistudio.google.com/apikey
   - `ADMIN_SECRET` - Set a secure random string
   - `NODE_ENV=production`
   - `NEXT_PUBLIC_API_URL=https://your-railway-app-url.com`

## Build Configuration

Your `package.json` has been updated with:
```json
"scripts": {
  "build": "prisma generate && next build --webpack",
  "postinstall": "prisma generate"
}
```

This ensures Prisma client is generated during deployment.

## Deployment Steps

1. Push your changes to GitHub
2. In Railway Dashboard:
   - Create New Project → Deploy from GitHub
   - Select your repository
   - Railway will auto-detect Next.js
3. Add PostgreSQL Plugin:
   - Click "Add" → PostgreSQL
   - This creates `DATABASE_URL` automatically
4. Add other environment variables
5. Railway will automatically trigger build and deploy

## Post-Deployment

Run database migrations (if needed):
```bash
npx prisma migrate deploy
```

## Troubleshooting

- If build fails: Check Railway Build Logs for Prisma generation errors
- If DB connection fails: Verify `DATABASE_URL` environment variable is set
- Check Railway Deployment Logs for runtime errors

## Cost Optimization

Railway provides $5/month free credit. Monitor usage in Project Settings.
