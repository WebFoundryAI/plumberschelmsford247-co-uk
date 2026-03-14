export interface Location {
  slug: string;
  name: string;
  countyOrRegion?: string;
  latitude: number;
  longitude: number;
  noindex?: boolean;
}

export const PRIMARY_LOCATION: Location = {
  slug: "chelmsford",
  name: "Chelmsford",
  countyOrRegion: "Essex",
  latitude: 51.7353,
  longitude: 0.4743,
};

export const LOCATIONS: Location[] = [
  PRIMARY_LOCATION,
  {
    slug: "witham",
    name: "Witham",
    countyOrRegion: "Essex",
    latitude: 51.7968,
    longitude: 0.6404,
  },
  {
    slug: "braintree",
    name: "Braintree",
    countyOrRegion: "Essex",
    latitude: 51.8784,
    longitude: 0.5539,
  },
  {
    slug: "maldon",
    name: "Maldon",
    countyOrRegion: "Essex",
    latitude: 51.7319,
    longitude: 0.6767,
  },
  {
    slug: "brentwood",
    name: "Brentwood",
    countyOrRegion: "Essex",
    latitude: 51.6211,
    longitude: 0.3053,
  },
  {
    slug: "billericay",
    name: "Billericay",
    countyOrRegion: "Essex",
    latitude: 51.6283,
    longitude: 0.4189,
  },
  {
    slug: "ingatestone",
    name: "Ingatestone",
    countyOrRegion: "Essex",
    latitude: 51.6660,
    longitude: 0.3831,
  },
  {
    slug: "great-baddow",
    name: "Great Baddow",
    countyOrRegion: "Essex",
    latitude: 51.7130,
    longitude: 0.5047,
  },
  {
    slug: "springfield",
    name: "Springfield",
    countyOrRegion: "Essex",
    latitude: 51.7440,
    longitude: 0.5020,
  },
];

export const INDEXED_LOCATIONS = LOCATIONS.filter((l) => !l.noindex);

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((location) => location.slug === slug);
}
