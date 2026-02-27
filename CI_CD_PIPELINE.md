# 🔄 CI/CD Pipeline Overview

## 📋 Pipeline Architecture

Your Book Selling Website now has a complete CI/CD pipeline that automatically deploys to Render on every code push.

---

## 🏗️ Pipeline Structure

```
┌─────────────────────────────────────────────────┐
│  Developer pushes code to GitHub                │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│  GitHub Actions Workflow Triggered              │
│  (.github/workflows/deploy.yml)                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  Step 1: Test Backend                          │
│  ├─ Checkout code                              │
│  ├─ Setup Node.js 18                           │
│  ├─- Install dependencies                       │
│  └─- Check for syntax errors                    │
│                                                 │
│  Step 2: Test Frontend                         │
│  ├─ Checkout code                              │
│  ├─ Setup Node.js 18                           │
│  ├─ Install dependencies                       │
│  ├─ Build frontend                             │
│  └─ Upload build artifacts                     │
│                                                 │
│  Step 3: Deploy (if tests pass)                │
│  └─ Trigger Render deployment                  │
│                                                 │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│  Render Detects GitHub Push                    │
│  (render.yaml configuration)                    │
├─────────────────────────────────────────────────┤
│                                                 │
│  Backend Deployment:                           │
│  ├─ Pull latest code                           │
│  ├─ Run: cd server && npm install              │
│  ├─ Run: cd server && npm start                │
│  ├─ Health check: /api/health                  │
│  └─ Go live at: bookstore-api.onrender.com     │
│                                                 │
│  Frontend Deployment:                          │
│  ├─ Pull latest code                           │
│  ├─ Run: npm install && npm run build          │
│  ├─ Publish: ./dist                            │
│  ├─ Configure redirects                        │
│  └─ Go live at: bookstore-frontend.onrender.com│
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📁 Pipeline Files

### 1. `render.yaml` - Infrastructure as Code
**Location:** Root directory  
**Purpose:** Defines all services and their configuration

```yaml
services:
  - Backend API (Node.js web service)
  - Frontend App (Static site)
```

**Features:**
- Auto-deploy on push to main/master
- Environment variables management
- Health check configuration
- Service dependencies

### 2. `.github/workflows/deploy.yml` - GitHub Actions
**Location:** `.github/workflows/`  
**Purpose:** Automated testing and validation

**Triggers:**
- Push to main/master branch
- Pull requests to main/master
- Manual workflow dispatch

**Jobs:**
1. **test-backend** - Validates backend code
2. **test-frontend** - Builds and validates frontend
3. **deploy** - Triggers Render deployment

### 3. `src/config.js` - Environment Configuration
**Location:** `src/`  
**Purpose:** Dynamic API URL configuration

**Features:**
- Development: Uses localhost:5000
- Production: Uses Render backend URL
- Environment detection
- Clean configuration management

### 4. `server/config/production.js` - Production Config
**Location:** `server/config/`  
**Purpose:** Server production settings

**Features:**
- CORS configuration
- Database settings
- Email configuration
- Payment gateway settings

---

## 🚀 Deployment Flow

### Automatic Deployment

1. **Commit & Push:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **GitHub Actions:**
   - Runs automatically
   - Tests backend
   - Builds frontend
   - Reports results

3. **Render:**
   - Detects push
   - Pulls code
   - Rebuilds services
   - Deploys new version

### Manual Deployment

**Option 1: Render Dashboard**
1. Go to render.com
2. Select your service
3. Click "Manual Deploy"
4. Choose "Deploy latest commit"

**Option 2: GitHub Actions**
1. Go to your repo on GitHub
2. Actions tab
3. Select "Deploy to Render" workflow
4. Click "Run workflow"

---

## 🔧 Configuration Management

### Environment Variables

**Backend (.env):**
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_SECRET=...
EMAIL_USER=...
EMAIL_PASSWORD=...
FRONTEND_URL=https://bookstore-frontend.onrender.com
```

**Frontend (.env):**
```env
VITE_API_URL=https://bookstore-api.onrender.com/api
```

**Managed in Render:**
- Set once in dashboard
- Persists across deployments
- Secure (encrypted secrets)
- No need to commit to git

---

## 📊 Pipeline Stages

### Stage 1: Code Quality ✅
- Syntax validation
- Dependency check
- Build verification

### Stage 2: Testing ✅
- Backend tests (syntax check)
- Frontend build test
- No errors

### Stage 3: Build ✅
- Install dependencies
- Build frontend
- Prepare for deployment

### Stage 4: Deploy ✅
- Push to Render
- Service rebuild
- Health checks
- Go live

---

## 🔍 Monitoring & Logs

### View Deployment Status

**GitHub:**
1. Go to your repository
2. Click "Actions" tab
3. See all workflow runs
4. Click any run for details

