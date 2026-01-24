# SEO Architecture Audit - manchesterblockeddrain.co.uk

> **⚠️ LEGACY DOCUMENT** - This audit was created for the previous React/Vite SPA version. The site has since been migrated to **Astro SSG** (Static Site Generation), which provides superior SEO with pre-rendered HTML. Many CSR-specific concerns in this document no longer apply.

**Original Audit Date:** 2025-12-31
**Framework:** ~~React/Vite CSR SPA~~ → **Astro SSG** (migrated Jan 2026)
**Status:** ✅ Google-Compliant

---

## Executive Summary

This is a Client-Side Rendered (CSR) Single Page Application. While Google's crawler executes JavaScript and can index CSR apps, we've implemented multiple layers of SEO best practices to maximize discoverability.

### Key Findings

| Area | Status | Notes |
|------|--------|-------|
| Meta Tags | ✅ Pass | One canonical, title, description per route |
| Internal Linking | ✅ Pass | 35+ anchor links per page |
| noscript Fallback | ✅ Pass | 25+ internal links for non-JS crawlers |
| robots.txt | ✅ Pass | Sitemap referenced, no CSS/JS blocking |
| sitemap.xml | ✅ Pass | 628 lines, all public routes |
| Render-Blocking | ✅ Pass | GA4 deferred, fonts async |
| Font Performance | ✅ Pass | font-display: swap, 2 fonts preloaded |
| Alt Text | ✅ Pass | SiteImage component enforces alt |
| Structured Data | ✅ Pass | LocalBusiness, FAQ, HowTo, Breadcrumb schemas |

---

## 1. CSR SEO Strategy

### The Challenge
CSR apps render content via JavaScript. Non-JS crawlers see only the initial HTML shell.

### Our Solution (Multi-Layer Approach)

```
Layer 1: Google/Bing (JS-capable)
├── react-helmet-async for meta tags
├── JSON-LD structured data
├── sitemap.xml submission
└── Full content rendered by Googlebot

Layer 2: Social Bots (Limited JS)
├── Open Graph meta tags in head
├── Twitter Card meta tags
└── Pre-rendered OG images

Layer 3: Non-JS Crawlers
├── <noscript> with 25+ internal links
├── Basic content visible without JS
└── sitemap.xml discovery

Layer 4: AI/LLM Crawlers
├── llm.html static page
├── robots.txt allows GPTBot, Claude-Web
└── Structured data aids comprehension
```

---

## 2. Meta Tag Architecture

### Implementation
- **Component:** `src/components/seo/RouteSEOHead.tsx`
- **Config:** `src/seo/routeMeta.ts`
- **Provider:** `HelmetProvider` in `src/main.tsx`

### Per-Route Tags Generated
```html
<title>Unique per route (≤60 chars)</title>
<meta name="description" content="Unique per route (140-160 chars)" />
<link rel="canonical" href="https://manchesterblockeddrain.co.uk/path" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="..." />
<meta property="og:image" content="..." />
<meta name="twitter:card" content="summary_large_image" />
```

### Canonical URL Rules
- Homepage: `https://manchesterblockeddrain.co.uk/` (trailing slash)
- All other routes: No trailing slash
- Enforced by `CanonicalNormalizer` in `src/App.tsx`

### Verification
```javascript
// Run in browser console
console.log('Canonicals:', document.querySelectorAll('link[rel="canonical"]').length);
// Expected: 1

console.log('Descriptions:', document.querySelectorAll('meta[name="description"]').length);
// Expected: 1
```

---

## 3. Internal Linking Strategy

### Header Navigation
**File:** `src/components/layout/Header.tsx`

```
Links: /, /services, /locations, /about, /blog, /faq, /contact
Technology: React Router <Link> → renders <a href>
```

### Footer Sitemap
**File:** `src/components/layout/Footer.tsx`

```
Sections:
- Services (6 links)
- Areas (5 location links + 3 Altrincham sub-links)
- Quick Links (7 links)
- Legal (3 links)
Total: ~24 links per page
```

### Breadcrumbs
**File:** `src/components/nav/Breadcrumbs.tsx`

```
All non-home routes have breadcrumbs.
Example: Home > Areas > Altrincham > Blocked Drains
Technology: React Router <Link> → renders <a href>
```

### noscript Fallback
**File:** `index.html` (lines 114-159)

```html
<noscript>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About Us</a>
    <a href="/blog">Blog</a>
    <!-- 25+ more links -->
  </nav>
</noscript>
```

---

## 4. Render-Blocking Analysis

### Scripts
| Script | Loading Method | Blocking? |
|--------|----------------|-----------|
| Main app (`/src/main.tsx`) | `type="module"` | ❌ No (deferred) |
| Google Analytics | User interaction trigger | ❌ No |

### Stylesheets
| CSS | Loading Method | Blocking? |
|-----|----------------|-----------|
| Critical CSS | Inline in `<head>` | ✅ Intentional |
| Tailwind/App CSS | Bundled, async | ❌ No |
| Google Fonts | `media="print"` + `onload` | ❌ No |

### Critical CSS
**Location:** `index.html` lines 31-84

Contains only:
- Reset styles
- Layout utilities (flex, grid)
- Header skeleton
- Hero skeleton

Size: ~2KB (well under 14KB budget)

