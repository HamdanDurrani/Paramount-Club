/**
 * Availability enquiry options and page content.
 */

import type {
  CateringPreference,
  DateRoleNote,
  EventType,
} from "@/types";

export const availabilityPageContent = {
  hero: {
    eyebrow: "Check Your Date",
    title: "Your celebration starts with the right date.",
    subtitle:
      "Select your dates, choose one celebration type, and share the details our team needs to confirm availability personally.",
  },
  process: {
    eyebrow: "Simple process",
    heading: "From enquiry to confirmation.",
    steps: [
      {
        title: "Choose your dates",
        body: "Select one or more open dates within the next year, and note Barat, Walima, or other roles for each.",
      },
      {
        title: "Share your preferences",
        body: "Guest count, catering, and whether you need a stage — with design options if you do.",
      },
      {
        title: "We confirm with you",
        body: "Our team reviews your request and contacts you to confirm availability and next steps.",
      },
    ],
  },
  booking: {
    eyebrow: "Book your enquiry",
    heading: "Complete your date request",
    body: "Pick open dates on the calendar, then continue through celebration preferences. We’ll take it from there.",
  },
  cta: {
    title: "Prefer to speak with us first?",
    body: "Our team is ready to discuss dates, packages, and the details of your celebration.",
  },
};

export const eventTypes: EventType[] = [
  "Barat",
  "Walima",
  "Mehndi",
  "Engagement",
  "Birthday",
  "Corporate / Private",
];

export const dateRoleOptions: Exclude<DateRoleNote, "">[] = [
  "Barat",
  "Walima",
  "Mehndi",
  "Engagement",
  "Other",
];

export const guestRanges = [
  "Up to 500",
  "500 – 1,000",
  "1,000 – 2,000",
  "2,000 – 3,500",
  "3,500 – 5,000",
  "5,000+",
];

export const cateringOptions: CateringPreference[] = [
  "Hall serves lunch / dinner",
  "Own catering arrangements",
  "Discuss later",
];

export const facilityPreferenceOptions = [
  { id: "ac", label: "Air conditioning (AC)" },
  { id: "heater", label: "Heater" },
  { id: "parking", label: "Parking support" },
  { id: "dj", label: "DJ / sound" },
] as const;

export const parkingEstimates = [
  "Not sure yet",
  "Up to 50 vehicles",
  "50 – 150 vehicles",
  "150 – 300 vehicles",
  "300+ vehicles",
];

/** Stage choice when guest declines stage décor. */
export const STAGE_NO_ID = "no-stage";

/** Stage choice when guest uploads their own design. */
export const STAGE_UPLOAD_ID = "upload-own";
