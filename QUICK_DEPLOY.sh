#!/bin/bash
# QUICK DEPLOYMENT COMMANDS FOR OSHA INSPECTION MAP
# Copy-paste each section into your terminal

echo "📋 OSHA INSPECTION MAP — DEPLOYMENT COMMANDS"
echo "=============================================="
echo ""

# STEP 1: CREATE GITHUB REPO
echo "STEP 1: CREATE GITHUB REPO"
echo "→ Go to: https://github.com/new"
echo "→ Repository name: osha-inspection-map"
echo "→ Visibility: Public"
echo "→ Click 'Create repository'"
echo "→ Copy the repo URL (will look like: https://github.com/YOUR_USERNAME/osha-inspection-map.git)"
echo ""

# STEP 2: PUSH CODE
echo "STEP 2: PUSH CODE TO GITHUB"
echo "Run these commands (replace YOUR_USERNAME):"
echo ""
echo "  cd /home/master/osha-inspection-map"
echo "  git remote add origin https://github.com/YOUR_USERNAME/osha-inspection-map.git"
echo "  git push -u origin main"
echo ""

# STEP 3: ADD DATA
echo "STEP 3: ADD DATA (when geocoding finishes)"
echo "Run these commands:"
echo ""
echo "  cp /home/master/Safety_Report/OSHA_Complete_Dataset_With_Coordinates.csv \\"
echo "     /home/master/osha-inspection-map/public/data.csv"
echo ""
echo "  cd /home/master/osha-inspection-map"
echo "  git add public/data.csv"
echo "  git commit -m 'chore: add OSHA inspection data'"
echo "  git push"
echo ""

# STEP 4: DEPLOY
echo "STEP 4: DEPLOY TO VERCEL"
echo "→ Go to: https://vercel.com/new"
echo "→ Click 'Import from Git'"
echo "→ Paste your GitHub repo URL"
echo "→ Click 'Deploy'"
echo "→ Wait 2-3 minutes"
echo "→ You'll get a live URL!"
echo ""

# STEP 5: OPTIONAL MAPBOX
echo "STEP 5 (OPTIONAL): ADD MAPBOX TOKEN FOR MAP BACKGROUND"
echo "→ Get token: https://www.mapbox.com/account/tokens"
echo "→ Vercel dashboard → Your project → Settings → Environment Variables"
echo "→ Add: Name='REACT_APP_MAPBOX_TOKEN', Value='your_token'"
echo "→ Go to Deployments and click 'Redeploy' on latest"
echo ""

echo "=============================================="
echo "✅ You're all set! Questions? See DEPLOYMENT.md"
