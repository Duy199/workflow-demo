# Quick Deploy Guide

## Deploy to Vercel (Easiest - No GitHub needed)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy (will prompt for login)
vercel

# Follow prompts:
# - Login with your GitHub/Email
# - Link to existing project or create new
# - Accept defaults
```

After deployment, you'll get a live URL like: `https://workflow-demo-xyz.vercel.app`

---

## OR Deploy via GitHub + Vercel (Better for team)

### Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `workflow-demo`
3. Public or Private (your choice)
4. **Don't check** "Initialize with README"
5. Click "Create repository"

### Step 2: Push to GitHub

```bash
# Add the remote
git remote add origin https://github.com/DuyTran3008/workflow-demo.git

# Push
git push -u origin main
```

### Step 3: Connect Vercel to GitHub

1. Go to https://vercel.com/new
2. Import your `workflow-demo` repository
3. Vercel auto-detects Vite
4. Click "Deploy"

Done! Every git push will auto-deploy.

---

## Current Status

✅ Project is ready to deploy
✅ All 3 variants working
✅ Vite build configured
✅ Tailwind CSS working
✅ React Router navigation working

Just choose your deployment method above! 🚀
