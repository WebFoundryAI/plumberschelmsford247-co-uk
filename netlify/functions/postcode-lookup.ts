// Netlify Function – postcode lookup proxy
// Keeps getAddress.io API key server-side

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

  const apiKey = process.env.GETADDRESS_API_KEY;
  if (!apiKey) {
    return json(500, { error: 'Postcode lookup is not configured.' });
  }

  const cleanPostcode = postcode.replace(/\s/g, '');

  try {
    const response = await fetch(
      `https://api.getAddress.io/find/${encodeURIComponent(cleanPostcode)}?api-key=${encodeURIComponent(apiKey)}&expand=true`
    );
    const payload = (await response.json()) as any;

    if (!response.ok || !Array.isArray(payload.addresses) || !payload.addresses.length) {
      return json(404, { error: 'No addresses found for this postcode.' });
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

    return json(200, { addresses });
  } catch {
    return json(502, { error: 'Address lookup unavailable. Please enter your address manually.' });
  }
};
