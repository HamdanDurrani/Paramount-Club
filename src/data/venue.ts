import type { FacilityItem, VenueSpace, VenueStat } from "@/types";

/**
 * Venue page media and copy.
 * Capacity (~5,000) is confirmed; other facility details stay soft until verified.
 */

export const VENUE_VIDEO = {
  src: "/media/venue/hero.mp4",
  poster: "/media/venue/4.png",
} as const;

export const VENUE_IMAGES = {
  hall: {
    src: "/media/venue/4.png",
    alt: "Paramount Club grand hall with ceremonial walkway and stage",
  },
  stage: {
    src: "/media/venue/1.png",
    alt: "Paramount Club stage with floral backdrop and crystal chandeliers",
  },
  setupFloral: {
    src: "/media/venue/2.png",
    alt: "Floral canopy stage setup with mirrored floor at Paramount Club",
  },
  setupDraped: {
    src: "/media/venue/3.png",
    alt: "Draped stage with chandeliers and ceremonial seating at Paramount Club",
  },
  entrance: [
    {
      src: "/media/venue/entrance-1.jpg",
      alt: "Floral aisle entrance leading to the Paramount Club stage",
    },
    {
      src: "/media/venue/entrance-2.jpg",
      alt: "Candlelit ceremonial walkway beneath draped ceiling at Paramount Club",
    },
    {
      src: "/media/venue/entrance-3.jpg",
      alt: "Grand floral entrance aisle with illuminated décor",
    },
    {
      src: "/media/venue/entrance-4.jpg",
      alt: "Marble aisle entrance framed by floral light pedestals",
    },
  ],
  danceFloor: {
    src: "/media/venue/dance-floor.jpg",
    alt: "Paramount Club dance floor under a starlit chandelier ceiling",
  },
  dj: {
    src: "/media/venue/dj.jpg",
    alt: "Professional DJ setup at Paramount Club",
  },
  celebrity: {
    src: "/media/venue/celebrity.jpg",
    alt: "Live celebrity performance on the Paramount Club stage",
  },
} as const;

export const venueStats: VenueStat[] = [
  { value: "5,000+", label: "Guest Capacity" },
  { value: "Grand", label: "Ballroom" },
  { value: "Premium", label: "Event Experience" },
  { value: "Dedicated", label: "Event Team" },
];

export const venueIntro = {
  eyebrow: "The Venue",
  headingLines: ["A Venue", "Built For", "Grand Moments."],
  body: "Paramount Club is a luxury wedding and events destination in Peshawar, designed for celebrations of remarkable scale. With capacity for approximately 5,000 guests, the venue offers a grand ballroom setting and a refined hospitality experience for weddings, Mehndi, Walima, and private occasions.",
};

export const venuePageContent = {
  hero: {
    eyebrow: "Paramount Club · Peshawar",
    title: "A venue of scale, crafted for life's defining moments.",
    subtitle:
      "A luxury wedding and events destination built for celebrations of extraordinary presence.",
  },
  intro: {
    eyebrow: "The Venue",
    heading: "Space that holds thousands — without losing atmosphere.",
    body: [
      "Paramount Club is a premium wedding hall and event venue in Peshawar, designed for grand Pakistani celebrations — weddings, Mehndi, Walima, engagements — as well as private occasions that need both scale and refinement.",
      "From the ceremonial walkway to the stage, every space is composed for presence, flow, and a guest experience that feels considered from arrival to farewell.",
    ],
  },
  atmosphere: {
    caption: "A stage composed for ceremony, presence, and light.",
  },
  entrance: {
    eyebrow: "The Arrival",
    heading: "An entrance that sets the tone.",
    body: "From the first step inside, the aisle, light, and florals compose a ceremonial welcome — the beginning of every celebration.",
  },
  danceFloor: {
    caption: "A dance floor made for nights that stay with you.",
  },
  entertainment: {
    eyebrow: "Entertainment",
    heading: "DJ nights and live performances.",
    body: "From a dedicated DJ presence to celebrity performances on stage — Paramount Club holds the energy of the celebration as carefully as the décor.",
    dj: {
      title: "DJ",
      description: "A professional sound presence ready for receptions, after-parties, and nights that move.",
    },
    celebrity: {
      title: "Celebrity Singing",
      description: "Live performances hosted on stage — moments that turn a gathering into an unforgettable night.",
    },
  },
  setups: {
    eyebrow: "Design Your Own Stage",
    heading: "Atmospheres shaped for the occasion.",
    floral: {
      title: "Floral Canopy",
      description:
        "Cascading florals and a mirrored floor for celebrations that feel immersive and luminous.",
    },
    draped: {
      title: "Draped Grandeur",
      description:
        "Soft drapery, crystal light, and ceremonial seating for a refined reception setting.",
    },
  },
  stageDesignsCta: {
    eyebrow: "Stage Designs",
    title: "Explore stage designs",
    body: "Browse décor directions by celebration — Mehndi, Barat, Walima, birthdays, and more — then choose a look when you enquire.",
    ctaLabel: "Explore Stage Designs",
    ctaHref: "/stage-designs",
  },
  capacity: {
    eyebrow: "Scale",
    heading: "Built for approximately 5,000 guests.",
    body: "Ideal for landmark weddings and major celebrations that require both grandeur and operational clarity.",
  },
  cta: {
    title: "Ready to experience the venue?",
    body: "Enquire for availability, tour the spaces, or begin planning your celebration with our team.",
  },
};

