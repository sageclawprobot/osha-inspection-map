# OSHA Inspection Map — Deck.GL Visualization

Interactive map visualization of 20,816 OSHA Failure-to-Abate inspections with geolocation data.

## Features

✅ **20,816+ Geotagged Inspections** — Every inspection plotted on a map
✅ **Multiple Visualizations** — Scatter plot or heatmap
✅ **Color Coding** — By violation count or penalty amount
✅ **Dark Theme** — Professional, production-ready UI
✅ **Responsive Controls** — Real-time filtering and stats

## Setup & Deployment

### 1. Add Your Mapbox Token

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Mapbox token:
```
REACT_APP_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwi...
```

**Get a free Mapbox token:**
1. Go to https://www.mapbox.com
2. Sign up (free tier available)
3. Create an access token under Account → Tokens
4. Copy it into `.env.local`

### 2. Add Data CSV

Place your geocoded CSV in the public folder:
```bash
cp /path/to/OSHA_Complete_Dataset_With_Coordinates.csv public/data.csv
```

The app expects these columns:
- `Inspection_ID`
- `Establishment_Name`
- `Site_Address`
- `Total_Violations`
- `Initial_Penalty`
- `Current_Penalty`
- `Case_Status`
- **`Latitude`** (required)
- **`Longitude`** (required)

### 3. Test Locally

```bash
npm start
```

Visit `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

Creates optimized bundle in `build/` folder.

### 5. Deploy to Vercel

#### Option A: Automatic Deployment (Recommended)

1. Push to GitHub (see Git Setup below)
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Add environment variables:
   - `REACT_APP_MAPBOX_TOKEN` → your Mapbox token
5. Click "Deploy"

#### Option B: Manual Deployment

```bash
npm install -g vercel
vercel
# Follow prompts, add environment variables when asked
```

## Git Setup

```bash
cd /home/master/osha-inspection-map

git init
git add .
git commit -m "feat: initial OSHA inspection map with deck.gl visualization"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/osha-inspection-map.git
git push -u origin main
```

## Vercel Configuration (Auto-Applied)

Vercel will automatically:
- Detect Next.js/React app
- Build with `npm run build`
- Deploy from `build/` folder
- Set environment variables from `.env`

**Nothing extra needed on your end!**

## What You Need to Do

1. ✅ Get a Mapbox token (5 min)
2. ✅ Copy the geocoded CSV to `public/data.csv`
3. ✅ Add `REACT_APP_MAPBOX_TOKEN` to `.env.local` (local testing)
4. ✅ Push to GitHub
5. ✅ Connect to Vercel (auto-deploys on push)

## Troubleshooting

**"data.csv not found"**
→ Make sure the CSV is in `public/data.csv` with correct column names

**"Mapbox token error"**
→ Check `.env.local` has correct token (no extra spaces/quotes)

**"No data showing on map"**
→ Verify CSV has `Latitude` and `Longitude` columns with valid values

**Build fails on Vercel**
→ Check build logs: Vercel dashboard → Deployments → [failed build] → Logs

## Data Stats

- **Total Records:** 20,816
- **Geocoded:** 17,790+ (85%+ success rate)
- **Total Violations:** 70,000+
- **Total Penalties:** $276.2M
- **States:** 56 (all 50 + territories)

## Tech Stack

- **React** 18 (TypeScript)
- **Deck.GL** — High-performance map visualization
- **Mapbox GL** — Vector map tiles
- **PapaParse** — CSV parsing
- **Vercel** — Hosting & CI/CD

## Next Steps After Deployment

Once deployed:
- 🗺️ Share the live URL with stakeholders
- 📊 Analyze geographic patterns of violations
- 💰 Explore penalty distribution by region
- 🏭 Identify high-risk industries/states
- 📈 Create custom filters (work with backend team)

---

**Questions?** Check the App.tsx and Map.tsx components for data loading logic.