---

## 5. Font Performance

### Configuration
```html
<!-- Preload critical fonts -->
<link rel="preload" href="...outfit-400.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="...outfit-700.woff2" as="font" type="font/woff2" crossorigin />

<!-- Async font CSS with swap -->
<link href="...&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />
```

### Weights Loaded
- 400 (body text)
- 500 (medium)
- 600 (semibold)
- 700 (bold)
- 800 (extra bold)

### Optimization: Consider reducing to 400, 600, 700 only.

---

## 6. Structured Data

### Schemas Implemented
| Schema | Pages | File |
|--------|-------|------|
| WebSite | Homepage | `src/lib/schema.ts` |
| LocalBusiness | All | `src/lib/schema.ts` |
| Plumber | Services | `src/lib/schema.ts` |
| FAQPage | Homepage, Locations | `src/lib/schema.ts` |
| HowTo | Service pages | `src/lib/schema.ts` |
| BreadcrumbList | All non-home | `src/lib/schema.ts` |
| Review | Homepage | `src/lib/schema.ts` |
| AboutPage | About page | `src/lib/schema.ts` |

### Verification
1. Go to [Rich Results Test](https://search.google.com/test/rich-results)
2. Enter URL
3. Verify all schemas detected

---

## 7. sitemap.xml

**Location:** `/public/sitemap.xml`  
**Lines:** 628 (extensive coverage)

### Structure
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core pages: /, /about, /blog, /contact, /faq, /locations, /services -->
  <!-- Service pages: 6 services + 12 sub-services -->
  <!-- Location pages: 10 locations × 7 services = 70 pages -->
  <!-- Location sub-service pages -->
</urlset>
```

### Priority Distribution
- Homepage: 1.0
- Services/Locations: 0.8-0.9
- Sub-pages: 0.7
- Legal: 0.5

---

## 8. robots.txt

**Location:** `/public/robots.txt`

### Key Directives
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /login

Sitemap: https://manchesterblockeddrain.co.uk/sitemap.xml
Host: https://manchesterblockeddrain.co.uk
```

### CSS/JS Blocking
✅ **None** - All assets allowed for crawlers

---

## 9. Pre-Rendering Options (Optional)

For improved social media previews and AI crawler support:

### Option A: Prerender.io (Legacy - Not needed with Astro)
- Was recommended for CSR apps
- No longer needed - Astro SSG pre-renders all pages
- Social bots now receive full HTML content

### Option B: Cloudflare Worker
- Self-hosted solution
- Requires setup

See `docs/prerendering.md` for implementation details.

---

## 10. Verification Checklist

### Console Commands
```javascript
// Link count (should be >30)
console.log('Links:', document.querySelectorAll('a[href]').length);

// Canonical uniqueness (should be 1)
console.log('Canonicals:', document.querySelectorAll('link[rel="canonical"]').length);

// Description uniqueness (should be 1)
console.log('Descriptions:', document.querySelectorAll('meta[name="description"]').length);

// Title check
console.log('Title:', document.title);

// Structured data check
console.log('Schemas:', document.querySelectorAll('script[type="application/ld+json"]').length);
```

### URL Tests
```bash
# robots.txt accessible
curl -I https://manchesterblockeddrain.co.uk/robots.txt
# Should return 200

# sitemap.xml accessible
curl -I https://manchesterblockeddrain.co.uk/sitemap.xml
# Should return 200

# Canonical in response
curl -s https://manchesterblockeddrain.co.uk/ | grep 'rel="canonical"'
```

### Google Tools
1. [URL Inspection Tool](https://search.google.com/search-console) - Verify rendering
2. [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) - Check mobile
3. [Rich Results Test](https://search.google.com/test/rich-results) - Verify schemas
4. [PageSpeed Insights](https://pagespeed.web.dev/) - Check performance

---

## 11. Known Limitations (CSR)

### What Works
- ✅ Googlebot renders full content
- ✅ Meta tags visible to all crawlers via react-helmet
- ✅ sitemap.xml provides URL discovery
- ✅ Structured data in rendered HTML

### What Requires Extra Handling
- ⚠️ Facebook/Twitter previews need prerendering for dynamic content
- ⚠️ Some AI crawlers may not execute JS fully
- ⚠️ Bing's JS rendering is inconsistent

### Mitigations In Place
- Static OG images in `/public/og/`
- noscript fallback with link list
- llm.html static page for AI crawlers

---

## 12. Maintenance Tasks

### Weekly
- [ ] Check GSC Coverage report for errors
- [ ] Review Core Web Vitals

### Monthly
- [ ] Update sitemap.xml if new pages added
- [ ] Check for broken internal links
- [ ] Review Rich Results eligibility

### Quarterly
- [ ] Audit structured data accuracy
- [ ] Review keyword rankings
- [ ] Update meta descriptions for underperforming pages

---

## Conclusion

This CSR SPA is **Google-compliant** with comprehensive SEO implementation:

1. **Discoverable:** sitemap.xml, robots.txt, internal linking
2. **Indexable:** Proper meta tags, canonicals, no blocking
3. **Rich:** Structured data for enhanced SERP display
4. **Performant:** Deferred scripts, optimized fonts, critical CSS

For social media and AI crawler optimization, consider adding Prerender.io.
