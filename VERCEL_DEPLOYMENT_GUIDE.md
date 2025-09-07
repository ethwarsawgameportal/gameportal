# Vercel Deployment Guide

## ✅ **Fixed: ERR_PNPM_OUTDATED_LOCKFILE Error**

The `pnpm-lock.yaml` file has been updated and committed to resolve the Vercel deployment error.

### **🔧 What Was Fixed:**

1. **Updated Lockfile**: Ran `pnpm install` to sync `pnpm-lock.yaml` with `package.json`
2. **Committed Changes**: Added and committed the updated lockfile
3. **Pushed to GitHub**: Updated lockfile is now available for Vercel deployment

### **📋 Vercel Environment Variables Setup**

To deploy successfully on Vercel, you need to set up the environment variable:

#### **1. Go to Vercel Dashboard**
- Visit [vercel.com](https://vercel.com)
- Navigate to your project

#### **2. Add Environment Variable**
- Go to **Settings** → **Environment Variables**
- Add the following variable:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_CIVIC_CLIENT_ID` | `e21eb711-8a2b-493c-aaee-d5db5561a5a7` | Production, Preview, Development |

#### **3. Redeploy**
- Go to **Deployments** tab
- Click **Redeploy** on the latest deployment
- Or push a new commit to trigger automatic deployment

### **🚀 Deployment Steps:**

1. **Environment Variable**: Set `NEXT_PUBLIC_CIVIC_CLIENT_ID` in Vercel dashboard
2. **Automatic Deployment**: Push to GitHub triggers Vercel deployment
3. **Build Process**: Vercel will use the updated `pnpm-lock.yaml`
4. **Success**: Your app will deploy with Civic Auth working

### **🔍 Troubleshooting:**

#### **If you still get lockfile errors:**
```bash
# Local fix
pnpm install
git add pnpm-lock.yaml
git commit -m "Update lockfile"
git push
```

#### **If environment variable is missing:**
- Check Vercel dashboard → Settings → Environment Variables
- Ensure `NEXT_PUBLIC_CIVIC_CLIENT_ID` is set for all environments
- Redeploy after adding the variable

#### **If Civic Auth doesn't work:**
- Verify the environment variable is set correctly
- Check the client ID value matches your Civic dashboard
- Ensure the variable is available in the browser (starts with `NEXT_PUBLIC_`)

### **📝 Environment Variable Details:**

- **Variable Name**: `NEXT_PUBLIC_CIVIC_CLIENT_ID`
- **Value**: `e21eb711-8a2b-493c-aaee-d5db5561a5a7`
- **Required For**: All environments (Production, Preview, Development)
- **Type**: Public (accessible in browser)

### **✅ Ready for Deployment:**

Your project is now ready for Vercel deployment:

1. ✅ **Lockfile Updated**: `pnpm-lock.yaml` is in sync
2. ✅ **Environment Variable**: Ready to be set in Vercel
3. ✅ **Code Updated**: Uses environment variables instead of hardcoded values
4. ✅ **GitHub Updated**: Latest changes are pushed

The `ERR_PNPM_OUTDATED_LOCKFILE` error should now be resolved! 🎉
