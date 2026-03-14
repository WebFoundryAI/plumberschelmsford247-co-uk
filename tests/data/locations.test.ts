import { describe, it, expect } from 'vitest';
import {
  LOCATIONS,
  INDEXED_LOCATIONS,
  PRIMARY_LOCATION,
  getLocationBySlug,
} from '../../src/data/locations';

describe.skip('Locations Data', () => {
  describe.skip('LOCATIONS array integrity', () => {
    it('contains exactly 9 locations', () => {
      expect(LOCATIONS).toHaveLength(9);
    });

    it('every location has a unique slug', () => {
      const slugs = LOCATIONS.map((l) => l.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });

    it('every slug matches URL-safe pattern', () => {
      for (const loc of LOCATIONS) {
        expect(loc.slug).toMatch(/^[a-z0-9-]+$/);
      }
    });

    it('every location has latitude within Glasgow & Central Scotland bounds', () => {
      for (const loc of LOCATIONS) {
        expect(loc.latitude).toBeGreaterThan(55.6);
        expect(loc.latitude).toBeLessThan(56.1);
      }
    });

    it('every location has longitude within Glasgow & Central Scotland bounds', () => {
      for (const loc of LOCATIONS) {
        expect(loc.longitude).toBeGreaterThan(-4.5);
        expect(loc.longitude).toBeLessThan(-3.7);
      }
    });

    it('every location has countyOrRegion defined', () => {
      for (const loc of LOCATIONS) {
        expect(loc.countyOrRegion).toBeTruthy();
      }
    });
  });

  describe.skip('PRIMARY_LOCATION', () => {
    it('is "glasgow"', () => {
      expect(PRIMARY_LOCATION.slug).toBe('glasgow');
    });

    it('is first in LOCATIONS array', () => {
      expect(LOCATIONS[0]).toBe(PRIMARY_LOCATION);
    });
  });

  describe.skip('INDEXED_LOCATIONS', () => {
    it('contains all 9 locations', () => {
      expect(INDEXED_LOCATIONS).toHaveLength(9);
    });

    it('includes only locations without noindex', () => {
      for (const loc of INDEXED_LOCATIONS) {
        expect(loc.noindex).toBeFalsy();
      }
    });

    it('includes all location slugs', () => {
      const slugs = INDEXED_LOCATIONS.map((l) => l.slug);
      expect(slugs).toContain('glasgow');
      expect(slugs).toContain('east-kilbride');
      expect(slugs).toContain('paisley');
      expect(slugs).toContain('motherwell');
      expect(slugs).toContain('hamilton');
      expect(slugs).toContain('lanark');
      expect(slugs).toContain('cumbernauld');
      expect(slugs).toContain('coatbridge');
      expect(slugs).toContain('rutherglen');
    });
  });

  describe.skip('getLocationBySlug', () => {
    it('returns correct location for "glasgow"', () => {
      const loc = getLocationBySlug('glasgow');
      expect(loc).toBeDefined();
      expect(loc!.name).toBe('Glasgow');
    });

    it('returns correct location for "east-kilbride"', () => {
      const loc = getLocationBySlug('east-kilbride');
      expect(loc).toBeDefined();
      expect(loc!.name).toBe('East Kilbride');
    });

    it('returns undefined for non-existent slug', () => {
      expect(getLocationBySlug('nonexistent')).toBeUndefined();
    });

    it('returns undefined for empty string', () => {
      expect(getLocationBySlug('')).toBeUndefined();
    });
  });
});
