import { BRAND } from "@/config/brand";
import { getServiceBySlug, getSubServiceBySlug } from "@/config/services";
import { getLocationBySlug } from "@/config/locations";

const BASE_URL = `https://${BRAND.domain}`;
const PHONE_DISPLAY = "0333 880 2296";

// Normalize slug to human-readable title case
export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Normalize path: no trailing slash except homepage
export function normalizeCanonicalPath(path: string): string {
  if (path === "/" || path === "") return "/";
  return path.replace(/\/+$/, "");
}

// Get canonical URL: no trailing slash except homepage
export function getCanonicalUrl(pathname: string): string {
  const normalizedPath = normalizeCanonicalPath(pathname);
  // Homepage gets trailing slash for consistency with domain
  if (normalizedPath === "/") return `${BASE_URL}/`;
  return `${BASE_URL}${normalizedPath}`;
}

// Routes that should never be indexed
const NOINDEX_ROUTES = [
  "/admin",
  "/login",
  "/reset-password",
  "/auth",
  "/dashboard",
];

export function shouldNoIndex(pathname: string): boolean {
  const normalizedPath = pathname.toLowerCase();
  return NOINDEX_ROUTES.some(
    (route) => normalizedPath === route || normalizedPath.startsWith(`${route}/`)
  );
}

export interface SEOMeta {
  title: string;
  description: string;
  canonicalUrl: string;
  noIndex: boolean;
  ogImage?: string;
}

export interface RouteParams {
  locationSlug?: string;
  serviceSlug?: string;
  subServiceSlug?: string;
  slug?: string; // for blog posts
}

// Custom SEO for specific service pages
const SERVICE_SEO: Record<string, { title: string; description: string }> = {
  "blocked-drains": {
    title: "Blocked Drains Manchester | 24/7 Drain Clearing",
    description: "Fast blocked drain clearance in Manchester. Our local engineers use professional equipment to clear all blockages. No call-out fee, fixed prices. Call now.",
  },
  "drain-unblocking": {
    title: "Drain Unblocking Manchester | Sinks, Toilets & Baths",
    description: "Expert drain unblocking across Manchester. We clear blocked sinks, toilets, baths, and showers fast. No call-out charges, fixed pricing guaranteed.",
  },
  "cctv-drain-surveys": {
    title: "CCTV Drain Surveys Manchester | HD Camera Inspections",
    description: "Professional CCTV drain surveys in Manchester with detailed video reports. Identify blockages, damage, and root ingress accurately. Book your survey today.",
  },
  "drain-jetting": {
    title: "Drain Jetting Manchester | High-Pressure Cleaning",
    description: "Powerful high-pressure drain jetting in Manchester. Clears stubborn blockages, fat buildup, and debris. Safe for all pipe types. Book your service now.",
  },
  "emergency-drain-services": {
    title: "Emergency Drains Manchester | 24/7 Callouts",
    description: "24/7 emergency drain services across Manchester. Rapid response to flooding, sewage backups, and urgent blockages. Call us day or night.",
  },
};

