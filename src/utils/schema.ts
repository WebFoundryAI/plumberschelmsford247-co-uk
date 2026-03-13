import { BRAND } from '../data/brand';
import { LOCATIONS, type Location } from '../data/locations';
import { SERVICES, type Service, type SubService } from '../data/services';

const siteUrl = `https://${BRAND.domain}`;

// All service areas for the business
const ALL_SERVICE_AREAS = LOCATIONS.map(loc => loc.name);

/**
 * REMOVED: Fake customer reviews and aggregate rating.
 * These had no verified third-party source (Google Business Profile, Trustpilot, etc.).
 * Re-enable with real, verifiable review data when available.
 */

/**
 * Base LocalBusiness schema for Plumber type
 * Used across all pages as the core business identity
 */
export function getBaseBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${siteUrl}/#business`,
    "name": BRAND.brandName,
    "description": "Professional drain unblocking, CCTV surveys, and emergency drainage services across Manchester and surrounding areas. Fast response, no call-out fee, 24/7 availability.",
    "url": siteUrl,
    "telephone": `+44${BRAND.phone.substring(1)}`,
    "email": BRAND.email,
    "logo": `${siteUrl}/images/og-default.jpg`,
    "image": `${siteUrl}/images/og-default.jpg`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${BRAND.addressLine1}, ${BRAND.addressLine2}`,
      "addressLocality": "Manchester",
      "addressRegion": "Greater Manchester",
      "postalCode": BRAND.postcode,
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.7353,
      "longitude": 0.4743
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "priceRange": "££",
    "currenciesAccepted": "GBP",
    "paymentAccepted": "Cash, Credit Card, Debit Card, Bank Transfer",
    "areaServed": ALL_SERVICE_AREAS.map(area => ({
      "@type": "City",
      "name": area,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Manchester and surrounding areas"
      }
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Drainage Services",
      "itemListElement": SERVICES.map((service) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "url": `${siteUrl}/services/${service.slug}`
        }
      }))
    },
    "sameAs": BRAND.socialProfiles,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": `+44${BRAND.phone.substring(1)}`,
      "contactType": "Customer Service",
      "areaServed": "GB",
      "availableLanguage": "English",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    }
  };
}

/**
 * Homepage schema - Full LocalBusiness with all services
 */
export function getHomepageSchema() {
  return getBaseBusinessSchema();
}

/**
 * Service page schema - LocalBusiness + specific Service schema
 */
export function getServicePageSchema(service: Service) {
  const baseSchema = getBaseBusinessSchema();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/services/${service.slug}/#service`,
    "name": service.name,
    "description": service.description,
    "url": `${siteUrl}/services/${service.slug}`,
    "provider": {
      "@id": `${siteUrl}/#business`
    },
    "areaServed": ALL_SERVICE_AREAS.map(area => ({
      "@type": "City",
      "name": area
    })),
    "hasOfferCatalog": service.subServices ? {
      "@type": "OfferCatalog",
      "name": `${service.name} Services`,
      "itemListElement": service.subServices.map((sub) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": sub.name,
          "description": sub.description,
          "url": `${siteUrl}/services/${service.slug}/${sub.slug}`
        }
      }))
    } : undefined,
    "serviceType": service.name,
    "termsOfService": `${siteUrl}/terms`,
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${siteUrl}/contact`,
      "servicePhone": `+44${BRAND.phone.substring(1)}`,
      "availableLanguage": "English"
    }
  };

  // Return both schemas as an array for JSON-LD graph
  return [baseSchema, serviceSchema];
}

/**
 * Sub-service page schema
 */
export function getSubServicePageSchema(service: Service, subService: SubService) {
  const baseSchema = getBaseBusinessSchema();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/services/${service.slug}/${subService.slug}/#service`,
    "name": subService.name,
    "description": subService.description,
    "url": `${siteUrl}/services/${service.slug}/${subService.slug}`,
    "provider": {
      "@id": `${siteUrl}/#business`
    },
    "areaServed": ALL_SERVICE_AREAS.map(area => ({
      "@type": "City",
      "name": area
    })),
    "isRelatedTo": {
      "@type": "Service",
      "name": service.name,
      "url": `${siteUrl}/services/${service.slug}`
    },
    "serviceType": subService.name,
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${siteUrl}/contact`,
      "servicePhone": `+44${BRAND.phone.substring(1)}`,
      "availableLanguage": "English"
    }
  };

  return [baseSchema, serviceSchema];
}

/**
 * Location page schema - LocalBusiness with specific area focus
 */
export function getLocationPageSchema(location: Location) {
  const baseSchema = getBaseBusinessSchema();

  // Override areaServed to focus on specific location
  const locationSchema = {
    ...baseSchema,
    "@id": `${siteUrl}/locations/${location.slug}/#localbusiness`,
    "areaServed": {
      "@type": "City",
      "name": location.name,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": location.latitude,
        "longitude": location.longitude
      },
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": location.countyOrRegion || "Manchester and surrounding areas"
      }
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.latitude,
      "longitude": location.longitude
    }
  };

  return locationSchema;
}

/**
 * Location + Service page schema
 */
