/**
 * Homepage “Our Values” cards.
 * Images temporarily reuse hero stills — replace with dedicated photography later.
 */

export const valuesIntro = {
  eyebrow: "Our Values",
  title: "What drives us at our core",
} as const;

export const values = [
  {
    id: "grandeur",
    title: "Grandeur",
    description: "Spaces designed for celebrations of remarkable scale.",
    image: "/media/hero/main-2.png",
    imageAlt: "Grand hall setting at Paramount Club",
  },
  {
    id: "tradition",
    title: "Tradition",
    description: "Honouring weddings, Mehndi, Walima and timeless gatherings.",
    image: "/media/hero/main3.png",
    imageAlt: "Celebration atmosphere at Paramount Club",
  },
  {
    id: "hospitality",
    title: "Hospitality",
    description: "Thoughtful hosting from first enquiry to final farewell.",
    image: "/media/hero/main4.png",
    imageAlt: "Hospitality experience at Paramount Club",
  },
  {
    id: "elegance",
    title: "Elegance",
    description: "A refined setting where every detail feels considered.",
    image: "/media/hero/main-2.png",
    imageAlt: "Elegant venue interior at Paramount Club",
  },
  {
    id: "trust",
    title: "Trust",
    description: "Clarity, care and confidence for life’s defining moments.",
    image: "/media/hero/main3.png",
    imageAlt: "Trusted celebration venue in Peshawar",
  },
] as const;
