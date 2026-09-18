export type ExperienceId =
  | "weddings"
  | "mehndi"
  | "walima"
  | "engagements"
  | "corporate"
  | "private";

export type GalleryCategory =
  | "all"
  | "weddings"
  | "mehndi"
  | "walima"
  | "events"
  | "venue";

export type MediaKind = "image" | "video";

export interface MediaAsset {
  id: string;
  kind: MediaKind;
  /** Path under /public, e.g. /media/gallery/weddings-01.jpg */
  src?: string;
  poster?: string;
  alt: string;
  label?: string;
  aspectRatio?: string;
}

export interface Experience {
  id: ExperienceId;
  title: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  media: MediaAsset;
  href: string;
}

export interface GalleryItem {
  id: string;
  category: Exclude<GalleryCategory, "all">;
  title: string;
  alt: string;
  src?: string;
  aspectRatio?: string;
  /** Mosaic layout hint for the editorial gallery */
  size?: "feature" | "tall" | "wide" | "square";
}

export interface PackageItem {
  id: string;
  name: string;
  summary: string;
  details: string;
  /** Always "Price on enquiry" until client confirms. */
  priceLabel: string;
  included: string[];
  notIncluded: string[];
}

export interface VenueStat {
  value: string;
  label: string;
}

export interface VenueSpace {
  id: string;
  title: string;
  description: string;
  media: MediaAsset;
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  /** true when details still need client confirmation */
  placeholder?: boolean;
}

export type EventType =
  | "Barat"
  | "Walima"
  | "Mehndi"
  | "Engagement"
  | "Birthday"
  | "Corporate / Private";

export type CateringPreference =
  | "Hall serves lunch / dinner"
  | "Own catering arrangements"
  | "Discuss later";

export interface DecorOption {
  id: string;
  name: string;
  description: string;
  /** Drop image at this public path when ready */
  imagePath: string;
  src?: string;
  aspectRatio?: string;
}

/** Optional role note on a selected enquiry date (e.g. Barat / Walima). */
export type DateRoleNote =
  | "Barat"
  | "Walima"
  | "Mehndi"
  | "Engagement"
  | "Other"
  | "";

export interface SelectedDateEntry {
  /** ISO date YYYY-MM-DD */
  date: string;
  note: DateRoleNote;
}

export type StagePreference = "yes" | "no" | "";

export interface AvailabilityInquiry {
  celebrationType: EventType | "";
  selectedDates: SelectedDateEntry[];
  /** Free-text note when more than 4 dates are needed. */
  additionalDatesNote: string;
  expectedGuests: string;
  catering: CateringPreference | "";
  wantsStage: StagePreference;
  decorId: string;
  decorUploadName: string;
  facilitiesNeeded: string[];
  parkingEstimate: string;
  name: string;
  email: string;
  phone: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/** Visual-only calendar demo — not connected to a backend. */
export type CalendarDayStatus = "available" | "booked" | "empty" | "past";

export interface CalendarDemoEvent {
  /** ISO date YYYY-MM-DD */
  date: string;
  /** Event type chip only — never couple names or contact details */
  eventType: "Barat" | "Walima";
}

export interface CalendarDemoDay {
  date: string | null;
  status: CalendarDayStatus;
  eventType?: "Barat" | "Walima";
}
