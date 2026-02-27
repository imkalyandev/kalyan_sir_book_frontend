# 🚀 Render Deployment Guide

Complete guide to deploy your Book Selling Website to Render.

---

## 📋 Prerequisites

- GitHub account
- Render account (free at https://render.com)
- MongoDB Atlas account (free at https://mongodb.com/atlas)
- Razorpay account (for payments)
- Gmail account (for emails)

---

## 🎯 Deployment Architecture

```
┌─────────────────────────────────────────┐
│  GitHub Repository (Your Code)          │
└────────────┬────────────────────────────┘
             │
             │ Auto-Deploy on Push
             ▼
┌────────────────────────────────────────────────┐
│           Render Platform                      │
├────────────────────────────────────────────────┤
│                                                │
│  ┌──────────────────┐  ┌──────────────────┐  │
│  │  Backend API     │  │  Frontend App    │  │
│  │  (Web Service)   │  │  (Static Site)   │  │
│  │  Node.js/Express │  │  React/Vite      │  │
│  └──────────────────┘  └──────────────────┘  │
│           │                                    │
└───────────┼────────────────────────────────────┘
            │
            ▼
┌────────────────────────┐
│  MongoDB Atlas         │
│  (Database)            │
└────────────────────────┘
```

---

## 📦 Step 1: Prepare Your Code

### 1.1 Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add files
git add .

# Commit
git commit -m "Initial commit - Book Store Application"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/bookstore.git

# Push to GitHub
git push -u origin main
```

### 1.2 Verify Files

Make sure these files exist in your repository:
- ✅ `render.yaml` (infrastructure configuration)
- ✅ `.github/workflows/deploy.yml` (CI/CD pipeline)
- ✅ `server/package.json` (backend dependencies)
- ✅ `package.json` (frontend dependencies)
- ✅ `.gitignore` (excludes node_modules, .env)

---

## 🗄️ Step 2: Setup MongoDB Atlas

### 2.1 Create Database

1. Go to https://mongodb.com/atlas
2. Sign up / Log in
3. Create a **Free Cluster** (M0)
4. Choose cloud provider: **AWS** (recommended)
5. Choose region: **Oregon (us-west-2)** or closest to you
6. Cluster name: `bookstore-cluster`
7. Click **Create Cluster** (takes 3-5 minutes)

### 2.2 Configure Database Access

1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Authentication: **Password**
4. Username: `bookstore_admin`
5. Password: Generate secure password (save it!)
6. Database User Privileges: **Read and write to any database**
7. Click **Add User**

### 2.3 Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
   - ⚠️ This is needed for Render to connect
4. Click **Confirm**

### 2.4 Get Connection String

1. Go to **Database** → **Clusters**
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string:
   ```
   mongodb+srv://bookstore_admin:<password>@bookstore-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name before `?`:
   ```
   mongodb+srv://bookstore_admin:yourpassword@bookstore-cluster.xxxxx.mongodb.net/bookstore?retryWrites=true&w=majority
   ```

### 2.5 Seed Database

Run locally with Atlas connection string:

```bash
# Update server/.env with Atlas URI
MONGODB_URI=mongodb+srv://bookstore_admin:yourpassword@...

# Seed database
cd server
node seedBooks.js
```

---

## 🔧 Step 3: Deploy Backend to Render

### 3.1 Create Backend Service

1. Go to https://render.com
2. Sign up / Log in with GitHub
3. Click **New +** → **Web Service**
4. Connect your GitHub repository
5. Select your **bookstore** repository

### 3.2 Configure Backend Service

**Basic Settings:**
- Name: `bookstore-api`
- Region: **Oregon (US West)**
- Branch: `main` (or `master`)
- Root Directory: Leave empty
- Environment: **Node**
- Build Command: `cd server && npm install`
- Start Command: `cd server && npm start`

**Advanced Settings:**
- Plan: **Free**
- Auto-Deploy: **Yes** ✅
- Health Check Path: `/api/health`

### 3.3 Add Environment Variables

Click **Environment** tab and add:

| Key | Value | Secret |
|-----|-------|--------|
| `PORT` | `5000` | No |
| `NODE_ENV` | `production` | No |
| `MONGODB_URI` | `mongodb+srv://...` | Yes ✅ |
| `RAZORPAY_KEY_ID` | `rzp_live_...` | Yes ✅ |
| `RAZORPAY_SECRET` | `your_secret` | Yes ✅ |
| `EMAIL_HOST` | `smtp.gmail.com` | No |
| `EMAIL_PORT` | `587` | No |
| `EMAIL_USER` | `your@gmail.com` | Yes ✅ |
| `EMAIL_PASSWORD` | `app_password` | Yes ✅ |

**Important Notes:**
- ⚠️ Use **LIVE** Razorpay keys for production
- ⚠️ Use Gmail **App Password** (not regular password)
- ⚠️ Mark sensitive values as **Secret**

### 3.4 Deploy Backend

1. Click **Create Web Service**
2. Wait for deployment (3-5 minutes)
3. You'll get a URL like: `https://bookstore-api.onrender.com`

### 3.5 Test Backend

Visit these endpoints:
- `https://bookstore-api.onrender.com` (root)
- `https://bookstore-api.onrender.com/api/health` (health check)
- `https://bookstore-api.onrender.com/api/books` (get books)

You should see JSON responses.

---

## 🎨 Step 4: Deploy Frontend to Render

### 4.1 Create Frontend Service

1. In Render dashboard, click **New +** → **Static Site**
2. Connect same GitHub repository
3. Select your **bookstore** repository

### 4.2 Configure Frontend Service

**Basic Settings:**
- Name: `bookstore-frontend`
- Branch: `main` (or `master`)
- Root Directory: Leave empty
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

**Advanced Settings:**
- Plan: **Free**
- Auto-Deploy: **Yes** ✅

### 4.3 Add Environment Variables

Click **Environment** tab and add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://bookstore-api.onrender.com/api` |

⚠️ **Important:** Replace with YOUR actual backend URL!

### 4.4 Configure Redirects/Rewrites

Add this in **Redirects/Rewrites** section:

```
/* /index.html 200
```

This ensures React Router works correctly.

### 4.5 Deploy Frontend

1. Click **Create Static Site**
2. Wait for deployment (2-3 minutes)
3. You'll get a URL like: `https://bookstore-frontend.onrender.com`

---

## 🔗 Step 5: Update Backend CORS

### 5.1 Add Frontend URL to Backend

1. Go to backend service in Render
2. Click **Environment**
3. Add new variable:

| Key | Value |
|-----|-------|
| `FRONTEND_URL` | `https://bookstore-frontend.onrender.com` |

4. Click **Save Changes**
5. Service will automatically redeploy

---

## ✅ Step 6: Verify Deployment

### 6.1 Test Frontend

1. Visit your frontend URL
2. Check these pages work:
   - Home page loads
   - Books page shows books
   - Can navigate between pages

### 6.2 Test Complete Flow

1. Go to Books page
2. Click "Buy Now" on a book
3. Fill in checkout form
4. Submit and view order summary
5. Click "Pay Now"
6. Complete payment with Razorpay
7. Check success page
8. Verify email received

### 6.3 Check Logs

**Backend Logs:**
1. Go to backend service in Render
2. Click **Logs** tab
3. Check for errors

**Frontend Logs:**
1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for API calls

---

## 🔄 Step 7: CI/CD Pipeline

### 7.1 How It Works

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:

1. **On every push to main:**
   - Runs tests on backend
   - Builds frontend
   - Verifies no errors

2. **Render automatically:**
   - Detects GitHub push
   - Pulls latest code
   - Rebuilds services
   - Deploys new version

### 7.2 Manual Deploy

If needed, you can manually deploy:

1. Go to Render dashboard
2. Select your service
3. Click **Manual Deploy** → **Deploy latest commit**

---

## 📊 Monitoring & Maintenance

### Check Service Health

**Backend:**
```bash
curl https://bookstore-api.onrender.com/api/health
```

**Frontend:**
- Visit your frontend URL
- Check uptime in Render dashboard

### View Metrics

In Render dashboard:
1. Go to your service
2. Click **Metrics** tab
3. See:
   - Response times
   - Memory usage
   - CPU usage
   - Request count

### Free Tier Limitations

⚠️ **Render Free Tier:**
- Services spin down after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- 750 hours/month free (enough for one service 24/7)

**Solutions:**
1. **Upgrade to paid plan** ($7/month)
2. **Use cron job** to keep service awake:
   - Use cron-job.org
   - Ping your API every 10 minutes
3. **Accept the delay** (free tier trade-off)

---

## 🔒 Security Best Practices

### Environment Variables

✅ **Do:**
- Use different Razorpay keys for production
- Mark all secrets as "Secret" in Render
- Use strong MongoDB password
- Use Gmail App Password

❌ **Don't:**
- Commit `.env` files to GitHub
- Share secrets in code or comments
- Use test API keys in production

### Database Security

✅ **Do:**
- Use MongoDB Atlas (encrypted)
- Strong database password
- Keep credentials in environment variables

### API Security

✅ **Do:**
- Enable CORS only for your frontend
- Validate all inputs
- Use HTTPS (automatic on Render)

---

## 🐛 Troubleshooting

### Backend Won't Start

**Check:**
1. Environment variables set correctly?
2. MongoDB connection string correct?
3. All dependencies in package.json?
4. Check Logs tab for errors

### Frontend Shows Blank Page

**Check:**
1. Build succeeded?
2. `VITE_API_URL` set correctly?
3. Browser console for errors?
4. Redirects/Rewrites configured?

### API Calls Failing

**Check:**
1. CORS configuration in backend
2. `FRONTEND_URL` environment variable
3. API URL in frontend config
4. Network tab in browser DevTools

### Database Connection Error

**Check:**
1. MongoDB Atlas cluster running?
2. Network access allows 0.0.0.0/0?
3. Database user created?
4. Connection string correct?
5. Password doesn't contain special characters?

### Payment Not Working

**Check:**
1. Using LIVE Razorpay keys?
2. Razorpay account activated?
3. Webhook URL configured in Razorpay?
4. Check Razorpay dashboard for logs

### Email Not Sending

**Check:**
1. Gmail App Password used (not regular password)?
2. 2-Step Verification enabled?
3. EMAIL_USER and EMAIL_PASSWORD correct?
4. Check backend logs for errors

---

## 💰 Cost Breakdown

### Free Tier (Total: $0/month)

- **Frontend:** Free static site
- **Backend:** Free web service (with sleep)
- **Database:** Free MongoDB Atlas M0 cluster (512MB)
- **GitHub:** Free for public repos
- **Razorpay:** No monthly fee (transaction fees apply)

### Paid Tier (Total: ~$14/month)

- **Frontend:** Free
- **Backend:** $7/month (no sleep, faster)
- **Database:** Free M0 or $9/month for M10
- **Total:** $7-16/month

---

## 🚀 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Database seeded with books
- [ ] Backend deployed to Render
- [ ] Backend environment variables configured
- [ ] Backend health check working
- [ ] Frontend deployed to Render
- [ ] Frontend environment variables configured
- [ ] CORS updated with frontend URL
- [ ] Complete purchase flow tested
- [ ] Payment working with live keys
- [ ] Email notifications working
- [ ] Custom domain configured (optional)

---

## 🎓 Next Steps

### Custom Domain (Optional)

1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Render, go to service → **Settings**
3. Add custom domain
4. Update DNS records as shown
5. SSL certificate auto-provisioned

### Monitoring

1. Set up alerts in Render
2. Use external monitoring (UptimeRobot)
3. Monitor MongoDB Atlas metrics
4. Check Razorpay dashboard regularly

### Scaling

When traffic grows:
1. Upgrade to paid Render plan
2. Use MongoDB Atlas M10+ cluster
3. Add Redis for caching
4. Enable CDN for static assets

---

## 📞 Support Resources

- **Render Docs:** https://render.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **Razorpay:** https://razorpay.com/docs
- **GitHub Actions:** https://docs.github.com/actions

---

## ✨ Summary

Your application is now:
- ✅ Deployed to production
- ✅ Auto-deploying on code changes
- ✅ Using cloud database (MongoDB Atlas)
- ✅ Processing real payments (Razorpay)
- ✅ Sending email notifications
- ✅ Accessible worldwide via HTTPS

**Congratulations! 🎉**

---

Last Updated: February 27, 2026
