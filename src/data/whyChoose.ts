export type WhyChooseItem = {
  id: string;
  title: string;
  description: string;
  icon: "scale" | "tradition" | "space" | "hospitality" | "flexible" | "location" | "care";
};

export const whyChooseTitle = "Why choose Paramount Club?";

/**
 * Reasons visitors choose the venue.
 * Keep claims conservative — only confirmed facts + clear experiential language.
 */
export const whyChooseItems: WhyChooseItem[] = [
  {
    id: "scale",
    icon: "scale",
    title: "Built for Grand Scale",
    description:
      "With capacity for approximately 5,000 guests, Paramount Club is designed for celebrations that need both presence and space.",
  },
  {
    id: "tradition",
    icon: "tradition",
    title: "Made for Pakistani Celebrations",
    description:
      "From Barat and Walima to Mehndi, engagements and private gatherings — the venue supports traditions with refined hosting.",
  },
  {
    id: "space",
    icon: "space",
    title: "A Setting with Presence",
    description:
      "A grand ballroom atmosphere shaped for ceremonies, receptions and memorable guest experiences.",
  },
  {
    id: "hospitality",
    icon: "hospitality",
    title: "Hospitality at the Centre",
    description:
      "Every occasion is guided by thoughtful coordination and a guest experience that feels considered from arrival to farewell.",
  },
  {
    id: "flexible",
    icon: "flexible",
    title: "Flexible Event Setups",
    description:
      "Layouts that adapt to your celebration — whether you need formal dining, open gathering space or a ceremony-led flow.",
  },
  {
    id: "location",
    icon: "location",
    title: "Rooted in Peshawar",
    description:
      "A landmark wedding and events destination in Peshawar, created for families who want scale without compromising elegance.",
  },
  {
    id: "care",
    icon: "care",
    title: "Details That Matter",
    description:
      "From enquiry to celebration, the experience is shaped around clarity, comfort and moments that feel distinctly yours.",
  },
];
