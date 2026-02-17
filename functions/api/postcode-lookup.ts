// Cloudflare Pages Function – postcode lookup proxy
// Keeps getAddress.io API key server-side

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

// @ts-ignore - lightweight in-memory store for single isolate best-effort limiting
globalThis.__postcodeLookupRateLimit = globalThis.__postcodeLookupRateLimit || new Map<string, { count: number; start: number }>();
// @ts-ignore
const memoryStore: Map<string, { count: number; start: number }> = globalThis.__postcodeLookupRateLimit;

const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

export const onRequestGet = async (context: any) => {
  const url = new URL(context.request.url);
  const postcode = (url.searchParams.get('postcode') || '').trim();

  if (!postcode || !postcodeRegex.test(postcode)) {
    return Response.json({ error: 'Enter a valid UK postcode.' }, { status: 400 });
  }

  const ip = context.request.headers.get('CF-Connecting-IP') || 'unknown';
  const now = Date.now();
  const entry = memoryStore.get(ip);

  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    memoryStore.set(ip, { count: 1, start: now });
  } else if (entry.count >= RATE_LIMIT_MAX) {
    return Response.json({ error: 'Too many requests, please try again shortly.' }, { status: 429 });
  } else {
    memoryStore.set(ip, { count: entry.count + 1, start: entry.start });
  }

  const apiKey = context.env.GETADDRESS_API_KEY as string | undefined;
  if (!apiKey) {
    return Response.json({ error: 'Postcode lookup is not configured.' }, { status: 500 });
  }

  const cleanPostcode = postcode.replace(/\s/g, '');

  try {
    const response = await fetch(
      `https://api.getAddress.io/find/${encodeURIComponent(cleanPostcode)}?api-key=${encodeURIComponent(apiKey)}&expand=true`
    );
    const payload = await response.json() as any;

    if (!response.ok || !Array.isArray(payload.addresses) || !payload.addresses.length) {
      return Response.json({ error: 'No addresses found for this postcode.' }, { status: 404 });
    }

    const formatted = cleanPostcode.length > 3
      ? cleanPostcode.slice(0, -3).toUpperCase() + ' ' + cleanPostcode.slice(-3).toUpperCase()
      : cleanPostcode.toUpperCase();

    const addresses = payload.addresses.map((addr: any) => {
      const line = [addr.line_1, addr.line_2, addr.line_3, addr.town_or_city]
        .filter(Boolean)
        .join(', ');
      return { line: `${line}, ${formatted}` };
    });

    return Response.json({ addresses });
  } catch {
    return Response.json({ error: 'Address lookup unavailable. Please enter your address manually.' }, { status: 502 });
  }
};
