# SEO Verification Guide

## 1. Quick URL Checks

Test these URLs return HTTP 200:
- [ ] https://manchesterblockeddrain.co.uk/robots.txt
- [ ] https://manchesterblockeddrain.co.uk/sitemap.xml
- [ ] https://manchesterblockeddrain.co.uk/llm.html

## 2. Browser Console Checks

Run these commands in browser DevTools (Console tab) on each route:

### Check Title
```javascript
document.title
```

### Check Meta Description
```javascript
document.querySelector('meta[name="description"]')?.content
```

### Check Canonical URL
```javascript
document.querySelector('link[rel="canonical"]')?.href
```

### Check Robots Meta
```javascript
document.querySelector('meta[name="robots"]')?.content
```

### Count Tags (should be exactly 1)
```javascript
// Description count
document.querySelectorAll('meta[name="description"]').length

// Canonical count
document.querySelectorAll('link[rel="canonical"]').length

// Title count (in <head>)
document.querySelectorAll('head title').length
```

### Check Open Graph Tags
```javascript
document.querySelector('meta[property="og:title"]')?.content
document.querySelector('meta[property="og:description"]')?.content
document.querySelector('meta[property="og:url"]')?.content
document.querySelector('meta[property="og:image"]')?.content
```

### Check Twitter Card Tags
```javascript
document.querySelector('meta[name="twitter:card"]')?.content
document.querySelector('meta[name="twitter:title"]')?.content
```

## 3. Expected Results

| Check | Expected Result |
|-------|-----------------|
| Title | Unique per route, under 60 chars, keyword near start |
| Description | Unique per route, 140-160 chars |
| Canonical | Matches current route URL (no trailing slash except /) |
| Robots | "index, follow" for public pages; "noindex, follow" for utility pages |
| Description count | Exactly 1 |
| Canonical count | Exactly 1 |
| OG:URL | Matches canonical URL |

## 4. Routes to Verify

### Priority Routes (must verify)
1. `/` - Homepage
2. `/services/blocked-drains` - Service page
3. `/locations` - Location hub
4. `/locations/manchester/drain-jetting` - Deep location+service page
5. `/contact` - Contact page

### Additional Routes (spot check)
- `/about`
- `/faq`
- `/blog`
- `/services/cctv-drain-surveys/pre-purchase-survey` - Sub-service page
- `/locations/salford` - Location detail page

## 5. NoIndex Routes

These routes should have `noindex, follow`:
- `/admin` and `/admin/*`
- `/login`
- `/reset-password`

These routes are NOT in the sitemap.

## 6. Canonical URL Rules

| Route | Canonical URL |
|-------|---------------|
| Homepage | `https://manchesterblockeddrain.co.uk/` |
| Services | `https://manchesterblockeddrain.co.uk/services` |
| Locations | `https://manchesterblockeddrain.co.uk/locations` |
| Location detail | `https://manchesterblockeddrain.co.uk/locations/manchester` |

## 7. Structured Data Test

Use Google's Rich Results Test:
https://search.google.com/test/rich-results

Test these pages:
- Homepage (LocalBusiness schema)
- FAQ page (FAQPage schema)
- Service pages (Service schema)

## 8. Mobile-Friendly Test

Use Google's Mobile-Friendly Test:
https://search.google.com/test/mobile-friendly