// Custom SEO for specific sub-service pages
const SUBSERVICE_SEO: Record<string, { title: string; description: string }> = {
  "blocked-toilet": {
    title: "Blocked Toilet Manchester | Fast Unblocking Service",
    description: "Blocked toilet in Manchester? We clear toilet blockages quickly and hygienically. Same-day service, no call-out fee. Domestic and commercial properties.",
  },
  "blocked-sink": {
    title: "Blocked Sink Manchester | Fast Local Unblocking",
    description: "Blocked sink in Manchester? Our local drainage experts clear kitchen and bathroom sinks fast. No call-out fee, fixed pricing. Call now for same-day service.",
  },
  "blocked-bath": {
    title: "Blocked Bath & Shower Manchester | Drainage Experts",
    description: "Bath or shower blocked in Manchester? We clear standing water and slow drains fast. Wet rooms and ensuites included. Fixed pricing, no hidden fees.",
  },
  "external-drain-unblocking": {
    title: "External Drain Unblocking Manchester | Outside Drains",
    description: "Blocked outside drain in Manchester? We clear external drains, gullies, and manholes professionally. Prevent flooding and odours. Book today.",
  },
  "internal-drain-unblocking": {
    title: "Internal Drain Unblocking Manchester | Inside Drains",
    description: "Internal drain problems in Manchester? We unblock drains throughout your property quickly. Minimal disruption, professional service guaranteed.",
  },
  "pre-purchase-survey": {
    title: "Pre-Purchase Drain Survey Manchester | Homebuyers",
    description: "Buying a home in Manchester? Get a CCTV drain survey before you commit. Reveals hidden problems, structural issues, and potential repair costs.",
  },
  "drainage-investigation": {
    title: "Drainage Investigation Manchester | Problem Diagnosis",
    description: "Recurring drain issues in Manchester? Our detailed investigations find the root cause using CCTV and professional expertise. Accurate diagnosis guaranteed.",
  },
  "domestic-jetting": {
    title: "Domestic Drain Jetting Manchester | Home Services",
    description: "High-pressure drain jetting for Manchester homes. Clears fat, grease, and root ingress safely. Professional equipment, no mess. Book your jetting today.",
  },
  "commercial-jetting": {
    title: "Commercial Drain Jetting Manchester | Business Services",
    description: "Industrial-strength drain jetting for Manchester businesses. Restaurants, offices, and retail properties. Minimise downtime with our fast service.",
  },
  "flooding-emergency": {
    title: "Flooding Emergency Manchester | Rapid Response",
    description: "Flooding emergency in Manchester? We respond fast to drain-related flooding. Pumping, clearance, and repairs. Available 24/7, call now for help.",
  },
  "sewage-emergency": {
    title: "Sewage Emergency Manchester | Urgent Response",
    description: "Sewage backup in Manchester? We handle sewage emergencies safely and hygienically. 24/7 urgent response. Protect your health, call immediately.",
  },
};

