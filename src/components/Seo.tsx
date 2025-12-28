/**
 * Single SEO component for all routes
 * Uses react-helmet-async to manage head tags
 * 
 * Ensures exactly one of each tag per route:
 * - <title>
 * - <meta name="description">
 * - <link rel="canonical">
 * - <meta name="robots">
 * - Open Graph tags
 * - Twitter Card tags
 */

import { Helmet } from "react-helmet-async";
import { BRAND } from "@/config/brand";

interface SeoProps {
  title: string;
  description: string;
  canonicalPath: string;
  robots?: string;
  ogImage?: string;
}

const BASE_URL = `https://${BRAND.domain}`;
const DEFAULT_OG_IMAGE = `${BASE_URL}/og/manchesterblockeddrains-og.jpg`;

export function Seo({
  title,
  description,
  canonicalPath,
  robots = "index, follow, max-image-preview:large",
  ogImage,
}: SeoProps) {
  // Canonical URL: no trailing slash except homepage
  const canonicalUrl = canonicalPath === "/" 
    ? BASE_URL + "/" 
    : `${BASE_URL}${canonicalPath.replace(/\/+$/, "")}`;
  
  const finalOgImage = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Google Search Console verification */}
      <meta name="google-site-verification" content="NsHdtpHnQwP_k83k4Z2-v5NSIDC6qiTuGiSpNkxp3ZU" />

      {/* Canonical URL - exactly one, self-referencing */}
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
