import type { DecorOption } from "@/types";

/**
 * Stage décor options for Experiences / Venue / Availability questionnaire.
 * Drop images into public/media/decor/ and set `src` to match `imagePath`.
 * TODO: Replace placeholder décor names and photography with confirmed client options.
 */
export const decorOptions: DecorOption[] = [
  {
    id: "decor-classic",
    name: "[Décor Option — Classic]",
    description: "Refined stage presence with restrained luxury styling.",
    imagePath: "/media/decor/classic.jpg",
    aspectRatio: "4 / 5",
  },
  {
    id: "decor-grand",
    name: "[Décor Option — Grand]",
    description: "A fuller stage composition for large Barat and Walima celebrations.",
    imagePath: "/media/decor/grand.jpg",
    aspectRatio: "4 / 5",
  },
  {
    id: "decor-garden",
    name: "[Décor Option — Garden Evening]",
    description: "Softer atmospheric styling suited to Mehndi and evening gatherings.",
    imagePath: "/media/decor/garden-evening.jpg",
    aspectRatio: "4 / 5",
  },
  {
    id: "decor-minimal",
    name: "[Décor Option — Minimal]",
    description: "Clean architectural framing with champagne-gold accents.",
    imagePath: "/media/decor/minimal.jpg",
    aspectRatio: "4 / 5",
  },
];

/** Special choice used in the availability questionnaire. */
export const DECOR_DISCUSS_LATER_ID = "discuss-later";
