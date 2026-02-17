import { describe, it, expect, beforeEach, vi } from 'vitest';

// We need to dynamically import to reset module state between tests
let onRequestPost: (context: any) => Promise<Response>;

function createContext(
  body: object | string,
  headers: Record<string, string> = {},
  env: Record<string, string> = {}
) {
  const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
  return {
    request: new Request('https://example.com/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CF-Connecting-IP': '1.2.3.4',
        ...headers,
      },
      body: bodyStr,
    }),
    env: {
      SUPABASE_URL: 'https://test.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'test-key',
      ...env,
    },
  };
}

const VALID_PAYLOAD = {
  name: 'John Doe',
  phone: '07700900000',
  postcode: 'm2 3wq',
  service: 'Blocked Drains',
};

describe('Cloudflare Lead API', () => {
  beforeEach(async () => {
    vi.resetModules();
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve(new Response('', { status: 201 }))
    ));
    // Clear rate limit state
    (globalThis as any).__leadRateLimit = undefined;
    const mod = await import('../../functions/api/lead');
    onRequestPost = mod.onRequestPost;
  });

  describe('JSON parsing', () => {
    it('returns 400 for malformed JSON', async () => {
      const ctx = {
        request: new Request('https://example.com/api/lead', {
          method: 'POST',
          body: 'not json{',
          headers: { 'CF-Connecting-IP': '1.2.3.4' },
        }),
        env: { SUPABASE_URL: 'https://test.supabase.co', SUPABASE_SERVICE_ROLE_KEY: 'k' },
      };
      const res = await onRequestPost(ctx);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toContain('Invalid JSON');
    });
  });

  describe('Input validation', () => {
    it('returns 400 when all required fields are missing', async () => {
      const ctx = createContext({});
      const res = await onRequestPost(ctx);
      expect(res.status).toBe(400);
      const data: any = await res.json();
      expect(data.fields).toContain('name is required');
      expect(data.fields).toContain('phone is required');
      expect(data.fields).toContain('postcode is required');
      expect(data.fields).toContain('service is required');
    });

    it('returns 400 when name is missing', async () => {
      const ctx = createContext({ phone: '07700900000', postcode: 'M2 3WQ', service: 'Drains' });
      const res = await onRequestPost(ctx);
      expect(res.status).toBe(400);
      const data: any = await res.json();
      expect(data.fields).toContain('name is required');
    });

    it('returns 400 when fields are whitespace-only', async () => {
      const ctx = createContext({ name: '   ', phone: '  ', postcode: '  ', service: '  ' });
      const res = await onRequestPost(ctx);
      expect(res.status).toBe(400);
      const data: any = await res.json();
      expect(data.fields.length).toBe(4);
    });

    it('accepts valid payload with all required fields', async () => {
      const ctx = createContext(VALID_PAYLOAD);
      const res = await onRequestPost(ctx);
      expect(res.status).toBe(200);
      const data: any = await res.json();
      expect(data.success).toBe(true);
    });
  });

  describe('Honeypot spam detection', () => {
    it('returns 400 when company field has a value', async () => {
      const ctx = createContext({ ...VALID_PAYLOAD, company: 'SpamCo' });
      const res = await onRequestPost(ctx);
      expect(res.status).toBe(400);
      const data: any = await res.json();
      expect(data.error).toContain('spam detected');
    });

    it('passes when company field is empty string', async () => {
      const ctx = createContext({ ...VALID_PAYLOAD, company: '' });
      const res = await onRequestPost(ctx);
      expect(res.status).toBe(200);
    });

    it('passes when company field is absent', async () => {
      const ctx = createContext(VALID_PAYLOAD);
      const res = await onRequestPost(ctx);
      expect(res.status).toBe(200);
    });
  });

  describe('Rate limiting', () => {
    it('allows first 5 requests from same IP', async () => {
      for (let i = 0; i < 5; i++) {
        const ctx = createContext(VALID_PAYLOAD);
        const res = await onRequestPost(ctx);
        expect(res.status).toBe(200);
      }
    });

    it('returns 429 on 6th request within 15-minute window', async () => {
      for (let i = 0; i < 5; i++) {
        await onRequestPost(createContext(VALID_PAYLOAD));
      }
      const ctx = createContext(VALID_PAYLOAD);
      const res = await onRequestPost(ctx);
      expect(res.status).toBe(429);
      const data: any = await res.json();
      expect(data.error).toContain('Too many requests');
    });

    it('tracks different IPs independently', async () => {
      // Exhaust IP 1
      for (let i = 0; i < 5; i++) {
        await onRequestPost(createContext(VALID_PAYLOAD));
      }
      // IP 2 should still be allowed
      const ctx = createContext(VALID_PAYLOAD, { 'CF-Connecting-IP': '5.6.7.8' });
      const res = await onRequestPost(ctx);
      expect(res.status).toBe(200);
    });

    it('falls back to "unknown" when CF-Connecting-IP header is missing', async () => {
      const ctx = {
        request: new Request('https://example.com/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(VALID_PAYLOAD),
        }),
        env: { SUPABASE_URL: 'https://test.supabase.co', SUPABASE_SERVICE_ROLE_KEY: 'k' },
      };
      const res = await onRequestPost(ctx);
      expect(res.status).toBe(200);
    });
  });

  describe('Record sanitization', () => {
    it('trims whitespace and uppercases postcode', async () => {
      const ctx = createContext({
        name: '  John Doe  ',
        phone: ' 07700900000 ',
        postcode: '  m2 3wq  ',
        service: ' Blocked Drains ',
      });
      await onRequestPost(ctx);
      const fetchCall = vi.mocked(fetch).mock.calls[0];
      const body = JSON.parse(fetchCall[1]!.body as string);
      expect(body.name).toBe('John Doe');
      expect(body.phone).toBe('07700900000');
      expect(body.postcode).toBe('M2 3WQ');
      expect(body.service).toBe('Blocked Drains');
    });

    it('sets optional address to null when empty', async () => {
      const ctx = createContext({ ...VALID_PAYLOAD, address: '' });
      await onRequestPost(ctx);
      const fetchCall = vi.mocked(fetch).mock.calls[0];
      const body = JSON.parse(fetchCall[1]!.body as string);
      expect(body.address).toBeNull();
    });

    it('sets optional notes to null when empty', async () => {
      const ctx = createContext({ ...VALID_PAYLOAD, notes: '  ' });
      await onRequestPost(ctx);
      const fetchCall = vi.mocked(fetch).mock.calls[0];
      const body = JSON.parse(fetchCall[1]!.body as string);
      expect(body.notes).toBeNull();
    });

    it('defaults source to "website" when not provided', async () => {
      const ctx = createContext(VALID_PAYLOAD);
      await onRequestPost(ctx);
      const fetchCall = vi.mocked(fetch).mock.calls[0];
      const body = JSON.parse(fetchCall[1]!.body as string);
      expect(body.source).toBe('website');
    });
  });

  describe('Supabase integration', () => {
    it('returns 500 when SUPABASE_URL is missing', async () => {
      const ctx = createContext(VALID_PAYLOAD, {}, { SUPABASE_URL: '', SUPABASE_SERVICE_ROLE_KEY: 'k' });
      const res = await onRequestPost(ctx);
      expect(res.status).toBe(500);
      const data: any = await res.json();
      expect(data.error).toContain('Missing Supabase configuration');
    });

    it('returns 500 when SUPABASE_SERVICE_ROLE_KEY is missing', async () => {
      const ctx = createContext(VALID_PAYLOAD, {}, { SUPABASE_URL: 'https://test.supabase.co', SUPABASE_SERVICE_ROLE_KEY: '' });
      const res = await onRequestPost(ctx);
      expect(res.status).toBe(500);
    });

    it('returns 502 when Supabase responds with error', async () => {
      vi.stubGlobal('fetch', vi.fn(() =>
        Promise.resolve(new Response('Internal Server Error', { status: 500 }))
      ));
      const ctx = createContext(VALID_PAYLOAD);
      const res = await onRequestPost(ctx);
      expect(res.status).toBe(502);
      const data: any = await res.json();
      expect(data.error).toContain('Failed to store lead');
    });

    it('sends correct headers to Supabase', async () => {
      const ctx = createContext(VALID_PAYLOAD);
      await onRequestPost(ctx);
      const fetchCall = vi.mocked(fetch).mock.calls[0];
      const headers = fetchCall[1]!.headers as Record<string, string>;
      expect(headers['content-type']).toBe('application/json');
      expect(headers.apikey).toBe('test-key');
      expect(headers.authorization).toBe('Bearer test-key');
      expect(headers.prefer).toBe('return=minimal');
    });
  });
});
