# Quick Start - Live Doctor Scraping

## What's New
Your doctors page now:
- ✅ Scrapes **live data** from Marham.pk and Oladoc.com
- ✅ Shows **real doctor images** from websites
- ✅ Loads data with **infinite pagination** (no loading all at once)
- ✅ Caches data in database for speed
- ✅ Auto-refreshes when needed

## How to Use

### 1. Install Dependencies (first time only)
```bash
pip install requests beautifulsoup4
```

### 2. Initialize Database (first time only)
```bash
npx prisma migrate dev
```

### 3. Start the App
```bash
npm run dev
```

### 4. Visit Doctors Page
```
http://localhost:3000/doctors
```

That's it! The page will:
1. Load first 24 doctors from Marham.pk & Oladoc.com
2. Show real images from the websites
3. Allow infinite scroll to load more
4. Display "Refresh" button to get latest data

## What Gets Scraped
- **Marham.pk**: Doctors from Lahore (all specialties)
- **Oladoc.com**: Gynecologists from Lahore
- **Real Images**: Profile photos from both sites
- **Info**: Name, specialty, experience, fees, hospital, phone

## How Infinite Scroll Works
```
User scrolls down
    ↓
Page auto-loads next 24 doctors
    ↓
Scroll more → Load more doctors
    ↓
Keep going until end of list
```

## Performance
- **First load**: 30-60 seconds (scrapes from websites)
- **After that**: Instant (uses database cache)
- **Manual refresh**: 30-60 seconds

## Files Changed
1. `scripts/scrape_doctors.py` - New dual-site scraper
2. `src/app/api/scraping/doctors/route.ts` - Enhanced API
3. `src/app/doctors/page.tsx` - Already has infinite scroll

## Troubleshooting

**Problem**: Images not showing
**Solution**: Check browser console, reload page

**Problem**: Takes forever to load
**Solution**: First load is normal (30-60s), then it's fast

**Problem**: No doctors showing
**Solution**: 
```bash
# Test scraper
python scripts/scrape_doctors.py | wc -l
# Should return a number > 0

# Reset database
npx prisma db reset
```

## API Endpoint
```
GET /api/scraping/doctors
  ?page=1           # Page number
  &limit=24         # Items per page
  &specialty=       # Filter (optional)
  &location=        # Filter (optional)
  &refresh=true     # Force live scrape (optional)
```

Example:
```
/api/scraping/doctors?page=1&limit=24
/api/scraping/doctors?page=2&limit=24&location=Lahore
/api/scraping/doctors?refresh=true
```

Response includes:
```json
{
  "doctors": [...],
  "page": 1,
  "total": 87,
  "hasMore": true,
  "source": "database"
}
```

## Configuration
Edit these files to customize:

### More doctors per page
`src/app/doctors/page.tsx`:
```typescript
limit: '48'  // Changed from 24
```

### Auto-scrape threshold
`src/app/api/scraping/doctors/route.ts`:
```typescript
if (dbDoctors.length < 30) {  // Changed from 20
```

### Increase max pagination
`scripts/scrape_doctors.py`:
```python
while len(doctors) < limit and page <= 10:  # Was 5
```

### Add more specialties
`scripts/scrape_doctors.py`:
```python
def main():
    marham = fetch_marham_doctors('lahore', 50)
    oladoc1 = fetch_oladoc_doctors('gynecologist', 50)
    oladoc2 = fetch_oladoc_doctors('cardiologist', 50)  # Add
    # Combine all
```

## Next Steps
1. Run the app and test the doctors page
2. Try scrolling to see infinite pagination
3. Click refresh to get latest data
4. Check browser DevTools → Network to see API calls

## Questions?
See `LIVE_SCRAPING_GUIDE.md` for detailed documentation.
