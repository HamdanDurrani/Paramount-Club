import type { WhyChooseItem } from "@/data/whyChoose";

type IconProps = {
  name: WhyChooseItem["icon"];
  className?: string;
};

export function WhyChooseIcon({ name, className }: IconProps) {
  const common = {
    className,
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "scale":
      return (
        <svg {...common}>
          <path d="M4 20h16" />
          <path d="M7 20V10l5-6 5 6v10" />
          <path d="M10 20v-4h4v4" />
        </svg>
      );
    case "tradition":
      return (
        <svg {...common}>
          <path d="M12 3v18" />
          <path d="M7 8c2.5 0 5-2 5-2s2.5 2 5 2" />
          <path d="M7 13c2.5 0 5-2 5-2s2.5 2 5 2" />
          <path d="M7 18c2.5 0 5-2 5-2s2.5 2 5 2" />
        </svg>
      );
    case "space":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="1.5" />
          <path d="M3 10h18" />
          <path d="M8 6v12" />
        </svg>
      );
    case "hospitality":
      return (
        <svg {...common}>
          <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.6-7 10-7 10z" />
        </svg>
      );
    case "flexible":
      return (
        <svg {...common}>
          <path d="M4 7h6v6H4z" />
          <path d="M14 7h6v3h-6z" />
          <path d="M14 13h6v4h-6z" />
        </svg>
      );
    case "location":
      return (
        <svg {...common}>
          <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );
    case "care":
      return (
        <svg {...common}>
          <path d="M12 3l2.2 4.5L19 8.2l-3.5 3.4.8 4.9L12 14.8 7.7 16.5l.8-4.9L5 8.2l4.8-.7L12 3z" />
        </svg>
      );
    default:
      return null;
  }
}
