import type { Experience } from "@/types";

/**
 * Experience content for /experiences and home previews.
 */

export const EXPERIENCES_HERO = {
  src: "/media/experiences/hero.jpg",
  alt: "Paramount Club exterior illuminated at night",
} as const;

export const experiencesPageContent = {
  hero: {
    eyebrow: "Experiences",
    title: "Celebrations shaped with presence and care.",
    subtitle:
      "From landmark weddings to private gatherings, every occasion at Paramount Club is hosted with scale, elegance, and thoughtful hospitality.",
  },
  cta: {
    title: "Ready to plan your celebration?",
    body: "Share your date and occasion with us. We will guide you through availability, stage direction, and the details that make your event feel distinctly yours.",
  },
};

export const experiences: Experience[] = [
  {
    id: "weddings",
    title: "Weddings",
    shortDescription: "Grand celebrations crafted for unforgettable moments.",
    description:
      "Paramount Club is designed for weddings of remarkable scale — ceremonies, receptions, and guest experiences that feel both majestic and considered from arrival to farewell.",
    highlights: [
      "Capacity for large guest lists",
      "Grand ballroom and ceremonial stage",
      "Dedicated event coordination",
    ],
    media: {
      id: "exp-weddings",
      kind: "image",
      src: "/media/experiences/weddings.jpg",
      alt: "Bride and groom celebrating their wedding at Paramount Club",
      label: "Weddings",
      aspectRatio: "4 / 5",
    },
    href: "/experiences#weddings",
  },
  {
    id: "mehndi",
    title: "Mehndi",
    shortDescription: "Warm, vibrant evenings with refined hospitality.",
    description:
      "Create a distinctive Mehndi evening with flexible layouts, atmospheric lighting, and space for music, gathering, and celebration that feels joyful without losing elegance.",
    highlights: [
      "Flexible seating and lounge layouts",
      "Atmospheric evening lighting",
      "Space for performance and dance",
    ],
    media: {
      id: "exp-mehndi",
      kind: "image",
      src: "/media/experiences/mehndi.jpg",
      alt: "Mehndi celebration setup at Paramount Club",
      label: "Mehndi",
      aspectRatio: "4 / 5",
    },
    href: "/experiences#mehndi",
  },
  {
    id: "walima",
    title: "Walima",
    shortDescription: "Elegant receptions with presence and grandeur.",
    description:
      "Host a Walima that balances intimacy and grandeur — refined dining, formal presentations, and a guest flow composed for comfort at scale.",
    highlights: [
      "Formal dining layouts",
      "Stage and presentation areas",
      "Premium guest flow",
    ],
    media: {
      id: "exp-walima",
      kind: "image",
      src: "/media/experiences/walima.jpg",
      alt: "Walima reception setting at Paramount Club",
      label: "Walima",
      aspectRatio: "4 / 5",
    },
    href: "/experiences#walima",
  },
  {
    id: "engagements",
    title: "Engagements",
    shortDescription: "Refined gatherings for meaningful beginnings.",
    description:
      "Celebrate engagements in a polished setting suited to ceremonies, portraits, and gatherings — intimate or expansive, shaped around your preferred scale.",
    highlights: [
      "Ceremony-ready spaces",
      "Portrait-friendly settings",
      "Scalable guest capacity",
    ],
    media: {
      id: "exp-engagements",
      kind: "image",
      src: "/media/experiences/engagements.jpg",
      alt: "Engagement celebration at Paramount Club",
      label: "Engagements",
      aspectRatio: "4 / 5",
    },
    href: "/experiences#engagements",
  },
  {
    id: "corporate",
    title: "Corporate Events",
    shortDescription: "Professional hosting with hospitality polish.",
    description:
      "From conferences to gala dinners, Paramount Club provides a distinguished environment for corporate gatherings that require presence, clarity, and refined service.",
    highlights: [
      "Large-capacity hosting",
      "Presentation-ready layouts",
      "Hospitality-focused service",
    ],
    media: {
      id: "exp-corporate",
      kind: "image",
      src: "/media/experiences/corporate.jpg",
      alt: "Corporate event space at Paramount Club",
      label: "Corporate",
      aspectRatio: "4 / 5",
    },
    href: "/experiences#corporate",
  },
  {
    id: "private",
    title: "Private Celebrations",
    shortDescription: "Exclusive occasions, thoughtfully hosted.",
    description:
      "Birthdays, anniversaries, and private receptions find a refined home here — with adaptable setups and attentive coordination for occasions that deserve exclusivity.",
    highlights: [
      "Private event hosting",
      "Customizable layouts",
      "Dedicated coordination",
    ],
    media: {
      id: "exp-private",
      kind: "image",
      src: "/media/experiences/private.jpg",
      alt: "Private celebration at Paramount Club",
      label: "Private",
      aspectRatio: "4 / 5",
    },
    href: "/experiences#private",
  },
];
