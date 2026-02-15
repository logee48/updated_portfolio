# Deploying Your Portfolio to Netlify

This guide will walk you through deploying your React portfolio website to Netlify.

## Prerequisites

- Node.js and npm installed
- A Netlify account (free tier is sufficient) - [Sign up here](https://www.netlify.com/)
- Your project files ready

## Method 1: Deploy via Netlify UI (Drag & Drop)

This is the quickest method for first-time deployment.

### Step 1: Build Your Project

```bash
npm run build
```

This creates a `dist` folder with your production-ready files.

### Step 2: Deploy to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Log in to your account
3. Click **"Add new site"** → **"Deploy manually"**
4. Drag and drop your `dist` folder into the upload area
5. Wait for deployment to complete
6. Your site is now live!

## Method 2: Deploy via Netlify CLI (Recommended)

This method gives you more control and is better for updates.

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Build Your Project

```bash
npm run build
```

### Step 3: Login to Netlify

```bash
netlify login
```

This opens your browser for authentication.

### Step 4: Deploy

For first-time deployment:

```bash
netlify deploy
```

Follow the prompts:
- **Create & configure a new site**: Yes
- **Team**: Select your team
- **Site name**: Choose a unique name (e.g., `yourname-portfolio`)
- **Publish directory**: `dist`

This creates a draft deployment. Review it, then deploy to production:

```bash
netlify deploy --prod
```

### Step 5: Future Updates

When you make changes:

```bash
npm run build
netlify deploy --prod
```

## Method 3: Continuous Deployment with Git

For automatic deployments when you push to GitHub/GitLab.

### Step 1: Push Your Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** (or your Git provider)
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**

Now every push to main will trigger a new deployment!

## Important Configuration

### Fix Resume PDF Path

Your resume is currently referenced as `/src/resume.pdf`. For production, you need to place it in the `public` folder:

```bash
# Move resume to public folder
mkdir -p public
cp src/resume.pdf public/resume.pdf
```

Then update `Footer.tsx`:

```typescript
const handleDownloadResume = () => {
  const link = document.createElement('a');
  link.href = '/resume.pdf';  // Changed from '/src/resume.pdf'
  link.download = 'Logesh_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
```

### Environment Variables (if needed)

If you have any API keys or environment variables:

1. In Netlify dashboard, go to **Site settings** → **Environment variables**
2. Add your variables
3. Rebuild your site

## Custom Domain (Optional)

### Using Netlify Subdomain

Your site automatically gets a URL like `your-site-name.netlify.app`

### Using Your Own Domain

1. In Netlify dashboard, go to **Domain settings**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Update your domain's DNS settings as instructed
5. Netlify provides free HTTPS certificates automatically!

## Troubleshooting

### Build Fails

Check the build logs in Netlify dashboard. Common issues:
- Missing dependencies: Run `npm install` locally
- TypeScript errors: Run `npm run build` locally to see errors
- Node version mismatch: Add `NODE_VERSION` environment variable in Netlify

### 404 on Page Refresh

Add a `public/_redirects` file:

```bash
echo "/*    /index.html   200" > public/_redirects
```

### Resume Not Downloading

Ensure your resume is in the `public` folder and the path in `Footer.tsx` is `/resume.pdf`

## Performance Optimization

Your site is already optimized, but you can:

1. **Enable Asset Optimization** in Netlify:
   - Go to **Site settings** → **Build & deploy** → **Post processing**
   - Enable CSS, JS, and image optimization

2. **Add Caching Headers** with a `public/_headers` file:

```
/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/resume.pdf
  Cache-Control: public, max-age=86400
```

## Deployment Checklist

- [ ] Build succeeds locally (`npm run build`)
- [ ] Resume PDF is in `public` folder
- [ ] Update resume path in `Footer.tsx` to `/resume.pdf`
- [ ] Test all links and functionality
- [ ] Update social media links (GitHub, LinkedIn)
- [ ] Choose deployment method (UI, CLI, or Git)
- [ ] Deploy to Netlify
- [ ] Test live site thoroughly
- [ ] Set up custom domain (optional)

## Quick Reference Commands

```bash
# Build project
npm run build

# Deploy to production (CLI method)
netlify deploy --prod

# View deployment logs
netlify logs

# Open site in browser
netlify open:site

# Open Netlify dashboard
netlify open:admin
```

## Support

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community](https://answers.netlify.com/)
- [Netlify Status](https://www.netlifystatus.com/)

---

**Your site is ready to deploy! Good luck!** 🚀
