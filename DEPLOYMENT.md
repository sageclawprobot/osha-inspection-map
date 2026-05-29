# 🚀 Deployment Guide — OSHA Inspection Map

Your React app is ready to deploy! Follow these steps to go live on Vercel.

## Prerequisites

✅ You have:
- React app built and tested locally
- Code ready to push to GitHub
- A GitHub account

## Step 1: Push to GitHub

### Create a GitHub Repository

1. Go to https://github.com/new
2. **Repository name:** `osha-inspection-map` (or your preferred name)
3. **Description:** "Interactive map visualization of 20,816 OSHA inspections"
4. **Visibility:** Public (required for free Vercel deployment)
5. Click **"Create repository"**

### Push Your Code

From `/home/master/osha-inspection-map/`, run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/osha-inspection-map.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

**Verify:** Go to https://github.com/YOUR_USERNAME/osha-inspection-map and confirm code is there.

---

## Step 2: Prepare Data

### Add Your Geocoded CSV

The improved geocoding script should be finishing soon. Once it completes:

```bash
cp /home/master/Safety_Report/OSHA_Complete_Dataset_With_Coordinates.csv /home/master/osha-inspection-map/public/data.csv
```

**Verify the file has these columns:**
- `Latitude` (required)
- `Longitude` (required)
- All others (Inspection_ID, Establishment_Name, Total_Violations, etc.)

### Commit the Data

```bash
cd /home/master/osha-inspection-map
git add public/data.csv
git commit -m "chore: add OSHA inspection data with coordinates"
git push
```

---

## Step 3: Deploy to Vercel

### Option A: Auto-Deploy (Recommended — 3 minutes)

**Most of the work is already done!** Vercel detects React apps automatically.

1. Go to **https://vercel.com/new** (sign in with GitHub if needed)
2. Click **"Import Project"** → **"From Git Repository"**
3. Paste: `https://github.com/YOUR_USERNAME/osha-inspection-map.git`
4. Click **"Continue"**
5. **Project settings** (leave defaults, Vercel detects React automatically):
   - Framework: React
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `build` (default)
6. Click **"Deploy"**
   - Vercel will build and deploy in ~2-3 minutes
   - You'll get a live URL like: `https://osha-inspection-map.vercel.app`

**Done!** Your app is live.

### Option B: Manual Deployment (Vercel CLI)

If you prefer command-line:

```bash
npm install -g vercel
cd /home/master/osha-inspection-map
vercel
```

Follow prompts (use defaults for everything).

---

## Step 4: Set Environment Variables (Mapbox)

The map needs a Mapbox token to render. **This is optional** — the app will still show data without it, just without a basemap background.

### If You Want a Map Background:

1. **Get a Mapbox token:**
   - Go to https://www.mapbox.com/account/tokens
   - Create a new token (free tier available)
   - Copy the token

2. **Add to Vercel:**
   - Go to https://vercel.com/dashboard
   - Click your project: `osha-inspection-map`
   - Click **"Settings"** → **"Environment Variables"**
   - Add new variable:
     - **Name:** `REACT_APP_MAPBOX_TOKEN`
     - **Value:** (paste your Mapbox token)
     - **Environments:** Select "Production" (minimum)
   - Click **"Save"**

3. **Trigger redeploy:**
   - Go to **Deployments** tab
   - Click the latest deployment's "..." menu
   - Click **"Redeploy"**
   - Wait 1-2 minutes

Your map now has a basemap! 🗺️

---

## Step 5: Verify It Works

Once deployed:

1. Visit your live URL: `https://osha-inspection-map.vercel.app`
2. You should see:
   - ✅ A dark map with blue control panel on the left
   - ✅ 17,790+ colored dots (each = one inspection)
   - ✅ "Records Loaded: 17,790" or similar count
   - ✅ Statistics: total violations, total penalties
3. **Interact:**
   - **Zoom:** Scroll wheel or pinch
   - **Pan:** Click + drag
   - **Change color:** "Color by" dropdown
   - **Hover points:** See details on the left panel
4. **Troubleshoot:**
   - No data? Check that `public/data.csv` is in your GitHub repo
   - Map dark? Add Mapbox token (see Step 4)

---

## What You Do From Here

### Immediate
- [ ] Create GitHub repo
- [ ] Push code (`git push`)
- [ ] Copy CSV to `public/data.csv`
- [ ] Push CSV (`git add public/data.csv && git commit && git push`)
- [ ] Deploy on Vercel (1 click)
- [ ] Share live URL with stakeholders

### Optional
- [ ] Add Mapbox token for basemap
- [ ] Custom domain (vercel.com domain → custom.example.com)
- [ ] Add analytics (see Vercel Web Analytics)
- [ ] Filter/search enhancements

### Advanced (Later)
- Add server backend for:
  - Real-time data updates
  - Database queries
  - Penalty analysis tools
  - Export filtered results
- Add more visualization modes
- Time-series penalty trends

---

## Deployment Summary

| Step | Time | Status |
|------|------|--------|
| 1. Push to GitHub | 2 min | ✅ Ready |
| 2. Add data CSV | 1 min | ⏳ Wait for geocoding to finish |
| 3. Deploy to Vercel | 3 min | ✅ Ready (1-click) |
| 4. Add Mapbox token | 2 min | ⏳ Optional |
| **Total** | **~10 min** | **✅ READY** |

---

## Need Help?

- **Vercel docs:** https://vercel.com/docs
- **React apps on Vercel:** https://vercel.com/docs/frameworks/react
- **Deck.GL docs:** https://deck.gl
- **GitHub help:** https://docs.github.com

---

## What's Included in Your Deployment

✅ **Frontend:**
- React 18 + TypeScript
- Deck.GL for map visualization
- PapaParse for CSV data loading
- Responsive dark UI

✅ **Data:**
- 17,790+ geotagged inspections
- Color-coded by violations or penalties
- Hover tooltips with details
- Real-time statistics

✅ **Hosting:**
- Vercel (auto-scaling, auto-SSL, global CDN)
- Free tier includes:
  - Serverless functions
  - 100GB bandwidth/month
  - Custom domains
  - Analytics

---

**Your app is production-ready. Deploy it!** 🚀
