# Live Doctor Scraping with Infinite Pagination

## Overview

Your Patient Booking app now scrapes live doctor data from **Marham.pk** and **Oladoc.com** with real images and supports infinite pagination to load data progressively.

## Features Implemented

### ✅ Dual-Source Web Scraping
- **Marham.pk**: Scrapes doctors from Lahore specialists
- **Oladoc.com**: Scrapes from Lahore gynecologists
- Both sites are scraped with pagination (up to 5 pages each)
- Real doctor images extracted from both websites
- Fallback to AI-generated avatars if images unavailable

### ✅ Infinite Pagination
- Loads data one page at a time (24 doctors per page by default)
- No need to wait for all data upfront
- New results load as user scrolls
- Supports up to 150+ doctors total

### ✅ Smart Database Caching
- Stores scraped doctors in SQLite database
- Auto-refreshes when database is low (<20 doctors)
- Reduces API calls with intelligent caching
- Supports manual refresh button

### ✅ Real Images from Websites
- Extracts actual doctor photos from Marham.pk profile pages
- Extracts doctor images from Oladoc.com profiles
- Falls back to generated avatars gracefully
- All images properly cached and served

## How It Works

### 1. **Initial Load**
```
User opens /doctors page
   ↓
Frontend fetches: GET /api/scraping/doctors?page=1&limit=24
   ↓
API checks database (has 20+ doctors?)
   ↓
If NO: Scrapes 150 doctors from both sites → Stores in DB
   ↓
Returns paginated results with hasMore=true
```

### 2. **Infinite Scroll**
```
User scrolls to bottom of page
   ↓
IntersectionObserver detects target element
   ↓
Frontend fetches next page: ?page=2&limit=24
   ↓
API retrieves from cached database
   ↓
Results appended to list, hasMore updated
   ↓
User can keep scrolling...
```

### 3. **Manual Refresh**
```
User clicks "↻ Refresh" button
   ↓
Frontend fetches: ?refresh=true
   ↓
API scrapes fresh data from websites
   ↓
Updates database, returns latest doctors
```

## API Endpoint Details

### GET `/api/scraping/doctors`

**Query Parameters:**
```javascript
{
  page: 1,           // Page number (1-indexed)
  limit: 24,         // Items per page (max 100)
  specialty: '',     // Filter by specialty (e.g., "Gynecology")
  location: '',      // Filter by location (e.g., "Lahore")
  refresh: false,    // Force live scraping
  delay: 500         // Delay before scraping (ms)
}
```

**Response:**
```json
{
  "success": true,
  "count": 24,              // Items in current page
  "total": 87,              // Total items available
  "page": 1,
  "limit": 24,
  "hasMore": true,          // More pages available?
  "doctors": [...],         // Array of doctor objects
  "source": "database",     // "database" or "live-scraper" or "fallback"
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Doctor Object:**
```json
{
  "id": "abc123def456",
  "name": "Dr. Ahmed Hassan",
  "specialization": "Cardiology",
  "experience": 12,
  "rating": 4.8,
  "consultationFee": 2500,
  "consultationCurrency": "PKR",
  "location": "Lahore, Pakistan",
  "hospital": "Shaukat Khanum Memorial Hospital",
  "phone": "+92-42-35905000",
  "imageUrl": "https://marham.pk/images/doctor-photo.jpg",
  "source": "Marham.pk (Live)",
  "profileUrl": "https://www.marham.pk/doctors/lahore/cardiology/dr-ahmed-hassan",
  "scrapedAt": "2024-01-15T10:00:00Z"
}
```

## Python Scraper Details

**Location:** `scripts/scrape_doctors.py`

### Functions:

#### Marham.pk Scraping
```python
fetch_marham_doctors(city='lahore', limit=50)
  └─ fetch_marham_profile(profile_url)
      └─ extract_marham_doctor_image(html)
```

#### Oladoc.com Scraping  
```python
fetch_oladoc_doctors(specialty='gynecologist', limit=50)
  └─ fetch_oladoc_profile(profile_url)
      └─ extract_oladoc_doctor_image(html)
```

#### Main Entry
```python
scrape_doctors(limit=None)  # Returns list of all doctors
```

### Configuration:
```python
REQUEST_DELAY = 0.5           # Delay between requests (500ms)
MAX_TOTAL_DOCTORS = 200       # Max doctors to scrape
MARHAM_BASE_URL = "https://www.marham.pk"
OLADOC_BASE_URL = "https://oladoc.com"
```

## Installation & Setup

### 1. Install Required Packages
```bash
pip install requests beautifulsoup4
```

### 2. Set Database Environment
```bash
# .env.local
DATABASE_URL="file:./prisma/dev.db"
```

### 3. Initialize Database
```bash
npx prisma migrate dev
```

### 4. Test Scraper
```bash
python scripts/scrape_doctors.py | head -50
# Should return JSON array of doctors
```

### 5. Run the App
```bash
npm run dev
```

Visit: `http://localhost:3000/doctors`

## Customization

### Modify Scraping Limits
Edit `scripts/scrape_doctors.py`:
```python
# Increase max pages to scrape
def fetch_marham_doctors(city='lahore', limit=100):  # Changed from 50
```

### Change Auto-Scrape Threshold
Edit `src/app/api/scraping/doctors/route.ts`:
```typescript
if (dbDoctors.length < 30) {  // Changed from 20
  // Auto-scrape
}
```

### Adjust Pagination Limit
Edit `src/app/doctors/page.tsx`:
```typescript
limit: '48',  // Changed from '24'
```

### Add More Specialties
Edit `scripts/scrape_doctors.py`:
```python
# In fetch_oladoc_doctors(), add specialties:
specialties = ['gynecologist', 'cardiologist', 'dermatologist']
for specialty in specialties:
    doctors.extend(fetch_oladoc_doctors(specialty))
```

## Troubleshooting

### Images Not Loading
- Check browser console for CORS errors
- Verify website URLs still work (sites may change)
- Images require `https://` URLs (not `http://`)

### Scraping Timeout
- Increase delay in API: `?delay=2000`
- Reduce limit: `?limit=12`
- Websites may be rate-limiting requests

### No Doctors Found
- Check network in browser DevTools
- Verify Python can reach websites:
  ```bash
  python -c "import requests; print(requests.get('https://www.marham.pk/doctors/lahore').status_code)"
  ```
- Clear database and retry: `npx prisma db reset`

### Database Issues
- Reset: `npx prisma db reset`
- Check file permissions on `prisma/dev.db`
- Verify `DATABASE_URL` in `.env.local`

## Performance Tips

1. **First Load**: Takes 30-60 seconds to scrape 100+ doctors
2. **Subsequent Loads**: Instant (cached in DB)
3. **Manual Refresh**: 30-60 seconds to scrape fresh data
4. **Pagination**: <100ms per page after first load

## Limitations

- Marham.pk & Oladoc.com may block excessive requests
- Website HTML structure changes break selectors
- Real images depend on website availability
- Pagination limited to 5 pages per source (customize as needed)

## Future Improvements

- [ ] Multi-city scraping (currently Lahore only)
- [ ] Multi-specialty support
- [ ] Advanced filtering by ratings/fees
- [ ] Doctor availability/booking integration
- [ ] Phone/email verification
- [ ] Image caching/CDN storage

## Support

For issues:
1. Check console logs: `scripts/scrape_doctors.py` stderr output
2. Verify network requests in DevTools
3. Test scraper directly: `python scripts/scrape_doctors.py`
4. Check database: `npx prisma studio`
