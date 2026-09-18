import { CONTACT, SITE_LOCATION } from "@/lib/site";

export const contactPageContent = {
  hero: {
    eyebrow: "Contact",
    title: "We’d love to hear about your celebration.",
    subtitle:
      "Whether you’re planning a Barat, Walima, Mehndi, or a private gathering — our team is ready to guide you.",
  },
  details: {
    eyebrow: "Reach us",
    heading: "Paramount Club",
    body: `Based in ${SITE_LOCATION.city}, ${SITE_LOCATION.region}. Share your enquiry and we’ll respond with clarity and care.`,
  },
  form: {
    eyebrow: "Message",
    heading: "Send us a note",
    body: "Tell us a little about your occasion. We’ll get back to you as soon as we can.",
  },
  map: {
    label: "Visit us in Peshawar",
    note: CONTACT.mapPlusCode,
    directionsLabel: "Open in Google Maps",
  },
  cta: {
    title: "Ready to check a date?",
    body: "If you already have a celebration date in mind, begin your date request and our team will confirm availability.",
  },
};

export const contactDetails = [
  {
    label: "Phone",
    value: CONTACT.phone,
    href: CONTACT.phoneHref,
  },
  {
    label: "Location",
    value: CONTACT.address,
    href: CONTACT.mapUrl,
  },
  {
    label: "Hours",
    value: CONTACT.hours,
  },
] as const;