export function getLocationServicePageSchema(location: Location, service: Service) {
  const locationSchema = getLocationPageSchema(location);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/locations/${location.slug}/${service.slug}/#service`,
    "name": `${service.name} in ${location.name}`,
    "description": `Professional ${service.name.toLowerCase()} services in ${location.name}, ${location.countyOrRegion || 'Manchester and surrounding areas'}. Fast response, no call-out fee, 24/7 availability.`,
    "url": `${siteUrl}/locations/${location.slug}/${service.slug}`,
    "provider": {
      "@id": `${siteUrl}/#business`
    },
    "areaServed": {
      "@type": "City",
      "name": location.name,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": location.latitude,
        "longitude": location.longitude
      }
    },
    "serviceType": service.name,
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${siteUrl}/contact`,
      "servicePhone": `+44${BRAND.phone.substring(1)}`,
      "availableLanguage": "English"
    }
  };

  return [locationSchema, serviceSchema];
}

/**
 * Helper to serialize schema for use in HTML
 */
export function serializeSchema(schema: object | object[]): string {
  if (Array.isArray(schema)) {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": schema.map(s => {
        const { "@context": _, ...rest } = s as Record<string, unknown>;
        return rest;
      })
    });
  }
  return JSON.stringify(schema);
}

/**
 * BreadcrumbList schema generator
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`
    }))
  };
}

/**
 * FAQ schema generator
 */
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Blog article schema generator
 */
export function getBlogArticleSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  updatedDate?: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteUrl}/blog/${post.slug}/#article`,
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": post.author,
      "@id": `${siteUrl}/#business`
    },
    "publisher": {
      "@type": "Organization",
      "name": BRAND.brandName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/og-default.jpg`
      }
    },
    "datePublished": post.publishDate,
    "dateModified": post.updatedDate || post.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`
    },
    "articleSection": post.category,
    "inLanguage": "en-GB"
  };
}

// REMOVED: getReviewsSchema() — was outputting fake reviews into JSON-LD

/**
 * Organization schema - Standalone organization entity
 * Provides additional context for knowledge panels
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": BRAND.brandName,
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/images/og-default.jpg`,
      "width": 1200,
      "height": 630
    },
    "image": `${siteUrl}/images/og-default.jpg`,
    "description": "Professional drain unblocking, CCTV surveys, and emergency drainage services across Manchester and surrounding areas. Fast response, no call-out fee, 24/7 availability.",
    "telephone": `+44${BRAND.phone.substring(1)}`,
    "email": BRAND.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${BRAND.addressLine1}, ${BRAND.addressLine2}`,
      "addressLocality": "Manchester",
      "addressRegion": "Greater Manchester",
      "postalCode": BRAND.postcode,
      "addressCountry": "GB"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": `+44${BRAND.phone.substring(1)}`,
        "contactType": "Customer Service",
        "areaServed": "GB",
        "availableLanguage": "English"
      },
      {
        "@type": "ContactPoint",
        "telephone": `+44${BRAND.phone.substring(1)}`,
        "contactType": "Emergency Service",
        "areaServed": "GB",
        "availableLanguage": "English",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      }
    ],
    "sameAs": BRAND.socialProfiles,
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Manchester",
        "addressRegion": "Greater Manchester",
        "addressCountry": "GB"
      }
    },
    "slogan": BRAND.tagline,
    "knowsAbout": [
      "Drain Unblocking",
      "CCTV Drain Surveys",
      "High Pressure Drain Jetting",
      "Emergency Drainage Services",
      "Blocked Toilets",
      "Blocked Sinks",
      "Drain Repairs",
      "Root Removal",
      "Septic Tank Services"
    ]
  };
}

/**
 * WebPage schema generator
 * Provides context about the webpage itself
 */
export function getWebPageSchema(options: {
  url: string;
  name: string;
  description: string;
  breadcrumb?: Array<{ name: string; url: string }>;
  datePublished?: string;
  dateModified?: string;
}) {
  const webPageSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${(options.url.startsWith('http') ? options.url : siteUrl + options.url).replace(/\/+$/, '')}/#webpage`,
    "url": options.url.startsWith('http') ? options.url : siteUrl + options.url,
    "name": options.name,
    "description": options.description,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": BRAND.brandName,
      "publisher": {
        "@id": `${siteUrl}/#organization`
      }
    },
    "about": {
      "@id": `${siteUrl}/#business`
    },
    "inLanguage": "en-GB",
    "potentialAction": {
      "@type": "ReadAction",
      "target": options.url.startsWith('http') ? options.url : siteUrl + options.url
    }
  };

  if (options.datePublished) {
    webPageSchema.datePublished = options.datePublished;
  }

  if (options.dateModified) {
    webPageSchema.dateModified = options.dateModified;
  }

  if (options.breadcrumb && options.breadcrumb.length > 0) {
    webPageSchema.breadcrumb = {
      "@type": "BreadcrumbList",
      "itemListElement": options.breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url.startsWith('http') ? item.url : siteUrl + item.url
      }))
    };
  }

  return webPageSchema;
}

/**
 * WebSite schema - for the website as a whole
 * Best placed on homepage
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": siteUrl,
    "name": BRAND.brandName,
    "description": "Professional drain unblocking, CCTV surveys, and emergency drainage services across Manchester and surrounding areas.",
    "publisher": {
      "@id": `${siteUrl}/#organization`
    },
    "inLanguage": "en-GB",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/services?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Get complete homepage schema with all entities
 * Includes: Organization, WebSite, LocalBusiness, Reviews
 */
export function getCompleteHomepageSchema() {
  const businessSchema = getBaseBusinessSchema();
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return [businessSchema, organizationSchema, websiteSchema];
}

// REMOVED: getAggregateRatingData() and getCustomerReviews() — fake data removed
