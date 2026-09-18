/**
 * Site configuration for Paramount Club.
 */

export const SITE_NAME = "Paramount Club";
export const SITE_TAGLINE = "A destination for extraordinary celebrations.";
export const SITE_DESCRIPTION =
  "Paramount Club is a luxury wedding and events venue in Peshawar, Pakistan — designed for grand celebrations with capacity for approximately 5,000 guests.";

/** Production site URL — update when deploying. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://paramountclub.pk";

export const SITE_LOCALE = "en_PK";

/** Brand logo served from /public (no spaces in URL). */
export const SITE_LOGO = "/media/brand/logo-nav.png";

/** Short line used in the Farmform-style header (left). */
export const SITE_HEADER_TAGLINE = "Where Moments Become Memories";

/** Geographic market for SEO. */
export const SITE_LOCATION = {
  city: "Peshawar",
  region: "Khyber Pakhtunkhwa",
  country: "Pakistan",
  countryCode: "PK",
};

export const CONTACT = {
  phone: "0310 9608680",
  phoneHref: "tel:+923109608680",
  email: "",
  address: "Peshawar Northern Byp, Chabayan, Peshawar, 25000",
  postalCode: "25000",
  streetAddress: "Peshawar Northern Bypass, Chabayan",
  mapPlusCode: "2JPJ+V8 Chabayan, Peshawar, Pakistan",
  mapUrl: "https://maps.app.goo.gl/dyYTHXJ4QER7WVTS8",
  mapEmbedUrl:
    "https://www.google.com/maps?q=2JPJ%2BV8+Chabayan,+Peshawar,+Pakistan&output=embed",
  hours: "Mon–Fri 10am–8pm · Sat–Sun 11am–6pm",
  hoursDetail: [
    { days: "Monday – Thursday", time: "10am – 8pm" },
    { days: "Friday", time: "10am – 8pm" },
    { days: "Saturday – Sunday", time: "11am – 6pm" },
  ] as const,
};

export const SOCIAL = {
  instagram: "https://www.instagram.com/paramountclubpeshawar/",
  facebook: "https://www.facebook.com/ParamountClub/",
  youtube: "",
};

export const NAV_LINKS = [
  { href: "/venue", label: "Venue" },
  { href: "/experiences", label: "Experiences" },
  { href: "/gallery", label: "Gallery" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
] as const;

/** Full-screen menu links (Farmform-style overlay). */
export const MENU_LINKS = [
  { href: "/", label: "Home" },
  { href: "/venue", label: "Venue" },
  { href: "/stage-designs", label: "Stage Designs" },
  { href: "/experiences", label: "Experiences" },
  { href: "/gallery", label: "Gallery" },
  { href: "/packages", label: "Packages" },
  { href: "/availability", label: "Check Your Date" },
  { href: "/contact", label: "Contact" },
] as const;

export const CTA_LINK = {
  href: "/availability",
  label: "Check Your Date",
} as const;
