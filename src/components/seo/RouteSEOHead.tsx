/**
 * Route-aware SEO component
 * Automatically generates SEO metadata based on current route
 * Uses centralized routeMeta.ts for static routes
 * 
 * Canonical rules enforced:
 * - Homepage: https://manchesterblockeddrains.co.uk/
 * - All other routes: NO trailing slash
 */

import { Helmet } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import { BRAND } from "@/config/brand";
import { getServiceBySlug, getSubServiceBySlug } from "@/config/services";
import { getLocationBySlug } from "@/config/locations";
import {
  STATIC_ROUTE_META,
  SERVICE_META,
  SUBSERVICE_META,
  shouldNoIndex,
  normalizeCanonicalPath,
} from "@/seo/routeMeta";

const BASE_URL = `https://${BRAND.domain}`;
const DEFAULT_OG_IMAGE = `${BASE_URL}/og/manchesterblockeddrains-og.jpg`;

interface RouteSEOHeadProps {
  override?: {
    title?: string;
    description?: string;
    canonicalPath?: string;
    robots?: string;
    noIndex?: boolean;
  };
  ogImage?: string;
}

interface RouteParams {
  locationSlug?: string;
  serviceSlug?: string;
  subServiceSlug?: string;
  slug?: string;
}

// Convert slug to readable title
function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Get SEO for dynamic routes
function getDynamicSeo(pathname: string, params: RouteParams) {
  const { locationSlug, serviceSlug, subServiceSlug, slug } = params;

  // Service detail: /services/:serviceSlug
  if (pathname.match(/^\/services\/[^\/]+\/?$/) && serviceSlug) {
    const custom = SERVICE_META[serviceSlug];
    if (custom) return custom;
    
    const service = getServiceBySlug(serviceSlug);
    const name = service?.name || slugToTitle(serviceSlug);
    return {
      title: `${name} Manchester | Professional Service`,
      description: `${service?.description || `Professional ${name.toLowerCase()} services in Manchester.`} Call 0333 880 2296 for fast response.`,
    };
  }

  // Sub-service: /services/:serviceSlug/:subServiceSlug
  if (pathname.match(/^\/services\/[^\/]+\/[^\/]+\/?$/) && serviceSlug && subServiceSlug) {
    const custom = SUBSERVICE_META[subServiceSlug];
    if (custom) return custom;
    
    const subService = getSubServiceBySlug(serviceSlug, subServiceSlug);
    const name = subService?.name || slugToTitle(subServiceSlug);
    return {
      title: `${name} Manchester | Expert Service`,
      description: `Professional ${name.toLowerCase()} in Manchester. Fast response, fixed pricing, no call-out fee. Call 0333 880 2296.`,
    };
  }

  // Location: /locations/:locationSlug
  if (pathname.match(/^\/locations\/[^\/]+\/?$/) && locationSlug) {
    const location = getLocationBySlug(locationSlug);
    const name = location?.name || slugToTitle(locationSlug);
    return {
      title: `Drain Services ${name} | Local Drainage Experts`,
      description: `Professional drainage services in ${name}. 24/7 emergency drain unblocking, CCTV surveys, and repairs. No call-out fee. Call 0333 880 2296.`,
    };
  }

  // Location + Service: /locations/:locationSlug/:serviceSlug
  if (pathname.match(/^\/locations\/[^\/]+\/[^\/]+\/?$/) && locationSlug && serviceSlug && !subServiceSlug) {
    const location = getLocationBySlug(locationSlug);
    const service = getServiceBySlug(serviceSlug);
    const locName = location?.name || slugToTitle(locationSlug);
    const svcName = service?.name || slugToTitle(serviceSlug);
    return {
      title: `${svcName} ${locName} | Local Service`,
      description: `${svcName} in ${locName}, Greater Manchester. Fast response, fixed pricing, no call-out fee. Professional local service. Call 0333 880 2296.`,
    };
  }

  // Location + Service + Sub: /locations/:locationSlug/:serviceSlug/:subServiceSlug
  if (pathname.match(/^\/locations\/[^\/]+\/[^\/]+\/[^\/]+\/?$/) && locationSlug && serviceSlug && subServiceSlug) {
    const location = getLocationBySlug(locationSlug);
    const subService = getSubServiceBySlug(serviceSlug, subServiceSlug);
    const locName = location?.name || slugToTitle(locationSlug);
    const subName = subService?.name || slugToTitle(subServiceSlug);
    return {
      title: `${subName} ${locName} | Expert Help`,
      description: `${subName} services in ${locName}, Greater Manchester. 24/7 availability, fixed pricing, no call-out fee. Call 0333 880 2296.`,
    };
  }

  // Blog post: /blog/:slug
  if (pathname.match(/^\/blog\/[^\/]+\/?$/) && slug) {
    const postTitle = slugToTitle(slug);
    return {
      title: `${postTitle} | Manchester Drainage Blog`,
      description: `Read our article about ${postTitle.toLowerCase()}. Expert drainage advice from local Manchester specialists.`,
    };
  }

  return null;
}

export function RouteSEOHead({ override, ogImage }: RouteSEOHeadProps = {}) {
  const location = useLocation();
  const params = useParams() as RouteParams;
  
  // Normalize pathname (remove trailing slash for lookup, except homepage)
  const pathname = location.pathname === "/" ? "/" : location.pathname.replace(/\/+$/, "");
  
  // Get base SEO from static map or dynamic generator
  const staticMeta = STATIC_ROUTE_META[pathname];
  const dynamicMeta = !staticMeta ? getDynamicSeo(location.pathname, params) : null;
  
  // Determine final values
  const noIndex = override?.noIndex ?? staticMeta?.noIndex ?? shouldNoIndex(pathname);
  const robots = override?.robots || (noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
  
  const title = override?.title || staticMeta?.title || dynamicMeta?.title || BRAND.brandName;
  const description = override?.description || staticMeta?.description || dynamicMeta?.description || 
    `Professional drainage services in ${BRAND.serviceAreaLabel}. Call 0333 880 2296.`;
  
  // Canonical path: no trailing slash except homepage
  const canonicalPath = override?.canonicalPath || normalizeCanonicalPath(pathname);
  const canonicalUrl = canonicalPath === "/" ? `${BASE_URL}/` : `${BASE_URL}${canonicalPath}`;
  
  const finalOgImage = ogImage || staticMeta?.ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Google Search Console verification */}
      <meta name="google-site-verification" content="NsHdtpHnQwP_k83k4Z2-v5NSIDC6qiTuGiSpNkxp3ZU" />

      {/* Canonical URL - CRITICAL: self-referencing, no trailing slash except homepage */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots directive */}
      <meta name="robots" content={robots} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content={BRAND.brandName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />
    </Helmet>
  );
}
