// Netlify Function – postcode lookup proxy
// Uses Ideal Postcodes API (Royal Mail PAF licensed data)
// Keeps API key server-side

// Community test key – replace with your own key from https://ideal-postcodes.co.uk
// Set IDEAL_POSTCODES_API_KEY in Netlify dashboard (Site settings > Environment variables)
const FALLBACK_API_KEY = 'iddqd';

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 10;
const memoryStore = new Map<string, { count: number; start: number }>();

const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;

const json = (statusCode: number, body: Record<string, unknown>) => ({
  statusCode,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  },
  body: JSON.stringify(body),
});

export const handler = async (event: any) => {
  if (event.httpMethod !== 'GET') return json(405, { error: 'Method not allowed' });

  const params = event.queryStringParameters || {};
  const postcode = (params.postcode || '').trim();

  if (!postcode || !postcodeRegex.test(postcode)) {
    return json(400, { error: 'Enter a valid UK postcode.' });
  }

  const ip = event.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const entry = memoryStore.get(ip);

  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    memoryStore.set(ip, { count: 1, start: now });
  } else if (entry.count >= RATE_LIMIT_MAX) {
    return json(429, { error: 'Too many requests, please try again shortly.' });
  } else {
    memoryStore.set(ip, { count: entry.count + 1, start: entry.start });
  }

  const apiKey = process.env.IDEAL_POSTCODES_API_KEY || FALLBACK_API_KEY;
  if (!apiKey) {
    return json(500, { error: 'Postcode lookup is not configured.' });
  }

  const cleanPostcode = postcode.replace(/\s/g, '');

  try {
    const response = await fetch(
      `https://api.ideal-postcodes.co.uk/v1/postcodes/${encodeURIComponent(cleanPostcode)}?api_key=${encodeURIComponent(apiKey)}`
    );
    const payload = (await response.json()) as any;

    if (!response.ok || !Array.isArray(payload.result) || !payload.result.length) {
      return json(404, { error: 'No addresses found for this postcode.' });
    }

    const addresses = payload.result.map((addr: any) => {
      const line = [addr.line_1, addr.line_2, addr.line_3, addr.post_town, addr.postcode]
        .filter(Boolean)
        .join(', ');
      return { line };
    });

    return json(200, { addresses });
  } catch {
    return json(502, { error: 'Address lookup unavailable. Please enter your address manually.' });
  }
};
