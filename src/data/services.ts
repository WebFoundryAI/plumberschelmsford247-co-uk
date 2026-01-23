export interface SubService {
  slug: string;
  name: string;
  shortLabel?: string;
  description: string;
}

export interface Service {
  slug: string;
  name: string;
  shortLabel: string;
  description: string;
  icon: string;
  subServices?: SubService[];
}

export const SERVICES: Service[] = [
  {
    slug: "blocked-drains",
    name: "Blocked Drains",
    shortLabel: "Blocked drains cleared fast",
    description: "Professional drain unblocking service using the latest equipment. We clear all types of blockages quickly and efficiently.",
    icon: "🚿",
    subServices: [
      {
        slug: "blocked-toilet",
        name: "Blocked Toilet",
        shortLabel: "Toilet unblocking",
        description: "Fast and effective toilet unblocking service for domestic and commercial properties.",
      },
      {
        slug: "blocked-sink",
        name: "Blocked Sink",
        shortLabel: "Sink unblocking",
        description: "Professional sink unblocking for kitchen and bathroom sinks.",
      },
      {
        slug: "blocked-bath",
        name: "Blocked Bath & Shower",
        shortLabel: "Bath and shower unblocking",
        description: "Clear blockages in baths, showers, and wet rooms.",
      },
    ],
  },
  {
    slug: "drain-unblocking",
    name: "Drain Unblocking",
    shortLabel: "Sink and toilet unblocking",
    description: "Expert unblocking of sinks, toilets, baths, and shower drains. No call-out charges, fixed pricing.",
    icon: "🔧",
    subServices: [
      {
        slug: "external-drain-unblocking",
        name: "External Drain Unblocking",
        shortLabel: "Outside drain clearing",
        description: "Clear blockages in external drains, gullies, and manholes.",
      },
      {
        slug: "internal-drain-unblocking",
        name: "Internal Drain Unblocking",
        shortLabel: "Inside drain clearing",
        description: "Unblock internal drains throughout your property.",
      },
    ],
  },
  {
    slug: "cctv-drain-surveys",
    name: "CCTV Drain Surveys",
    shortLabel: "CCTV drain inspections",
    description: "High-definition CCTV surveys to diagnose drainage issues accurately. Detailed reports provided.",
    icon: "📹",
    subServices: [
      {
        slug: "pre-purchase-survey",
        name: "Pre-Purchase Drain Survey",
        shortLabel: "Homebuyer drain survey",
        description: "Comprehensive drain survey before buying a property.",
      },
      {
        slug: "drainage-investigation",
        name: "Drainage Investigation",
        shortLabel: "Problem diagnosis",
        description: "Detailed investigation to identify the cause of drainage problems.",
      },
    ],
  },
  {
    slug: "drain-jetting",
    name: "Drain Jetting",
    shortLabel: "High-pressure jetting",
    description: "Powerful high-pressure water jetting to clear stubborn blockages and clean drains thoroughly.",
    icon: "💧",
    subServices: [
      {
        slug: "domestic-jetting",
        name: "Domestic Drain Jetting",
        shortLabel: "Home drain jetting",
        description: "High-pressure jetting for residential properties.",
      },
      {
        slug: "commercial-jetting",
        name: "Commercial Drain Jetting",
        shortLabel: "Business drain jetting",
        description: "Industrial-strength jetting for commercial properties.",
      },
    ],
  },
  {
    slug: "emergency-drain-services",
    name: "Emergency Drain Services",
    shortLabel: "24/7 emergency callouts",
    description: "Round-the-clock emergency drainage services. Fast response times when you need us most.",
    icon: "🚨",
    subServices: [
      {
        slug: "flooding-emergency",
        name: "Flooding Emergency",
        shortLabel: "Flood response",
        description: "Immediate response to flooding and water damage emergencies.",
      },
      {
        slug: "sewage-emergency",
        name: "Sewage Emergency",
        shortLabel: "Sewage backup",
        description: "Urgent response to sewage backups and overflows.",
      },
    ],
  },
  {
    slug: "drain-repairs",
    name: "Drain Repairs",
    shortLabel: "Drain repair services",
    description: "Professional drain repair services including pipe repairs, relining, and replacement.",
    icon: "🔧",
    subServices: [
      {
        slug: "pipe-relining",
        name: "Pipe Relining",
        shortLabel: "No-dig pipe repair",
        description: "Trenchless pipe relining to repair damaged drains without excavation.",
      },
      {
        slug: "drain-excavation",
        name: "Drain Excavation",
        shortLabel: "Excavation and replacement",
        description: "Full drain excavation and replacement for severely damaged pipes.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getSubServiceBySlug(serviceSlug: string, subServiceSlug: string): SubService | undefined {
  const service = getServiceBySlug(serviceSlug);
  return service?.subServices?.find((sub) => sub.slug === subServiceSlug);
}
