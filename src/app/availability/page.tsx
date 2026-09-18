import { AvailabilityBooking } from "@/components/availability/AvailabilityBooking";
import { AvailabilityCTA } from "@/components/availability/AvailabilityCTA";
import { AvailabilityHero } from "@/components/availability/AvailabilityHero";
import { AvailabilityProcess } from "@/components/availability/AvailabilityProcess";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Check Your Date",
  description:
    "Request your preferred celebration date at Paramount Club in Peshawar — Barat, Walima, Mehndi, and private events. Our team confirms availability personally.",
  path: "/availability",
});

export default function AvailabilityPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Check Your Date", path: "/availability" },
        ])}
      />
      <AvailabilityHero />
      <AvailabilityProcess />
      <AvailabilityBooking />
      <AvailabilityCTA />
    </>
  );
}