// Central SEO generator based on route pattern and params
export function getSeoMeta(pathname: string, params: RouteParams = {}): SEOMeta {
  const canonicalUrl = getCanonicalUrl(pathname);
  const noIndex = shouldNoIndex(pathname);

  // Home page
  if (pathname === "/" || pathname === "") {
    return {
      title: "Blocked Drains Manchester | 24/7 Local Drain Unblocking",
      description: "Professional drain unblocking in Manchester. Emergency call-outs, CCTV surveys, drain repairs. No call-out fee, fixed pricing. Call 0333 880 2296.",
      canonicalUrl,
      noIndex,
      ogImage: `${BASE_URL}/og/manchesterblockeddrains-og.jpg`,
    };
  }

  // Services listing
  if (pathname === "/services" || pathname === "/services/") {
    return {
      title: "Drainage Services Manchester | All Drain Solutions",
      description: "Complete drainage services in Manchester. Blocked drains, CCTV surveys, drain jetting, and 24/7 emergency callouts. No call-out fee. Get a quote today.",
      canonicalUrl,
      noIndex,
    };
  }

  // Service detail: /services/:serviceSlug
  if (pathname.match(/^\/services\/[^\/]+\/?$/) && params.serviceSlug) {
    const customSeo = SERVICE_SEO[params.serviceSlug];
    if (customSeo) {
      return {
        title: customSeo.title,
        description: customSeo.description,
        canonicalUrl,
        noIndex,
      };
    }
    const service = getServiceBySlug(params.serviceSlug);
    const serviceName = service?.name || slugToTitle(params.serviceSlug);
    return {
      title: `${serviceName} Manchester | Professional Service`,
      description: `${service?.description || `Professional ${serviceName.toLowerCase()} services in Manchester.`} Call ${PHONE_DISPLAY} for fast response.`,
      canonicalUrl,
      noIndex,
    };
  }

  // Sub-service detail: /services/:serviceSlug/:subServiceSlug
  if (pathname.match(/^\/services\/[^\/]+\/[^\/]+\/?$/) && params.serviceSlug && params.subServiceSlug) {
    const customSeo = SUBSERVICE_SEO[params.subServiceSlug];
    if (customSeo) {
      return {
        title: customSeo.title,
        description: customSeo.description,
        canonicalUrl,
        noIndex,
      };
    }
    const service = getServiceBySlug(params.serviceSlug);
    const subService = getSubServiceBySlug(params.serviceSlug, params.subServiceSlug);
    const subServiceName = subService?.name || slugToTitle(params.subServiceSlug);
    return {
      title: `${subServiceName} Manchester | Expert Service`,
      description: `Professional ${subServiceName.toLowerCase()} in Manchester. Fast response, fixed pricing, no call-out fee. Call ${PHONE_DISPLAY}.`,
      canonicalUrl,
      noIndex,
    };
  }

  // Locations listing
  if (pathname === "/locations" || pathname === "/locations/") {
    return {
      title: "Areas We Cover | Drain Services Across Greater Manchester",
      description: "We provide drainage services across Manchester and Greater Manchester including Salford, Stockport, Bolton, Didsbury, and Chorlton. Find your area.",
      canonicalUrl,
      noIndex,
    };
  }

  // Location detail: /locations/:locationSlug
  if (pathname.match(/^\/locations\/[^\/]+\/?$/) && params.locationSlug) {
    const location = getLocationBySlug(params.locationSlug);
    const locationName = location?.name || slugToTitle(params.locationSlug);
    return {
      title: `Drain Services ${locationName} | Local Drainage Experts`,
      description: `Professional drainage services in ${locationName}. 24/7 emergency drain unblocking, CCTV surveys, and repairs. No call-out fee. Call ${PHONE_DISPLAY}.`,
      canonicalUrl,
      noIndex,
    };
  }

  // Location + Service: /locations/:locationSlug/:serviceSlug
  if (pathname.match(/^\/locations\/[^\/]+\/[^\/]+\/?$/) && params.locationSlug && params.serviceSlug && !params.subServiceSlug) {
    const location = getLocationBySlug(params.locationSlug);
    const service = getServiceBySlug(params.serviceSlug);
    const locationName = location?.name || slugToTitle(params.locationSlug);
    const serviceName = service?.name || slugToTitle(params.serviceSlug);
    return {
      title: `${serviceName} ${locationName} | Local Service`,
      description: `${serviceName} in ${locationName}, Greater Manchester. Fast response, fixed pricing, no call-out fee. Professional local service. Call ${PHONE_DISPLAY}.`,
      canonicalUrl,
      noIndex,
    };
  }

  // Location + Service + SubService: /locations/:locationSlug/:serviceSlug/:subServiceSlug
  if (pathname.match(/^\/locations\/[^\/]+\/[^\/]+\/[^\/]+\/?$/) && params.locationSlug && params.serviceSlug && params.subServiceSlug) {
    const location = getLocationBySlug(params.locationSlug);
    const subService = getSubServiceBySlug(params.serviceSlug, params.subServiceSlug);
    const locationName = location?.name || slugToTitle(params.locationSlug);
    const subServiceName = subService?.name || slugToTitle(params.subServiceSlug);
    return {
      title: `${subServiceName} ${locationName} | Expert Help`,
      description: `${subServiceName} services in ${locationName}, Greater Manchester. 24/7 availability, fixed pricing, no call-out fee. Call ${PHONE_DISPLAY}.`,
      canonicalUrl,
      noIndex,
    };
  }

  // About page
  if (pathname === "/about" || pathname === "/about/") {
    return {
      title: "About Us | Manchester Drainage Specialists",
      description: "Meet Blocked Drains Manchester, your trusted local drainage experts. Reliable, professional service available 24/7 across Manchester and Greater Manchester.",
      canonicalUrl,
      noIndex,
    };
  }

  // Contact page
  if (pathname === "/contact" || pathname === "/contact/") {
    return {
      title: "Contact Us | Get a Free Quote in Manchester",
      description: "Contact Blocked Drains Manchester for a free quote. Call 0333 880 2296 or use our online form. Fast response for all drainage enquiries.",
      canonicalUrl,
      noIndex,
    };
  }

  // FAQ page
  if (pathname === "/faq" || pathname === "/faq/") {
    return {
      title: "FAQs | Drain Services Questions Answered",
      description: "Common questions about drainage services in Manchester answered. Learn about costs, response times, what's included, and when to call a professional.",
      canonicalUrl,
      noIndex,
    };
  }

  // Blog listing
  if (pathname === "/blog" || pathname === "/blog/") {
    return {
      title: "Drainage Tips & Advice | Manchester Expert Blog",
      description: "Expert drainage advice from Manchester specialists. Tips to prevent blocked drains, maintain your drainage system, and know when to call for help.",
      canonicalUrl,
      noIndex,
    };
  }

  // Blog post: /blog/:slug
  if (pathname.match(/^\/blog\/[^\/]+\/?$/) && params.slug) {
    // Blog posts get their SEO from database, this is a fallback
    const postTitle = slugToTitle(params.slug);
    return {
      title: `${postTitle} | Manchester Drainage Blog`,
      description: `Read our article about ${postTitle.toLowerCase()}. Expert drainage advice from local Manchester specialists.`,
      canonicalUrl,
      noIndex,
    };
  }

  // Sitemap page
  if (pathname === "/sitemap" || pathname === "/sitemap/") {
    return {
      title: "Sitemap | Blocked Drains Manchester",
      description: "Browse all pages on Blocked Drains Manchester. Find drainage services, local areas, blog articles, and contact information.",
      canonicalUrl,
      noIndex,
    };
  }

  // Privacy policy
  if (pathname === "/privacy" || pathname === "/privacy/") {
    return {
      title: "Privacy Policy | Blocked Drains Manchester",
      description: "Privacy policy for Blocked Drains Manchester. Learn how we collect, use, and protect your personal information when using our services.",
      canonicalUrl,
      noIndex,
    };
  }

  // Terms
  if (pathname === "/terms" || pathname === "/terms/") {
    return {
      title: "Terms of Service | Blocked Drains Manchester",
      description: "Terms and conditions for Blocked Drains Manchester drainage services. Read before booking our drain unblocking and survey services.",
      canonicalUrl,
      noIndex,
    };
  }

  // Cookies
  if (pathname === "/cookies" || pathname === "/cookies/") {
    return {
      title: "Cookie Policy | Blocked Drains Manchester",
      description: "Cookie policy for Blocked Drains Manchester website. Learn about the cookies we use and how to manage your preferences.",
      canonicalUrl,
      noIndex,
    };
  }

  // Admin and auth routes - noindex
  if (shouldNoIndex(pathname)) {
    return {
      title: `Admin | ${BRAND.brandName}`,
      description: "Admin area",
      canonicalUrl,
      noIndex: true,
    };
  }

  // Default fallback
  return {
    title: BRAND.brandName,
    description: `Professional drainage services in ${BRAND.serviceAreaLabel}. Call ${PHONE_DISPLAY}`,
    canonicalUrl,
    noIndex,
  };
}

