import { BRAND } from './brand';

export interface FAQ {
  question: string;
  answer: string;
}

export const GENERIC_FAQS: FAQ[] = [
  {
    question: "Do you charge a call-out fee?",
    answer: `No, ${BRAND.brandName} does not charge any call-out fees. You only pay for the work completed.`,
  },
  {
    question: "Are you available for emergencies?",
    answer: `Yes, we offer 24/7 emergency drainage services across ${BRAND.serviceAreaLabel}. Call ${BRAND.phoneFormatted} for immediate assistance.`,
  },
  {
    question: "Do you provide a guarantee on your work?",
    answer: "Yes, all our work is fully guaranteed. We stand behind the quality of our service and workmanship.",
  },
];

export const SERVICE_FAQS: Record<string, FAQ[]> = {
  "blocked-drains": [
    {
      question: "How quickly can you clear a blocked drain?",
      answer: "Most blocked drains can be cleared within 1-2 hours of our arrival. For more complex blockages, we'll provide a clear timeframe after initial assessment.",
    },
    {
      question: "What causes drains to become blocked?",
      answer: "Common causes include fat and grease buildup, hair accumulation, food waste, tree root ingress, and foreign objects. We can identify the exact cause using CCTV inspection.",
    },
    {
      question: "Will clearing a blocked drain damage my pipes?",
      answer: "No, our professional equipment and techniques are designed to clear blockages without damaging your pipes. We use appropriate methods for different pipe materials.",
    },
  ],
  "cctv-drain-surveys": [
    {
      question: "What does a CCTV drain survey show?",
      answer: "A CCTV survey shows the internal condition of your drains, identifying blockages, cracks, root ingress, collapsed sections, and other issues with detailed footage.",
    },
    {
      question: "Do I need a drain survey before buying a house?",
      answer: "We strongly recommend a pre-purchase drain survey. It can reveal hidden issues that could cost thousands to repair, giving you negotiating power or peace of mind.",
    },
    {
      question: "How long does a CCTV drain survey take?",
      answer: "A typical residential survey takes 1-2 hours. You'll receive a detailed report with footage showing the condition of your drainage system.",
    },
  ],
  "drain-jetting": [
    {
      question: "Is high-pressure drain jetting safe for old pipes?",
      answer: "Yes, when performed by professionals. We adjust the water pressure based on the pipe material and condition to ensure safe and effective cleaning.",
    },
    {
      question: "How often should drains be jetted?",
      answer: "For most residential properties, annual or bi-annual jetting helps prevent blockages. Commercial kitchens may require more frequent maintenance due to grease buildup.",
    },
  ],
  "emergency-drain-services": [
    {
      question: "How quickly can you respond to an emergency?",
      answer: `We aim to arrive within 1-2 hours for emergency callouts across ${BRAND.serviceAreaLabel}. Call ${BRAND.phoneFormatted} for immediate assistance.`,
    },
    {
      question: "Do you charge extra for out-of-hours emergencies?",
      answer: "We offer competitive fixed pricing for all work, including emergency callouts. We'll provide a clear quote before starting any work.",
    },
  ],
};

export function getServiceFAQs(serviceSlug: string): FAQ[] {
  const serviceFaqs = SERVICE_FAQS[serviceSlug] || [];
  return [...serviceFaqs, ...GENERIC_FAQS];
}

export function getLocationFAQs(locationName: string): FAQ[] {
  return [
    {
      question: `Do you cover ${locationName}?`,
      answer: `Yes, ${BRAND.brandName} provides comprehensive drainage services throughout ${locationName} and the surrounding areas of ${BRAND.serviceAreaLabel}.`,
    },
    {
      question: `How quickly can you get to ${locationName}?`,
      answer: `We typically arrive within 1-2 hours for emergency callouts in ${locationName}. For scheduled appointments, we offer flexible booking times.`,
    },
    {
      question: `What drainage services do you offer in ${locationName}?`,
      answer: `We offer all our services in ${locationName} including drain unblocking, CCTV surveys, drain jetting, repairs, and 24/7 emergency callouts.`,
    },
  ];
}

export const PAGE_FAQS: FAQ[] = [
  {
    question: "How quickly can you respond to an emergency callout?",
    answer: "We aim to respond to emergency drainage callouts within 60-90 minutes across Manchester and Greater Manchester. Our team operates around the clock, so help is available whenever you need it, day or night."
  },
  {
    question: "Do you charge a call-out fee?",
    answer: "No, we do not charge a call-out fee. You only pay for the work that is carried out. We provide a clear quote before starting any job, so there are no unexpected costs."
  },
  {
    question: "What areas do you cover?",
    answer: "We provide drainage services throughout Manchester and Greater Manchester, including Salford, Stockport, Altrincham, Bolton, Oldham, Rochdale, Sale, Didsbury, and Chorlton."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, debit and credit card payments, and bank transfers. Payment is typically collected upon completion of the work."
  },
  {
    question: "Can you help with commercial drainage problems?",
    answer: "Yes, we offer drainage services for both residential and commercial properties. Whether you manage a shop, office, restaurant, or industrial premises, we can assist with blockages, repairs, and maintenance."
  },
  {
    question: "What is a CCTV drain survey and when is it needed?",
    answer: "A CCTV drain survey uses a small camera to inspect the inside of your drainage pipes. It is useful for diagnosing recurring blockages, identifying damage or cracks, and providing a clear picture of the condition of your drains before purchasing a property."
  },
  {
    question: "How can I prevent blocked drains?",
    answer: "Avoid pouring cooking oils and fats down the sink, use drain guards to catch hair and debris, and dispose of items like wet wipes and sanitary products in the bin rather than flushing them. Regular maintenance can also help keep your drains clear."
  },
  {
    question: "Are your engineers qualified and insured?",
    answer: "Yes, all our engineers are fully trained and experienced in drainage work. We are also fully insured, giving you peace of mind that your property is protected while we carry out the work."
  }
];
