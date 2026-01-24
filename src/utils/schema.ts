import { BRAND } from '../data/brand';
import { LOCATIONS, type Location } from '../data/locations';
import { SERVICES, type Service, type SubService } from '../data/services';

const siteUrl = `https://${BRAND.domain}`;

// All service areas for the business
const ALL_SERVICE_AREAS = LOCATIONS.map(loc => loc.name);

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
    "description": "Professional drain unblocking, CCTV surveys, and emergency drainage services across Manchester and Greater Manchester. Fast response, no call-out fee, 24/7 availability.",
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
      "latitude": 53.4808,
      "longitude": -2.2426
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
        "name": "Greater Manchester"
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
    "sameAs": BRAND.socialProfiles
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
        "name": location.countyOrRegion || "Greater Manchester"
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
    "description": `Professional ${service.name.toLowerCase()} services in ${location.name}, ${location.countyOrRegion || 'Greater Manchester'}. Fast response, no call-out fee, 24/7 availability.`,
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