// Generate all indexable URLs for sitemap
export function getAllIndexableUrls(): Array<{
  url: string;
  priority: string;
  changefreq: string;
}> {
  const urls: Array<{ url: string; priority: string; changefreq: string }> = [];

  // Import here to avoid circular dependencies
  const { SERVICES } = require("@/config/services");
  const { LOCATIONS } = require("@/config/locations");

  // Static pages
  urls.push({ url: "/", priority: "1.0", changefreq: "daily" });
  urls.push({ url: "/services/", priority: "0.9", changefreq: "weekly" });
  urls.push({ url: "/locations/", priority: "0.9", changefreq: "weekly" });
  urls.push({ url: "/about/", priority: "0.7", changefreq: "monthly" });
  urls.push({ url: "/contact/", priority: "0.8", changefreq: "monthly" });
  urls.push({ url: "/faq/", priority: "0.6", changefreq: "monthly" });
  urls.push({ url: "/blog/", priority: "0.7", changefreq: "daily" });
  urls.push({ url: "/sitemap/", priority: "0.3", changefreq: "weekly" });
  urls.push({ url: "/privacy/", priority: "0.3", changefreq: "yearly" });
  urls.push({ url: "/terms/", priority: "0.3", changefreq: "yearly" });
  urls.push({ url: "/cookies/", priority: "0.3", changefreq: "yearly" });

  // Service pages
  for (const service of SERVICES) {
    urls.push({
      url: `/services/${service.slug}/`,
      priority: "0.8",
      changefreq: "weekly",
    });

    // Sub-service pages
    if (service.subServices) {
      for (const sub of service.subServices) {
        urls.push({
          url: `/services/${service.slug}/${sub.slug}/`,
          priority: "0.7",
          changefreq: "weekly",
        });
      }
    }
  }

  // Location pages
  for (const location of LOCATIONS) {
    urls.push({
      url: `/locations/${location.slug}/`,
      priority: "0.8",
      changefreq: "weekly",
    });

    // Location + Service pages
    for (const service of SERVICES) {
      urls.push({
        url: `/locations/${location.slug}/${service.slug}/`,
        priority: "0.7",
        changefreq: "weekly",
      });

      // Location + Service + SubService pages
      if (service.subServices) {
        for (const sub of service.subServices) {
          urls.push({
            url: `/locations/${location.slug}/${service.slug}/${sub.slug}/`,
            priority: "0.6",
            changefreq: "weekly",
          });
        }
      }
    }
  }

  return urls;
}
