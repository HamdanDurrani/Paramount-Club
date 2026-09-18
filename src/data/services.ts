/**
 * Homepage “Our Services” cards.
 * Images temporarily use hero stills — replace with dedicated service photography later.
 */

export const servicesIntro = {
  title: "Our Services",
  paragraphs: [
    "From weddings that deserve to be remembered to celebrations shared with the people who matter most, Paramount Club provides the setting for life’s most meaningful occasions. Whether it’s a grand wedding, an elegant reception, a traditional celebration or a private gathering, every experience is shaped around exceptional spaces, thoughtful details and memorable hospitality.",
    "Celebrate beautifully. Gather effortlessly. Make it unforgettable.",
  ],
} as const;

export const services = [
  {
    id: "weddings",
    title: "Weddings",
    description:
      "Grand wedding celebrations designed for scale, elegance and moments that stay with you.",
    image: "/media/hero/main-2.png",
    imageAlt: "Paramount Club wedding hall setting",
    ctaLabel: "Explore Weddings",
    href: "/experiences#weddings",
  },
  {
    id: "celebrations",
    title: "Celebrations",
    description:
      "Receptions, Mehndi, Walima and traditional gatherings hosted with refined hospitality.",
    image: "/media/hero/main3.png",
    imageAlt: "Paramount Club celebration atmosphere",
    ctaLabel: "Discover Celebrations",
    href: "/experiences",
  },
  {
    id: "private",
    title: "Private Gatherings",
    description:
      "Intimate occasions and private events shaped around comfort, flow and memorable detail.",
    image: "/media/hero/main4.png",
    imageAlt: "Paramount Club private gathering space",
    ctaLabel: "Plan Your Gathering",
    href: "/availability",
  },
] as const;
