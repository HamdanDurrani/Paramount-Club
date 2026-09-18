import type { PackageItem } from "@/types";

/**
 * Package directions — pricing remains on enquiry until confirmed.
 */

export const PACKAGES_HERO = {
  src: "/media/venue/3.png",
  alt: "Draped stage and ceremonial seating at Paramount Club",
} as const;

export const packagesPageContent = {
  hero: {
    eyebrow: "Packages",
    title: "Hosting directions, shaped around your celebration.",
    subtitle:
      "Clear package pathways for weddings and events. Pricing is shared on enquiry once we understand your date, guest count, and preferred setup.",
  },
  intro: {
    eyebrow: "How it works",
    heading: "Choose a direction. We’ll refine the details together.",
    body: "Each package outlines a hosting level — venue access, coordination, and stage presence. Final inclusions are confirmed with our team when you enquire.",
  },
  cta: {
    title: "Ready to discuss your package?",
    body: "Share your date and celebration type. We’ll guide you through availability, staging, and the right hosting direction for your occasion.",
  },
};

export const packages: PackageItem[] = [
  {
    id: "pkg-essential",
    name: "Essential",
    summary: "Core venue hosting",
    details:
      "A foundational hosting direction for celebrations that need elegant space, clear flow, and reliable coordination — without unnecessary complexity.",
    priceLabel: "Price on enquiry",
    included: [
      "Venue hall access for your event window",
      "Seating concept guidance",
      "Stage access for ceremony and presentation",
      "On-site event coordination support",
    ],
    notIncluded: [
      "Full décor styling and florals",
      "Catering and beverage service",
      "Premium AV, lighting, and entertainment upgrades",
    ],
  },
  {
    id: "pkg-signature",
    name: "Signature",
    summary: "Elevated celebration hosting",
    details:
      "Designed for Barat, Walima, and large receptions that require a fuller presence — refined layouts, stage direction, and a more composed guest experience.",
    priceLabel: "Price on enquiry",
    included: [
      "Venue hall access for your event window",
      "Seating layout planning and support",
      "Stage setup coordination",
      "Selected décor direction guidance",
      "Dedicated event coordination",
    ],
    notIncluded: [
      "Premium décor upgrades beyond selected direction",
      "Guest transport and off-site logistics",
      "Services outside the agreed hosting scope",
    ],
  },
  {
    id: "pkg-grand",
    name: "Grand",
    summary: "Full-scale landmark events",
    details:
      "Oriented toward landmark celebrations and large guest lists — composed for scale, hospitality flow, and a complete hosting presence from arrival to farewell.",
    priceLabel: "Price on enquiry",
    included: [
      "Full venue hosting window",
      "Comprehensive coordination support",
      "Stage and seating concepts for large capacity",
      "Hospitality flow planning",
      "Priority event team support",
    ],
    notIncluded: [
      "External vendor fees",
      "Guest accommodation",
      "Items outside the agreed package scope",
    ],
  },
];