**Render:**
1. Go to render.com dashboard
2. Select your service
3. See deployment history
4. Click any deployment for logs

### Check Logs

**Backend Logs:**
```bash
# In Render dashboard
Services → bookstore-api → Logs
```

**Frontend Logs:**
- Browser Console (F12)
- Network tab for API calls

**GitHub Actions Logs:**
```
Repo → Actions → Workflow Run → Job → Step
```

---

## ⚡ Pipeline Features

### ✅ Automated Testing
- Every push is tested
- Catch errors before deployment
- Fast feedback loop

### ✅ Zero Downtime Deployment
- Render builds new version
- Tests health check
- Switches traffic when ready
- Old version kept running until new is healthy

### ✅ Rollback Support
- Keep deployment history
- Redeploy any previous version
- One-click rollback in Render

### ✅ Environment Management
- Separate dev/prod configs
- Secure secrets management
- Easy updates

### ✅ Auto-Scaling
- Handles traffic spikes
- Automatic resource allocation
- Performance optimization

---

## 🎯 Best Practices

### Code Management
```bash
# Always work on feature branches
git checkout -b feature/new-feature

# Make changes and test locally
npm run dev

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request
# Merge to main after review

# Automatic deployment triggers
```

### Version Control
```bash
# Tag releases
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0

# View tags
git tag -l
```

### Testing Before Deploy
```bash
# Test locally first
npm run dev  # Frontend
cd server && npm run dev  # Backend

# Build test
npm run build

# Check for errors
npm run lint
```

---

## 🐛 Troubleshooting

### Pipeline Fails

**Check GitHub Actions:**
1. Go to Actions tab
2. See which step failed
3. Read error logs
4. Fix issue and push again

**Common Issues:**
- Syntax errors → Check logs
- Missing dependencies → Update package.json
- Build failures → Check Vite config

### Deployment Fails

**Check Render:**
1. Go to service
2. Click "Logs" tab
3. See error messages
4. Fix and redeploy

**Common Issues:**
- Missing env vars → Add in Render
- MongoDB connection → Check connection string
- Build command → Verify in render.yaml

### Service Not Responding

**Check:**
1. Health check endpoint
2. Environment variables
3. Database connection
4. Service logs

---

## 📈 Performance Optimization

### Build Optimization
- Code splitting enabled
- Tree shaking active
- Minification on production
- Source maps disabled

### Caching Strategy
- npm dependency caching
- Build artifact caching
- Static asset caching

### Monitoring
- Response time tracking
- Error rate monitoring
- Resource usage metrics
- User analytics

---

## 🔒 Security

### Pipeline Security
- ✅ Secrets not in code
- ✅ Environment vars encrypted
- ✅ HTTPS only
- ✅ Dependency scanning
- ✅ Code review required

### Deployment Security
- ✅ Production env vars separate
- ✅ Database access restricted
- ✅ API keys rotatable
- ✅ CORS properly configured

---

## 📝 Pipeline Checklist

### Initial Setup
- [x] `render.yaml` created
- [x] GitHub Actions workflow created
- [x] Environment config added
- [x] .gitignore updated
- [x] Documentation created

### Configuration
- [ ] GitHub repo created
- [ ] Render account setup
- [ ] Services deployed
- [ ] Environment variables set
- [ ] Custom domain (optional)

### Testing
- [ ] Local build works
- [ ] GitHub Actions pass
- [ ] Render deployment successful
- [ ] Health checks pass
- [ ] Complete flow tested

---

## 🎓 Learning Resources

### CI/CD Concepts
- Continuous Integration
- Continuous Deployment
- Infrastructure as Code
- DevOps best practices

### Tools Documentation
- GitHub Actions: https://docs.github.com/actions
- Render: https://render.com/docs
- Vite: https://vitejs.dev/guide/

---

## ✨ Summary

Your CI/CD pipeline provides:

✅ **Automated Testing** - Catch errors early  
✅ **Automated Deployment** - Push to deploy  
✅ **Environment Management** - Clean config  
✅ **Monitoring & Logs** - Full visibility  
✅ **Rollback Support** - Easy recovery  
✅ **Zero Downtime** - Always available  
✅ **Security** - Best practices built-in  

**Result:** Professional, production-ready deployment process!

---

## 🚀 Quick Commands

```bash
# Deploy new version
git add .
git commit -m "Update: description"
git push origin main

# Check deployment status
# Visit: github.com/yourrepo/actions

# View logs
# Visit: render.com → Your Service → Logs

# Rollback
# Visit: render.com → Your Service → Manual Deploy → Previous version
```

---

For deployment instructions, see:
- **DEPLOY_QUICK.md** - Fast setup guide
- **RENDER_DEPLOYMENT.md** - Complete guide
- **DEPLOYMENT_STATUS.md** - Track your deployment

---

Last Updated: February 27, 2026
