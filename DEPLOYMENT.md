# Deployment Guide (English)

This project is configured with automated CI/CD and deployment pipeline. This document explains how to complete the Vercel deployment setup.

## Table of Contents
- [Quick Start](#quick-start)
- [Vercel Deployment Steps](#vercel-deployment-steps)
- [GitHub Secrets Configuration](#github-secrets-configuration)
- [Local Testing](#local-testing)
- [Troubleshooting](#troubleshooting)

## Quick Start

This project uses Vercel for production deployment and GitHub Actions for CI/CD testing.

### Configured Workflows:
- ✅ **test.yml** - TypeScript and multi-version Node.js testing
- ✅ **lint.yml** - ESLint and type checking
- ✅ **security.yml** - npm audit and Gitleaks security scanning
- ✅ **i18n-check.yml** - Chinese translation verification (204 translation keys)
- ✅ **deploy.yml** - Automatic Vercel deployment

## Vercel Deployment Steps

### Step 1: Connect Repository to Vercel

1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Sign in or register Vercel account (recommended: use GitHub login)
3. Click **Add New...** button, select **Project**
4. In **Import Git Repository** area, search and select your repository:
   ```
   pachelbel23/worldmonitor
   ```
5. Ensure **Framework Preset** is automatically set to **Vite** (if not, select manually)
6. **Build & Output Settings** should be:
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Click **Deploy**

Vercel will automatically build and deploy your project! After deployment completes, you'll see a URL like:
```
https://worldmonitor-[random-id].vercel.app
```

### Step 2: Configure Custom Domain (Optional)

If you want to use a custom domain:

1. In Vercel project settings, go to **Domains**
2. Click **Add Custom Domain**
3. Enter your desired domain (e.g., `worldmonitor.yourdomain.com`)
4. Follow Vercel's DNS configuration instructions

## GitHub Secrets Configuration

To enable automatic deployment, configure three secrets in GitHub.

### Step 1: Get Vercel Authentication Information

#### Get `VERCEL_TOKEN`:
1. Visit [Vercel Account Settings](https://vercel.com/account)
2. Go to **Tokens** section
3. Click **Create Token**
4. Enter token name (e.g., `worldmonitor-github-ci`)
5. Set expiration time (optional)
6. Click **Create** and copy the generated token

#### Get `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`:
1. Go to [Vercel Projects](https://vercel.com/projects)
2. Select **worldmonitor** project
3. Go to **Settings** tab
4. Scroll down to find **Project ID** - copy this as `VERCEL_PROJECT_ID`
5. Your **VERCEL_ORG_ID** is your Vercel username or organization name
   - You can see it in the page URL: `https://vercel.com/[ORG_ID]/worldmonitor/settings`

### Step 2: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** tab
3. Go to **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add the following three secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `VERCEL_TOKEN` | [Copy from Step 1] | Vercel personal access token |
| `VERCEL_ORG_ID` | Your username or organization name | Vercel organization ID |
| `VERCEL_PROJECT_ID` | [Copy from Step 1] | Vercel project ID |

### Step 3: Verify Deployment

1. Go to your repository's **Actions** tab
2. You should see the latest workflow run
3. All workflows should pass (green ✅)
4. After deployment completes, visit your Vercel URL to test the application

## Local Testing

Before deployment, test the application locally:

### Development Environment
```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Test Chinese interface:
# 1. Open the application
# 2. Look for language switcher button in top-right corner
# 3. Click to switch to Traditional Chinese (繁體中文)
# 4. Verify all UI text is translated
```

### Production Build Testing
```bash
# Build the application
npm run build

# Preview production build locally
npm run preview

# Visit http://localhost:4173 to test
```

### Code Quality Checks
```bash
# Run TypeScript type checking
npm run typecheck

# Run ESLint code style checking
npm run lint

# Run all tests
npm test
```

## CI/CD Workflows Details

### test.yml - Type Checking & Build Testing
- Runs on Node.js 18, 20, 22
- Executes TypeScript type checking
- Executes full build
- Ensures multi-version compatibility

### lint.yml - Code Quality Checking
- Runs ESLint checks
- Executes TypeScript type checking
- Ensures consistent code style

### security.yml - Security Scanning
- `npm audit` - Check dependency vulnerabilities
- `Gitleaks` - Scan commits for sensitive information (API keys etc.)
- Prevent security issues from entering repository

### i18n-check.yml - Translation Verification
- Verify all 204 translation keys
- Ensure both English and Traditional Chinese translations exist
- Prevent missing translations

### deploy.yml - Deployment Pipeline
- Automatically triggered on `main` branch
- Install dependencies
- Build application
- Deploy to Vercel (if secrets configured)
- Generate deployment URL

## Troubleshooting

### Deploy Workflow Fails: "Error: VERCEL_TOKEN is not set"
**Solution:** Check that you've correctly added all three GitHub secrets. Secrets must exactly match the names listed above.

### Get 404 Error After Deploying to Vercel
**Solution:**
1. Check Vercel build logs to ensure build succeeded
2. Verify `dist` directory exists and contains `index.html`
3. Clear browser cache
4. Wait 1-2 minutes for CDN cache to update

### Chinese Text Displays Incorrectly
**Solution:**
1. Refresh page (Ctrl+F5 for hard refresh)
2. Clear browser cache
3. Check browser theme - some themes may affect font rendering

### npm Audit Warnings
**Solution:**
- Most warnings come from large dependencies (like deck.gl for scientific visualization)
- These warnings are usually not critical (mostly dev dependencies)
- Running `npm audit fix` can automatically fix some issues
- Critical vulnerabilities will block deployment

## Monitoring & Maintenance

### Monitor Deployments
1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Select **worldmonitor** project
3. View **Deployments** tab for deployment history
4. Check deployment logs to troubleshoot issues

### Monitor CI/CD
1. Go to your GitHub repository's **Actions** tab
2. View latest workflow runs
3. Click any failed workflow to see detailed logs

### Dependency Updates
This project includes **Dependabot** configuration:
- Automatically scans for dependency updates
- Creates Pull Requests for each update
- Automatically runs CI/CD tests
- Review and merge safe PRs

## FAQ

**Q: Do I need to pay for Vercel?**
A: No! Vercel's free Hobby plan is sufficient for most personal and open-source projects. It includes unlimited deployments, custom domains, etc.

**Q: How do I go back to GitHub Pages?**
A: Edit `.github/workflows/deploy.yml` and restore it to use `peaceiris/actions-gh-pages`, then reconfigure your GitHub repository settings to use Pages.

**Q: Can I deploy to multiple platforms simultaneously?**
A: Yes! You can add multiple deployment steps to `deploy.yml` to deploy to Vercel, GitHub Pages, Netlify, etc. simultaneously.

**Q: How do I configure a custom domain?**
A: See [Step 2: Configure Custom Domain](#step-2-configure-custom-domain-optional) above.

## Tech Stack

- **Framework:** Vite + TypeScript
- **Language Support:** English (en) + Traditional Chinese (zh-TW)
- **CI/CD:** GitHub Actions
- **Deployment:** Vercel
- **Code Quality:** ESLint + TypeScript
- **Security Scanning:** npm audit + Gitleaks

## Project Statistics

- 📝 **204 Translation Keys** - Complete English & Chinese support
- 🔒 **5 CI/CD Workflows** - Comprehensive quality assurance
- 🌍 **Responsive Design** - Supports all devices
- ⚡ **Vite Build** - Fast build and loading

## Get Help

- 📚 [Vercel Documentation](https://vercel.com/docs)
- 📚 [GitHub Actions Documentation](https://docs.github.com/en/actions)
- 💬 [Original Project GitHub Issues](https://github.com/koala73/worldmonitor/issues)
- 🐛 [This Fork's Issues](https://github.com/pachelbel23/worldmonitor/issues)

---

**Last Updated:** February 11, 2025
**Maintainer:** pachelbel23
**Base Project:** koala73/worldmonitor
