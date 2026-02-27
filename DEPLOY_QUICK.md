# 🚀 Quick Deploy to Render

## Fast Track (10 Minutes)

### 1️⃣ Setup MongoDB Atlas (3 min)
```
1. Go to mongodb.com/atlas → Sign up
2. Create FREE cluster (M0)
3. Add Database User (save password!)
4. Allow IP: 0.0.0.0/0
5. Get connection string:
   mongodb+srv://user:password@cluster.mongodb.net/bookstore
```

### 2️⃣ Push to GitHub (2 min)
```bash
git init
git add .
git commit -m "Deploy to Render"
git remote add origin https://github.com/yourusername/bookstore.git
git push -u origin main
```

### 3️⃣ Deploy Backend (3 min)
```
1. Go to render.com → Sign up with GitHub
2. New + → Web Service
3. Connect your repo
4. Settings:
   - Name: bookstore-api
   - Build: cd server && npm install
   - Start: cd server && npm start
   
5. Environment Variables:
   MONGODB_URI=mongodb+srv://...
   RAZORPAY_KEY_ID=rzp_live_...
   RAZORPAY_SECRET=...
   EMAIL_USER=your@gmail.com
   EMAIL_PASSWORD=app_password
   NODE_ENV=production
   
6. Create Web Service
7. Copy your API URL (e.g., https://bookstore-api.onrender.com)
```

### 4️⃣ Deploy Frontend (2 min)
```
1. New + → Static Site
2. Connect same repo
3. Settings:
   - Name: bookstore-frontend
   - Build: npm install && npm run build
   - Publish: dist
   
4. Environment Variables:
   VITE_API_URL=https://bookstore-api.onrender.com/api
   
5. Redirects/Rewrites:
   /* /index.html 200
   
6. Create Static Site
```

### 5️⃣ Test Your App
```
Visit your frontend URL
Test complete purchase flow
Check email notifications
```

---

## 📋 Environment Variables Checklist

### Backend (render.com → bookstore-api → Environment)
- [ ] `PORT` = `5000`
- [ ] `NODE_ENV` = `production`
- [ ] `MONGODB_URI` = `mongodb+srv://...` (from Atlas)
- [ ] `RAZORPAY_KEY_ID` = `rzp_live_...` (from Razorpay)
- [ ] `RAZORPAY_SECRET` = `...` (from Razorpay)
- [ ] `EMAIL_HOST` = `smtp.gmail.com`
- [ ] `EMAIL_PORT` = `587`
- [ ] `EMAIL_USER` = `your@gmail.com`
- [ ] `EMAIL_PASSWORD` = `...` (Gmail App Password)

### Frontend (render.com → bookstore-frontend → Environment)
- [ ] `VITE_API_URL` = `https://YOUR-BACKEND-URL.onrender.com/api`

---

## 🔑 Get Your Credentials

### MongoDB Atlas
1. mongodb.com/atlas → Create cluster
2. Database Access → Add user → Save password
3. Network Access → Add IP → 0.0.0.0/0
4. Connect → Get connection string

### Razorpay (LIVE Keys)
1. razorpay.com → Sign in
2. Settings → API Keys
3. Generate LIVE Keys (not test!)
4. Copy Key ID and Secret

### Gmail App Password
1. myaccount.google.com
2. Security → 2-Step Verification (enable)
3. Security → App Passwords
4. Generate for "Mail"
5. Copy 16-character password

---

## 🎯 After Deployment

### Update Backend with Frontend URL
1. Go to backend service
2. Environment → Add:
   `FRONTEND_URL` = `https://YOUR-FRONTEND-URL.onrender.com`
3. Save (auto-redeploys)

### Test Everything
- [ ] Home page loads
- [ ] Books display from database
- [ ] Checkout form works
- [ ] Payment processes (use real card or test mode)
- [ ] Email received
- [ ] Success page shows

---

## 🐛 Common Issues

**"Service Unavailable"**
→ Wait 30-60 seconds (free tier wakes up)

**"CORS Error"**  
→ Add FRONTEND_URL to backend env vars

**"Cannot connect to database"**
→ Check MongoDB Atlas IP whitelist (0.0.0.0/0)

**"Payment not working"**
→ Use LIVE Razorpay keys, not test keys

**"No email received"**
→ Use Gmail App Password, not regular password

---

## 📊 Your URLs

After deployment, save these:

```
Frontend: https://bookstore-frontend.onrender.com
Backend:  https://bookstore-api.onrender.com
Health:   https://bookstore-api.onrender.com/api/health
Books:    https://bookstore-api.onrender.com/api/books
```

---

## 💡 Pro Tips

1. **Keep Services Awake** (Free Tier)
   - Use cron-job.org
   - Ping /api/health every 10 minutes

2. **Monitor Logs**
   - Render Dashboard → Logs tab
   - Check for errors

3. **Auto-Deploy**
   - Push to GitHub = Auto-deploy
   - No manual steps needed!

4. **Custom Domain** (Optional)
   - Buy domain
   - Add in Render settings
   - Update DNS

---

## ✅ Success Checklist

- [ ] GitHub repo created and pushed
- [ ] MongoDB Atlas cluster running
- [ ] Backend deployed on Render
- [ ] All backend env vars configured
- [ ] Frontend deployed on Render
- [ ] Frontend env var (VITE_API_URL) set
- [ ] FRONTEND_URL added to backend
- [ ] Health check returns OK
- [ ] Books API returns data
- [ ] Complete purchase tested
- [ ] Payment successful
- [ ] Email received

**All checked? You're live! 🎉**

---

For detailed instructions, see: **RENDER_DEPLOYMENT.md**
