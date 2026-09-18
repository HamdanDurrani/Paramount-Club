/**
 * Stage design categories and sample setups for /stage-designs.
 * Images reuse venue photography until dedicated décor assets are provided.
 */

export type StageDesignCategoryId =
  | "all"
  | "mehndi"
  | "barat"
  | "walima"
  | "engagement"
  | "birthday"
  | "private";

export interface StageDesignItem {
  id: string;
  category: Exclude<StageDesignCategoryId, "all">;
  title: string;
  description: string;
  src: string;
  alt: string;
}

export const stageDesignCategories: {
  id: StageDesignCategoryId;
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "mehndi", label: "Mehndi" },
  { id: "barat", label: "Barat" },
  { id: "walima", label: "Walima" },
  { id: "engagement", label: "Engagement" },
  { id: "birthday", label: "Birthday" },
  { id: "private", label: "Private Party" },
];

export const stageDesigns: StageDesignItem[] = [
  {
    id: "mehndi-floral",
    category: "mehndi",
    title: "Mehndi Floral Canopy",
    description: "Cascading florals and warm light for an intimate Mehndi evening.",
    src: "/media/venue/2.png",
    alt: "Floral canopy stage suited to Mehndi celebrations",
  },
  {
    id: "mehndi-garden",
    category: "mehndi",
    title: "Garden Evening Stage",
    description: "Greenery and crystal accents for a softer ceremonial setting.",
    src: "/media/venue/1.png",
    alt: "Garden-inspired stage with floral backdrop",
  },
  {
    id: "barat-grand",
    category: "barat",
    title: "Barat Grandeur",
    description: "Draped presence and chandelier light for a landmark Barat.",
    src: "/media/venue/3.png",
    alt: "Draped stage setup for Barat celebrations",
  },
  {
    id: "barat-hall",
    category: "barat",
    title: "Processional Arrival",
    description: "Full-hall scale with ceremonial walkway and stage focal point.",
    src: "/media/venue/4.png",
    alt: "Grand hall stage for Barat processional arrivals",
  },
  {
    id: "walima-draped",
    category: "walima",
    title: "Walima Reception",
    description: "Refined drapery and seating for an elegant Walima reception.",
    src: "/media/venue/3.png",
    alt: "Walima reception stage with drapery and chandeliers",
  },
  {
    id: "walima-crystal",
    category: "walima",
    title: "Crystal Formal",
    description: "Crystal light and formal seating for a polished Walima look.",
    src: "/media/venue/1.png",
    alt: "Crystal stage setup for Walima",
  },
  {
    id: "engagement-intimate",
    category: "engagement",
    title: "Engagement Intimate",
    description: "A focused stage composition for engagements and smaller gatherings.",
    src: "/media/venue/1.png",
    alt: "Intimate engagement stage design",
  },
  {
    id: "engagement-floral",
    category: "engagement",
    title: "Engagement Floral",
    description: "Soft florals and mirrored light for a romantic engagement setting.",
    src: "/media/venue/2.png",
    alt: "Floral engagement stage design",
  },
  {
    id: "birthday-celebration",
    category: "birthday",
    title: "Birthday Celebration",
    description: "A luminous stage direction suited to milestone birthday parties.",
    src: "/media/venue/4.png",
    alt: "Birthday celebration stage in the grand hall",
  },
  {
    id: "birthday-festive",
    category: "birthday",
    title: "Festive Birthday",
    description: "Bright décor presence for celebrations that feel joyful and grand.",
    src: "/media/venue/2.png",
    alt: "Festive birthday stage design",
  },
  {
    id: "private-gathering",
    category: "private",
    title: "Private Gathering",
    description: "Flexible staging for private occasions and family celebrations.",
    src: "/media/venue/3.png",
    alt: "Private party stage setup",
  },
  {
    id: "private-evening",
    category: "private",
    title: "Evening Private",
    description: "Warm evening atmosphere for exclusive private events.",
    src: "/media/venue/1.png",
    alt: "Evening private party stage design",
  },
];

export const stageDesignsPageContent = {
  eyebrow: "Stage Designs",
  title: "Design your own stage",
  subtitle:
    "Browse décor directions by celebration type — Mehndi, Barat, Walima, birthdays, and more. Select a direction when you enquire for your date.",
};
