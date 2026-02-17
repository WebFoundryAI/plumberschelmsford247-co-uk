import { describe, it, expect, beforeEach, vi } from 'vitest';

let handler: (event: any) => Promise<any>;

function createEvent(
  body: object | string | null,
  method = 'POST',
  headers: Record<string, string> = {}
) {
  return {
    httpMethod: method,
    headers: {
      'x-forwarded-for': '1.2.3.4',
      'user-agent': 'test-agent',
      ...headers,
    },
    body: body === null ? null : typeof body === 'string' ? body : JSON.stringify(body),
  };
}

const VALID_PAYLOAD = {
  name: 'Jane Smith',
  phone: '07700900000',
  postcode: 'm2 3wq',
  service: 'Blocked Drains',
};

describe('Netlify Lead API', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve(new Response('', { status: 201 }))
    ));
    process.env.SUPABASE_URL = 'https://test.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-key';
    const mod = await import('../../netlify/functions/api-lead');
    handler = mod.handler;
  });

  describe('Method validation', () => {
    it('returns 405 for GET requests', async () => {
      const res = await handler(createEvent(null, 'GET'));
      expect(res.statusCode).toBe(405);
    });

    it('returns 405 for PUT requests', async () => {
      const res = await handler(createEvent(null, 'PUT'));
      expect(res.statusCode).toBe(405);
    });

    it('returns 405 for DELETE requests', async () => {
      const res = await handler(createEvent(null, 'DELETE'));
      expect(res.statusCode).toBe(405);
    });
  });

  describe('JSON parsing', () => {
    it('returns 400 for invalid JSON body', async () => {
      const res = await handler(createEvent('not valid json{'));
      expect(res.statusCode).toBe(400);
      const data = JSON.parse(res.body);
      expect(data.error).toContain('Invalid JSON');
    });
  });

  describe('Input validation', () => {
    it('returns 400 when all required fields are missing', async () => {
      const res = await handler(createEvent({}));
      expect(res.statusCode).toBe(400);
      const data = JSON.parse(res.body);
      expect(data.fields).toContain('name is required');
      expect(data.fields).toContain('phone is required');
      expect(data.fields).toContain('postcode is required');
      expect(data.fields).toContain('service is required');
    });

    it('returns 400 when name is missing', async () => {
      const res = await handler(createEvent({ phone: '07700', postcode: 'M2 3WQ', service: 'X' }));
      expect(res.statusCode).toBe(400);
      const data = JSON.parse(res.body);
      expect(data.fields).toContain('name is required');
    });

    it('returns 400 when fields are whitespace-only', async () => {
      const res = await handler(createEvent({ name: '  ', phone: '  ', postcode: '  ', service: '  ' }));
      expect(res.statusCode).toBe(400);
      const data = JSON.parse(res.body);
      expect(data.fields.length).toBe(4);
    });

    it('accepts valid payload', async () => {
      const res = await handler(createEvent(VALID_PAYLOAD));
      expect(res.statusCode).toBe(200);
      const data = JSON.parse(res.body);
      expect(data.success).toBe(true);
    });
  });

  describe('Honeypot spam detection', () => {
    it('returns 400 when company field has a value', async () => {
      const res = await handler(createEvent({ ...VALID_PAYLOAD, company: 'SpamCo' }));
      expect(res.statusCode).toBe(400);
      const data = JSON.parse(res.body);
      expect(data.error).toContain('spam detected');
    });

    it('passes when company field is empty string', async () => {
      const res = await handler(createEvent({ ...VALID_PAYLOAD, company: '' }));
      expect(res.statusCode).toBe(200);
    });
  });

  describe('Rate limiting', () => {
    it('allows first 5 requests from same IP', async () => {
      for (let i = 0; i < 5; i++) {
        const res = await handler(createEvent(VALID_PAYLOAD));
        expect(res.statusCode).toBe(200);
      }
    });

    it('returns 429 on 6th request within window', async () => {
      for (let i = 0; i < 5; i++) {
        await handler(createEvent(VALID_PAYLOAD));
      }
      const res = await handler(createEvent(VALID_PAYLOAD));
      expect(res.statusCode).toBe(429);
      const data = JSON.parse(res.body);
      expect(data.error).toContain('Too many requests');
    });

    it('tracks different IPs independently', async () => {
      for (let i = 0; i < 5; i++) {
        await handler(createEvent(VALID_PAYLOAD));
      }
      const res = await handler(createEvent(VALID_PAYLOAD, 'POST', { 'x-forwarded-for': '5.6.7.8' }));
      expect(res.statusCode).toBe(200);
    });

    it('extracts first IP from x-forwarded-for header', async () => {
      const res = await handler(createEvent(VALID_PAYLOAD, 'POST', {
        'x-forwarded-for': '10.0.0.1, 10.0.0.2, 10.0.0.3'
      }));
      expect(res.statusCode).toBe(200);
    });

    it('falls back to "unknown" when x-forwarded-for is missing', async () => {
      const event = {
        httpMethod: 'POST',
        headers: { 'user-agent': 'test' },
        body: JSON.stringify(VALID_PAYLOAD),
      };
      const res = await handler(event);
      expect(res.statusCode).toBe(200);
    });
  });

  describe('Record sanitization', () => {
    it('trims whitespace and uppercases postcode', async () => {
      await handler(createEvent({
        name: '  Jane  ',
        phone: ' 07700 ',
        postcode: '  m2 3wq  ',
        service: ' Drains ',
      }));
      const fetchCall = vi.mocked(fetch).mock.calls[0];
      const body = JSON.parse(fetchCall[1]!.body as string);
      expect(body.name).toBe('Jane');
      expect(body.phone).toBe('07700');
      expect(body.postcode).toBe('M2 3WQ');
      expect(body.service).toBe('Drains');
    });

    it('sets optional address to null when empty', async () => {
      await handler(createEvent({ ...VALID_PAYLOAD, address: '' }));
      const fetchCall = vi.mocked(fetch).mock.calls[0];
      const body = JSON.parse(fetchCall[1]!.body as string);
      expect(body.address).toBeNull();
    });

    it('sets optional notes to null when empty', async () => {
      await handler(createEvent({ ...VALID_PAYLOAD, notes: '  ' }));
      const fetchCall = vi.mocked(fetch).mock.calls[0];
      const body = JSON.parse(fetchCall[1]!.body as string);
      expect(body.notes).toBeNull();
    });

    it('defaults source to "website"', async () => {
      await handler(createEvent(VALID_PAYLOAD));
      const fetchCall = vi.mocked(fetch).mock.calls[0];
      const body = JSON.parse(fetchCall[1]!.body as string);
      expect(body.source).toBe('website');
    });

    it('includes ip_address and user_agent', async () => {
      await handler(createEvent(VALID_PAYLOAD));
      const fetchCall = vi.mocked(fetch).mock.calls[0];
      const body = JSON.parse(fetchCall[1]!.body as string);
      expect(body.ip_address).toBe('1.2.3.4');
      expect(body.user_agent).toBe('test-agent');
    });
  });

  describe('Supabase integration', () => {
    it('returns 500 when SUPABASE_URL is missing', async () => {
      delete process.env.SUPABASE_URL;
      const mod = await import('../../netlify/functions/api-lead');
      const res = await mod.handler(createEvent(VALID_PAYLOAD));
      expect(res.statusCode).toBe(500);
      const data = JSON.parse(res.body);
      expect(data.error).toContain('Missing Supabase configuration');
    });

    it('returns 502 when Supabase responds with error', async () => {
      vi.stubGlobal('fetch', vi.fn(() =>
        Promise.resolve(new Response('DB Error', { status: 500 }))
      ));
      const res = await handler(createEvent(VALID_PAYLOAD));
      expect(res.statusCode).toBe(502);
      const data = JSON.parse(res.body);
      expect(data.error).toContain('Failed to store lead');
    });

    it('returns 200 on success', async () => {
      const res = await handler(createEvent(VALID_PAYLOAD));
      expect(res.statusCode).toBe(200);
      const data = JSON.parse(res.body);
      expect(data.success).toBe(true);
    });

    it('sends correct headers to Supabase', async () => {
      await handler(createEvent(VALID_PAYLOAD));
      const fetchCall = vi.mocked(fetch).mock.calls[0];
      const url = fetchCall[0] as string;
      const opts = fetchCall[1]!;
      expect(url).toBe('https://test.supabase.co/rest/v1/leads');
      expect(opts.method).toBe('POST');
      const headers = opts.headers as Record<string, string>;
      expect(headers.apikey).toBe('test-key');
      expect(headers.authorization).toBe('Bearer test-key');
    });
  });
});
