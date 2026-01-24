import type { APIRoute } from 'astro';
import { BRAND } from '../data/brand';
import { SERVICES } from '../data/services';
import { LOCATIONS } from '../data/locations';
import { BLOG_POSTS } from '../data/blog';

// Generate at build time for static output
export const prerender = true;

const siteUrl = `https://${BRAND.domain}`;

// Get today's date in YYYY-MM-DD format for lastmod
const today = new Date().toISOString().split('T')[0];

interface SitemapUrl {
  loc: string;
  priority: number;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

function generateSitemapUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [];

  // Main pages
  urls.push({ loc: '/', priority: 1.0, changefreq: 'weekly' });
  urls.push({ loc: '/services', priority: 0.9, changefreq: 'weekly' });
  urls.push({ loc: '/locations', priority: 0.9, changefreq: 'weekly' });
  urls.push({ loc: '/contact', priority: 0.8, changefreq: 'monthly' });
  urls.push({ loc: '/about', priority: 0.7, changefreq: 'monthly' });
  urls.push({ loc: '/faq', priority: 0.7, changefreq: 'monthly' });

  // Blog pages
  urls.push({ loc: '/blog', priority: 0.8, changefreq: 'weekly' });
  for (const post of BLOG_POSTS) {
    urls.push({
      loc: `/blog/${post.slug}`,
      priority: 0.7,
      changefreq: 'monthly',
    });
  }

  // Legal pages (lower priority)
  urls.push({ loc: '/privacy', priority: 0.3, changefreq: 'yearly' });
  urls.push({ loc: '/terms', priority: 0.3, changefreq: 'yearly' });
  urls.push({ loc: '/cookies', priority: 0.3, changefreq: 'yearly' });

  // Service pages
  for (const service of SERVICES) {
    urls.push({
      loc: `/services/${service.slug}`,
      priority: 0.9,
      changefreq: 'weekly',
    });

    // Sub-service pages
    if (service.subServices) {
      for (const subService of service.subServices) {
        urls.push({
          loc: `/services/${service.slug}/${subService.slug}`,
          priority: 0.8,
          changefreq: 'monthly',
        });
      }
    }
  }

  // Location pages
  for (const location of LOCATIONS) {
    // Main location page (Manchester gets higher priority)
    const isManchester = location.slug === 'manchester';
    urls.push({
      loc: `/locations/${location.slug}`,
      priority: isManchester ? 0.9 : 0.8,
      changefreq: 'weekly',
    });

    // Location + Service combinations
    for (const service of SERVICES) {
      urls.push({
        loc: `/locations/${location.slug}/${service.slug}`,
        priority: isManchester ? 0.8 : 0.7,
        changefreq: 'monthly',
      });
    }
  }

  return urls;
}

function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlElements = urls
    .map(
      (url) => `  <url>
    <loc>${siteUrl}${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq || 'monthly'}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

export const GET: APIRoute = async () => {
  const urls = generateSitemapUrls();
  const sitemap = generateSitemapXml(urls);

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