/** Used by legacy home sections if re-enabled. */
export const ballroomSpaces: VenueSpace[] = [
  {
    id: "hall",
    title: "Grand Hall",
    description: "A commanding first impression for arriving guests.",
    media: {
      id: "venue-hall",
      kind: "image",
      src: VENUE_IMAGES.hall.src,
      alt: VENUE_IMAGES.hall.alt,
      label: "Hall",
      aspectRatio: "16 / 10",
    },
  },
  {
    id: "stage",
    title: "Stage",
    description: "A focal point for ceremonies and presentations.",
    media: {
      id: "venue-stage",
      kind: "image",
      src: VENUE_IMAGES.stage.src,
      alt: VENUE_IMAGES.stage.alt,
      label: "Stage",
      aspectRatio: "16 / 10",
    },
  },
  {
    id: "setup-floral",
    title: "Floral Canopy",
    description: "An immersive floral direction for landmark celebrations.",
    media: {
      id: "venue-setup-floral",
      kind: "image",
      src: VENUE_IMAGES.setupFloral.src,
      alt: VENUE_IMAGES.setupFloral.alt,
      label: "Floral",
      aspectRatio: "16 / 10",
    },
  },
  {
    id: "setup-draped",
    title: "Draped Grandeur",
    description: "Soft drapery and crystal light for refined receptions.",
    media: {
      id: "venue-setup-draped",
      kind: "image",
      src: VENUE_IMAGES.setupDraped.src,
      alt: VENUE_IMAGES.setupDraped.alt,
      label: "Draped",
      aspectRatio: "16 / 10",
    },
  },
];

export const facilities: FacilityItem[] = [
  {
    id: "fac-capacity",
    title: "Guest Capacity",
    description:
      "Approximately 5,000 guests — suited to large Barat, Walima, and landmark celebrations.",
  },
  {
    id: "fac-seating",
    title: "Seating Concepts",
    description:
      "[SEATING LAYOUT DETAILS TBD] — flexible concepts for ceremony, reception, and banquet formats.",
    placeholder: true,
  },
  {
    id: "fac-parking",
    title: "Parking",
    description:
      "[PARKING CAPACITY & ACCESS DETAILS TBD] — enquire for current parking guidance.",
    placeholder: true,
  },
  {
    id: "fac-ac",
    title: "Air Conditioning",
    description:
      "[AC COVERAGE & SERVICE MODEL TBD] — climate comfort for large guest lists.",
    placeholder: true,
  },
  {
    id: "fac-heater",
    title: "Heating",
    description:
      "[HEATER AVAILABILITY & SEASONAL DETAILS TBD] — enquire for cooler-month hosting.",
    placeholder: true,
  },
  {
    id: "fac-stage",
    title: "Stage",
    description:
      "A dedicated stage focal point for ceremonies and presentations. [STAGE DIMENSIONS TBD]",
    placeholder: true,
  },
];

export const hospitalityThemes = [
  {
    id: "scale",
    title: "Grand Scale",
    description: "Space that holds thousands without losing presence.",
  },
  {
    id: "spaces",
    title: "Elegant Spaces",
    description: "Interiors composed for atmosphere and flow.",
  },
  {
    id: "coordination",
    title: "Event Coordination",
    description: "Guided support from enquiry through celebration.",
  },
  {
    id: "hospitality",
    title: "Hospitality",
    description: "Attentive hosting for every guest experience.",
  },
  {
    id: "dining",
    title: "Dining",
    description: "Service-ready layouts for refined receptions.",
  },
  {
    id: "flexible",
    title: "Flexible Setups",
    description: "Configurations tailored to each occasion.",
  },
];
