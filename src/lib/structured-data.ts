import {
  CONTACT,
  SITE_DESCRIPTION,
  SITE_LOGO,
  SITE_NAME,
  SITE_URL,
  SOCIAL,
} from "@/lib/site";
import { absoluteUrl } from "@/lib/url";

/** Organization JSON-LD. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: absoluteUrl(SITE_LOGO),
    sameAs: [SOCIAL.instagram, SOCIAL.facebook, SOCIAL.youtube].filter(Boolean),
  };
}

/** EventVenue / LocalBusiness JSON-LD. */
export function eventVenueJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: absoluteUrl("/media/og/og-default.svg"),
    telephone: CONTACT.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.streetAddress,
      addressLocality: "Peshawar",
      addressRegion: "Khyber Pakhtunkhwa",
      postalCode: CONTACT.postalCode,
      addressCountry: "PK",
    },
    hasMap: CONTACT.mapUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "11:00",
        closes: "18:00",
      },
    ],
    maximumAttendeeCapacity: 5000,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/availability`,
      "query-input": "required name=date",
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
