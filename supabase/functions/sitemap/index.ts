import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Service and location configurations (mirrored from frontend)
const SERVICES = [
  {
    slug: "blocked-drains",
    subServices: [
      { slug: "blocked-toilet" },
      { slug: "blocked-sink" },
      { slug: "blocked-bath" },
    ],
  },
  {
    slug: "drain-unblocking",
    subServices: [
      { slug: "external-drain-unblocking" },
      { slug: "internal-drain-unblocking" },
    ],
  },
  {
    slug: "cctv-drain-surveys",
    subServices: [
      { slug: "pre-purchase-survey" },
      { slug: "drainage-investigation" },
    ],
  },
  {
    slug: "drain-jetting",
    subServices: [
      { slug: "domestic-jetting" },
      { slug: "commercial-jetting" },
    ],
  },
  {
    slug: "emergency-drain-services",
    subServices: [
      { slug: "flooding-emergency" },
      { slug: "sewage-emergency" },
    ],
  },
  {
    slug: "drain-repairs",
    subServices: [
      { slug: "pipe-relining" },
      { slug: "drain-excavation" },
    ],
  },
];

const LOCATIONS = [
  { slug: "swindon" },
  { slug: "royal-wootton-bassett" },
  { slug: "highworth" },
  { slug: "purton" },
  { slug: "cricklade" },
  { slug: "wroughton" },
];

const BASE_URL = "https://swindonblockeddrains.co.uk";

function formatDate(_date: Date): string {
  // Return current date for sitemap freshness
  return "2025-12-24";
}

function generateUrlEntry(
  loc: string,
  priority: string,
  changefreq: string,
  lastmod?: string
): string {
  return `  <url>
    <loc>${BASE_URL}${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Generating dynamic sitemap...");

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch blog posts
    const { data: blogPosts, error } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts:", error);
    }

    const today = formatDate(new Date());
    const urls: string[] = [];

    // Static pages (including llm.html for GEO/AI discovery)
    // Note: /sitemap is noindex so excluded from XML sitemap
    const staticPages = [
      { url: "/", priority: "1.0", changefreq: "weekly" },
      { url: "/llm.html", priority: "0.5", changefreq: "monthly" },
      { url: "/services", priority: "0.9", changefreq: "weekly" },
      { url: "/locations", priority: "0.9", changefreq: "weekly" },
      { url: "/about", priority: "0.7", changefreq: "monthly" },
      { url: "/contact", priority: "0.8", changefreq: "monthly" },
      { url: "/faq", priority: "0.6", changefreq: "monthly" },
      { url: "/blog", priority: "0.7", changefreq: "daily" },
      { url: "/privacy", priority: "0.3", changefreq: "yearly" },
      { url: "/terms", priority: "0.3", changefreq: "yearly" },
      { url: "/cookies", priority: "0.3", changefreq: "yearly" },
    ];

    for (const page of staticPages) {
      urls.push(generateUrlEntry(page.url, page.priority, page.changefreq, today));
    }

    // Service pages
    for (const service of SERVICES) {
      urls.push(generateUrlEntry(`/services/${service.slug}`, "0.8", "weekly", today));

      // Sub-service pages
      for (const sub of service.subServices || []) {
        urls.push(
          generateUrlEntry(`/services/${service.slug}/${sub.slug}`, "0.7", "weekly", today)
        );
      }
    }

    // Location pages
    for (const location of LOCATIONS) {
      urls.push(generateUrlEntry(`/locations/${location.slug}`, "0.8", "weekly", today));

      // Service-in-location pages
      for (const service of SERVICES) {
        urls.push(
          generateUrlEntry(
            `/locations/${location.slug}/${service.slug}`,
            "0.7",
            "weekly",
            today
          )
        );

        // Sub-service-in-location pages
        for (const sub of service.subServices || []) {
          urls.push(
            generateUrlEntry(
              `/locations/${location.slug}/${service.slug}/${sub.slug}`,
              "0.6",
              "weekly",
              today
            )
          );
        }
      }
    }

    // Blog posts
    if (blogPosts && blogPosts.length > 0) {
      for (const post of blogPosts) {
        const lastmod = post.updated_at
          ? formatDate(new Date(post.updated_at))
          : today;
        urls.push(generateUrlEntry(`/blog/${post.slug}`, "0.6", "monthly", lastmod));
      }
    }

    console.log(`Generated sitemap with ${urls.length} URLs`);

    // Update sitemap_status to record regeneration
    const { error: statusError } = await supabase
      .from("sitemap_status")
      .upsert({
        id: "00000000-0000-0000-0000-000000000001",
        last_generated_at: new Date().toISOString(),
        url_count: urls.length,
        generated_by: "edge_function",
      });

    if (statusError) {
      console.error("Error updating sitemap status:", statusError);
    }

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Error generating sitemap", {
      status: 500,
      headers: corsHeaders,
    });
  }
});
